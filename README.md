# ToFood Auth Lambda

Projeto para autenticação e identificação de usuários usando AWS Lambda, AWS Cognito, MongoDB, e TypeScript. Baseado em arquitetura limpa para garantir a manutenibilidade e escalabilidade.

## Índice

- [Visão Geral](#visão-geral)
- [Arquitetura do Projeto](#arquitetura-do-projeto)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Instalação](#instalação)
- [Rodando o Projeto](#rodando-o-projeto)
- [Testes](#testes)
- [Exemplos de Uso da API](#exemplos-de-uso-da-api)
- [Pipeline CI/CD](#pipeline-cicd)

## Visão Geral

Este projeto implementa um sistema de autenticação utilizando AWS Lambda e Cognito para gerenciar usuários baseados no CPF. As funcionalidades principais incluem:

- **Identificação do Usuário pelo CPF**.
- **Autenticação do Usuário** via token JWT gerado após a identificação.
- **Armazenamento de Usuários** utilizando o MongoDB com o ORM Mongoose.
- **Testes Automatizados** com Jest para garantir a qualidade do código.

## Arquitetura do Projeto

O projeto utiliza **Clean Architecture** para facilitar a manutenção e o desenvolvimento futuro. A estrutura de pastas é organizada conforme a responsabilidade de cada módulo:

```bash
-auth-clean/
  ├── src/
  │     ├── core/
  │     │     ├── entities/
  │     │     │     └── User.ts
  │     │     └── interfaces/
  │     │           ├── IUserRepository.ts
  │     │           └── IAuthService.ts
  │     ├── application/
  │     │     ├── use-cases/
  │     │     │     └── IdentifyUserUseCase.ts
  │     ├── infrastructure/
  │     │     ├── repositories/
  │     │     │     └── UserRepository.ts
  │     │     ├── services/
  │     │     │     └── CognitoAuthService.ts
  │     │     ├── database/
  │     │     │     └── db.ts
  │     │     └── models/
  │     │           └── UserModel.ts
  │     ├── adapters/
  │     │     └── controllers/
  │     │           └── UserController.ts
  │     └── tests/
  │           └── User.test.ts
  ├── .env
  ├── package.json
  ├── tsconfig.json
  └── README.md
```

## Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

```env
PORT=3000
DB_USER=seu_usuario_mongodb
DB_PASSWORD=sua_senha_mongodb
DB_HOST=seu_host_mongodb
DB_NAME=seu_nome_do_banco
JWT_SECRET=sua_chave_secreta_jwt
PORT: Porta na qual a API será exposta.
JWT_SECRET: Uma chave secreta usada para assinar os tokens JWT.
```

Instalação Para configurar o ambiente local e rodar o projeto, siga as instruções abaixo.

Clone o Repositório:

sh```

git clone https://github.com/tofood/tofood-auth-.git
cd tofood-auth


Instale as Dependências:

npm install
Compile o TypeScript:

npm run build
Rodando o Projeto
Depois de instalar as dependências e configurar o ambiente:

Para rodar o projeto em desenvolvimento:
sh

npm run dev
Isso iniciará o servidor Express na porta definida no arquivo .env (por padrão, porta 3000).

Para iniciar em modo de produção:
sh

npm run start
Testes
Este projeto utiliza o Jest para os testes unitários. Para garantir a qualidade do código e o funcionamento correto dos casos de uso:

Rodar os Testes:
sh´´

npm run test
Local dos Testes:
Os testes estão localizados em src/tests. O arquivo de teste principal é o User.test.ts, que verifica as funcionalidades de identificação e autenticação.

Exemplo de Teste Incluído
Os testes cobrem:

# Verificação do usuário pelo CPF.
# Geração e validação do token JWT.
Tratamento de erros para CPFs não fornecidos ou não encontrados.
Exemplos de Uso da API
Identificação de Usuário
Endpoint: /identify/:cpf
Método: GET
Descrição: Identifica um usuário baseado no CPF e retorna um token JWT se encontrado.
Exemplo de Requisição:
sh

curl -X GET http://localhost:3000/identify/12345678901
Exemplos de Respostas:
200 OK:

json
{
  "message": "Cliente Identificado",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
404 Not Found:

json
{
  "message": "Cliente não localizado"
}
400 Bad Request (CPF ausente):

json
{
  "message": "CPF is required"
}

# Pipeline CI/CD
Este projeto possui um pipeline CI/CD automatizado utilizando GitHub Actions. O pipeline é acionado em cada push ou pull request para a branch principal (main). Ele realiza:
```
