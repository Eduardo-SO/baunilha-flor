'use client'

import Link from 'next/link'
import { Facebook, Instagram } from 'lucide-react'
import { Logo } from './logo'

export default function Footer() {
  return (
    <footer className="w-full p-4 mx-auto relative overflow-hidden">
      {/* Fundo rosa vibrante com padrão decorativo */}
      <div
        className="relative w-full bg-primary/20 pt-12 pb-4 rounded-2xl"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        <div className="container mx-auto px-4">
          {/* Seção Principal - Título, Subtítulo e Botão */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4">
              <span className="text-secondary">Baunilha &</span>{' '}
              <span className="text-primary">Flor de Sal</span>
            </h2>
            <p className="text-base md:text-lg mb-8 max-w-3xl mx-auto">
              Somos uma confeitaria artesanal apaixonada por criar experiências
              únicas através dos nossos doces. Cada produto é feito com
              ingredientes cuidadosamente selecionados, técnicas refinadas e
              muito amor.
            </p>
            <p className="text-base md:text-lg mb-8 max-w-3xl mx-auto">
              Da baunilha suave à flor de sal que realça sabores, cada detalhe é
              pensado para proporcionar momentos inesquecíveis. Venha conhecer
              nosso catálogo e se apaixone!
            </p>
            <Link
              href="https://wa.me/5511985668978"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary text-white font-bold px-8 py-3 md:px-12 md:py-4 rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Fale Conosco
            </Link>
          </div>

          {/* Seção Inferior - Logo, Links e Redes Sociais */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-2 border-t border-white/20">
            {/* Logo e Links de Navegação - Lado Esquerdo */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Logo />

              <p className="text-muted-foreground text-sm md:text-base">
                © {new Date().getFullYear()} Baunilha e Flor de Sal. Todos os
                direitos reservados.
              </p>
            </div>

            {/* Ícones de Redes Sociais - Lado Direito */}
            <div className="flex gap-4">
              <a
                href="https://facebook.com/baunilhaeflordesal"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center hover:bg-white hover:text-[#FF6B9D] transition-all"
                aria-label="Curtir no Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/baunilhaeflordesal"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center hover:bg-white hover:text-[#FF6B9D] transition-all"
                aria-label="Seguir no Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
