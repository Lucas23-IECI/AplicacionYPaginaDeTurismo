import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import type { Database } from './types';

type Tables = Database['public']['Tables'];
type DestinationRow = Tables['destinations']['Row'];

// ── Shared types matching the old mock data interfaces ──
export interface Event {
  id: string;
  slug: string;
  category: string;
  categorySlug: string;
  title: string;
  shortDescription: string;
  description: string;
  city: string;
  destinationSlug: string;
  dateStart: string;
  dateEnd?: string;
  timeStart: string;
  timeEnd?: string;
  address: string;
  lat: number;
  lng: number;
  price: number;
  currency: string;
  tag?: string;
  featured: boolean;
  spotlight: boolean;
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'archived';
  images: string[];
  advertiserId?: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
}

export interface Destination {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  lat: number;
  lng: number;
  eventCount: number;
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  avatar: string;
  text: string;
  rating: number;
  type: 'tourist' | 'advertiser';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'tourist' | 'advertiser' | 'general';
}

// ── Helper ──
export function formatPrice(price: number): string {
  return price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 });
}

// ── Generic fetch hook ──
function useSupabaseQuery<T>(fetcher: () => Promise<T>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetcher()
      .then((result) => { if (mounted) { setData(result); setLoading(false); } })
      .catch((err) => { if (mounted) { setError(err.message); setLoading(false); } });
    return () => { mounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tick]);

  const refetch = () => setTick((t) => t + 1);

  return { data, loading, error, refetch };
}

// ── EVENTS ──
export function useEvents() {
  return useSupabaseQuery<Event[]>(async () => {
    const { data: rows, error } = await supabase
      .from('events')
      .select('*, categories(name, slug), destinations(slug), event_images(image_url, display_order)')
      .eq('status', 'approved')
      .order('date_start', { ascending: true });

    if (error) throw error;
    return (rows ?? []).map(mapEvent);
  });
}

export function useAllEvents() {
  return useSupabaseQuery<Event[]>(async () => {
    const { data: rows, error } = await supabase
      .from('events')
      .select('*, categories(name, slug), destinations(slug), event_images(image_url, display_order)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (rows ?? []).map(mapEvent);
  });
}

export function useEventBySlug(slug: string | undefined) {
  return useSupabaseQuery<Event | null>(async () => {
    if (!slug) return null;
    const { data: row, error } = await supabase
      .from('events')
      .select('*, categories(name, slug), destinations(slug), event_images(image_url, display_order)')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return row ? mapEvent(row) : null;
  }, [slug]);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapEvent(row: any): Event {
  const cats = row.categories as { name: string; slug: string } | null;
  const dest = row.destinations as { slug: string } | null;
  const imgs = (row.event_images as { image_url: string; display_order: number }[] | null) ?? [];
  imgs.sort((a, b) => a.display_order - b.display_order);

  return {
    id: row.id,
    slug: row.slug,
    category: cats?.name ?? '',
    categorySlug: cats?.slug ?? '',
    title: row.title,
    shortDescription: row.short_description,
    description: row.description ?? '',
    city: row.city,
    destinationSlug: dest?.slug ?? '',
    dateStart: row.date_start,
    dateEnd: row.date_end ?? undefined,
    timeStart: row.time_start,
    timeEnd: row.time_end ?? undefined,
    address: row.address,
    lat: row.lat,
    lng: row.lng,
    price: row.price,
    currency: row.currency,
    tag: row.tag ?? undefined,
    featured: row.featured,
    spotlight: row.spotlight,
    status: row.status,
    images: imgs.length > 0 ? imgs.map((i) => i.image_url) : [],
    advertiserId: row.advertiser_id ?? undefined,
    createdAt: row.created_at,
  };
}

// ── CATEGORIES ──
export function useCategories() {
  return useSupabaseQuery<Category[]>(async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) throw error;
    return (data ?? []).map((r) => ({
      id: r.id,
      name: r.name,
      slug: r.slug,
      icon: r.icon,
      color: r.color,
    }));
  });
}

// ── DESTINATIONS ──
export function useDestinations() {
  return useSupabaseQuery<Destination[]>(async () => {
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .order('name');

    if (error) throw error;

    // Get event counts per destination
    const { data: counts } = await supabase
      .from('events')
      .select('destination_id')
      .eq('status', 'approved');

    const countMap: Record<string, number> = {};
    (counts ?? []).forEach((e) => {
      if (e.destination_id) countMap[e.destination_id] = (countMap[e.destination_id] || 0) + 1;
    });

    return (data ?? []).map((r) => ({
      id: r.id,
      name: r.name,
      slug: r.slug,
      description: r.description,
      image: r.image_url,
      lat: r.lat,
      lng: r.lng,
      eventCount: countMap[r.id] || 0,
    }));
  });
}

export function useDestinationBySlug(slug: string | undefined) {
  return useSupabaseQuery<Destination | null>(async () => {
    if (!slug) return null;
    const { data: r, error } = await supabase
      .from('destinations')
      .select('*')
      .eq('slug', slug)
      .single<DestinationRow>();

    if (error) throw error;
    if (!r) return null;

    const { count } = await supabase
      .from('events')
      .select('id', { count: 'exact', head: true })
      .eq('destination_id', r.id)
      .eq('status', 'approved');

    return {
      id: r.id,
      name: r.name,
      slug: r.slug,
      description: r.description,
      image: r.image_url,
      lat: r.lat,
      lng: r.lng,
      eventCount: count ?? 0,
    };
  }, [slug]);
}

// ── TESTIMONIALS ──
export function useTestimonials() {
  return useSupabaseQuery<Testimonial[]>(async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data ?? []).map((r) => ({
      id: r.id,
      name: r.name,
      city: r.city,
      avatar: r.avatar_url,
      text: r.text,
      rating: r.rating,
      type: r.type as 'tourist' | 'advertiser',
    }));
  });
}

// ── FAQ ──
export function useFAQ() {
  return useSupabaseQuery<FAQItem[]>(async () => {
    const { data, error } = await supabase
      .from('faq_items')
      .select('*')
      .eq('active', true)
      .order('display_order');

    if (error) throw error;
    return (data ?? []).map((r) => ({
      id: r.id,
      question: r.question,
      answer: r.answer,
      category: r.category as 'tourist' | 'advertiser' | 'general',
    }));
  });
}

// ── ADMIN: Dashboard Stats ──
export interface AdminStats {
  totalEvents: number;
  pendingEvents: number;
  approvedEvents: number;
  totalSubscribers: number;
  unreadMessages: number;
  totalTestimonials: number;
}

export function useAdminStats() {
  return useSupabaseQuery<AdminStats>(async () => {
    const [events, pending, approved, subs, msgs, testimonials] = await Promise.all([
      supabase.from('events').select('id', { count: 'exact', head: true }),
      supabase.from('events').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('events').select('id', { count: 'exact', head: true }).eq('status', 'approved'),
      supabase.from('newsletter_subscribers').select('id', { count: 'exact', head: true }).is('unsubscribed_at', null),
      supabase.from('contact_messages').select('id', { count: 'exact', head: true }).eq('read', false),
      supabase.from('testimonials').select('id', { count: 'exact', head: true }),
    ]);
    return {
      totalEvents: events.count ?? 0,
      pendingEvents: pending.count ?? 0,
      approvedEvents: approved.count ?? 0,
      totalSubscribers: subs.count ?? 0,
      unreadMessages: msgs.count ?? 0,
      totalTestimonials: testimonials.count ?? 0,
    };
  });
}

// ── ADMIN: Pending Events ──
export function usePendingEvents() {
  return useSupabaseQuery<Event[]>(async () => {
    const { data: rows, error } = await supabase
      .from('events')
      .select('*, categories(name, slug), destinations(slug), event_images(image_url, display_order)')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (rows ?? []).map(mapEvent);
  });
}

// ── ADMIN: Newsletter subscribers ──
export interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
  unsubscribedAt: string | null;
}

export function useSubscribers() {
  return useSupabaseQuery<Subscriber[]>(async () => {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .order('subscribed_at', { ascending: false });

    if (error) throw error;
    return (data ?? []).map((r) => ({
      id: r.id,
      email: r.email,
      subscribedAt: r.subscribed_at,
      unsubscribedAt: r.unsubscribed_at,
    }));
  });
}

// ── ADMIN: Contact messages ──
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export function useMessages() {
  return useSupabaseQuery<ContactMessage[]>(async () => {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data ?? []).map((r) => ({
      id: r.id,
      name: r.name,
      email: r.email,
      subject: r.subject,
      message: r.message,
      read: r.read,
      createdAt: r.created_at,
    }));
  });
}

// ── ADMIN: Mutation helpers ──
export async function updateEventStatus(id: string, status: string) {
  const { error } = await supabase.from('events').update({ status } as Tables['events']['Update']).eq('id', id);
  if (error) throw error;
}

export async function deleteEvent(id: string) {
  await supabase.from('event_images').delete().eq('event_id', id);
  const { error } = await supabase.from('events').delete().eq('id', id);
  if (error) throw error;
}

export async function deleteTestimonial(id: string) {
  const { error } = await supabase.from('testimonials').delete().eq('id', id);
  if (error) throw error;
}

export async function deleteFAQItem(id: string) {
  const { error } = await supabase.from('faq_items').delete().eq('id', id);
  if (error) throw error;
}

export async function markMessageRead(id: string) {
  const { error } = await supabase.from('contact_messages').update({ read: true } as Tables['contact_messages']['Update']).eq('id', id);
  if (error) throw error;
}

export async function deleteMessage(id: string) {
  const { error } = await supabase.from('contact_messages').delete().eq('id', id);
  if (error) throw error;
}

export async function upsertFAQItem(item: { id?: string; question: string; answer: string; category: string; display_order?: number }) {
  const payload = { question: item.question, answer: item.answer, category: item.category as Tables['faq_items']['Row']['category'], display_order: item.display_order ?? 0, active: true } satisfies Tables['faq_items']['Insert'];
  if (item.id) {
    const { error } = await supabase.from('faq_items').update(payload as Tables['faq_items']['Update']).eq('id', item.id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from('faq_items').insert(payload);
    if (error) throw error;
  }
}

export async function upsertTestimonial(t: { id?: string; name: string; city: string; text: string; rating: number; type: string; avatar_url: string; featured: boolean }) {
  const payload = { name: t.name, city: t.city, text: t.text, rating: t.rating, type: t.type as Tables['testimonials']['Row']['type'], avatar_url: t.avatar_url, featured: t.featured } satisfies Tables['testimonials']['Insert'];
  if (t.id) {
    const { error } = await supabase.from('testimonials').update(payload as Tables['testimonials']['Update']).eq('id', t.id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from('testimonials').insert(payload);
    if (error) throw error;
  }
}

// ── PORTAL: Advertiser profile ──
export interface AdvertiserProfile {
  id: string;
  userId: string;
  businessName: string;
  contactName: string;
  phone: string | null;
  email: string;
  website: string | null;
  logoUrl: string | null;
  description: string | null;
  subscriptionTier: 'basico' | 'profesional' | 'premium';
  subscriptionStatus: 'active' | 'inactive' | 'cancelled';
  createdAt: string;
}

function mapAdvertiser(r: Tables['advertisers']['Row']): AdvertiserProfile {
  return {
    id: r.id,
    userId: r.user_id,
    businessName: r.business_name,
    contactName: r.contact_name,
    phone: r.phone,
    email: r.email,
    website: r.website,
    logoUrl: r.logo_url,
    description: r.description,
    subscriptionTier: r.subscription_tier,
    subscriptionStatus: r.subscription_status,
    createdAt: r.created_at,
  };
}

export function useAdvertiserProfile(userId: string | undefined) {
  return useSupabaseQuery<AdvertiserProfile | null>(async () => {
    if (!userId) return null;
    const { data, error } = await supabase
      .from('advertisers')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    if (error) throw error;
    return data ? mapAdvertiser(data) : null;
  }, [userId]);
}

export function useMyEvents(advertiserId: string | undefined) {
  return useSupabaseQuery<Event[]>(async () => {
    if (!advertiserId) return [];
    const { data: rows, error } = await supabase
      .from('events')
      .select('*, categories(name, slug), destinations(slug), event_images(image_url, display_order)')
      .eq('advertiser_id', advertiserId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (rows ?? []).map(mapEvent);
  }, [advertiserId]);
}

export function useEventById(id: string | undefined) {
  return useSupabaseQuery<Event | null>(async () => {
    if (!id) return null;
    const { data: row, error } = await supabase
      .from('events')
      .select('*, categories(name, slug), destinations(slug), event_images(image_url, display_order)')
      .eq('id', id)
      .single();
    if (error) throw error;
    return row ? mapEvent(row) : null;
  }, [id]);
}

export async function createEvent(payload: Tables['events']['Insert']) {
  const { data, error } = await supabase.from('events').insert(payload).select().single();
  if (error) throw error;
  return data;
}

export async function updateEvent(id: string, payload: Tables['events']['Update']) {
  const { error } = await supabase.from('events').update(payload).eq('id', id);
  if (error) throw error;
}

export async function createAdvertiserProfile(payload: Tables['advertisers']['Insert']) {
  const { data, error } = await supabase.from('advertisers').insert(payload).select().single();
  if (error) throw error;
  return data;
}

export async function updateAdvertiserProfile(id: string, payload: Tables['advertisers']['Update']) {
  const { error } = await supabase.from('advertisers').update(payload).eq('id', id);
  if (error) throw error;
}

export async function insertEventImages(images: Tables['event_images']['Insert'][]) {
  if (images.length === 0) return;
  const { error } = await supabase.from('event_images').insert(images);
  if (error) throw error;
}
