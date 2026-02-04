/**
 * Steganography Library - LSB (Least Significant Bit) Method
 *
 * Lógica transposta da versão Desktop (BitShadow Pro).
 * 1. Converte texto para binário (8 bits por caractere, Latin-1)
 * 2. Encriptação XOR opcional com a chave fornecida
 * 3. Compressão de texto (nível none/basic/advanced): §char§count§ (ex: §a4§)
 * 4. Marcador de fim: string "###END###" (9 caracteres)
 * 5. LSB com 1–4 bits por canal RGB (ignora Alpha)
 * 6. Exportação PNG via Canvas
 *
 * Capacidade: floor((largura × altura × 3 × bitsPerChannel) / 8) - 9 bytes
 */

// Constantes (compatíveis com Desktop)
const CHANNELS_PER_PIXEL = 3; // R, G, B (ignoramos Alpha completamente)
const END_MARKER_STRING = "###END###"; // marcador de fim (9 caracteres)
const END_MARKER_BYTES = END_MARKER_STRING.length; // 9 bytes

export type CompressionLevel = "none" | "basic" | "advanced";

/**
 * Comprime texto (lógica Desktop): substitui repetições por §char§count§
 * Exemplo: "aaaa" -> "§a4§" (basic/advanced)
 * @param compressionLevel - "none" | "basic" | "advanced"
 */
export function compressText(
  text: string,
  compressionLevel: CompressionLevel = "none"
): string {
  if (!text) return text;
  if (compressionLevel === "none") return text;

  if (compressionLevel === "basic") {
    return text.replace(/(.)\1{2,}/g, (match) => {
      return `§${match[0]}${match.length}§`;
    });
  }

  if (compressionLevel === "advanced") {
    return text
      .replace(/\s+/g, " ")
      .replace(/(.)\1{2,}/g, (match) => `§${match[0]}${match.length}§`);
  }

  return text;
}

/**
 * Descomprime texto (lógica Desktop): expande §char§count§ para caracteres repetidos
 * Regex: §(.)(\d+)§
 */
export function decompressText(
  text: string,
  compressionLevel: CompressionLevel = "none"
): string {
  if (!text) return text;
  if (compressionLevel === "none") return text;

  return text.replace(/§(.)(\d+)§/g, (_, char: string, count: string) => {
    return char.repeat(Number.parseInt(count, 10));
  });
}

/**
 * Aplica encriptação XOR simples com uma chave
 */
export function xorEncrypt(text: string, key: string): string {
  if (!key) return text;

  const result: string[] = [];
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    result.push(String.fromCharCode(charCode));
  }
  return result.join("");
}

/**
 * Desencripta XOR (mesma operação que encriptar)
 */
export function xorDecrypt(text: string, key: string): string {
  return xorEncrypt(text, key); // XOR é simétrico
}

/**
 * Converte uma string para um array de bits (Latin-1, 8 bits por caractere - lógica Desktop)
 */
export function stringToBits(str: string): number[] {
  const bits: number[] = [];
  for (let i = 0; i < str.length; i++) {
    const byte = str.charCodeAt(i) & 0xff;
    for (let j = 7; j >= 0; j--) {
      bits.push((byte >> j) & 1);
    }
  }
  return bits;
}

/**
 * Converte um array de bits para string (Latin-1, 8 bits por caractere - lógica Desktop)
 * Não para em null; o caller usa indexOf('###END###') para delimitar a mensagem.
 */
export function bitsToString(bits: number[]): string {
  let text = "";
  for (let i = 0; i < bits.length; i += 8) {
    if (i + 8 > bits.length) break;
    let byte = 0;
    for (let j = 0; j < 8; j++) {
      byte = (byte << 1) | bits[i + j];
    }
    text += String.fromCharCode(byte);
  }
  return text;
}

/**
 * Calcula a capacidade máxima de uma imagem em bytes (lógica Desktop)
 * Fórmula: floor((largura × altura × 3 × bitsPerChannel) / 8) - END_MARKER_BYTES
 */
export function calculateCapacity(
  width: number,
  height: number,
  bitsPerChannel: number = 1
): {
  totalPixels: number;
  totalBits: number;
  totalBytes: number;
  usableBytes: number;
} {
  const totalPixels = width * height;
  const totalBits = totalPixels * CHANNELS_PER_PIXEL * bitsPerChannel;
  const totalBytes = Math.floor(totalBits / 8);
  const usableBytes = totalBytes - END_MARKER_BYTES;

  return {
    totalPixels,
    totalBits,
    totalBytes,
    usableBytes: Math.max(0, usableBytes),
  };
}

/**
 * Verifica se uma mensagem cabe numa imagem (lógica Desktop)
 */
export function canFitMessage(
  messageLength: number,
  imageWidth: number,
  imageHeight: number,
  bitsPerChannel: number = 1
): { canFit: boolean; required: number; available: number; percentage: number } {
  const capacity = calculateCapacity(imageWidth, imageHeight, bitsPerChannel);
  const canFit = messageLength <= capacity.usableBytes;

  return {
    canFit,
    required: messageLength,
    available: capacity.usableBytes,
    percentage:
      capacity.usableBytes > 0
        ? Math.min(100, (messageLength / capacity.usableBytes) * 100)
        : 100,
  };
}

export interface EncodeOptions {
  compressionLevel?: CompressionLevel;
  bitsPerChannel?: number;
}

/**
 * Codifica uma mensagem numa imagem usando LSB (lógica Desktop)
 *
 * Algoritmo:
 * 1. Comprime o texto (nível none/basic/advanced)
 * 2. Aplica encriptação XOR opcional
 * 3. Adiciona marcador de fim "###END###"
 * 4. Converte para binário Latin-1 (8 bits por caractere)
 * 5. Escreve nos LSBs dos canais RGB (1–4 bits por canal), ignora Alpha
 *
 * @param imageData - ImageData do canvas
 * @param message - Mensagem a ocultar
 * @param xorKey - Chave opcional para encriptação XOR
 * @param options - compressionLevel ('none'|'basic'|'advanced'), bitsPerChannel (1–4)
 */
export function encodeMessage(
  imageData: ImageData,
  message: string,
  xorKey?: string,
  options: EncodeOptions = {}
): { success: boolean; imageData: ImageData; error?: string; stats?: EncodeStats } {
  const compressionLevel = options.compressionLevel ?? "none";
  const bitsPerChannel = Math.min(4, Math.max(1, options.bitsPerChannel ?? 1));
  const capacity = calculateCapacity(
    imageData.width,
    imageData.height,
    bitsPerChannel
  );

  // 1. Comprime o texto (lógica Desktop)
  const compressedMessage = compressText(message, compressionLevel);

  // 2. Aplica encriptação XOR opcional
  const processedMessage = xorKey
    ? xorEncrypt(compressedMessage, xorKey)
    : compressedMessage;

  // 3. Adiciona marcador de fim "###END###" (lógica Desktop)
  const fullMessage = processedMessage + END_MARKER_STRING;
  const allBits = stringToBits(fullMessage);

  if (allBits.length > capacity.totalBits) {
    return {
      success: false,
      imageData,
      error: `Mensagem demasiado grande. Necessário: ${Math.ceil(allBits.length / 8)} bytes, Disponível: ${capacity.usableBytes} bytes`,
    };
  }

  const newData = new Uint8ClampedArray(imageData.data);
  let binaryIndex = 0;

  // 4. Codifica usando múltiplos bits por canal (lógica Desktop)
  for (let i = 0; i < newData.length - 1 && binaryIndex < allBits.length; i++) {
    if (i % 4 === 3) continue; // Pula o canal alpha

    const mask = ~((1 << bitsPerChannel) - 1);
    newData[i] = newData[i] & mask;

    for (
      let bit = 0;
      bit < bitsPerChannel && binaryIndex < allBits.length;
      bit++
    ) {
      newData[i] |= allBits[binaryIndex] << bit;
      binaryIndex++;
    }
  }

  const stats: EncodeStats = {
    originalSize: message.length,
    compressedSize: compressedMessage.length,
    encodedBits: allBits.length,
    pixelsModified: Math.ceil(allBits.length / (CHANNELS_PER_PIXEL * bitsPerChannel)),
    totalPixels: capacity.totalPixels,
    capacityUsed: (allBits.length / capacity.totalBits) * 100,
    compressionRatio:
      message.length > 0
        ? ((message.length - compressedMessage.length) / message.length) * 100
        : 0,
  };

  return {
    success: true,
    imageData: new ImageData(newData, imageData.width, imageData.height),
    stats,
  };
}

export interface DecodeOptions {
  compressionLevel?: CompressionLevel;
  bitsPerChannel?: number;
}

/**
 * Descodifica uma mensagem de uma imagem (lógica Desktop)
 *
 * Algoritmo:
 * 1. Extrai os LSBs de cada canal RGB (1–4 bits por canal), ignora Alpha
 * 2. Converte bits para string Latin-1
 * 3. Procura marcador de fim "###END###" e toma o texto antes dele
 * 4. Desencripta XOR se chave fornecida
 * 5. Descomprime o texto
 *
 * @param imageData - ImageData do canvas
 * @param xorKey - Chave opcional para desencriptação XOR
 * @param options - compressionLevel, bitsPerChannel (devem coincidir com encode)
 */
export function decodeMessage(
  imageData: ImageData,
  xorKey?: string,
  options: DecodeOptions = {}
): {
  success: boolean;
  message?: string;
  error?: string;
  stats?: DecodeStats;
} {
  const data = imageData.data;
  const bitsPerChannel = Math.min(4, Math.max(1, options.bitsPerChannel ?? 1));
  const compressionLevel = options.compressionLevel ?? "none";

  // 1. Extrai bits de todos os canais RGB (lógica Desktop)
  let binary = "";
  for (let i = 0; i < data.length - 1; i++) {
    if (i % 4 === 3) continue; // Pula o canal alpha
    for (let bit = 0; bit < bitsPerChannel; bit++) {
      binary += ((data[i] >> bit) & 1).toString();
    }
  }

  const extractedBits: number[] = [];
  for (let i = 0; i < binary.length; i++) {
    extractedBits.push(parseInt(binary[i], 10));
  }

  // 2. Converte bits para string e procura marcador "###END###" (lógica Desktop)
  const text = bitsToString(extractedBits);
  const endMarker = text.indexOf(END_MARKER_STRING);

  if (endMarker === -1) {
    return {
      success: false,
      error: "Nenhuma mensagem oculta encontrada nesta imagem",
    };
  }

  let message = text.substring(0, endMarker);

  if (message.length === 0) {
    return {
      success: false,
      error: "Mensagem vazia encontrada",
    };
  }

  // 3. Desencripta XOR se chave fornecida
  if (xorKey) {
    message = xorDecrypt(message, xorKey);
  }

  // 4. Descomprime o texto (lógica Desktop)
  message = decompressText(message, compressionLevel);

  const stats: DecodeStats = {
    extractedBits: endMarker * 8,
    messageSize: message.length,
    headerValid: true,
  };

  return {
    success: true,
    message,
    stats,
  };
}

/**
 * Carrega uma imagem e retorna os dados do canvas
 */
export function loadImage(
  file: File
): Promise<{ imageData: ImageData; width: number; height: number; canvas: HTMLCanvasElement }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.crossOrigin = "anonymous";

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Não foi possível criar contexto do canvas"));
          return;
        }

        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);

        resolve({
          imageData,
          width: img.width,
          height: img.height,
          canvas,
        });
      };

      img.onerror = () => reject(new Error("Erro ao carregar a imagem"));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error("Erro ao ler o ficheiro"));
    reader.readAsDataURL(file);
  });
}

/**
 * Converte ImageData para um blob PNG via Canvas
 */
export function imageDataToBlob(imageData: ImageData): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    canvas.width = imageData.width;
    canvas.height = imageData.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      reject(new Error("Não foi possível criar contexto do canvas"));
      return;
    }

    // Aplica pixels modificados com putImageData()
    ctx.putImageData(imageData, 0, 0);

    // Exporta PNG
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Erro ao criar blob da imagem"));
        }
      },
      "image/png",
      1.0
    );
  });
}

/**
 * Gera uma URL de download para uma imagem
 */
export function createDownloadUrl(blob: Blob): string {
  return URL.createObjectURL(blob);
}

/**
 * Analisa uma imagem para esteganografia
 */
export function analyzeImage(imageData: ImageData): ImageAnalysis {
  const { width, height, data } = imageData;
  const capacity = calculateCapacity(width, height);

  // Analisa a distribuição de LSBs
  let zeroBits = 0;
  let oneBits = 0;

  for (let i = 0; i < data.length; i++) {
    if ((i + 1) % 4 === 0) continue; // Ignora alpha
    if ((data[i] & 1) === 0) zeroBits++;
    else oneBits++;
  }

  const totalBits = zeroBits + oneBits;
  const lsbDistribution = {
    zeros: zeroBits,
    ones: oneBits,
    ratio: oneBits / totalBits,
  };

  // Calcula estatísticas de cor
  let totalR = 0,
    totalG = 0,
    totalB = 0;
  const pixelCount = width * height;

  for (let i = 0; i < data.length; i += 4) {
    totalR += data[i];
    totalG += data[i + 1];
    totalB += data[i + 2];
  }

  const averageColor = {
    r: Math.round(totalR / pixelCount),
    g: Math.round(totalG / pixelCount),
    b: Math.round(totalB / pixelCount),
  };

  return {
    width,
    height,
    totalPixels: pixelCount,
    capacity,
    lsbDistribution,
    averageColor,
    format: "RGBA",
    bitsPerPixel: 32,
  };
}

// Types
export interface EncodeStats {
  originalSize: number;
  compressedSize: number;
  encodedBits: number;
  pixelsModified: number;
  totalPixels: number;
  capacityUsed: number;
  compressionRatio: number;
}

export interface DecodeStats {
  extractedBits: number;
  messageSize: number;
  headerValid: boolean;
}

export interface ImageAnalysis {
  width: number;
  height: number;
  totalPixels: number;
  capacity: ReturnType<typeof calculateCapacity>;
  lsbDistribution: {
    zeros: number;
    ones: number;
    ratio: number;
  };
  averageColor: {
    r: number;
    g: number;
    b: number;
  };
  format: string;
  bitsPerPixel: number;
}
