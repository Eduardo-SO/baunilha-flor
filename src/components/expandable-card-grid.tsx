'use client'

import React, { useEffect, useId, useRef, useState, useMemo } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useOutsideClick } from '@/hooks/use-outside-click'
import type { Product } from '@/types/product'
import { formatPrice } from '@/lib/utils'
import { Heart, ShoppingBag } from 'lucide-react'

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
  content: () => React.ReactNode
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
        content: () => (
          <div>
            <p className="whitespace-pre-line">{product.description}</p>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-lg font-semibold text-primary">
                {formatPrice(price)}
              </span>
              <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                {product.category}
              </span>
            </div>
          </div>
        ),
      }
    })
  }, [products])

  const [active, setActive] = useState<CardData | boolean | null>(null)
  const id = useId()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActive(false)
      }
    }

    if (active && typeof active === 'object') {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [active])

  useOutsideClick(ref, () => setActive(null))

  return (
    <>
      <AnimatePresence>
        {active && typeof active === 'object' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 h-full w-full z-40"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === 'object' ? (
          <div className="fixed inset-10 grid place-items-center z-100">
            <motion.button
              key={`button-${active.id}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden rounded-lg items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.id}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-card dark:bg-card rounded-xl sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.id}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="flex-1">
                    <motion.h3
                      layoutId={`title-${active.id}-${id}`}
                      className="font-medium text-foreground text-base mb-2"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.id}-${id}`}
                      className="text-muted-foreground text-base mb-2"
                    >
                      {active.description}
                    </motion.p>
                    <motion.div
                      layoutId={`price-${active.id}-${id}`}
                      className="text-lg font-semibold text-primary"
                    >
                      {active.priceFormatted}
                    </motion.div>
                  </div>

                  <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={active.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-primary text-white hover:bg-green-600 transition-colors ml-4"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-muted-foreground text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === 'function'
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.id}-${id}`}
            key={card.id}
            onClick={() => setActive(card)}
            className="bg-card-bg bg-linear-to-b from-card-bg to-card-bg/10 dark:bg-card-bg p-4 flex flex-col hover:bg-card-bg-hover dark:hover:bg-card-bg-hover rounded-xl cursor-pointer transition-colors border border-card-border dark:border-card-border shadow-md"
          >
            <div className="flex gap-4 flex-col w-full">
              <motion.div
                layoutId={`image-${card.id}-${id}`}
                className="relative"
              >
                <img
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-48 w-full rounded-lg object-cover object-center"
                />
              </motion.div>
              <div className="flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <motion.h3
                    layoutId={`title-${card.id}-${id}`}
                    className="font-medium text-foreground text-sm md:text-base flex-1"
                  >
                    {card.title}
                  </motion.h3>
                  <div className="flex items-center gap-2 shrink-0">
                    <Heart className="h-4 w-4 text-primary stroke-2" />
                    <ShoppingBag className="h-4 w-4 text-primary stroke-2" />
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {card.description}
                </div>
                <motion.div
                  layoutId={`price-${card.id}-${id}`}
                  className="text-lg font-semibold text-primary"
                >
                  {card.priceFormatted}
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  )
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  )
}
