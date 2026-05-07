'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { COMPANY } from '../data/company';

const navItems = [
  { label: 'Início', href: '/' },
  { label: 'Produtos', href: '/produtos' },
  { label: 'Novidades', href: '/novidades' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-coal/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link
          href="/"
          data-smooth-scroll
          className="group flex items-center gap-3 text-left"
          aria-label="Voltar para o início"
        >
          <span className="grid h-11 w-11 place-items-center border border-gold/60 bg-gold text-sm font-black tracking-tight text-coal shadow-gold">
            VA
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-lg font-semibold text-white">
              Vianna Art's
            </span>
            <span className="text-xs uppercase tracking-[0.18em] text-gold">
              Metal & Design
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-smooth-scroll={item.href === '/' ? true : undefined}
              className={`px-4 py-2 text-sm font-semibold transition ${
                pathname === item.href
                  ? 'text-gold'
                  : 'text-white/72 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#contato"
            data-smooth-scroll
            className="px-4 py-2 text-sm font-semibold text-white/72 transition hover:text-white"
          >
            Contato
          </Link>
          <a
            href={COMPANY.whatsappUrl}
            className="ml-3 border border-gold bg-gold px-5 py-2.5 text-sm font-semibold text-coal transition hover:bg-transparent hover:text-gold"
          >
            WhatsApp
          </a>
        </nav>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center border border-white/15 text-white md:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-label="Abrir menu"
        >
          {isOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-white/10 bg-graphite px-5 py-4 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-smooth-scroll={item.href === '/' ? true : undefined}
                onClick={() => setIsOpen(false)}
                className={`border border-white/10 px-4 py-3 text-left text-sm font-semibold ${
                  pathname === item.href ? 'text-gold' : 'text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#contato"
              data-smooth-scroll
              onClick={() => setIsOpen(false)}
              className="border border-white/10 px-4 py-3 text-left text-sm font-semibold text-white"
            >
              Contato
            </Link>
            <a
              href={COMPANY.whatsappUrl}
              className="border border-gold bg-gold px-4 py-3 text-center text-sm font-semibold text-coal"
            >
              Chamar no WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
