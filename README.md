# URL Shortener 2.0 – NestJS e Docker

Este projeto é uma aplicação de encurtamento de URLs construída utilizando o framework NestJS. Os serviços são organizados em três domínios principais:

- **Auth**: Autenticação e geração de tokens
- **Users**: Gerenciamento de usuários
- **URL Shortener**: Criação e redirecionamento de URLs encurtadas

A aplicação pode ser executada localmente com Node.js e Yarn, ou em ambiente isolado com Docker e Docker Compose. Além de trazer uma documentação completa sobre os endpoints e seus dados necessários para funcionamento perfeito.

---

## Clonando o repositório

Antes de qualquer coisa, é necessário ter o Git instalado para clonar o projeto.  
Você pode instalar o Git seguindo as instruções oficiais:

- [Instalar Git no Windows](https://git-scm.com/download/win)
- [Instalar Git no macOS](https://git-scm.com/download/mac)
- [Instalar Git no Linux](https://git-scm.com/download/linux)

Clone o repositório com:

```bash
git clone https://github.com/vinicius-of/nestjs_url_shortener_2
cd nestjs_url_shortener_2
```

## 1. Executando localmente com Node.js, Yarn e NestJS

Este projeto pode ser executado localmente utilizando Node.js, Yarn e o NestJS CLI. Essa abordagem é ideal para desenvolvimento ativo, testes e depuração.

### Requisitos

Para rodar o projeto localmente, você precisará ter as seguintes ferramentas instaladas:

- Node.js versão **>= 22.17.0**
- Yarn
- NestJS CLI
- Git

Recomenda-se o uso do NVM (Node Version Manager) para gerenciar múltiplas versões do Node.js no seu sistema.

### Instalação das ferramentas

Você pode instalar as ferramentas necessárias utilizando os links abaixo:

- [Instalar Node.js](https://nodejs.org/en/download)
- [Instalar Yarn](https://chore-update--yarnpkg.netlify.app/pt-BR/docs/install)
- [Instalar NestJS CLI](https://docs.nestjs.com/cli/overview)
- [Instalar NVM (Node Version Manager)](https://github.com/nvm-sh/nvm)

Com o NVM instalado, você pode instalar a versão correta do Node.js com os comandos:

```bash
nvm install lts
nvm use lts
```

ou

```bash
nvm install 22.17.0
nvm use 22.17.0
```

Após este passo, é necessário instalar o Yarn com o NPM.

```bash
npm install -g yarn@latest
```

Após clonar o repositório e instalar o Yarn, instale todas as dependências e devDependencies com:

```bash
yarn install
```

### Configurando variáveis de ambiente

Antes de iniciar os serviços, é necessário configurar o arquivo `.env.docker` na raiz do projeto. Um exemplo de configuração mínima é:

```conf
APP_PORT=3000
BCRYPT_SALT=10
JWT_EXPIRES_IN=5m
JWT_SECRET=dev

# POSTGRESQL Database Configuration
POSTGRES_USER=user
POSTGRES_PASSWORD=159638
POSTGRES_DB=urlshortener
POSTGRES_HOST=db
POSTGRES_PORT=5432

# PGADMIN Credentials
PGADMIN_EMAIL=admin@user.com
PGADMIN_PASSWORD=159638
PGADMIN_PORT=8080

SYNCHRONIZE_DB=true
```

Esse arquivo é essencial para que os serviços funcionem corretamente somente em ambiente **local**. Caso deseje, no repositório há um arquivo chamado `.env.local.example`. Este arquivo já vem com todas as configurações para execução rápida em ambiente local. Só é necessário renomear para `.env` que estará pronto.

## 2. Executando o Docker e Docker Compose

Este projeto também pode ser executado em ambiente isolado utilizando Docker e Docker Compose. Essa abordagem é ideal para rodar a aplicação de forma padronizada, sem depender do ambiente local de desenvolvimento.

### Requisitos

Para utilizar essa abordagem, é necessário ter o Docker e o Docker Compose instalados no seu sistema. Abaixo estão os links oficiais para instalação em diferentes sistemas operacionais:

- **Windows**:
    - [Instalar Docker Desktop](https://docs.docker.com/desktop/install/windows-install/)

- **macOS**:
    - [Instalar Docker Desktop](https://docs.docker.com/desktop/install/mac-install/)

- **Ubuntu/Linux**:
    - [Instalar Docker Engine no Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
    - [Instalar Docker Compose no Linux](https://docs.docker.com/compose/install/linux/)

### Verificando a instalação

Após a instalação, abra o terminal e execute o seguinte comando para verificar se o Docker está instalado corretamente:

```bash
docker -v
docker compose --help
```

Se os comandos retornar a versão do Docker e a lista de ajuda do Docker Compose, a instalação foi concluída com sucesso.

### Executando os serviços com Docker Compose

Com o Docker instalado e estando no diretório onde encontra-se o arquivo `docker-compose.yaml`, você pode levantar todos os serviços da aplicação com o seguinte comando:

```bash
docker compose up -d
```

Esse comando faz o seguinte:

- Lê o arquivo `docker-compose.yaml` na raiz do projeto

- Constrói as imagens Docker de cada serviço (caso ainda não existam)

- Cria os containers correspondentes

- Inicia os serviços em segundo plano (modo _detached_)

Aguarde alguns segundos até que o processo de build e inicialização seja concluído.

### Verificando os serviços em execução

Para verificar se os serviços foram iniciados
corretamente, execute:

```bash
docker compose ps
```

Esse comando lista todos os containers em execução, suas portas expostas e o status atual de cada serviço.

## Levantando serviços

Finalmente, agora é só executar o comando abaixo:

```bash
./docker-compose-run.sh
```

## 3. Testando os Endpoints da Aplicação

Após levantar os serviços, você pode testar os endpoints expostos por cada um dos microsserviços: usuários, autenticação e encurtamento de URLs.

Algumas rotas exigem autenticação via token JWT. Para essas rotas, é necessário primeiro realizar o login e obter um token válido, que deve ser incluído no cabeçalho como o nome do campo `Authorization` das requisições subsequentes e adicionar ao valor o prefixo `Bearer`.

### Exemplo de chamada para encurtar uma URL

![info]

> Primeiramente é necessário subir o serviço de Encurtamento de URLs para o funcionamento. Caso contrário, não funcionará.

A rota `(host):(porta)/shorten` permite criar uma URL encurtada a partir de uma URL completa. Abaixo estão exemplos de como fazer essa requisição usando `curl` e `wget`. Este endpoint não é necessário autenticação para uso.

#### Usando `curl`

```bash
curl --request POST \
  --url http://localhost:3000/urls/shorten \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/11.2.0' \
  --data '{
    "fullUrl": "http://youtube.com"
}'
```

#### Usando `wget`

```bash
wget --quiet \
  --method POST \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/11.2.0' \
  --body-data '{\n  "fullUrl": "http://youtube.com"\n}' \
  --output-document \
  - http://localhost:3000/urls/shorten
```

### Endpoints protegidos com JWT

Alguns endpoints exigem autenticação. Para acessá-los:

1. Crie um usuário através do serviço de autenticação (/auth/signup)

2. Faça login através do serviço de autenticação (/auth/login)

3. Copie o token JWT retornado.

4. Inclua o token no cabeçalho das requisições protegidas:

```http
Authorization: Bearer <seu_token_aqui>
```

Certifique-se de substituir `<seu_token_aqui>` pelo token real obtido na resposta do login.

Com isso, você poderá testar todos os endpoints da aplicação, incluindo aqueles que exigem autenticação.

## 5. Possíveis melhorias para o projeto

Este projeto pode ser expandido e aprimorado com diversas melhorias técnicas e operacionais. Abaixo estão algumas sugestões que podem ser implementadas para torná-lo mais robusto, escalável e observável.

### Implementar GitHub Actions

A integração de pipelines de CI/CD com GitHub Actions permitiria automatizar tarefas como testes, linting, build e deploy. Isso garantiria maior consistência no processo de desenvolvimento e ajudaria a detectar falhas antes da publicação de código.

### Métricas e observabilidade

Adicionar ferramentas de observabilidade é fundamental para entender o comportamento da aplicação em produção. Isso inclui:

- Logs estruturados com ferramentas como Winston ou Pino
- Métricas de desempenho com Prometheus e Grafana
- Rastreamento distribuído com OpenTelemetry ou Jaeger

Esses recursos ajudam a identificar gargalos, falhas e padrões de uso.
