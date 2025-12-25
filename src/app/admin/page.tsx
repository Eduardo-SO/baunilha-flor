import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { SignIn } from '@clerk/nextjs'
import prisma from '@/lib/prisma'
import AdminDashboard from './admin-dashboard'
import type { Product as PrismaProduct } from '@prisma/client'
import { isAdmin } from '@/lib/admin-utils'

export default async function AdminPage() {
  const { userId } = await auth()

  // Se não tiver userId, mostrar página de login
  if (!userId) {
    return (
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center pb-12 pt-36">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
              Acesso Administrativo
            </h1>
            <p className="text-muted-foreground">
              Faça login para acessar o painel administrativo
            </p>
          </div>
          <SignIn
            routing="path"
            path="/admin"
            afterSignInUrl="/admin"
            appearance={{
              elements: {
                rootBox: 'mx-auto',
                card: 'bg-card border-border',
              },
            }}
          />
        </div>
      </div>
    )
  }

  // Se tiver userId mas não for admin, redirecionar
  if (!isAdmin(userId)) {
    redirect('/')
  }

  // Se for admin, mostrar dashboard
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  const serializedProducts = products.map((product: PrismaProduct) => ({
    ...product,
    price: product.price.toString(),
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  }))

  return <AdminDashboard products={serializedProducts} />
}
