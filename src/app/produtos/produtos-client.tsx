'use client'

import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { useMemo, useState } from 'react'
import type { Product } from '@/types/product'

const categories = [
  'Todos',
  'Bolos',
  'Tortas',
  'Doces',
  'Salgados',
  'Especiais',
]

function getInitialCategory() {
  if (typeof window === 'undefined') return 'Todos'
  const hash = window.location.hash.replace('#', '')
  return hash && categories.includes(hash) ? hash : 'Todos'
}

export default function ProdutosClient({
  initialProducts,
}: {
  initialProducts: Product[]
}) {
  const [selectedCategory, setSelectedCategory] = useState(getInitialCategory)
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'Todos') {
      return initialProducts
    }
    return initialProducts.filter(
      (product) => product.category === selectedCategory,
    )
  }, [selectedCategory, initialProducts])

  return (
    <div className="min-h-screen py-12 mt-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-5xl font-bold text-foreground mb-4">
            Nossos Produtos
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubra nossa seleção de produtos artesanais feitos com
            ingredientes de alta qualidade
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className="min-w-[100px]"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Nenhum produto encontrado nesta categoria.
            </p>
          </div>
        )}

        {/* Results Count */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Mostrando {filteredProducts.length}{' '}
            {filteredProducts.length === 1 ? 'produto' : 'produtos'}
            {selectedCategory !== 'Todos' &&
              ` na categoria "${selectedCategory}"`}
          </p>
        </div>
      </div>
    </div>
  )
}
