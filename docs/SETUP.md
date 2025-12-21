# 📋 Instruções de Setup - Baunilha e Flor de Sal

## 🔧 Configuração Completa Passo a Passo

### 1. Configurar Banco de Dados Neon

#### 1.1 Criar Conta no Neon
1. Acesse https://neon.tech
2. Clique em "Sign Up" e crie sua conta (pode usar GitHub)
3. Após login, clique em "Create a project"

#### 1.2 Configurar Projeto
1. **Project Name:** baunilha-flor (ou o nome que preferir)
2. **PostgreSQL Version:** Selecione a mais recente (16+)
3. **Region:** Selecione a região mais próxima (ex: São Paulo)
4. Clique em "Create Project"

#### 1.3 Copiar Connection String
1. Na página do projeto, vá para **Dashboard**
2. Em "Connection Details", você verá a connection string
3. Copie a string completa que começa com `postgresql://`
4. Exemplo: `postgresql://user:password@ep-xxx-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require`

### 2. Configurar Autenticação Clerk

#### 2.1 Criar Aplicação Clerk
1. Acesse https://dashboard.clerk.com
2. Clique em "Add Application"
3. **Application Name:** Baunilha e Flor
4. **Choose Sign-in Options:** Email + Password (ou Google/GitHub)
5. Clique em "Create Application"

#### 2.2 Copiar Chaves de API
1. No dashboard, vá para **API Keys**
2. Copie as duas chaves:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (começa com `pk_test_`)
   - `CLERK_SECRET_KEY` (começa com `sk_test_`)

#### 2.3 Criar Usuário Admin
1. No Clerk Dashboard, vá para **Users**
2. Clique em "Create User"
3. Preencha email e senha
4. Após criar, clique no usuário
5. Copie o **User ID** (começa com `user_xxxxxxxxx`)

### 3. Configurar Variáveis de Ambiente

Crie o arquivo `.env` na raiz do projeto com o conteúdo:

```env
# Database (Cole a connection string do Neon aqui)
DATABASE_URL="postgresql://user:password@ep-xxx-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require"

# Clerk Authentication (Cole as chaves do Clerk aqui)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
CLERK_SECRET_KEY="sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# Admin User ID (Cole o User ID do Clerk aqui)
ADMIN_USER_ID="user_xxxxxxxxxxxxxxxxxxxxx"
```

### 4. Instalar Dependências e Configurar Banco

```bash
# Instalar todas as dependências
pnpm install

# Gerar o Prisma Client
pnpm prisma generate

# Criar as tabelas no banco de dados
pnpm prisma db push

# (Opcional) Abrir interface visual do banco
pnpm prisma studio
```

### 5. Executar Projeto

```bash
# Modo desenvolvimento
pnpm dev
```

Acesse: `http://localhost:3000`

### 6. Testar o Sistema

#### 6.1 Testar Autenticação
1. Acesse http://localhost:3000
2. Clique no ícone de usuário no header
3. Faça login com as credenciais do Clerk

#### 6.2 Acessar Admin
1. Após autenticar, acesse http://localhost:3000/admin
2. Se seu User ID estiver correto, verá o dashboard admin
3. Se não tiver acesso, verifique se o `ADMIN_USER_ID` está correto

#### 6.3 Criar Primeiro Produto
1. No admin, clique em "Novo Produto"
2. Preencha os campos:
   - **Título:** Bolo de Chocolate Belga
   - **Descrição Curta:** Bolo úmido com cobertura de chocolate
   - **Descrição Completa:** Delicioso bolo feito com chocolate belga 70% cacau...
   - **Preço:** 85.00
   - **URL da Imagem:** (use uma URL de teste, ex: https://images.unsplash.com/photo-1578985545062-69928b1d9587)
   - **Categoria:** Bolos
3. Clique em "Criar Produto"

### 7. Hospedagem de Imagens

Para produção, recomendo usar um serviço de hospedagem de imagens:

#### Opção 1: Cloudinary (Recomendado)
1. Acesse https://cloudinary.com
2. Crie conta gratuita
3. Faça upload das imagens
4. Copie as URLs geradas

#### Opção 2: Unsplash (Para testes)
- Use https://unsplash.com para imagens de teste
- Clique direito na imagem > Copiar endereço da imagem

#### Opção 3: ImgBB
1. Acesse https://imgbb.com
2. Faça upload (sem necessidade de conta)
3. Copie o link direto

### 8. Solução de Problemas

#### Erro: "Cannot connect to database"
- Verifique se a `DATABASE_URL` está correta
- Teste a conexão no Prisma Studio: `pnpm prisma studio`
- Certifique-se que o projeto Neon está ativo

#### Erro: "Unauthorized" ao acessar /admin
- Verifique se está autenticado no Clerk
- Confirme que o `ADMIN_USER_ID` corresponde ao seu User ID
- Para ver seu User ID atual, adicione um `console.log(userId)` temporário no `/admin/page.tsx`

#### Erro: "Module not found"
- Execute `pnpm install` novamente
- Execute `pnpm prisma generate`
- Reinicie o servidor dev

#### Imagens não carregam
- Verifique se as URLs são acessíveis
- Se usar domínio externo, configure no `next.config.ts`:

```typescript
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};
```

### 9. Deploy na Vercel

1. Faça push do código para GitHub
2. Acesse https://vercel.com e faça login
3. Clique em "Add New Project"
4. Importe seu repositório
5. Configure as variáveis de ambiente (mesmas do `.env`)
6. Deploy!

**Importante:** Não commite o arquivo `.env` (já está no .gitignore)

### 10. Próximos Passos

- [x] Adicionar mais produtos via admin
- [x] Testar filtros de categoria na página de produtos
- [x] Testar botão WhatsApp
- [x] Personalizar cores em `src/app/globals.css`
- [x] Adicionar logo personalizada
- [ ] Configurar domínio personalizado na Vercel

