import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "./theme-toggle";
import { Logo } from "./logo";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Logo />
        
        <nav className="flex items-center gap-6">
          <Link 
            href="/" 
            className="text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link 
            href="/produtos" 
            className="text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            Produtos
          </Link>
          <a 
            href="https://wa.me/5511985668978" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            Contato
          </a>
          <div className="ml-2">
            <UserButton afterSignOutUrl="/" />
          </div>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

