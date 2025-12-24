import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-xl font-bold text-primary mb-4">
              Baunilha e Flor de Sal
            </h3>
            <p className="text-sm text-muted-foreground">
              Confeitaria artesanal com produtos feitos com carinho e
              ingredientes selecionados.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">
              Links Rápidos
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="/produtos"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Produtos
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5511985668978"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Contato WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Contato</h4>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">
                WhatsApp: (11) 98566-8978
              </li>
              <li className="text-sm text-muted-foreground">São Paulo, SP</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Baunilha e Flor de Sal. Todos os
            direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
