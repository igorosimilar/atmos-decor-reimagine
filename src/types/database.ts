export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Remodelação Residencial' | 'Decoração de Interiores' | 'Espaço Comercial' | 'Projeto Premium' | 'Remodelação Completa' | 'Casa de Campo';
  description: string;
  location: string;
  year: string;
  image_url?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  content: string;
  rating: number;
  project?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Partner {
  id: string;
  name: string;
  logo_url?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ContactInfo {
  id: string;
  phone_primary?: string;
  phone_secondary?: string;
  email_primary?: string;
  email_secondary?: string;
  address_main?: string;
  address_secondary?: string;
  working_hours?: string;
  facebook_url?: string;
  instagram_url?: string;
  linkedin_url?: string;
  updated_at: string;
}

export interface CompanySettings {
  id: string;
  company_name: string;
  logo_url?: string;
  description?: string;
  founded_year?: number;
  years_experience?: number;
  projects_completed?: number;
  availability_hours?: number;
  meta_title?: string;
  meta_description?: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  is_read: boolean;
  created_at: string;
}