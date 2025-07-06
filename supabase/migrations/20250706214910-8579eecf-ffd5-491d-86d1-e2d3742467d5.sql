-- Create enum for portfolio categories
CREATE TYPE portfolio_category AS ENUM (
  'Remodelação Residencial',
  'Decoração de Interiores', 
  'Espaço Comercial',
  'Projeto Premium',
  'Remodelação Completa',
  'Casa de Campo'
);

-- Create portfolio_items table
CREATE TABLE public.portfolio_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category portfolio_category NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  year TEXT NOT NULL,
  image_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  location TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  project TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create partners table
CREATE TABLE public.partners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact_info table
CREATE TABLE public.contact_info (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  phone_primary TEXT,
  phone_secondary TEXT,
  email_primary TEXT,
  email_secondary TEXT,
  address_main TEXT,
  address_secondary TEXT,
  working_hours TEXT,
  facebook_url TEXT,
  instagram_url TEXT,
  linkedin_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create company_settings table
CREATE TABLE public.company_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL DEFAULT 'Atmos Decor',
  logo_url TEXT,
  description TEXT,
  founded_year INTEGER DEFAULT 2006,
  years_experience INTEGER DEFAULT 17,
  projects_completed INTEGER DEFAULT 500,
  availability_hours INTEGER DEFAULT 24,
  meta_title TEXT,
  meta_description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact_messages table for form submissions
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_roles table for admin access
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable Row Level Security
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create function to check admin role
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Public read policies (for website display)
CREATE POLICY "Anyone can view active portfolio items" 
ON public.portfolio_items FOR SELECT 
USING (is_active = true);

CREATE POLICY "Anyone can view active testimonials" 
ON public.testimonials FOR SELECT 
USING (is_active = true);

CREATE POLICY "Anyone can view active partners" 
ON public.partners FOR SELECT 
USING (is_active = true);

CREATE POLICY "Anyone can view contact info" 
ON public.contact_info FOR SELECT 
USING (true);

CREATE POLICY "Anyone can view company settings" 
ON public.company_settings FOR SELECT 
USING (true);

-- Admin policies for full access
CREATE POLICY "Admins can manage portfolio items" 
ON public.portfolio_items FOR ALL 
USING (public.is_admin());

CREATE POLICY "Admins can manage testimonials" 
ON public.testimonials FOR ALL 
USING (public.is_admin());

CREATE POLICY "Admins can manage partners" 
ON public.partners FOR ALL 
USING (public.is_admin());

CREATE POLICY "Admins can manage contact info" 
ON public.contact_info FOR ALL 
USING (public.is_admin());

CREATE POLICY "Admins can manage company settings" 
ON public.company_settings FOR ALL 
USING (public.is_admin());

CREATE POLICY "Admins can view contact messages" 
ON public.contact_messages FOR SELECT 
USING (public.is_admin());

CREATE POLICY "Admins can manage user roles" 
ON public.user_roles FOR ALL 
USING (public.is_admin());

-- Allow anyone to insert contact messages
CREATE POLICY "Anyone can submit contact messages" 
ON public.contact_messages FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_portfolio_items_updated_at
  BEFORE UPDATE ON public.portfolio_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON public.testimonials
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_partners_updated_at
  BEFORE UPDATE ON public.partners
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contact_info_updated_at
  BEFORE UPDATE ON public.contact_info
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_company_settings_updated_at
  BEFORE UPDATE ON public.company_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial data
INSERT INTO public.contact_info (phone_primary, phone_secondary, email_primary, address_main, working_hours)
VALUES (
  '+351 123 456 789',
  '+351 987 654 321', 
  'geral@atmosdecor.pt',
  'Rua da Decoração, 123, 1000-000 Lisboa',
  'Segunda a Sexta: 8h-18h | Sábado: 9h-13h'
);

INSERT INTO public.company_settings (company_name, description, founded_year, years_experience, projects_completed, availability_hours, meta_title, meta_description)
VALUES (
  'Atmos Decor',
  'Empresa líder em remodelação e decoração de luxo. Transformamos espaços com elegância e sofisticação desde 2006.',
  2006,
  17,
  500,
  24,
  'Atmos Decor - Remodelação e Decoração de Luxo',
  'Atmos Decor - Empresa líder em remodelação e decoração de luxo. Transformamos espaços com elegância e sofisticação desde 2006.'
);

-- Insert sample portfolio items
INSERT INTO public.portfolio_items (title, category, description, location, year, sort_order) VALUES
('Apartamento de Luxo', 'Remodelação Residencial', 'Transformação completa de apartamento de 200m² com design contemporâneo e materiais premium.', 'Lisboa', '2024', 1),
('Moradia Moderna', 'Decoração de Interiores', 'Design sofisticado para moradia de 350m² com ambientes integrados e toques dourados.', 'Cascais', '2023', 2),
('Escritório Corporativo', 'Espaço Comercial', 'Remodelação de escritório empresarial focada na produtividade e bem-estar dos colaboradores.', 'Porto', '2024', 3),
('Penthouse Exclusivo', 'Projeto Premium', 'Projeto de alta decoração para penthouse com vista panorâmica e acabamentos de luxo.', 'Estoril', '2023', 4),
('Loft Industrial', 'Remodelação Completa', 'Conversão de espaço industrial em loft moderno mantendo elementos arquitetónicos originais.', 'Lisboa', '2024', 5),
('Villa Mediterrânica', 'Casa de Campo', 'Remodelação de villa com inspiração mediterrânica e integração harmoniosa com o jardim.', 'Sintra', '2023', 6);

-- Insert sample testimonials
INSERT INTO public.testimonials (name, role, location, content, rating, project, sort_order) VALUES
('Maria Santos', 'Proprietária de Apartamento de Luxo', 'Lisboa', 'A Atmos Decor transformou completamente a nossa casa. O resultado superou todas as nossas expectativas. A equipa é extremamente profissional e o acabamento é impecável.', 5, 'Remodelação Completa', 1),
('João Silva', 'CEO de Empresa Tecnológica', 'Porto', 'Contratámos a Atmos Decor para remodelar o nosso escritório. O ambiente ficou moderno, funcional e transmite profissionalismo. Recomendo vivamente!', 5, 'Escritório Corporativo', 2),
('Ana Costa', 'Arquiteta', 'Cascais', 'Como profissional da área, posso afirmar que a qualidade do trabalho da Atmos Decor é excecional. Atenção aos detalhes e materiais de primeira qualidade.', 5, 'Moradia de Luxo', 3),
('Pedro Ferreira', 'Empresário', 'Sintra', 'Desde o primeiro contacto até à entrega final, tudo foi perfeito. A equipa é pontual, organizada e o resultado final é espetacular. Já recomendei a vários amigos.', 5, 'Villa Mediterrânica', 4);

-- Insert sample partners
INSERT INTO public.partners (name, sort_order) VALUES
('Empresa Premium A', 1),
('Construtora Elite B', 2),
('Grupo Imobiliário C', 3),
('Hotel Luxo D', 4),
('Empresa Corporativa E', 5),
('Residencial VIP F', 6);