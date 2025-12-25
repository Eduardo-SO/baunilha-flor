'use client'

import { useState, useTransition } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createProduct, updateProduct } from '@/app/admin/actions'
import { Loader2, Trash2 } from 'lucide-react'

interface Product {
  id: string
  title: string
  shortDescription: string
  description: string
  price: string
  imageUrl: string
  category: string
}

interface AdminProductFormProps {
  product?: Product | null
  isOpen: boolean
  onClose: () => void
  onDelete?: () => void
}

const categories = ['Bolos', 'Tortas', 'Doces', 'Salgados', 'Especiais']

export function AdminProductForm({
  product,
  isOpen,
  onClose,
  onDelete,
}: AdminProductFormProps) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      try {
        if (product) {
          await updateProduct(product.id, formData)
        } else {
          await createProduct(formData)
        }
        onClose()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao salvar produto')
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {product ? 'Editar Produto' : 'Novo Produto'}
          </DialogTitle>
          <DialogDescription>
            {product
              ? 'Edite as informações do produto'
              : 'Preencha os dados do novo produto'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              name="title"
              defaultValue={product?.title}
              required
              disabled={isPending}
              placeholder="Ex: Bolo de Chocolate"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortDescription">Descrição Curta *</Label>
            <Input
              id="shortDescription"
              name="shortDescription"
              defaultValue={product?.shortDescription}
              required
              disabled={isPending}
              placeholder="Breve descrição para o card"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição Completa *</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={product?.description}
              required
              disabled={isPending}
              rows={5}
              placeholder="Descrição detalhada do produto"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Preço (R$) *</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                defaultValue={product?.price}
                required
                disabled={isPending}
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoria *</Label>
              <select
                id="category"
                name="category"
                defaultValue={product?.category}
                required
                disabled={isPending}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Selecione...</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">URL da Imagem *</Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              type="url"
              defaultValue={product?.imageUrl}
              required
              disabled={isPending}
              placeholder="https://exemplo.com/imagem.jpg"
            />
            <p className="text-xs text-muted-foreground">
              Cole o link da imagem do produto
            </p>
          </div>

          {error && (
            <div className="p-3 text-sm text-destructive-foreground bg-destructive/10 border border-destructive rounded-md">
              {error}
            </div>
          )}

          <DialogFooter className="flex-col sm:flex-row gap-2">
            {product && onDelete && (
              <Button
                type="button"
                variant="destructive"
                onClick={() => {
                  if (
                    confirm(
                      'Tem certeza que deseja deletar este produto? Esta ação não pode ser desfeita.',
                    )
                  ) {
                    onDelete()
                    onClose()
                  }
                }}
                disabled={isPending}
                className="w-full sm:w-auto"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Deletar Produto
              </Button>
            )}
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isPending}
                className="flex-1 sm:flex-initial"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="flex-1 sm:flex-initial"
              >
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {product ? 'Salvar Alterações' : 'Criar Produto'}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
