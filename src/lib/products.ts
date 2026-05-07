import { PRODUCTS, type Product, type ProductCategory } from '@/data/products';
import { hasSupabaseConfig } from '@/lib/env';
import { createSupabaseServerClient } from '@/lib/supabase/server';

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number | null;
  promotional_price: number | null;
  image_url: string | null;
  is_featured: boolean;
  is_published: boolean;
};

export async function getPublicProducts(): Promise<Product[]> {
  if (!hasSupabaseConfig()) {
    return PRODUCTS.filter((product) => product.isPublished);
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('products')
    .select(
      'id, slug, name, category, description, price, promotional_price, image_url, is_featured, is_published',
    )
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to load public products:', error.message);
    return PRODUCTS.filter((product) => product.isPublished);
  }

  return (data as ProductRow[]).map(mapProductRow);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getPublicProducts();
  return products.filter((product) => product.featured).slice(0, 3);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!hasSupabaseConfig()) {
    return (
      PRODUCTS.find((product) => product.slug === slug && product.isPublished) ?? null
    );
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('products')
    .select(
      'id, slug, name, category, description, price, promotional_price, image_url, is_featured, is_published',
    )
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle();

  if (error) {
    console.error('Failed to load product detail:', error.message);
    return (
      PRODUCTS.find((product) => product.slug === slug && product.isPublished) ?? null
    );
  }

  return data ? mapProductRow(data as ProductRow) : null;
}

export async function getAdminProducts(): Promise<Product[]> {
  if (!hasSupabaseConfig()) {
    return PRODUCTS;
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('products')
    .select(
      'id, slug, name, category, description, price, promotional_price, image_url, is_featured, is_published',
    )
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to load admin products:', error.message);
    return [];
  }

  return (data as ProductRow[]).map(mapProductRow);
}

function mapProductRow(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    description: row.description,
    price: row.price,
    promotionalPrice: row.promotional_price,
    imageUrl: row.image_url,
    featured: row.is_featured,
    isPublished: row.is_published,
  };
}
