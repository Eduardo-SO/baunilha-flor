import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import prisma from "@/lib/prisma";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import heroImage from "../../public/images/hero.png";
import { Product } from "@/types/product";


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
      <section className="relative h-[600px] w-full overflow-hidden bg-linear-to-br from-primary/20 to-background">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiIG9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=')] opacity-50" />
        
        <div className="container relative mx-auto flex h-full items-center px-4">
          <div className="max-w-2xl space-y-6">
            <h1 className="font-serif text-5xl font-bold leading-tight text-foreground md:text-6xl lg:text-7xl">
              Doçura que <span className="text-primary">encanta</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Produtos artesanais feitos com carinho, ingredientes selecionados e muito amor.
              Cada doce é uma experiência única para seu paladar.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="text-lg">
                <Link href="/produtos">
                  Ver Produtos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg">
                <a href="https://wa.me/5511985668978" target="_blank" rel="noopener noreferrer">
                  Fale Conosco
                </a>
              </Button>
            </div>
          </div>

          <Image src={heroImage} alt="Hero" width={1000} height={1000} />
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
              Nossos Destaques
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Conheça alguns dos nossos produtos mais especiais, feitos com dedicação e carinho
            </p>
          </div>

          {featuredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {featuredProducts.map((product: Product) => (
                  <ProductCard 
                    key={product.id} 
                    product={{
                      id: product.id,
                      title: product.title,
                      shortDescription: product.shortDescription,
                      description: product.description,
                      price: product.price.toString(),
                      imageUrl: product.imageUrl,
                      category: product.category,
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
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Em breve teremos deliciosos produtos disponíveis!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="font-serif text-4xl font-bold text-foreground">
              Sobre a Baunilha e Flor de Sal
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Somos uma confeitaria artesanal apaixonada por criar experiências únicas através dos nossos doces.
              Cada produto é feito com ingredientes cuidadosamente selecionados, técnicas refinadas e muito amor.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Da baunilha suave à flor de sal que realça sabores, cada detalhe é pensado para proporcionar
              momentos inesquecíveis. Venha conhecer nosso catálogo e se apaixone!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
