import type { LucideIcon } from 'lucide-react';

type ServiceCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export default function ServiceCard({
  icon: Icon,
  title,
  description,
}: ServiceCardProps) {
  return (
    <article className="border border-white/10 bg-white/[0.035] p-6 transition hover:border-gold/45 hover:bg-white/[0.055]">
      <div className="grid h-12 w-12 place-items-center border border-gold/45 text-gold">
        <Icon size={23} strokeWidth={1.6} />
      </div>
      <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-white/62">{description}</p>
    </article>
  );
}
