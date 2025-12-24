'use client'

import { useState, useTransition } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AdminProductForm } from '@/components/admin-product-form'
import { deleteProduct } from './actions'
import { formatPrice } from '@/lib/utils'
import { Pencil, Trash2, Plus, Loader2 } from 'lucide-react'

interface Product {
  id: string
  title: string
  shortDescription: string
  description: string
  price: string
  imageUrl: string
  category: string
}

interface AdminDashboardProps {
  products: Product[]
}

export default function AdminDashboard({ products }: AdminDashboardProps) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isPending, startTransition] = useTransition()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleEdit = (product: Product) => {
    setSelectedProduct(product)
    setIsFormOpen(true)
  }

  const handleCreate = () => {
    setSelectedProduct(null)
    setIsFormOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este produto?')) {
      return
    }

    setDeletingId(id)
    startTransition(async () => {
      try {
        await deleteProduct(id)
      } catch {
        alert('Erro ao deletar produto')
      } finally {
        setDeletingId(null)
      }
    })
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setSelectedProduct(null)
  }

  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-4xl font-bold text-foreground mb-2">
              Dashboard Admin
            </h1>
            <p className="text-muted-foreground">
              Gerencie os produtos da confeitaria
            </p>
          </div>
          <Button onClick={handleCreate} size="lg">
            <Plus className="mr-2 h-5 w-5" />
            Novo Produto
          </Button>
        </div>

        {products.length > 0 ? (
          <div className="grid gap-6">
            {products.map((product) => (
              <Card key={product.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="relative w-24 h-24 rounded-md overflow-hidden bg-muted flex-shrink-0">
                        <Image
                          src={product.imageUrl}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <CardTitle className="mb-2">{product.title}</CardTitle>
                        <CardDescription className="mb-2">
                          {product.shortDescription}
                        </CardDescription>
                        <div className="flex items-center gap-4">
                          <span className="text-lg font-bold text-primary">
                            {formatPrice(product.price)}
                          </span>
                          <span className="text-sm bg-secondary px-2 py-1 rounded">
                            {product.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(product)}
                        disabled={isPending}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(product.id)}
                        disabled={isPending || deletingId === product.id}
                      >
                        {deletingId === product.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground text-lg mb-4">
                Nenhum produto cadastrado ainda
              </p>
              <Button onClick={handleCreate}>
                <Plus className="mr-2 h-4 w-4" />
                Criar Primeiro Produto
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <AdminProductForm
        product={selectedProduct}
        isOpen={isFormOpen}
        onClose={handleCloseForm}
      />
    </div>
  )
}
