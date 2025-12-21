import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

import "dotenv/config"

// Configurar Prisma Client para seed
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL não configurado');
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  const products = [
    {
      title: "Bolo de Chocolate Belga",
      shortDescription: "Bolo úmido de chocolate 70% cacau com ganache",
      description: `Delicioso bolo de chocolate feito com chocolate belga 70% cacau.
  Massa extremamente úmida e macia, coberta com ganache sedoso.
  Perfeito para celebrações ou para apreciar a qualquer momento.
  
  Serve 10-12 pessoas
  Validade: 3 dias refrigerado`,
      price: 85.00,
      imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
      category: "Bolos",
    },
    {
      title: "Bolo de Morango com Chantilly",
      shortDescription: "Camadas de pão de ló com morangos frescos e chantilly",
      description: `Bolo clássico e delicado, feito com pão de ló fofinho, morangos
  frescos selecionados e chantilly levemente adoçado. Uma combinação
  irresistível que derrete na boca.
  
  Serve 8-10 pessoas
  Validade: 2 dias refrigerado
  Morangos da estação`,
      price: 75.00,
      imageUrl: "https://images.unsplash.com/photo-1565958011703-44f9829ba187",
      category: "Bolos",
    },
    {
      title: "Bolo Red Velvet",
      shortDescription: "Clássico americano com cream cheese",
      description: `O famoso bolo aveludado com sua cor vermelha característica,
  recheado e coberto com cream cheese. Sabor suave com toque de
  cacau e textura macia incomparável.
  
  Serve 10-12 pessoas
  Validade: 4 dias refrigerado`,
      price: 95.00,
      imageUrl: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e",
      category: "Bolos",
    },
    {
      title: "Torta de Limão Siciliano",
      shortDescription: "Base crocante com creme de limão e merengue",
      description: `Torta refrescante com base de massa amanteigada, recheio cremoso
  de limão siciliano e cobertura de merengue levemente tostado.
  Equilíbrio perfeito entre doce e azedo.
  
  Serve 8-10 pessoas
  Validade: 3 dias refrigerado
  Limões orgânicos`,
      price: 68.00,
      imageUrl: "https://images.unsplash.com/photo-1519915212116-7cfef71f1d3e",
      category: "Tortas",
    },
    {
      title: "Torta de Frutas Vermelhas",
      shortDescription: "Mix de frutas vermelhas frescas sobre creme",
      description: `Torta elegante com base de massa podre, creme de confeiteiro
  aromatizado com baunilha e generosa cobertura de morangos,
  framboesas, amoras e mirtilos frescos.
  
  Serve 8 pessoas
  Validade: 2 dias refrigerado
  Frutas da estação`,
      price: 82.00,
      imageUrl: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3",
      category: "Tortas",
    },
    {
      title: "Brigadeiros Gourmet (Caixa 15un)",
      shortDescription: "Sabores variados: tradicional, belga, pistache",
      description: `Caixa com 15 brigadeiros artesanais em sabores variados:
  - Brigadeiro Tradicional
  - Chocolate Belga 70%
  - Pistache
  - Cookies & Cream
  - Doce de Leite
  
  Feitos com chocolate de alta qualidade e muito carinho.
  Validade: 5 dias em temperatura ambiente`,
      price: 35.00,
      imageUrl: "https://images.unsplash.com/photo-1548365328-8c6db3220e4c",
      category: "Doces",
    },
    {
      title: "Macarons Franceses (Caixa 12un)",
      shortDescription: "Delicados macarons em sabores exclusivos",
      description: `Caixa com 12 macarons artesanais sabores:
  - Framboesa
  - Chocolate Belga
  - Limão Siciliano
  - Pistache
  - Caramelo Salgado
  - Baunilha de Madagascar
  
  Textura crocante por fora, macia por dentro.
  Validade: 7 dias refrigerado`,
      price: 48.00,
      imageUrl: "https://images.unsplash.com/photo-1569864358642-9d1684040f43",
      category: "Doces",
    },
    {
      title: "Mini Quiches Variadas (Caixa 12un)",
      shortDescription: "Quiches individuais com recheios salgados",
      description: `Caixa com 12 mini quiches em sabores:
  - Queijo e Cebola Caramelizada
  - Palmito com Catupiry
  - Alho-poró com Bacon
  - Espinafre com Ricota
  
  Perfeitas para festas e eventos.
  Servir quente ou frio
  Validade: 3 dias refrigerado`,
      price: 42.00,
      imageUrl: "https://images.unsplash.com/photo-1509358271058-acd22cc93898",
      category: "Salgados",
    },
    {
      title: "Naked Cake Personalizado",
      shortDescription: "Bolo sem cobertura decorado com flores e frutas",
      description: `Bolo no estilo "naked cake" (sem cobertura total), revelando as
  camadas de recheio. Decorado com flores comestíveis, frutas frescas
  e folhagens. Ideal para casamentos, aniversários e eventos especiais.
  
  Sob encomenda (5 dias de antecedência)
  Sabores e tamanhos personalizáveis
  Serve 15-20 pessoas (média)
  Consulte valores para outros tamanhos`,
      price: 180.00,
      imageUrl: "https://images.unsplash.com/photo-1535141192574-5d4897c12636",
      category: "Especiais",
    },
    {
      title: "Cheesecake de Frutas Vermelhas",
      shortDescription: "Cheesecake cremoso com calda de frutas vermelhas",
      description: `Cheesecake artesanal com base de biscoito amanteigado, recheio
  super cremoso de cream cheese e cobertura generosa de calda de
  frutas vermelhas (morangos, framboesas e mirtilos).
  
  Serve 8-10 pessoas
  Validade: 5 dias refrigerado
  Pode congelar por até 1 mês`,
      price: 72.00,
      imageUrl: "https://images.unsplash.com/photo-1578775887804-699de7086ff9",
      category: "Especiais",
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
    console.log(`✅ Produto criado: ${product.title}`);
  }

  console.log('✨ Seed concluído!');
}

main()
  .catch((e) => {
    console.error('❌ Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });

