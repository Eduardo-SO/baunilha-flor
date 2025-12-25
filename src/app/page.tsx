import Link from 'next/link'
import { Button } from '@/components/ui/button'
import prisma from '@/lib/prisma'
import { ArrowRight } from 'lucide-react'
import { ExpandableCardGrid } from '@/components/expandable-card-grid'

export default async function Home() {
  // Buscar os últimos 6 produtos para vitrine
  const featuredProducts = await prisma.product.findMany({
    take: 8,
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative min-h-screen w-full overflow-hidden bg-cover bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/blur-hero.png)',
          backgroundPosition: '70% 50%',
        }}
      >
        {/* Overlay escuro para melhorar legibilidade do texto */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-background/10 to-transparent z-0" /> */}
        <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/50 to-transparent z-0" />

        <div className="relative z-10 container w-full max-w-7xl mx-auto flex min-h-screen flex-col items-center justify-start px-4 py-16 md:flex-row md:items-center md:justify-start md:gap-8 lg:gap-12">
          {/* Conteúdo de texto - lado esquerdo */}
          <div className="relative z-10 mt-auto lg:mt-20 h-full w-full max-w-2xl space-y-6 rounded-2xl text-left md:mt-0 md:text-left lg:space-y-8">
            {/* Título principal */}
            <h1 className="text-secondary-foreground -mt-4 font-serif text-3xl md:leading-24 font-medium sm:text-3xl md:text-6xl lg:text-7xl">
              Doçura que <span className="text-primary">encanta</span>
            </h1>

            {/* Parágrafo expandido */}
            <p className="text-secondary-foreground text-sm leading-relaxed sm:text-base md:text-2xl lg:max-w-2xl">
              Produtos artesanais feitos com carinho, ingredientes selecionados
              e muito amor. Cada doce é uma experiência única para seu paladar.
            </p>

            {/* Botões CTA */}
            <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:gap-6">
              <Button
                asChild
                size="lg"
                className="w-full text-base text-secondary shadow-lg transition-all hover:scale-105 sm:w-auto sm:text-lg"
              >
                <Link href="/produtos">
                  Ver Produtos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full border-2 text-base text-secondary-foreground transition-all hover:scale-105 sm:w-auto sm:text-lg"
              >
                <a
                  href="https://wa.me/5511985668978"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Fale Conosco
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="destaques" className="bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-foreground mb-4 font-serif text-4xl font-bold">
              Nossos Destaques
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Conheça alguns dos nossos produtos mais especiais, feitos com
              dedicação e carinho
            </p>
          </div>

          {featuredProducts.length > 0 ? (
            <>
              <div className="mb-8">
                <ExpandableCardGrid
                  products={featuredProducts.map((product) => ({
                    ...product,
                    price: product.price.toNumber(),
                    createdAt: product.createdAt.toISOString(),
                    updatedAt: product.updatedAt.toISOString(),
                  }))}
                />
              </div>

              <div className="text-center">
                <Button asChild size="lg" variant="outline">
                  <Link href="/produtos">
                    Ver Todos os Produtos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </>
          ) : (
            <div className="py-12 text-center">
              <p className="text-muted-foreground text-lg">
                Em breve teremos deliciosos produtos disponíveis!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
