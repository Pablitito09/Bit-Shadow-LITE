# Guião PowerPoint — BitShadow (Slides e Conteúdo)

**Objetivo:** Apresentar o projeto ao júri com slides claros e conteúdo técnico passo a passo.

---

## Slide 1 — Capa

**Título:** BitShadow  
**Subtítulo:** Esteganografia + Criptografia — Ocultar mensagens em imagens de forma segura  
**Elementos opcionais:** Logo do projeto, nome da disciplina / instituição, data, nomes dos elementos do grupo  

**Notas para o orador:** Apresentar o nome do projeto e o conceito em uma frase.

---

## Slide 2 — O que é o BitShadow?

**Título:** O que é o BitShadow?

**Conteúdo (bullets):**
- Aplicação que **esconde mensagens dentro de imagens** (esteganografia)
- Usa **criptografia** (AES-256-GCM) para proteger o conteúdo
- Duas funções principais:
  - **Codificar:** imagem + mensagem + password → imagem com mensagem oculta
  - **Descodificar:** imagem com mensagem + password → mensagem original
- Processamento **local** (browser ou desktop) — sem envio de dados para servidores

**Notas para o orador:** Explicar em 30 segundos o que o utilizador consegue fazer com a aplicação.

---

## Slide 3 — Fluxo geral (utilizador)

**Título:** Fluxo do utilizador

**Conteúdo (diagrama ou bullets):**
- **Codificar:**
  1. Selecionar imagem (PNG/JPG)
  2. Escrever mensagem
  3. Definir password
  4. Clicar em «Codificar» e descarregar a imagem
- **Descodificar:**
  1. Carregar imagem com mensagem oculta
  2. Introduzir a mesma password
  3. Clicar em «Descodificar» e ver a mensagem

**Sugestão visual:** Dois blocos lado a lado — «Codificar» e «Descodificar» — com os passos numerados.

**Notas para o orador:** Focar no que o utilizador faz; os próximos slides explicam o que o software faz por baixo.

---

## Slide 4 — Arquitetura em camadas

**Título:** O que o código faz (visão geral)

**Conteúdo (esquema):**
- **Camada 1 — Criptografia:** Mensagem em texto → AES-256-GCM → texto cifrado + metadados (salt, IV)
- **Camada 2 — Empacotamento:** Dados encriptados → JSON (versão, algoritmo, salt, IV, ciphertext)
- **Camada 3 — Esteganografia:** JSON + marcador «###END###» → bits → LSB nos canais RGB da imagem
- **Saída:** Imagem PNG com mensagem oculta (visualmente quase igual à original)

**Notas para o orador:** Introduzir a ordem lógica: primeiro cifrar, depois empacotar, depois esconder na imagem.

---

## Slide 5 — Passo 1: Password e derivação de chave

**Título:** 1. Password e derivação de chave

**Conteúdo (bullets):**
- O utilizador **introduz a password** (não é guardada em claro)
- O código usa **PBKDF2** para derivar uma chave AES-256:
  - Entrada: password + **salt aleatório** (16 bytes)
  - 100 000 iterações, hash **SHA-256**
  - Saída: chave de 256 bits para AES
- **Salt e IV** (12 bytes) são gerados aleatoriamente em cada encriptação → mesmo texto + mesma password dão cifras diferentes

**Notas para o orador:** Sublinhar que a password nunca é usada diretamente como chave; isso aumenta a segurança.

---

## Slide 6 — Passo 2: Encriptação AES-256-GCM

**Título:** 2. Encriptação da mensagem (AES-256-GCM)

**Conteúdo (bullets):**
- **Algoritmo:** AES (Advanced Encryption Standard), 256 bits, modo **GCM** (Galois/Counter Mode)
- **GCM** oferece:
  - Confidencialidade (só quem tem a chave lê)
  - Autenticidade (alterações são detetadas; desencriptação falha se dados forem modificados)
- Entrada: mensagem em texto simples + chave derivada + IV
- Saída: **ciphertext** (texto cifrado) em Base64 + **salt** e **IV** em Base64 (para usar na desencriptação)

**Notas para o orador:** Referir que AES-256-GCM é um padrão usado em aplicações sensíveis (ex.: comunicações seguras).

---

## Slide 7 — Passo 3: Empacotar dados (JSON)

**Título:** 3. Empacotar dados para esconder na imagem

**Conteúdo (bullets):**
- O código **empacota** num único texto (JSON):
  - Versão do formato (v: 1)
  - Algoritmo (alg: AES-256-GCM)
  - Derivação de chave (kdf: PBKDF2, iter: 100000)
  - Salt, IV e texto cifrado (ct) em Base64
- Este **pacote JSON** é a «mensagem» que será escondida na imagem
- Na descodificação, este JSON será lido da imagem e desempacotado para obter salt, IV e ciphertext

**Sugestão visual:** Caixa «Dados encriptados» → seta → «JSON (uma string)» → seta → «Entrada da esteganografia»

**Notas para o orador:** Explicar que tudo o que é necessário para desencriptar vai dentro da imagem (exceto a password).

---

## Slide 8 — Passo 4: Verificar capacidade da imagem

**Título:** 4. Verificar se a mensagem cabe na imagem

**Conteúdo (bullets):**
- **Capacidade** (em bytes) = (largura × altura × 3) / 8 − 9
  - 3 = canais RGB por pixel (1 bit LSB por canal, por defeito)
  - 9 = bytes reservados para o marcador de fim «###END###»
- Se **tamanho do pacote > capacidade** → erro: «Mensagem demasiado grande»
- Caso contrário → prossegue para a escrita na imagem

**Notas para o orador:** Referir que imagens maiores permitem mensagens mais longas.

---

## Slide 9 — Passo 5: Esteganografia LSB (conceito)

**Título:** 5. Esteganografia LSB — Conceito

**Conteúdo (bullets):**
- **LSB** = Least Significant Bit (bit menos significativo)
- Cada valor de canal (R, G, B) é um byte (0–255); alterar o **último bit** muda pouco o valor → alteração **invisível**
- O código:
  1. Converte o pacote + «###END###» em **bits** (8 bits por caractere, Latin-1)
  2. Percorre os canais R, G, B de cada pixel (ignora Alpha)
  3. Substitui o LSB de cada canal pelo próximo bit da mensagem
- Ordem: primeiro todos os bits da mensagem, depois os 9 caracteres «###END###»

**Sugestão visual:** Pixel com R=150, G=200, B=100 → exemplo de como o LSB de cada um pode ser 0 ou 1.

**Notas para o orador:** Destacar que a imagem continua a parecer a mesma; a mensagem está «dentro» dos pixels.

---

## Slide 10 — Passo 6: Exportar e descarregar

**Título:** 6. Exportar e descarregar

**Conteúdo (bullets):**
- Os pixels modificados são desenhados num **canvas**
- A imagem é exportada como **PNG**
- O utilizador recebe um **link de download** da imagem com a mensagem oculta
- **Resultado:** ficheiro PNG visualmente quase idêntico à imagem original

**Notas para o orador:** Fechar o ciclo da codificação: da password e mensagem à imagem final.

---

## Slide 11 — Descodificação: visão geral

**Título:** Descodificação — O que o código faz

**Conteúdo (bullets):**
1. **Extrair bits:** Ler LSB de cada canal R, G, B da imagem → sequência de bits
2. **Bits → texto:** Agrupar em bytes (8 bits), converter em caracteres → obter string
3. **Encontrar fim:** Procurar «###END###» → tudo antes é o pacote (JSON)
4. **Desempacotar:** Interpretar JSON → extrair ciphertext, salt, IV
5. **Desencriptar:** Derivar chave com a password do utilizador (PBKDF2 + salt) → AES-GCM decrypt → mensagem original
6. **Mostrar** a mensagem ao utilizador

**Notas para o orador:** Enfatizar que a **mesma password** e os dados da imagem (salt, IV, ct) são necessários; sem a password correta, a desencriptação falha.

---

## Slide 12 — Segurança e privacidade

**Título:** Segurança e privacidade

**Conteúdo (bullets):**
- **Password:** Nunca guardada; usada apenas para derivar a chave (PBKDF2)
- **Dados:** Processados **localmente** (browser ou aplicação) — nada é enviado para servidores
- **Encriptação:** AES-256-GCM com salt e IV aleatórios; modo autenticado (GCM) deteta adulteração
- **Esteganografia:** Alterações nos LSBs são impercetíveis; sem a imagem e a password, a mensagem não é recuperável

**Notas para o orador:** Respostas curtas para perguntas do tipo «onde fica a password?» e «os dados saem do computador?».

---

## Slide 13 — Resumo técnico

**Título:** Resumo técnico

**Conteúdo (tabela ou bullets):**
| Componente        | Tecnologia / Método                          |
|------------------|-----------------------------------------------|
| Criptografia     | AES-256-GCM                                   |
| Derivação chave  | PBKDF2, 100k iterações, SHA-256               |
| Salt / IV        | Aleatórios (16 B / 12 B) por encriptação      |
| Empacotamento    | JSON (versão, alg, kdf, salt, iv, ct)         |
| Esteganografia   | LSB nos canais RGB, marcador «###END###»     |
| Codificação texto| Latin-1 (8 bits por caractere)               |

**Notas para o orador:** Útil como «cheat sheet» se o júri pedir detalhes técnicos.

---

## Slide 14 — Demonstração (opcional)

**Título:** Demonstração

**Conteúdo:**
- Screenshot ou vídeo curto: **Codificar** (imagem + mensagem + password → download)
- Screenshot ou vídeo curto: **Descodificar** (carregar imagem + password → mensagem recuperada)
- Ou indicação: «Demonstração ao vivo na aplicação»

**Notas para o orador:** Se houver tempo, fazer uma codificação e descodificação ao vivo.

---

## Slide 15 — Conclusão e agradecimento

**Título:** Conclusão

**Conteúdo (bullets):**
- BitShadow combina **esteganografia (LSB)** e **criptografia (AES-256-GCM)** para ocultar mensagens em imagens de forma segura e invisível
- Fluxo claro: password → derivação de chave → encriptação → empacotamento → escrita na imagem → download
- Descodificação: leitura LSB → extração do pacote → desencriptação com a mesma password → mensagem original

**Última linha:** Obrigado. Perguntas?

**Notas para o orador:** Agradecer e abrir espaço para perguntas.

---

## Sugestões de formatação PowerPoint

- **Cores:** Tom escuro para fundo; destaque para títulos e termos técnicos (ex.: AES-256-GCM, LSB, PBKDF2).
- **Diagramas:** Usar setas para fluxos (Mensagem → Encriptar → Empacotar → LSB → Imagem).
- **Consistência:** Mesma fonte e tamanhos para títulos e corpo em todos os slides.
- **Duração:** Cerca de 1 minuto por slide (total 12–15 minutos com demonstração).
