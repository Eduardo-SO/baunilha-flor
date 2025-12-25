'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'
import { ProductModal } from './product-modal'
import { useState } from 'react'
import type { Product } from '@/types/product'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Card
        className="overflow-hidden transition-all hover:shadow-lg cursor-pointer pt-0"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative aspect-square w-full overflow-hidden bg-muted">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-cover transition-transform hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          /> */}
        </div>
        <CardHeader>
          <CardTitle className="line-clamp-1">{product.title}</CardTitle>
          <CardDescription className="line-clamp-2">
            {product.shortDescription}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-start md:items-center md:justify-between flex-col md:flex-row gap-2">
            <span className="text-2xl font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            <span className="text-sm text-secondary-foreground bg-secondary px-2 py-1 rounded">
              {product.category}
            </span>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={(e) => {
              e.stopPropagation()
              setIsModalOpen(true)
            }}
          >
            Ver Detalhes
          </Button>
        </CardFooter>
      </Card>

      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
