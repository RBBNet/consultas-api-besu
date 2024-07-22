
# Consultas API Besu 🌐

Este repositório contém uma coleção de scripts para interação com o Hyperledger Besu utilizando chamadas JSON-RPC para obtenção de métricas dos nós.

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn para gerenciar as dependências
- Acesso a uma instância de Hyperledger Besu

## ⚙️ Configuração

Primeiro, clone o repositório e instale as dependências necessárias:

```bash
git clone https://github.com/RBBNet/consultas-api-besu
cd consultas-api-besu
npm install
```

## 🗂 Estrutura de Arquivos

### 📄 Scripts Node.js

- **adminPeers.js**: Script para recuperar e exibir informações sobre os peers conectados entre si na blockchain.
- **getSignerMetrics.js**: Script para coletar métricas dos validadores da rede, como validadores ativos e blocos produzidos por eles.

### 🧰 Core Module

- **core.js**: Contém as funções essenciais para a execução de chamadas RPC, leitura de arquivos de configuração e processamento de dados retornados.

### 📝 Arquivos de Configuração

- **localnodes.conf**: Lista de pontos de acesso dos nós locais, como endereços e portas, usada para a conexão.
- **enodes.md**: Descrição detalhada dos enodes. É este arquivo que possibilita a tradução das hashes para nomes das instituições de modo que sejam fáceis de identificar.

### 🚀 Scripts de Automatização

- **auto.bat**: Script batch para que a consulta seja executada em loop, até ser interrompida (Windows).
- **nodes.json_downloader.bat**: Faz o download do arquivo `nodes.json`. É necessário que sua do github esteja conectada no CMD (Apenas para membros da RBB)

## 🚀 Uso

Para executar qualquer um dos scripts Node.js, utilize:

```bash
node <nome-do-script>.js
```

Por exemplo, para obter informações de conexão entre os peers:

```bash
node adminPeers.js
```

Para iniciar as tarefas automatizadas em sistemas Windows, basta executar os scripts `.bat` diretamente.

## 🤝 Contribuições

Contribuições para melhorar o projeto são sempre bem-vindas. Sinta-se à vontade para criar um pull request ou abrir uma issue para discutir melhorias.
