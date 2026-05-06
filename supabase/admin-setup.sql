-- Execute este arquivo depois de criar o usuario no Supabase Auth.
-- Troque UUID_DO_USUARIO_AUTH pelo id do usuario criado em Authentication > Users.
-- A senha deve ser definida diretamente no Supabase Auth, nunca em SQL ou .env.

insert into public.admin_users (user_id, full_name)
values ('ccb86e29-9dd4-411d-b1a3-d15154ab0db8', 'Goblin-Rei')
on conflict (user_id) do update
set full_name = excluded.full_name;

insert into public.admin_users (user_id, full_name)
  values ('UUID_DO_USUARIO_AUTH', 'Viana-Goblin')
  on conflict (user_id) do update
  set full_name = excluded.full_name;