# Documentação do Projeto Frontend de Streaming de Vídeo

Este projeto é uma aplicação web de streaming de vídeo que permite o upload de vídeos, conversão para o formato HLS (HTTP Live Streaming) e reprodução dos vídeos em um player compatível. A aplicação foi desenvolvida usando Next.js, Tailwind CSS, TypeScript, e integra uma API backend para processamento de vídeos.

## Estrutura do Projeto

### Diretórios e Arquivos

- **layout.tsx**: Define o layout principal da aplicação, incluindo a configuração de fontes e o componente Toaster para notificações.
- **page.tsx (Home)**: Página principal onde os usuários podem fazer upload de vídeos.
- **page.tsx (Videos)**: Página onde os vídeos são listados e reproduzidos.
- **components/**: Contém componentes reutilizáveis, como Header, Card, Input, Button, etc.
- **hooks/**: Contém hooks personalizados, como useToast para exibir notificações.
- **public/**: Diretório para arquivos estáticos, como imagens e ícones.
- **styles/**: Contém arquivos de estilo globais e específicos.

## Funcionamento do Projeto

### 1. Upload de Vídeo

1. O usuário acessa a página inicial e faz o upload de um vídeo através de um formulário.
2. O vídeo é enviado para a API backend, que converte o vídeo para o formato HLS e armazena os segmentos no diretório `stream/`.
3. Os metadados do vídeo (título, descrição e caminho do arquivo) são armazenados no banco de dados.

### 2. Reprodução de Vídeo

1. Na página de vídeos, o usuário pode ver uma lista de todos os vídeos carregados.
2. Ao selecionar um vídeo, o player de vídeo é configurado para reproduzir o arquivo HLS usando a biblioteca `hls.js`.
3. O vídeo é reproduzido em tempo real, com suporte para qualidade adaptativa.

## Como Executar o Projeto

### Pré-requisitos

- Node.js instalado.
- API backend configurada e em execução (para upload e conversão de vídeos).

### Passos para Execução

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:

   Crie um arquivo `.env` na raiz do projeto e adicione as variáveis necessárias (ex.: URL da API backend).

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

5. Acesse a aplicação em [http://localhost:3000](http://localhost:3000).

## Endpoints da API

### **POST /upload**

- **Descrição**: Faz o upload de um vídeo e converte para HLS.
- **Corpo da Requisição**:
  ```json
  {
    "file": "Arquivo de vídeo (multipart/form-data)",
    "title": "Título do vídeo",
    "description": "Descrição do vídeo"
  }
  ```
- **Resposta**:
  ```json
  {
    "message": "Video uploaded and converted successfully",
    "videoId": 1,
    "streamPath": "stream_12345/output_12345.m3u8"
  }
  ```

### **GET /videos**

- **Descrição**: Retorna a lista de vídeos cadastrados.
- **Resposta**:
  ```json
  [
    {
      "id": 1,
      "title": "Meu Vídeo",
      "description": "Descrição do vídeo",
      "file_path": "stream_12345/output_12345.m3u8",
      "uploaded_at": "2023-10-01T12:00:00.000Z"
    }
  ]
  ```

## Estrutura de Diretórios

Aqui está a estrutura de diretórios do projeto:

```
/projeto
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx (Home)
│   ├── page.tsx (Videos)
│   └── ...
├── components/
│   ├── Header/
│   ├── ui/
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── button.tsx
│   │   └── ...
├── hooks/
│   └── use-toast.ts
├── lib/
├── node_modules/
├── public/
│   └── images/
│       └── diagrama-fluxo.png
├── .gitignore
├── components.json
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

---


