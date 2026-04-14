import { supabase } from './supabase';

const EVENT_IMAGES_BUCKET = 'event-images';
const ADVERTISER_LOGOS_BUCKET = 'advertiser-logos';

export async function uploadEventImage(file: File, eventId: string): Promise<string> {
  const ext = file.name.split('.').pop();
  const fileName = `${eventId}/${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from(EVENT_IMAGES_BUCKET)
    .upload(fileName, file, { cacheControl: '3600', upsert: false });

  if (error) throw error;

  const { data } = supabase.storage
    .from(EVENT_IMAGES_BUCKET)
    .getPublicUrl(fileName);

  return data.publicUrl;
}

export async function deleteEventImage(path: string): Promise<void> {
  const { error } = await supabase.storage
    .from(EVENT_IMAGES_BUCKET)
    .remove([path]);

  if (error) throw error;
}

export async function uploadAdvertiserLogo(file: File, advertiserId: string): Promise<string> {
  const ext = file.name.split('.').pop();
  const fileName = `${advertiserId}/logo.${ext}`;

  const { error } = await supabase.storage
    .from(ADVERTISER_LOGOS_BUCKET)
    .upload(fileName, file, { cacheControl: '3600', upsert: true });

  if (error) throw error;

  const { data } = supabase.storage
    .from(ADVERTISER_LOGOS_BUCKET)
    .getPublicUrl(fileName);

  return data.publicUrl;
}

export function getPublicUrl(bucket: string, path: string): string {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}
