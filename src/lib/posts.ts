import { POSTS, type Post } from '@/data/posts';
import { hasSupabaseConfig } from '@/lib/env';
import { createSupabaseServerClient } from '@/lib/supabase/server';

type PostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  is_published: boolean;
  published_at: string | null;
};

export async function getPublicPosts(): Promise<Post[]> {
  if (!hasSupabaseConfig()) {
    return POSTS.filter((post) => post.isPublished);
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('posts')
    .select('id, slug, title, excerpt, content, image_url, is_published, published_at')
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Failed to load public posts:', error.message);
    return POSTS.filter((post) => post.isPublished);
  }

  return (data as PostRow[]).map(mapPostRow);
}

export async function getAdminPosts(): Promise<Post[]> {
  if (!hasSupabaseConfig()) {
    return POSTS;
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('posts')
    .select('id, slug, title, excerpt, content, image_url, is_published, published_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to load admin posts:', error.message);
    return [];
  }

  return (data as PostRow[]).map(mapPostRow);
}

function mapPostRow(row: PostRow): Post {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    imageUrl: row.image_url,
    isPublished: row.is_published,
    publishedAt: row.published_at,
  };
}
