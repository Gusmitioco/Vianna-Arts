import { Banknote, Drill, Hammer, Home, ShieldCheck } from 'lucide-react';

const highlights = [
  {
    icon: Hammer,
    title: 'Solda de qualidade',
    description: 'Peças firmes, resistentes e pensadas para uso real.',
  },
  {
    icon: Drill,
    title: 'Madeira tratada',
    description: 'Composições em metal com madeira envernizada.',
  },
  {
    icon: Home,
    title: 'Instalação gratuita',
    description: 'Instalação sem custo adicional conforme o projeto.',
  },
  {
    icon: Banknote,
    title: 'Pagamento facilitado',
    description: 'Pix, dinheiro, débito e crédito.',
  },
  {
    icon: ShieldCheck,
    title: 'Garantia inicial',
    description: '7 dias de garantia inicial após a entrega.',
  },
];

export default function TrustHighlights() {
  return (
    <section className="border-y border-white/10 bg-black px-5 py-10 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {highlights.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="border border-white/10 bg-white/[0.03] p-4 transition hover:border-gold/45 hover:bg-gold/10"
            >
              <Icon size={22} className="text-gold" />
              <strong className="mt-4 block text-sm text-white">{item.title}</strong>
              <p className="mt-2 text-xs leading-6 text-white/55">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
