/**
 * AES-256-GCM Encryption Library
 *
 * Este módulo implementa encriptação AES-256 usando o modo GCM (Galois/Counter Mode)
 * que fornece tanto confidencialidade como autenticação dos dados.
 *
 * Características:
 * - AES-256: Chave de 256 bits para máxima segurança
 * - GCM Mode: Modo autenticado que previne modificações não autorizadas
 * - PBKDF2: Derivação de chave segura a partir de password
 * - Salt aleatório: Previne ataques de rainbow table
 * - IV aleatório: Garante que mensagens idênticas produzem cifras diferentes
 */

// Converte string para ArrayBuffer
export function stringToArrayBuffer(str: string): ArrayBuffer {
  const encoder = new TextEncoder();
  return encoder.encode(str).buffer as ArrayBuffer;
}

// Converte ArrayBuffer para string
export function arrayBufferToString(buffer: ArrayBuffer): string {
  const decoder = new TextDecoder();
  return decoder.decode(buffer);
}

// Converte ArrayBuffer para Base64
export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Converte Base64 para ArrayBuffer
export function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer as ArrayBuffer;
}

// Gera um salt aleatório
export function generateSalt(): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(16));
}

// Gera um IV (Initialization Vector) aleatório
export function generateIV(): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(12)); // 96 bits para GCM
}

/**
 * Deriva uma chave criptográfica a partir de uma password usando PBKDF2
 *
 * @param password - A password fornecida pelo utilizador
 * @param salt - Salt aleatório para prevenir ataques de rainbow table
 * @returns CryptoKey - Chave derivada pronta para uso com AES-GCM
 */
export async function deriveKey(
  password: string,
  salt: Uint8Array
): Promise<CryptoKey> {
  // Importa a password como material de chave
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    stringToArrayBuffer(password),
    "PBKDF2",
    false,
    ["deriveBits", "deriveKey"]
  );

  // Deriva a chave AES-256 usando PBKDF2
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000, // 100k iterações para segurança
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 }, // AES-256
    false,
    ["encrypt", "decrypt"]
  );
}

/**
 * Encripta uma mensagem usando AES-256-GCM
 *
 * @param message - Mensagem em texto plano para encriptar
 * @param password - Password para derivar a chave
 * @returns Object contendo o texto cifrado em Base64 e metadados
 */
export async function encryptMessage(
  message: string,
  password: string
): Promise<{
  ciphertext: string;
  salt: string;
  iv: string;
  algorithm: string;
  keyDerivation: string;
  iterations: number;
}> {
  const salt = generateSalt();
  const iv = generateIV();
  const key = await deriveKey(password, salt);

  const ciphertext = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    stringToArrayBuffer(message)
  );

  return {
    ciphertext: arrayBufferToBase64(ciphertext),
    salt: arrayBufferToBase64(salt),
    iv: arrayBufferToBase64(iv),
    algorithm: "AES-256-GCM",
    keyDerivation: "PBKDF2",
    iterations: 100000,
  };
}

/**
 * Desencripta uma mensagem usando AES-256-GCM
 *
 * @param ciphertext - Texto cifrado em Base64
 * @param password - Password para derivar a chave
 * @param salt - Salt usado na encriptação (Base64)
 * @param iv - IV usado na encriptação (Base64)
 * @returns Mensagem original desencriptada
 */
export async function decryptMessage(
  ciphertext: string,
  password: string,
  salt: string,
  iv: string
): Promise<string> {
  const saltArray = new Uint8Array(base64ToArrayBuffer(salt));
  const ivArray = new Uint8Array(base64ToArrayBuffer(iv));
  const key = await deriveKey(password, saltArray);

  try {
    const decrypted = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: ivArray,
      },
      key,
      base64ToArrayBuffer(ciphertext)
    );

    return arrayBufferToString(decrypted);
  } catch {
    throw new Error(
      "Falha na desencriptação. Password incorreta ou dados corrompidos."
    );
  }
}

/**
 * Empacota os dados encriptados num formato JSON para embedding
 * Este formato inclui todos os metadados necessários para desencriptação
 */
export function packEncryptedData(data: {
  ciphertext: string;
  salt: string;
  iv: string;
  algorithm: string;
  keyDerivation: string;
  iterations: number;
}): string {
  return JSON.stringify({
    v: 1, // Versão do formato
    alg: data.algorithm,
    kdf: data.keyDerivation,
    iter: data.iterations,
    salt: data.salt,
    iv: data.iv,
    ct: data.ciphertext,
  });
}

/**
 * Desempacota os dados encriptados do formato JSON
 */
export function unpackEncryptedData(packed: string): {
  ciphertext: string;
  salt: string;
  iv: string;
  algorithm: string;
  keyDerivation: string;
  iterations: number;
} {
  try {
    const data = JSON.parse(packed);

    if (data.v !== 1) {
      throw new Error("Versão do formato não suportada");
    }

    return {
      ciphertext: data.ct,
      salt: data.salt,
      iv: data.iv,
      algorithm: data.alg,
      keyDerivation: data.kdf,
      iterations: data.iter,
    };
  } catch {
    throw new Error("Formato de dados inválido");
  }
}

/**
 * Calcula a força de uma password
 * Retorna um valor entre 0 e 100
 */
export function calculatePasswordStrength(password: string): {
  score: number;
  level: "fraca" | "razoável" | "boa" | "forte" | "muito forte";
  feedback: string[];
} {
  let score = 0;
  const feedback: string[] = [];

  if (password.length === 0) {
    return { score: 0, level: "fraca", feedback: ["Introduza uma password"] };
  }

  // Comprimento - apenas 6 caracteres minimo
  if (password.length >= 6) score += 40;
  else feedback.push("Use pelo menos 6 caracteres");

  if (password.length >= 10) score += 20;
  if (password.length >= 14) score += 20;

  // Letras minusculas (bonus, nao obrigatorio)
  if (/[a-z]/.test(password)) score += 5;

  // Letras maiusculas (bonus, nao obrigatorio)
  if (/[A-Z]/.test(password)) score += 5;

  // Numeros (bonus, nao obrigatorio)
  if (/\d/.test(password)) score += 5;

  // Caracteres especiais (bonus, nao obrigatorio)
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score += 5;

  // Bónus por diversidade
  const uniqueChars = new Set(password).size;
  if (uniqueChars >= 10) score += 10;

  // Penalização por padrões comuns
  if (/^[a-z]+$/i.test(password)) score -= 10;
  if (/^[0-9]+$/.test(password)) score -= 20;
  if (/(.)\1{2,}/.test(password)) {
    score -= 10;
    feedback.push("Evite caracteres repetidos");
  }

  score = Math.max(0, Math.min(100, score));

  let level: "fraca" | "razoável" | "boa" | "forte" | "muito forte";
  if (score < 30) level = "fraca";
  else if (score < 50) level = "razoável";
  else if (score < 70) level = "boa";
  else if (score < 90) level = "forte";
  else level = "muito forte";

  return { score, level, feedback };
}
