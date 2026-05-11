'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CATEGORIES, type ProductCategory } from '@/data/products';
import { hasSupabaseConfig } from '@/lib/env';
import { requireAdmin } from '@/lib/auth';
import { createSupabaseServerClient } from '@/lib/supabase/server';

const PRODUCT_IMAGE_BUCKET = 'product-images';
const MAX_IMAGE_SIZE = 8 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const IMAGE_EXTENSIONS: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

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
  const removeImage = formData.get('removeImage') === '1';

  if (!name || !category || !description || !CATEGORIES.includes(category)) {
    redirect('/goblin?error=invalid-product');
  }

  const slug = slugify(name);
  const { imageUrl, shouldDeleteCurrentImage } = await resolveProductImage({
    formData,
    currentImageUrl,
    removeImage,
    slug,
  });

  const payload = {
    name,
    slug,
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
    if (imageUrl && imageUrl !== currentImageUrl) {
      await deleteProductImage(imageUrl);
    }

    console.error('Failed to save product:', result.error.message);
    redirect('/goblin?error=save-product');
  }

  if (shouldDeleteCurrentImage) {
    await deleteProductImage(currentImageUrl);
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
  const { data: product } = await supabase
    .from('products')
    .select('image_url')
    .eq('id', id)
    .maybeSingle();

  const { error } = await supabase.from('products').delete().eq('id', id);

  if (error) {
    console.error('Failed to delete product:', error.message);
    redirect('/goblin?error=delete-product');
  }

  await deleteProductImage(product?.image_url ?? null);

  revalidatePath('/');
  revalidatePath('/produtos');
  revalidatePath('/goblin');
  redirect('/goblin?success=product-deleted');
}

async function resolveProductImage({
  formData,
  currentImageUrl,
  removeImage,
  slug,
}: {
  formData: FormData;
  currentImageUrl: string | null;
  removeImage: boolean;
  slug: string;
}) {
  const image = formData.get('image');

  if (!(image instanceof File) || image.size === 0) {
    if (removeImage) {
      return {
        imageUrl: null,
        shouldDeleteCurrentImage: Boolean(currentImageUrl),
      };
    }

    return {
      imageUrl: currentImageUrl,
      shouldDeleteCurrentImage: false,
    };
  }

  if (!ALLOWED_IMAGE_TYPES.includes(image.type) || image.size > MAX_IMAGE_SIZE) {
    redirect('/goblin?error=invalid-image');
  }

  const supabase = await createSupabaseServerClient();
  const extension = IMAGE_EXTENSIONS[image.type];
  const path = `${slug}/${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage
    .from(PRODUCT_IMAGE_BUCKET)
    .upload(path, image, {
      cacheControl: '31536000',
      upsert: false,
      contentType: image.type,
    });

  if (error) {
    console.error('Failed to upload product image:', error.message);
    redirect('/goblin?error=image-upload');
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(PRODUCT_IMAGE_BUCKET).getPublicUrl(path);

  return {
    imageUrl: publicUrl,
    shouldDeleteCurrentImage: Boolean(currentImageUrl),
  };
}

async function deleteProductImage(imageUrl: string | null) {
  const path = getProductImagePath(imageUrl);

  if (!path) {
    return;
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.storage.from(PRODUCT_IMAGE_BUCKET).remove([path]);

  if (error) {
    console.error('Failed to remove previous product image:', error.message);
  }
}

function getProductImagePath(imageUrl: string | null) {
  if (!imageUrl) {
    return null;
  }

  const marker = `/storage/v1/object/public/${PRODUCT_IMAGE_BUCKET}/`;
  const markerIndex = imageUrl.indexOf(marker);

  if (markerIndex === -1) {
    return null;
  }

  return decodeURIComponent(imageUrl.slice(markerIndex + marker.length));
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

