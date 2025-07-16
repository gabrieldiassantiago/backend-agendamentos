# Estudos TypeScript - API de Autenticação

## 📋 Descrição

Esta é uma API REST desenvolvida em TypeScript com Express.js para estudos e prática de desenvolvimento backend. O projeto implementa um sistema de autenticação completo com registro e login de usuários, utilizando JWT para autenticação e bcrypt para hash de senhas.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Express.js** - Framework web para Node.js
- **Prisma** - ORM moderno para TypeScript e Node.js
- **SQLite** - Banco de dados SQL leve
- **JWT** - JSON Web Tokens para autenticação
- **bcryptjs** - Biblioteca para hash de senhas
- **Jest** - Framework de testes
- **ts-node-dev** - Desenvolvimento com hot reload

## 📁 Estrutura do Projeto

```
src/
├── controllers/          # Controladores da API
│   └── AuthController.ts
├── services/            # Lógica de negócio
│   └── authService.ts
├── repositories/        # Camada de acesso a dados
│   └── authRepository.ts
├── routes/             # Definição das rotas
│   └── authRoutes.ts
├── prisma/             # Cliente Prisma
│   └── client.ts
├── generated/          # Código gerado pelo Prisma
└── index.ts           # Ponto de entrada da aplicação

prisma/
├── schema.prisma       # Schema do banco de dados
├── migrations/         # Migrações do banco
└── dev.db             # Banco de dados SQLite

tests/
└── AuthService.test.ts # Testes unitários //em andamento
```

## 🛠️ Configuração do Ambiente

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

1. **Clone o repositório:**
```bash
git clone https://github.com/gabrieldiassantiago/backend-agendamentos
cd estudos-typescript
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**
   
   Crie um arquivo `.env` na raiz do projeto:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="seu-jwt-secret-aqui"
```

4. **Execute as migrações do banco de dados:**
```bash
npx prisma migrate dev
```

5. **Gere o cliente Prisma:**
```bash
npx prisma generate
```

## 🏃‍♂️ Executando a Aplicação

### Desenvolvimento
```bash
npm run dev
```

### Modo Debug
```bash
npm run debug
```

### Executar Testes
```bash
npm test
```

A aplicação estará disponível em `http://localhost:3000`

## 📚 Documentação da API

### Autenticação

#### Registro de Usuário
```http
POST /auth/register
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123"
}
```

**Resposta de sucesso (201):**
```json
{
  "id": "uuid-do-usuario",
  "name": "João Silva",
  "email": "joao@email.com"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "joao@email.com",
  "password": "senha123"
}
```

**Resposta de sucesso (200):**
```json
{
  "token": "jwt-token-aqui"
}
```

### Códigos de Status

| Código | Significado |
|--------|-------------|
| 200    | Sucesso |
| 201    | Criado com sucesso |
| 400    | Erro na requisição |
| 401    | Não autorizado |
| 409    | Conflito (email já existe) |
| 500    | Erro interno do servidor |

## 🗄️ Banco de Dados

### Modelo de Dados

#### User
```prisma
model User {
  id       String  @id @default(uuid())
  email    String  @unique
  name     String
  password String
  agendamentos Agendamento[]
}
```

#### Agendamento
```prisma
model Agendamento {
  id        Int      @id @default(autoincrement())
  userName  String
  date      DateTime
  createdAt DateTime @default(now())
  User      User?    @relation(fields: [userId], references: [id])
  userId    String?
}
```

### Gerenciamento do Banco

```bash
# Visualizar dados no Prisma Studio
npx prisma studio

# Resetar banco de dados
npx prisma migrate reset

# Aplicar migrações
npx prisma migrate dev

# Gerar cliente Prisma
npx prisma generate
```

## 📝 Arquitetura

O projeto segue uma arquitetura em camadas:

1. **Controller** - Recebe requisições HTTP e retorna respostas
2. **Service** - Contém a lógica de negócio
3. **Repository** - Responsável pelo acesso aos dados
4. **Model** - Definição dos tipos e entidades

### Fluxo de Dados

```
HTTP Request → Controller → Service → Repository → Database
                    ↓
HTTP Response ←─────────────────────────────────────────
```

## 🔒 Segurança

- **Hash de senhas** com bcryptjs
- **Autenticação JWT** para proteção de rotas
- **Validação de entrada** nos controladores
- **Variáveis de ambiente** para dados sensíveis

## 🚀 Deploy

### Variáveis de Ambiente para Produção

```env
DATABASE_URL="sua-url-do-banco-de-producao"
JWT_SECRET="jwt-secret-forte-para-producao"
PORT=3000
NODE_ENV=production
```

### Build para Produção

```bash
# Compilar TypeScript
npx tsc

# Executar migrações
npx prisma migrate deploy

# Gerar cliente Prisma
npx prisma generate
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.

## 📞 Contato

Para dúvidas ou sugestões, entre em contato através do GitHub.

---

**Desenvolvido com ❤️ para estudos em TypeScript**
