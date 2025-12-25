'use client'

import { useState, useTransition, useEffect } from 'react'
import { Button } from '@/components/ui/button'
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
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleEdit = (product: Product) => {
    setSelectedProduct(product)
    setIsFormOpen(true)
  }

  const handleCreate = () => {
    setSelectedProduct(null)
    setIsFormOpen(true)
  }

  const handleDelete = async (id: string, skipConfirm = false) => {
    if (!skipConfirm) {
      if (!confirm('Tem certeza que deseja deletar este produto?')) {
        return
      }
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
    <div className="min-h-screen pb-12 pt-36 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-4xl font-bold text-foreground mb-2">
              Dashboard Admin
            </h1>
            <p className="text-muted-foreground">
              Gerencie os produtos da confeitaria
            </p>
          </div>
          <Button onClick={handleCreate} size="lg" className="cursor-pointer">
            <Plus className="mr-2 h-5 w-5" />
            Novo Produto
          </Button>
        </div>

        {products.length > 0 ? (
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              const price =
                typeof product.price === 'number'
                  ? product.price
                  : typeof product.price === 'string'
                    ? parseFloat(product.price)
                    : 0

              return (
                <div
                  key={product.id}
                  onClick={(e) => {
                    // Em mobile, ao clicar no card, abre o dialog de edição
                    // Previne a abertura se o clique foi em um botão
                    if (
                      isMobile &&
                      !(e.target as HTMLElement).closest('button')
                    ) {
                      handleEdit(product)
                    }
                  }}
                  className="bg-linear-to-b from-card-bg to-card-bg/10 dark:from-card-bg dark:to-card-bg/10 p-4 flex flex-col hover:bg-card-bg-hover dark:hover:bg-card-bg-hover rounded-xl transition-colors border border-card-border dark:border-card-border shadow-md relative group md:cursor-default cursor-pointer"
                >
                  <div className="flex gap-4 flex-col w-full h-full">
                    <div className="relative">
                      <img
                        width={100}
                        height={100}
                        src={product.imageUrl}
                        alt={product.title}
                        className="h-48 w-full rounded-lg object-cover object-center"
                        loading="lazy"
                      />
                      {/* Botões de ação no hover */}
                      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="icon"
                          onClick={() => handleEdit(product)}
                          disabled={isPending}
                          className="bg-background cursor-pointer"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDelete(product.id)}
                          disabled={isPending || deletingId === product.id}
                          className="bg-background cursor-pointer"
                        >
                          {deletingId === product.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 h-full">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-medium text-foreground text-sm md:text-base flex-1">
                          {product.title}
                        </h3>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {product.shortDescription}
                      </div>

                      <div className="flex items-center justify-between gap-2 mt-auto">
                        <div className="text-2xl font-bold text-primary font-serif">
                          {formatPrice(price)}
                        </div>
                        <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                          {product.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">
              Nenhum produto cadastrado ainda
            </p>
            <Button onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Criar Primeiro Produto
            </Button>
          </div>
        )}
      </div>

      <AdminProductForm
        product={selectedProduct}
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onDelete={
          selectedProduct
            ? () => handleDelete(selectedProduct.id, true)
            : undefined
        }
      />
    </div>
  )
}
