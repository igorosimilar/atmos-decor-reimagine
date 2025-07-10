-- Create hero banners table for managing homepage banners
CREATE TABLE public.hero_banners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  image_url TEXT,
  cta_text TEXT DEFAULT 'Solicitar Orçamento',
  cta_link TEXT DEFAULT '#contactos',
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.hero_banners ENABLE ROW LEVEL SECURITY;

-- Create policies for hero banners
CREATE POLICY "Anyone can view active hero banners" 
ON public.hero_banners 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage hero banners" 
ON public.hero_banners 
FOR ALL 
USING (is_admin());

-- Expand contact messages table for detailed quote requests
ALTER TABLE public.contact_messages 
ADD COLUMN project_type TEXT,
ADD COLUMN project_area NUMERIC,
ADD COLUMN estimated_budget TEXT,
ADD COLUMN desired_timeline TEXT,
ADD COLUMN project_description TEXT,
ADD COLUMN has_plans BOOLEAN DEFAULT false,
ADD COLUMN plans_url TEXT,
ADD COLUMN location TEXT,
ADD COLUMN contact_preference TEXT DEFAULT 'phone',
ADD COLUMN status TEXT DEFAULT 'new',
ADD COLUMN priority TEXT DEFAULT 'normal',
ADD COLUMN assigned_to UUID,
ADD COLUMN notes TEXT,
ADD COLUMN follow_up_date DATE;

-- Add index for better performance
CREATE INDEX idx_contact_messages_status ON public.contact_messages(status);
CREATE INDEX idx_contact_messages_priority ON public.contact_messages(priority);
CREATE INDEX idx_contact_messages_created_at ON public.contact_messages(created_at);

-- Create trigger for hero banners
CREATE TRIGGER update_hero_banners_updated_at
BEFORE UPDATE ON public.hero_banners
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample hero banner
INSERT INTO public.hero_banners (
  title, 
  subtitle, 
  image_url, 
  cta_text,
  is_active
) VALUES (
  'Construções de Excelência',
  'Mais de 17 anos de experiência em construção e remodelação de qualidade superior.',
  '/src/assets/hero-construction.jpg',
  'Solicitar Orçamento',
  true
);