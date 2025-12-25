'use client'

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { useOutsideClick } from '@/hooks/use-outside-click'
import type { Product } from '@/types/product'
import { formatPrice } from '@/lib/utils'
import { ExternalLinkIcon } from 'lucide-react'
import { Button } from './ui/button'

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

  const [active, setActive] = useState<CardData | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const handleClose = useCallback(() => {
    setIsAnimating(true)
    setTimeout(() => {
      setActive(null)
      setIsAnimating(false)
    }, 200)
  }, [])

  const handleCardClick = useCallback((card: CardData) => {
    setActive(card)
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 300)
  }, [])

  const whatsappMessage = encodeURIComponent(
    `Olá! Tenho interesse no produto ${active?.title}`,
  )
  const whatsappUrl = `https://wa.me/5511985668978?text=${whatsappMessage}`

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && active) {
        handleClose()
      }
    }

    if (active) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [active, handleClose])

  useOutsideClick(ref, () => {
    if (active) {
      handleClose()
    }
  })

  return (
    <>
      {/* Overlay com fade otimizado */}
      {active && (
        <div
          className={`fixed inset-0 bg-black/40 h-full w-full z-40 transition-opacity duration-200 ${
            isAnimating ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ willChange: 'opacity' }}
          onClick={handleClose}
        />
      )}

      {/* Modal expandido */}
      {active && (
        <div className="fixed inset-10 grid place-items-center z-50 pointer-events-none">
          <div
            ref={ref}
            className={`w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-card dark:bg-card rounded-xl sm:rounded-3xl overflow-hidden pointer-events-auto transition-all duration-300 ${
              isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
            style={{ willChange: 'transform, opacity' }}
          >
            {/* Botão fechar mobile */}
            <button
              className="flex absolute top-2 right-2 text-white items-center justify-center bg-primary rounded-full h-6 w-6 transition-opacity hover:opacity-80"
              onClick={handleClose}
              aria-label="Fechar"
            >
              <CloseIcon />
            </button>

            <div className="flex flex-col gap-2 p-4">
              <h3 className="text-2xl font-serif">{active.title}</h3>
              <p className="text-muted-foreground text-sm">
                {active.description}
              </p>
            </div>

            {/* Imagem */}
            <div className="relative px-4">
              <img
                width={200}
                height={200}
                src={active.src}
                alt={active.title}
                className="w-full h-60 lg:h-60 sm:rounded-lg object-cover object-top"
                loading="lazy"
              />
            </div>

            {/* Conteúdo */}
            <div className="p-4 flex flex-col flex-1 min-h-0">
              <div className="overflow-y-auto flex-1 max-h-64 md:max-h-96">
                <p className="whitespace-pre-line">{active.content}</p>
              </div>

              <div className="flex justify-between items-start pt-4 shrink-0">
                <div className="text-2xl font-serif text-primary">
                  {active.priceFormatted}
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
          </div>
        </div>
      )}

      {/* Grid de cards */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card)}
            className="bg-linear-to-b from-card-bg to-card-bg/10 dark:from-card-bg dark:to-card-bg/10 p-4 flex flex-col hover:bg-card-bg-hover dark:hover:bg-card-bg-hover rounded-xl cursor-pointer transition-colors border border-card-border dark:border-card-border shadow-md"
            style={{ contain: 'layout style paint' }}
          >
            <div className="flex gap-4 flex-col w-full h-full">
              <div className="relative">
                <img
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-48 w-full rounded-lg object-cover object-center"
                  loading="lazy"
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

const CloseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-white"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
  )
}
