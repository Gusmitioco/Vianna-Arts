'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CATEGORIES, type ProductCategory } from '@/data/products';
import { hasSupabaseConfig } from '@/lib/env';
import { requireAdmin } from '@/lib/auth';
import { createSupabaseServerClient } from '@/lib/supabase/server';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export async function signInAction(formData: FormData) {
  if (!hasSupabaseConfig()) {
    redirect('/goblin/login?error=config');
  }

  const email = formData.get('email')?.toString().trim();
  const password = formData.get('password')?.toString();

  if (!email || !password) {
    redirect('/goblin/login?error=missing');
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect('/goblin/login?error=invalid');
  }

  redirect('/goblin');
}

export async function signOutAction() {
  if (hasSupabaseConfig()) {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  }

  redirect('/goblin/login');
}

export async function saveProductAction(formData: FormData) {
  await requireAdmin();

  const supabase = await createSupabaseServerClient();
  const id = formData.get('id')?.toString();
  const name = formData.get('name')?.toString().trim();
  const category = formData.get('category')?.toString() as ProductCategory | undefined;
  const description = formData.get('description')?.toString().trim();
  const price = parseMoney(formData.get('price')?.toString());
  const promotionalPrice = parseMoney(formData.get('promotionalPrice')?.toString());
  const isFeatured = formData.get('isFeatured') === 'on';
  const isPublished = formData.get('isPublished') === 'on';
  const currentImageUrl = formData.get('currentImageUrl')?.toString() || null;

  if (!name || !category || !description || !CATEGORIES.includes(category)) {
    redirect('/goblin?error=invalid-product');
  }

  const imageUrl = await uploadProductImage(formData, currentImageUrl);

  const payload = {
    name,
    slug: slugify(name),
    category,
    description,
    price,
    promotional_price: promotionalPrice,
    image_url: imageUrl,
    is_featured: isFeatured,
    is_published: isPublished,
  };

  const result = id
    ? await supabase.from('products').update(payload).eq('id', id)
    : await supabase.from('products').insert(payload);

  if (result.error) {
    console.error('Failed to save product:', result.error.message);
    redirect('/goblin?error=save-product');
  }

  revalidatePath('/');
  revalidatePath('/produtos');
  revalidatePath('/goblin');
  redirect('/goblin?success=product-saved');
}

export async function deleteProductAction(formData: FormData) {
  await requireAdmin();

  const id = formData.get('id')?.toString();

  if (!id) {
    redirect('/goblin?error=missing-product');
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from('products').delete().eq('id', id);

  if (error) {
    console.error('Failed to delete product:', error.message);
    redirect('/goblin?error=delete-product');
  }

  revalidatePath('/');
  revalidatePath('/produtos');
  revalidatePath('/goblin');
  redirect('/goblin?success=product-deleted');
}

export async function savePostAction(formData: FormData) {
  await requireAdmin();

  const supabase = await createSupabaseServerClient();
  const id = formData.get('id')?.toString();
  const title = formData.get('title')?.toString().trim();
  const excerpt = formData.get('excerpt')?.toString().trim();
  const content = formData.get('content')?.toString().trim();
  const isPublished = formData.get('isPublished') === 'on';
  const currentImageUrl = formData.get('currentImageUrl')?.toString() || null;

  if (!title || !excerpt || !content) {
    redirect('/goblin?error=invalid-post');
  }

  const imageUrl = await uploadImage({
    formData,
    field: 'image',
    bucket: 'post-images',
    currentImageUrl,
  });

  const payload = {
    title,
    slug: slugify(title),
    excerpt,
    content,
    image_url: imageUrl,
    is_published: isPublished,
    published_at: isPublished ? new Date().toISOString() : null,
  };

  const result = id
    ? await supabase.from('posts').update(payload).eq('id', id)
    : await supabase.from('posts').insert(payload);

  if (result.error) {
    console.error('Failed to save post:', result.error.message);
    redirect('/goblin?error=save-post');
  }

  revalidatePath('/');
  revalidatePath('/novidades');
  revalidatePath('/goblin');
  redirect('/goblin?success=post-saved');
}

export async function deletePostAction(formData: FormData) {
  await requireAdmin();

  const id = formData.get('id')?.toString();

  if (!id) {
    redirect('/goblin?error=missing-post');
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from('posts').delete().eq('id', id);

  if (error) {
    console.error('Failed to delete post:', error.message);
    redirect('/goblin?error=delete-post');
  }

  revalidatePath('/');
  revalidatePath('/novidades');
  revalidatePath('/goblin');
  redirect('/goblin?success=post-deleted');
}

async function uploadProductImage(formData: FormData, currentImageUrl: string | null) {
  return uploadImage({
    formData,
    field: 'image',
    bucket: 'product-images',
    currentImageUrl,
  });
}

async function uploadImage({
  formData,
  field,
  bucket,
  currentImageUrl,
}: {
  formData: FormData;
  field: string;
  bucket: string;
  currentImageUrl: string | null;
}) {
  const image = formData.get(field);

  if (!(image instanceof File) || image.size === 0) {
    return currentImageUrl;
  }

  if (!image.type.startsWith('image/') || image.size > MAX_IMAGE_SIZE) {
    redirect('/goblin?error=invalid-image');
  }

  const supabase = await createSupabaseServerClient();
  const extension = image.name.split('.').pop()?.toLowerCase() ?? 'jpg';
  const path = `${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, image, {
      cacheControl: '3600',
      upsert: false,
      contentType: image.type,
    });

  if (error) {
    console.error('Failed to upload product image:', error.message);
    redirect('/goblin?error=image-upload');
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(path);

  return publicUrl;
}

function parseMoney(value?: string | null) {
  if (!value) {
    return null;
  }

  const normalized = value.replace(/\./g, '').replace(',', '.').trim();
  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : null;
}

function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

