'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import type { Product } from '@/types/product'
import { formatPrice } from '@/lib/utils'
import { ExternalLinkIcon } from 'lucide-react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog'

interface ExpandableCardGridProps {
  products: Product[]
}

type CardData = {
  id: string
  title: string
  description: string
  src: string
  price: number
  priceFormatted: string
  category: string
  ctaText: string
  ctaLink: string
  content: string
}

export function ExpandableCardGrid({ products }: ExpandableCardGridProps) {
  const cards = useMemo<CardData[]>(() => {
    return products.map((product) => {
      const price =
        typeof product.price === 'number'
          ? product.price
          : typeof product.price === 'string'
            ? parseFloat(product.price)
            : 0

      return {
        id: product.id,
        title: product.title,
        description: product.shortDescription,
        src: product.imageUrl,
        price,
        priceFormatted: formatPrice(price),
        category: product.category,
        ctaText: 'Fale Conosco',
        ctaLink: 'https://wa.me/5511985668978',
        content: product.description,
      }
    })
  }, [products])

  const [open, setOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null)

  const handleCardClick = (card: CardData) => {
    setSelectedCard(card)
    setOpen(true)
  }

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) {
      setSelectedCard(null)
    }
  }

  const whatsappMessage = encodeURIComponent(
    `Olá! Tenho interesse no produto ${selectedCard?.title}`,
  )
  const whatsappUrl = `https://wa.me/5511985668978?text=${whatsappMessage}`

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="w-full max-w-[calc(100%-2rem)] md:max-w-[500px] h-[calc(100%-2rem)] md:h-fit md:max-h-[90%] flex flex-col bg-card dark:bg-card rounded-xl sm:rounded-3xl overflow-hidden p-0 gap-0">
          {selectedCard && (
            <>
              <DialogHeader className="flex flex-col gap-2 p-4">
                <DialogTitle className="text-xl md:text-2xl font-serif text-left">
                  {selectedCard.title}
                </DialogTitle>
                <DialogDescription className="text-sm text-left">
                  {selectedCard.description}
                </DialogDescription>
              </DialogHeader>

              {/* Imagem */}
              <div className="relative px-4">
                <Image
                  width={200}
                  height={200}
                  src={selectedCard.src}
                  alt={selectedCard.title}
                  className="w-full h-60 lg:h-60 sm:rounded-lg object-cover object-center"
                />
              </div>

              {/* Conteúdo */}
              <div className="p-4 flex flex-col flex-1 min-h-0">
                <div className="overflow-y-auto flex-1">
                  <p className="whitespace-pre-line">{selectedCard.content}</p>
                </div>

                <div className="flex justify-between items-start pt-4 shrink-0">
                  <div className="text-2xl font-serif text-primary">
                    {selectedCard.priceFormatted}
                  </div>

                  <Button
                    onClick={() => window.open(whatsappUrl, '_blank')}
                    className="rounded-xl text-white"
                  >
                    <ExternalLinkIcon className="h-5 w-5" />
                    Pedir pelo WhatsApp
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Grid de cards */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card)}
            className="bg-linear-to-b from-card-bg to-card-bg/10 dark:from-card-bg dark:to-card-bg/10 p-4 flex flex-col hover:bg-card-bg-hover dark:hover:bg-card-bg-hover rounded-xl cursor-pointer transition-colors border border-card-border dark:border-card-border shadow-md"
          >
            <div className="flex gap-4 flex-col w-full h-full">
              <div className="relative">
                <Image
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-48 w-full rounded-lg object-cover object-center"
                />
              </div>
              <div className="flex flex-col gap-2 h-full">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium text-foreground text-sm md:text-base flex-1">
                    {card.title}
                  </h3>
                </div>
                <div className="text-sm text-muted-foreground">
                  {card.description}
                </div>

                <div className="flex items-center justify-between gap-2 mt-auto">
                  <div className="text-2xl font-bold text-primary font-serif">
                    {card.priceFormatted}
                  </div>
                  <Button
                    size="sm"
                    className="rounded-xl text-white cursor-pointer"
                  >
                    Detalhes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
