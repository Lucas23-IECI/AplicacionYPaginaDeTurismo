export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type EventStatus = 'draft' | 'pending' | 'approved' | 'rejected' | 'archived';
export type TestimonialType = 'tourist' | 'advertiser';
export type FAQCategory = 'tourist' | 'advertiser' | 'general';
export type SubscriptionTier = 'basico' | 'profesional' | 'premium';
export type SubscriptionStatus = 'active' | 'inactive' | 'cancelled';
export type UserRole = 'admin' | 'advertiser';

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          icon: string;
          color: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['categories']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['categories']['Insert']>;
        Relationships: [];
      };
      destinations: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string;
          image_url: string;
          lat: number;
          lng: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['destinations']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['destinations']['Insert']>;
        Relationships: [];
      };
      events: {
        Row: {
          id: string;
          title: string;
          slug: string;
          short_description: string;
          description: string;
          category_id: string;
          destination_id: string;
          advertiser_id: string | null;
          price: number;
          currency: string;
          date_start: string;
          date_end: string | null;
          time_start: string;
          time_end: string | null;
          address: string;
          city: string;
          lat: number;
          lng: number;
          tag: string | null;
          featured: boolean;
          spotlight: boolean;
          status: EventStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['events']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['events']['Insert']>;
        Relationships: [];
      };
      event_images: {
        Row: {
          id: string;
          event_id: string;
          image_url: string;
          display_order: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['event_images']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['event_images']['Insert']>;
        Relationships: [];
      };
      advertisers: {
        Row: {
          id: string;
          user_id: string;
          business_name: string;
          contact_name: string;
          phone: string | null;
          email: string;
          website: string | null;
          logo_url: string | null;
          description: string | null;
          subscription_tier: SubscriptionTier;
          subscription_status: SubscriptionStatus;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['advertisers']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['advertisers']['Insert']>;
        Relationships: [];
      };
      testimonials: {
        Row: {
          id: string;
          name: string;
          city: string;
          avatar_url: string | null;
          text: string;
          rating: number;
          type: TestimonialType;
          featured: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['testimonials']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['testimonials']['Insert']>;
        Relationships: [];
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          subscribed_at: string;
          unsubscribed_at: string | null;
        };
        Insert: { email: string };
        Update: { unsubscribed_at?: string };
        Relationships: [];
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          read: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['contact_messages']['Row'], 'id' | 'read' | 'created_at'>;
        Update: { read?: boolean };
        Relationships: [];
      };
      faq_items: {
        Row: {
          id: string;
          question: string;
          answer: string;
          category: FAQCategory;
          display_order: number;
          active: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['faq_items']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['faq_items']['Insert']>;
        Relationships: [];
      };
      user_roles: {
        Row: {
          id: string;
          user_id: string;
          role: UserRole;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['user_roles']['Row'], 'id' | 'created_at'>;
        Update: { role?: UserRole };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

// Convenience types
export type Category = Database['public']['Tables']['categories']['Row'];
export type Destination = Database['public']['Tables']['destinations']['Row'];
export type Event = Database['public']['Tables']['events']['Row'];
export type EventImage = Database['public']['Tables']['event_images']['Row'];
export type Advertiser = Database['public']['Tables']['advertisers']['Row'];
export type Testimonial = Database['public']['Tables']['testimonials']['Row'];
export type NewsletterSubscriber = Database['public']['Tables']['newsletter_subscribers']['Row'];
export type ContactMessage = Database['public']['Tables']['contact_messages']['Row'];
export type FAQItem = Database['public']['Tables']['faq_items']['Row'];
export type UserRoleRow = Database['public']['Tables']['user_roles']['Row'];

// Event with joined data
export interface EventWithDetails extends Event {
  category?: Category;
  destination?: Destination;
  images?: EventImage[];
  advertiser?: Advertiser;
}
