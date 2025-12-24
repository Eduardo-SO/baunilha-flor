import prisma from '@/lib/prisma'
import ProdutosClient from './produtos-client'
import type { Product as PrismaProduct } from '@prisma/client'

export default async function ProdutosPage() {
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

  return <ProdutosClient initialProducts={serializedProducts} />
}
