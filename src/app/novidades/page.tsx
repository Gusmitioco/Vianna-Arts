import { getPublicPosts } from '@/lib/posts';
import SectionTitle from '@/components/SectionTitle';

export const metadata = {
  title: "Novidades | Vianna Art's Metal & Design",
};

export default async function NovidadesPage() {
  const posts = await getPublicPosts();

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 bg-black px-5 py-20 lg:px-8">
        <div className="absolute inset-0 hero-metal opacity-70" />
        <div className="relative mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Novidades"
            title="Postagens, promoções e trabalhos recentes."
            description="Conteúdos publicados pela Vianna Art's Metal & Design para apresentar novidades, bastidores e peças produzidas."
          />
        </div>
      </section>

      <section className="bg-coal px-5 py-12 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="border border-white/10 bg-graphite p-6 shadow-hard"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                {post.publishedAt
                  ? new Intl.DateTimeFormat('pt-BR').format(new Date(post.publishedAt))
                  : 'Novidade'}
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-white">{post.title}</h2>
              <p className="mt-4 text-sm leading-7 text-white/62">{post.excerpt}</p>
              <p className="mt-5 whitespace-pre-line text-sm leading-7 text-white/72">
                {post.content}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
