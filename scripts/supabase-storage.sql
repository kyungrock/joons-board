-- Supabase Storage: "내 파일" 업로드가 되려면 버킷 + RLS가 필요합니다.
-- 앱의 "Storage 버킷 ID" 입력값과 같은 id 로 대시보드 Storage 에 버킷을 만든 뒤, 아래의 joons-assets 를 그 id 로 바꿔 SQL Editor 에서 실행하세요.
-- (기본 예시 id 는 joons-assets 입니다. 이미 정책이 있으면 이름 충돌 시 삭제 후 다시 실행하세요.)

insert into storage.buckets (id, name, public)
values ('joons-assets', 'joons-assets', true)
on conflict (id) do update set public = excluded.public;

-- 업로드 경로는 editor.js 의 makeStoragePath 와 같이 첫 세그먼트 = 로그인 사용자 UUID 입니다.
-- 예:  {user_uuid}/my-files/173....-ab12.jpg

drop policy if exists "joons_assets_insert_own" on storage.objects;
create policy "joons_assets_insert_own"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'joons-assets'
    and split_part(name, '/', 1) = (auth.jwt() ->> 'sub')
  );

drop policy if exists "joons_assets_update_own" on storage.objects;
create policy "joons_assets_update_own"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'joons-assets'
    and split_part(name, '/', 1) = (auth.jwt() ->> 'sub')
  )
  with check (
    bucket_id = 'joons-assets'
    and split_part(name, '/', 1) = (auth.jwt() ->> 'sub')
  );

drop policy if exists "joons_assets_delete_own" on storage.objects;
create policy "joons_assets_delete_own"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'joons-assets'
    and split_part(name, '/', 1) = (auth.jwt() ->> 'sub')
  );

-- getPublicUrl 로 붙는 주소를 브라우저·fabric 이 읽을 수 있게 공개 읽기(버킷 public=true 와 함께 사용)
drop policy if exists "joons_assets_select_public" on storage.objects;
create policy "joons_assets_select_public"
  on storage.objects for select
  using (bucket_id = 'joons-assets');
