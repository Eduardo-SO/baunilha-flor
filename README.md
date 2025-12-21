# 🍰 Baunilha e Flor de Sal - Confeitaria Artesanal

Site de confeitaria artesanal construído com Next.js 16.1, com catálogo de produtos, área administrativa e integração com WhatsApp.

## 🛠 Stack Tecnológica

- **Framework:** Next.js 16.1.0 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS + shadcn/ui
- **Banco de Dados:** PostgreSQL (Neon) via Prisma ORM
- **Autenticação:** Clerk
- **Hospedagem de Imagens:** Recomendado usar Cloudinary ou similar

## ✨ Funcionalidades

### Páginas Públicas
- **Landing Page** com hero section e produtos em destaque
- **Catálogo de Produtos** com filtro por categoria
- **Modal de Detalhes** com botão de contato via WhatsApp
- Design responsivo e acessível

### Área Administrativa (`/admin`)
- Dashboard protegido por autenticação Clerk
- CRUD completo de produtos (Criar, Editar, Deletar)
- Upload de informações via formulário
- Revalidação automática de cache após alterações

### Categorias de Produtos
- Bolos
- Tortas
- Doces
- Salgados
- Especiais

## 🚀 Configuração do Projeto

### 1. Clone o Repositório

```bash
git clone <seu-repositorio>
cd baunilha-flor
```

### 2. Instale as Dependências

```bash
pnpm install
```

### 3. Configure o Banco de Dados (Neon)

1. Acesse [Neon](https://neon.tech) e crie uma conta
2. Crie um novo projeto PostgreSQL
3. Copie a connection string fornecida

A connection string terá o formato:
```
postgresql://user:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require
```

### 4. Configure a Autenticação (Clerk)

1. Acesse [Clerk Dashboard](https://dashboard.clerk.com)
2. Crie uma nova aplicação
3. Nas configurações, copie suas chaves:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
4. Após criar sua conta de usuário, copie seu User ID (formato: `user_xxxxxxxxxxxxx`)

### 5. Configure as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Database
DATABASE_URL="sua-connection-string-do-neon"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_xxxxxxxxxxxxx"
CLERK_SECRET_KEY="sk_test_xxxxxxxxxxxxx"

# Admin User ID
ADMIN_USER_ID="user_xxxxxxxxx"
```

⚠️ **IMPORTANTE:** Substitua `ADMIN_USER_ID` pelo seu próprio User ID do Clerk.

### 6. Configure o Prisma

```bash
# Gerar o Prisma Client
pnpm prisma generate

# Criar as tabelas no banco de dados
pnpm prisma db push
```

### 7. Execute o Projeto em Desenvolvimento

```bash
pnpm dev
```

O site estará disponível em `http://localhost:3000`

## 📁 Estrutura de Arquivos

```
src/
├── app/
│   ├── layout.tsx              # Layout raiz com ClerkProvider
│   ├── page.tsx                # Landing Page
│   ├── produtos/
│   │   ├── page.tsx            # Página de produtos (Server Component)
│   │   └── produtos-client.tsx # Cliente com filtros
│   └── admin/
│       ├── page.tsx            # Dashboard admin (protegido)
│       ├── admin-dashboard.tsx # UI do dashboard
│       └── actions.ts          # Server Actions (CRUD)
├── components/
│   ├── header.tsx              # Cabeçalho do site
│   ├── footer.tsx              # Rodapé do site
│   ├── product-card.tsx        # Card de produto
│   ├── product-modal.tsx       # Modal com detalhes
│   └── admin-product-form.tsx  # Formulário de produto
├── lib/
│   ├── prisma.ts               # Singleton do Prisma
│   └── utils.ts                # Utilitários (cn, formatPrice)
└── middleware.ts               # Middleware do Clerk

prisma/
└── schema.prisma               # Schema do banco de dados
```

## 🎨 Personalização de Cores

O projeto utiliza variáveis CSS do shadcn/ui definidas em `src/app/globals.css`. Para personalizar as cores, edite as variáveis CSS no arquivo:

- `--primary`: Cor principal
- `--secondary`: Cor secundária
- `--accent`: Cor de destaque
- `--background`: Fundo
- `--foreground`: Texto

## 🔒 Acesso Administrativo

Para acessar a área administrativa:

1. Certifique-se de estar autenticado via Clerk
2. Seu User ID deve corresponder ao definido em `ADMIN_USER_ID`
3. Acesse `/admin`

Se não for o usuário admin, será redirecionado para a home.

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev

# Build de produção
pnpm build

# Iniciar servidor de produção
pnpm start

# Lint
pnpm lint

# Prisma Studio (interface visual do banco)
pnpm prisma studio

# Gerar tipos do Prisma
pnpm prisma generate

# Aplicar mudanças no schema ao banco
pnpm prisma db push

# Criar migration
pnpm prisma migrate dev
```

## 🌐 Deploy

### Vercel (Recomendado)

1. Faça push do código para GitHub
2. Importe o projeto na [Vercel](https://vercel.com)
3. Configure as variáveis de ambiente
4. Deploy automático!

### Outras Plataformas

O projeto é compatível com qualquer plataforma que suporte Next.js 16:
- Netlify
- Railway
- Render
- AWS Amplify

## 📸 Hospedagem de Imagens

Para produção, recomendamos usar um serviço de hospedagem de imagens:

- [Cloudinary](https://cloudinary.com) - Plano gratuito disponível
- [Uploadcare](https://uploadcare.com)
- [ImageKit](https://imagekit.io)

## 🔧 Comandos Úteis do Prisma

```bash
# Ver dados no Prisma Studio
pnpm prisma studio

# Resetar banco de dados (CUIDADO!)
pnpm prisma db push --force-reset

# Ver logs de queries
# Adicione isso ao schema.prisma:
# generator client {
#   provider = "prisma-client-js"
#   log      = ["query"]
# }
```

## 📝 Adicionando Produtos

1. Acesse `/admin` (após autenticação)
2. Clique em "Novo Produto"
3. Preencha os campos:
   - **Título:** Nome do produto
   - **Descrição Curta:** Aparece no card
   - **Descrição Completa:** Aparece no modal
   - **Preço:** Valor em reais
   - **URL da Imagem:** Link da imagem hospedada
   - **Categoria:** Selecione uma das 5 categorias
4. Clique em "Criar Produto"

## 🐛 Troubleshooting

### Erro de conexão com banco de dados
- Verifique se a `DATABASE_URL` está correta
- Certifique-se de que o Neon está ativo

### Erro de autenticação
- Verifique se as chaves do Clerk estão corretas
- Certifique-se de que o `ADMIN_USER_ID` corresponde ao seu usuário

### Erro ao carregar imagens
- Verifique se as URLs das imagens são válidas e acessíveis
- Configure domínios permitidos em `next.config.ts` se necessário

## 📄 Licença

Este projeto é de uso privado para a confeitaria Baunilha e Flor de Sal.
