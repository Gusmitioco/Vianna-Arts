import Link from 'next/link';
import type { Post } from '@/data/posts';
import SectionTitle from './SectionTitle';

type LatestPostsProps = {
  posts: Post[];
};

export default function LatestPosts({ posts }: LatestPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="border-y border-white/10 bg-graphite px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle
            eyebrow="Novidades"
            title="Atualizações, bastidores e novas peças."
            description="Publicações para mostrar lançamentos, promoções, trabalhos recentes e detalhes do processo artesanal."
          />
          <Link
            href="/novidades"
            className="w-fit border border-gold px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-gold transition hover:bg-gold hover:text-coal"
          >
            Ver novidades
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <article
              key={post.id}
              className="border border-white/10 bg-coal p-6 shadow-hard"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                {formatDate(post.publishedAt)}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-white">{post.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/62">{post.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function formatDate(value?: string | null) {
  if (!value) {
    return 'Novidade';
  }

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}
