'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { isAdmin } from '@/lib/admin-utils'

async function verifyAdmin() {
  const { userId } = await auth()

  if (!isAdmin(userId)) {
    throw new Error('Não autorizado')
  }

  return userId
}

export async function createProduct(formData: FormData) {
  await verifyAdmin()

  const title = formData.get('title') as string
  const shortDescription = formData.get('shortDescription') as string
  const description = formData.get('description') as string
  const price = formData.get('price') as string
  const imageUrl = formData.get('imageUrl') as string
  const category = formData.get('category') as string

  if (
    !title ||
    !shortDescription ||
    !description ||
    !price ||
    !imageUrl ||
    !category
  ) {
    throw new Error('Todos os campos são obrigatórios')
  }

  await prisma.product.create({
    data: {
      title,
      shortDescription,
      description,
      price: parseFloat(price),
      imageUrl,
      category,
    },
  })

  revalidatePath('/')
  revalidatePath('/produtos')
  revalidatePath('/admin')

  return { success: true }
}

export async function updateProduct(id: string, formData: FormData) {
  await verifyAdmin()

  const title = formData.get('title') as string
  const shortDescription = formData.get('shortDescription') as string
  const description = formData.get('description') as string
  const price = formData.get('price') as string
  const imageUrl = formData.get('imageUrl') as string
  const category = formData.get('category') as string

  if (
    !title ||
    !shortDescription ||
    !description ||
    !price ||
    !imageUrl ||
    !category
  ) {
    throw new Error('Todos os campos são obrigatórios')
  }

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
  })

  revalidatePath('/')
  revalidatePath('/produtos')
  revalidatePath('/admin')

  return { success: true }
}

export async function deleteProduct(id: string) {
  await verifyAdmin()

  await prisma.product.delete({
    where: { id },
  })

  revalidatePath('/')
  revalidatePath('/produtos')
  revalidatePath('/admin')

  return { success: true }
}
