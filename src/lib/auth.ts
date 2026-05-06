import { redirect } from 'next/navigation';
import { hasSupabaseConfig } from '@/lib/env';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function getCurrentAdmin() {
  if (!hasSupabaseConfig()) {
    return null;
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data } = await supabase
    .from('admin_users')
    .select('user_id, full_name')
    .eq('user_id', user.id)
    .maybeSingle();

  if (!data) {
    return null;
  }

  return {
    id: user.id,
    email: user.email ?? '',
    name: data.full_name as string | null,
  };
}

export async function requireAdmin() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect('/goblin/login');
  }

  return admin;
}
