-- Execute este arquivo depois de criar o usuario no Supabase Auth.
-- Troque UUID_DO_USUARIO_AUTH pelo id do usuario criado em Authentication > Users.
-- A senha deve ser definida diretamente no Supabase Auth, nunca em SQL ou .env.

insert into public.admin_users (user_id, full_name)
values ('657caab3-7508-4b20-9bef-ca45451f0120', 'Viana goblin')
on conflict (user_id) do update
set full_name = excluded.full_name;
