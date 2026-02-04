# Guião de Apresentação Oral — BitShadow (para Júri)

**Duração sugerida:** 8–12 minutos  
**Objetivo:** Explicar o projeto e o fluxo completo de criptografia e esteganografia, passo a passo.

---

## 1. Abertura (≈1 min)

> "Bom dia / Boa tarde. O nosso projeto chama-se **BitShadow** e combina **esteganografia** com **criptografia** para esconder mensagens dentro de imagens de forma segura e invisível.
>
> Hoje vou explicar o que o utilizador faz na aplicação e, em seguida, o que o código faz em cada etapa — desde a password até à imagem final com a mensagem oculta, e depois como se recupera a mensagem."

---

## 2. O que é o BitShadow (≈1 min)

> "O BitShadow tem duas funções principais:
> - **Codificar:** o utilizador escolhe uma imagem, escreve uma mensagem e define uma password; o software esconde a mensagem encriptada na imagem e devolve uma nova imagem para transferir.
> - **Descodificar:** o utilizador carrega uma imagem que contém uma mensagem e introduce a mesma password; o software extrai e desencripta a mensagem.
>
> Tudo isto acontece no browser ou na aplicação desktop, sem enviar dados para servidores — a segurança e a privacidade ficam no dispositivo do utilizador."

---

## 3. Fluxo de CODIFICAÇÃO — O que o utilizador faz (≈1 min)

> "No modo **Codificar**, o utilizador segue quatro passos na interface:
>
> 1. **Selecionar imagem** — arrasta ou escolhe um ficheiro de imagem (PNG/JPG). A aplicação mostra a imagem e calcula quantos bytes cabem nela.
> 2. **Escrever mensagem** — introduz o texto que quer esconder.
> 3. **Definir password** — escolhe uma palavra-passe; a aplicação indica a força da password (fraca, razoável, boa, forte).
> 4. **Processar e transferir** — clica em «Codificar»; quando termina, pode descarregar a imagem com a mensagem oculta."

---

## 4. Fluxo de CODIFICAÇÃO — O que o código faz (passo a passo)

### 4.1 O utilizador introduz a password

> "Quando o utilizador escreve a password, o código **não guarda a password em claro**. Mais à frente, a password será usada apenas para **derivar uma chave criptográfica** com o algoritmo PBKDF2. O código também calcula e mostra a **força da password** (por exemplo, comprimento, uso de maiúsculas, números e símbolos) para incentivar uma password segura."

### 4.2 O utilizador clica em «Codificar»

> "Ao clicar em «Codificar», o software executa uma sequência bem definida. Vou descrever cada etapa."

### Passo 1 — Encriptação AES-256-GCM

> "**Primeiro**, a mensagem em texto simples é encriptada com **AES-256 em modo GCM** (Galois/Counter Mode).
>
> - O código gera um **salt** aleatório (16 bytes) e um **IV** — Vector de Inicialização — aleatório (12 bytes). Isto garante que duas encriptações da mesma mensagem com a mesma password produzem resultados diferentes e reduz ataques por tabelas pré-calculadas.
> - A **password** é transformada numa **chave de 256 bits** usando **PBKDF2** com SHA-256 e 100 000 iterações. Assim, a password nunca é usada diretamente como chave; deriva-se uma chave forte a partir dela.
> - A mensagem é encriptada com essa chave e o IV. O modo GCM fornece **confidencialidade e autenticidade**: se alguém alterar os dados, a desencriptação falha.
> - O resultado da encriptação (ciphertext), o salt, o IV e metadados (algoritmo, KDF, iterações) são convertidos para **Base64** e guardados para uso nos passos seguintes."

### Passo 2 — Empacotar os dados encriptados

> "**Em seguida**, o código **empacota** esses dados num único texto em formato JSON. Esse JSON contém: a versão do formato, o algoritmo (AES-256-GCM), o método de derivação de chave (PBKDF2), as iterações, o salt, o IV e o texto cifrado (ct). Este pacote é a «mensagem» que vai ser escondida na imagem — já não é texto legível, é o resultado da encriptação mais os parâmetros necessários para desencriptar depois."

### Passo 3 — Verificar se cabe na imagem

> "**Antes** de modificar a imagem, o código verifica se o pacote cabe nela. A capacidade é calculada a partir da largura e da altura: usa-se a fórmula **(largura × altura × 3) / 8**, menos 9 bytes reservados para o marcador de fim da mensagem (a string «###END###»). Só se o tamanho do pacote for menor ou igual a essa capacidade é que o processo continua; caso contrário, o utilizador recebe um erro indicando que a mensagem é demasiado grande para aquela imagem."

### Passo 4 — Esteganografia LSB (esconder na imagem)

> "**Depois**, o pacote (o texto JSON) é escondido na imagem usando **esteganografia LSB** — Least Significant Bit, o bit menos significativo.
>
> - O código **adiciona ao pacote** a string de fim **«###END###»** (9 caracteres). Assim, na leitura, o programa sabe onde termina a mensagem.
> - O texto completo (pacote + «###END###») é convertido em **bits**: cada caractere vira 8 bits (codificação Latin-1), por ordem, do primeiro ao último bit.
> - O código percorre os **canais de cor** da imagem — vermelho, verde e azul de cada pixel — e **ignora o canal alpha**. Para cada canal, substitui o **bit menos significativo** pelo próximo bit da mensagem: se o bit for 1, o valor do canal é ajustado para terminar em 1; se for 0, termina em 0. A alteração é tão pequena que é praticamente invisível ao olho.
> - Os bits são escritos em sequência: primeiro todos os bits da mensagem, depois o marcador «###END###». Quando acabam os bits da mensagem, a imagem fica com a mensagem oculta."

### Passo 5 — Exportar e descarregar

> "**Por fim**, os pixels modificados são desenhados num canvas e exportados como **PNG**. O utilizador recebe um link para **descarregar** essa imagem. A imagem que ele guarda é a que contém a mensagem encriptada e oculta; visualmente é quase igual à original."

---

## 5. Fluxo de DESCODIFICAÇÃO — O que o utilizador faz (≈30 s)

> "No modo **Descodificar**, o utilizador:
> 1. Carrega a imagem que contém a mensagem.
> 2. Introduz a **mesma password** que usou na codificação.
> 3. Clica em «Descodificar» e vê a mensagem original."

---

## 6. Fluxo de DESCODIFICAÇÃO — O que o código faz (passo a passo)

### Passo 1 — Extrair os bits da imagem (LSB)

> "O código lê a imagem pixel a pixel, canal a canal (R, G, B), **ignorando o alpha**. De cada valor de canal extrai o **bit menos significativo** (por exemplo, com uma operação «e» com 1). Concatena esses bits na mesma ordem em que foram escritos, obtendo uma longa sequência de zeros e uns."

### Passo 2 — Converter bits em texto e encontrar o fim

> "Essa sequência de bits é agrupada em **bytes** (8 bits cada) e convertida em caracteres (Latin-1). O código procura a primeira ocorrência da string **«###END###»** nesse texto. Tudo o que está **antes** desse marcador é o **pacote** (o JSON com o texto cifrado e metadados); o que está depois é ignorado."

### Passo 3 — Desempacotar o JSON

> "O texto antes de «###END###» é interpretado como **JSON**. O código valida a versão do formato e extrai: o texto cifrado (ct), o salt, o IV, o algoritmo e os parâmetros do PBKDF2. Se o formato for inválido ou a versão não for suportada, devolve erro."

### Passo 4 — Desencriptar com AES-256-GCM

> "Com a **password** que o utilizador introduziu, o código:
> - Converte o salt e o IV de Base64 para bytes.
> - **Deriva de novo** a chave AES-256 com PBKDF2, usando a mesma password, o mesmo salt e as mesmas iterações (100 000).
> - Chama a API de **desencriptação** (AES-GCM) com essa chave e o IV. Se a password estiver correta e os dados não tiverem sido alterados, o resultado é a **mensagem original** em texto simples. Se a password estiver errada ou os dados tiverem sido adulterados, a operação falha — o GCM deteta a alteração."

### Passo 5 — Mostrar a mensagem

> "A mensagem desencriptada é apresentada ao utilizador. O processo termina aqui."

---

## 7. Resumo técnico (≈1 min)

> "Em resumo:
> - **Criptografia:** AES-256-GCM com chave derivada por PBKDF2 (100k iterações, SHA-256). Salt e IV aleatórios por operação.
> - **Esteganografia:** método LSB nos canais RGB; marcador de fim «###END###»; conversão texto–bits em Latin-1 (8 bits por caractere).
> - **Segurança:** a password nunca é guardada; só é usada para derivar a chave. Os dados são processados localmente (browser ou aplicação), sem envio para servidores.
>
> Assim, o BitShadow permite ocultar mensagens em imagens de forma **invisível** e **segura**, com um fluxo claro desde a password até à imagem final e à recuperação da mensagem."

---

## 8. Fechar e agradecer (≈30 s)

> "Isto conclui a explicação do fluxo do BitShadow. Obrigado pela atenção. Estamos disponíveis para perguntas."

---

## Dicas para a apresentação

- **Demonstração:** Se possível, fazer uma codificação ao vivo (imagem + mensagem + password) e depois descodificar noutra aba ou noutro dispositivo, mostrando que a mensagem recuperada é a mesma.
- **Perguntas prováveis:**  
  - «Onde fica guardada a password?» — Não fica guardada; só é usada para derivar a chave e é descartada.  
  - «O que acontece se errar a password na descodificação?» — A desencriptação falha (erro ou dados inválidos).  
  - «A imagem fica diferente?» — As alterações são nos bits menos significativos; visualmente a imagem permanece praticamente igual.
