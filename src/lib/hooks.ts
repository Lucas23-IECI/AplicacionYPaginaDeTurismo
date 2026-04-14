import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import type { Database } from './types';

type DestinationRow = Database['public']['Tables']['destinations']['Row'];

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

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetcher()
      .then((result) => { if (mounted) { setData(result); setLoading(false); } })
      .catch((err) => { if (mounted) { setError(err.message); setLoading(false); } });
    return () => { mounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
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
