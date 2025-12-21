import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import prisma from "@/lib/prisma";
import { ArrowRight } from "lucide-react";

export default async function Home() {
  // Buscar os últimos 6 produtos para vitrine
  const featuredProducts = await prisma.product.findMany({
    take: 6,
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen w-full overflow-hidden bg-cover bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/blur-hero.png)',
          backgroundPosition: '60% 50%',
        }}
      >
        {/* Overlay escuro para melhorar legibilidade do texto */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-background/10 to-transparent z-0" /> */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-transparent z-0" />
        
        <div className="relative z-10 container mx-auto flex min-h-screen flex-col items-center justify-start px-4 py-16 md:flex-row md:items-center md:justify-start md:gap-8 lg:gap-12">
          {/* Conteúdo de texto - lado esquerdo */}
          <div className="relative z-10 mt-20 h-full w-full max-w-2xl space-y-6 rounded-2xl text-center md:mt-0 md:text-left lg:space-y-8">
              {/* Saudação */}
              {/* <p className="text-base font-medium text-muted-foreground md:text-lg lg:text-xl">
                Olá!
              </p> */}
              
              {/* Título principal */}
              <h1 className="text-secondary-foreground -mt-4 font-serif text-3xl leading-32 font-medium sm:text-3xl md:text-6xl lg:text-7xl">
                Doçura que <span className="text-primary">encanta</span>
              </h1>
              
              {/* Parágrafo expandido */}
              <p className="text-secondary-foreground text-sm leading-relaxed sm:text-base md:text-2xl lg:max-w-2xl">
                Produtos artesanais feitos com carinho, ingredientes selecionados e muito amor.
                Cada doce é uma experiência única para seu paladar.
              </p>
              
              {/* Botões CTA */}
              <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:gap-6">
                <Button 
                  asChild 
                  size="lg" 
                  className="w-full text-base shadow-lg transition-all hover:scale-105 sm:w-auto sm:text-lg"
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
                  <a href="https://wa.me/5511985668978" target="_blank" rel="noopener noreferrer">
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
              Conheça alguns dos nossos produtos mais especiais, feitos com dedicação e carinho
            </p>
          </div>

          {featuredProducts.length > 0 ? (
            <>
              <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featuredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={{
                      ...product,
                      price: product.price.toNumber(),
                    }} 
                  />
                ))}
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

      {/* About Section */}
      <section id="sobre" className="bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <h2 className="text-foreground font-serif text-4xl font-bold">
              Sobre a Baunilha e Flor de Sal
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Somos uma confeitaria artesanal apaixonada por criar experiências únicas através dos nossos doces.
              Cada produto é feito com ingredientes cuidadosamente selecionados, técnicas refinadas e muito amor.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Da baunilha suave à flor de sal que realça sabores, cada detalhe é pensado para proporcionar
              momentos inesquecíveis. Venha conhecer nosso catálogo e se apaixone!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
