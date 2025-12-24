'use client'

import CardNav from './card-nav'

export default function Header() {
  const items = [
    {
      label: 'Home',
      bgColor: '#F5B3B3', // primary color - tom rosado/coral
      textColor: '#fff',
      links: [
        { label: 'Início', ariaLabel: 'Ir para página inicial', href: '/' },
        {
          label: 'Nossos Destaques',
          ariaLabel: 'Ver produtos em destaque',
          href: '/#destaques',
        },
        {
          label: 'Sobre Nós',
          ariaLabel: 'Conheça a Baunilha e Flor de Sal',
          href: '/#sobre',
        },
      ],
    },
    {
      label: 'Produtos',
      bgColor: '#5A4A6C', // secondary color - tom roxo escuro
      textColor: '#fff',
      links: [
        { label: 'Bolos', ariaLabel: 'Ver bolos', href: '/produtos#Bolos' },
        { label: 'Doces', ariaLabel: 'Ver doces', href: '/produtos#Doces' },
        { label: 'Tortas', ariaLabel: 'Ver tortas', href: '/produtos#Tortas' },
        { label: 'Mais', ariaLabel: 'Ver mais produtos', href: '/produtos' },
      ],
    },
    {
      label: 'Contato',
      bgColor: '#F0F8B0', // accent color - tom amarelado claro
      textColor: '#000',
      links: [
        {
          label: 'WhatsApp',
          ariaLabel: 'Contato via WhatsApp',
          href: 'https://wa.me/5511985668978',
        },
        {
          label: 'Instagram',
          ariaLabel: 'Seguir no Instagram',
          href: 'https://instagram.com/baunilhaeflordesal',
        },
        {
          label: 'Facebook',
          ariaLabel: 'Curtir no Facebook',
          href: 'https://facebook.com/baunilhaeflordesal',
        },
      ],
    },
  ]

  return (
    <CardNav
      items={items}
      baseColor="#ffffff"
      menuColor="#000"
      buttonBgColor="#F5B3B3"
      buttonTextColor="#fff"
      ease="power3.out"
    />
  )
}
