'use client'

import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'
import { MessageCircle } from 'lucide-react'
import type { Product } from '@/types/product'

interface ProductModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const whatsappMessage = encodeURIComponent(
    `Olá! Tenho interesse no produto ${product.title}`,
  )
  const whatsappUrl = `https://wa.me/5511985668978?text=${whatsappMessage}`

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">
            {product.title}
          </DialogTitle>
          <DialogDescription>{product.shortDescription}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              <span className="text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                {product.category}
              </span>
            </div>

            <div className="prose prose-sm max-w-none">
              <p className="text-foreground whitespace-pre-line">
                {product.description}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={() => window.open(whatsappUrl, '_blank')}
            className="w-full sm:w-auto"
            size="lg"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Pedir pelo WhatsApp
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
