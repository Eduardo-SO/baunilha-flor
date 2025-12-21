import prisma from "@/lib/prisma";
import ProdutosClient from "./produtos-client";

export default async function ProdutosPage() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  const serializedProducts = products.map((product) => ({
    ...product,
    price: product.price.toString(),
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  }));

  return <ProdutosClient initialProducts={serializedProducts} />;
}

