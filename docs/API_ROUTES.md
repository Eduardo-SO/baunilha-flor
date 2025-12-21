# 🔗 API e Rotas - Baunilha e Flor de Sal

## 📄 Rotas de Página (Pages)

### Públicas

| Rota | Tipo | Descrição | Componente |
|------|------|-----------|------------|
| `/` | Server Component | Landing page com hero e vitrine | `src/app/page.tsx` |
| `/produtos` | Server Component | Catálogo completo de produtos | `src/app/produtos/page.tsx` |

### Protegidas (Requer Autenticação)

| Rota | Tipo | Proteção | Descrição | Componente |
|------|------|----------|-----------|------------|
| `/admin` | Server Component | Clerk Auth + User ID | Dashboard administrativo | `src/app/admin/page.tsx` |

---

## ⚡ Server Actions

Todas as Server Actions estão em `src/app/admin/actions.ts` e são protegidas por autenticação.

### createProduct(formData: FormData)

**Descrição:** Cria um novo produto no banco de dados

**Campos do FormData:**
- `title` (string): Título do produto
- `shortDescription` (string): Descrição curta
- `description` (string): Descrição completa
- `price` (string): Preço (convertido para Decimal)
- `imageUrl` (string): URL da imagem
- `category` (string): Categoria do produto

**Validação:**
- ✅ Verifica autenticação Clerk
- ✅ Valida userId === ADMIN_USER_ID
- ✅ Valida campos obrigatórios

**Retorno:**
```typescript
{ success: true }
```

**Revalidações:**
- `/` (Landing page)
- `/produtos` (Catálogo)
- `/admin` (Dashboard)

---

### updateProduct(id: string, formData: FormData)

**Descrição:** Atualiza um produto existente

**Parâmetros:**
- `id` (string): UUID do produto
- `formData` (FormData): Mesmos campos do createProduct

**Validação:**
- ✅ Verifica autenticação Clerk
- ✅ Valida userId === ADMIN_USER_ID
- ✅ Valida campos obrigatórios
- ✅ Verifica se produto existe

**Retorno:**
```typescript
{ success: true }
```

**Revalidações:**
- `/` (Landing page)
- `/produtos` (Catálogo)
- `/admin` (Dashboard)

---

### deleteProduct(id: string)

**Descrição:** Remove um produto do banco de dados

**Parâmetros:**
- `id` (string): UUID do produto

**Validação:**
- ✅ Verifica autenticação Clerk
- ✅ Valida userId === ADMIN_USER_ID
- ✅ Verifica se produto existe

**Retorno:**
```typescript
{ success: true }
```

**Revalidações:**
- `/` (Landing page)
- `/produtos` (Catálogo)
- `/admin` (Dashboard)

---

## 🗄️ Schema do Banco de Dados

### Modelo: Product

```prisma
model Product {
  id               String   @id @default(uuid())
  title            String
  shortDescription String
  description      String   @db.Text
  price            Decimal  @db.Decimal(10, 2)
  imageUrl         String
  category         String
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt

  @@index([category])
  @@index([createdAt])
}
```

**Campos:**
- `id`: UUID gerado automaticamente
- `title`: Nome do produto (máx 255 chars)
- `shortDescription`: Descrição curta para card (máx 255 chars)
- `description`: Descrição completa (text)
- `price`: Preço com 2 casas decimais
- `imageUrl`: URL da imagem (máx 255 chars)
- `category`: Uma das categorias: Bolos, Tortas, Doces, Salgados, Especiais
- `createdAt`: Data de criação (automático)
- `updatedAt`: Data de última atualização (automático)

**Índices:**
- `category`: Para filtros rápidos
- `createdAt`: Para ordenação por data

---

## 🔒 Autenticação e Autorização

### Middleware (Clerk)

**Arquivo:** `src/middleware.ts`

**Rotas Protegidas:**
- Todas as rotas exceto `_next`, arquivos estáticos e assets públicos

**Configuração:**
```typescript
matcher: [
  '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  '/(api|trpc)(.*)',
]
```

### Verificação Admin

**Localização:** `src/app/admin/actions.ts` (função `verifyAdmin`)

**Processo:**
1. Obtém userId do Clerk via `auth()`
2. Compara com `process.env.ADMIN_USER_ID`
3. Lança erro se não autorizado

**Variável de Ambiente:**
```env
ADMIN_USER_ID="user_xxxxxxxxx"
```

---

## 📡 Integrações Externas

### WhatsApp Business

**URL Base:** `https://wa.me/`

**Número:** `5511985668978`

**Formato de Mensagem:**
```
https://wa.me/5511985668978?text=Olá!%20Tenho%20interesse%20no%20produto%20[NOME]
```

**Componente:** `src/components/product-modal.tsx`

**Função de Geração:**
```typescript
const whatsappMessage = encodeURIComponent(
  `Olá! Tenho interesse no produto ${product.title}`
);
const whatsappUrl = `https://wa.me/5511985668978?text=${whatsappMessage}`;
```

---

## 🎨 Componentes UI (shadcn/ui)

### Utilizados no Projeto

| Componente | Localização | Uso |
|------------|-------------|-----|
| `Button` | `src/components/ui/button.tsx` | Botões do site |
| `Card` | `src/components/ui/card.tsx` | Cards de produto |
| `Dialog` | `src/components/ui/dialog.tsx` | Modais |
| `Input` | `src/components/ui/input.tsx` | Campos de texto |
| `Textarea` | `src/components/ui/textarea.tsx` | Campos de texto longo |
| `Label` | `src/components/ui/label.tsx` | Labels de formulário |
| `Form` | `src/components/ui/form.tsx` | Formulários |

---

## 🔄 Fluxo de Dados

### Leitura de Dados (Read)

```
Landing Page (/)
    ↓
Server Component
    ↓
prisma.product.findMany({ take: 6, orderBy: { createdAt: 'desc' } })
    ↓
PostgreSQL (Neon)
    ↓
Renderiza ProductCard para cada produto
```

### Criação de Produto (Create)

```
Admin Dashboard
    ↓
Clique "Novo Produto"
    ↓
AdminProductForm (Dialog)
    ↓
Preenche formulário
    ↓
Submit → createProduct(formData)
    ↓
Verifica autenticação
    ↓
prisma.product.create({ data })
    ↓
PostgreSQL (Neon)
    ↓
revalidatePath('/', '/produtos', '/admin')
    ↓
Cache do Next.js atualizado
    ↓
UI atualizada automaticamente
```

### Filtro por Categoria

```
Página Produtos
    ↓
produtos-client.tsx (Client Component)
    ↓
useState: selectedCategory
    ↓
useEffect: filtra produtos localmente
    ↓
Renderiza apenas produtos da categoria selecionada
```

---

## 🌐 Variáveis de Ambiente

### Obrigatórias

| Variável | Tipo | Descrição | Exemplo |
|----------|------|-----------|---------|
| `DATABASE_URL` | string | Connection string PostgreSQL | `postgresql://user:pass@...` |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | string | Chave pública Clerk | `pk_test_...` |
| `CLERK_SECRET_KEY` | string | Chave secreta Clerk | `sk_test_...` |
| `ADMIN_USER_ID` | string | User ID do admin | `user_xxxxxxxxx` |

### Opcionais

Nenhuma no momento.

---

## 📊 Queries do Prisma Utilizadas

### Listar Produtos em Destaque (Landing)

```typescript
await prisma.product.findMany({
  take: 6,
  orderBy: {
    createdAt: 'desc',
  },
});
```

### Listar Todos os Produtos (Catálogo)

```typescript
await prisma.product.findMany({
  orderBy: {
    createdAt: 'desc',
  },
});
```

### Listar Produtos (Admin)

```typescript
await prisma.product.findMany({
  orderBy: {
    createdAt: 'desc',
  },
});
```

### Criar Produto

```typescript
await prisma.product.create({
  data: {
    title,
    shortDescription,
    description,
    price: parseFloat(price),
    imageUrl,
    category,
  },
});
```

### Atualizar Produto

```typescript
await prisma.product.update({
  where: { id },
  data: {
    title,
    shortDescription,
    description,
    price: parseFloat(price),
    imageUrl,
    category,
  },
});
```

### Deletar Produto

```typescript
await prisma.product.delete({
  where: { id },
});
```

---

## 🎯 Performance e Otimizações

### Cache do Next.js

- ✅ Server Components são cached por padrão
- ✅ `revalidatePath()` limpa cache após mutações
- ✅ Fetch de dados no servidor (sem waterfalls)

### Imagens

- ✅ Uso de `next/image` para otimização automática
- ✅ Lazy loading padrão
- ✅ Placeholder blur (pode ser adicionado)

### Banco de Dados

- ✅ Índices em `category` e `createdAt`
- ✅ Connection pooling via pg adapter
- ✅ Singleton do PrismaClient

---

## 🔐 Segurança

### Implementado

- ✅ Autenticação via Clerk
- ✅ Middleware protege todas as rotas
- ✅ Verificação de User ID nas Server Actions
- ✅ Validação de dados nos formulários
- ✅ HTTPS obrigatório em produção (via Vercel)
- ✅ Variáveis de ambiente não expostas ao cliente

### Recomendações Adicionais

- 🔲 Rate limiting (pode usar Vercel Edge Config)
- 🔲 CORS configurado se usar API routes
- 🔲 Sanitização de inputs (HTML)
- 🔲 CSP (Content Security Policy)
