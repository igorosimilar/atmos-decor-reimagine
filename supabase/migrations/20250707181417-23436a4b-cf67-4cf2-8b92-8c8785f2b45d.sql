-- Create storage bucket for company assets (logos, etc)
INSERT INTO storage.buckets (id, name, public) VALUES ('company-assets', 'company-assets', true);

-- Create policies for company assets
CREATE POLICY "Company assets are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'company-assets');

CREATE POLICY "Admins can upload company assets" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'company-assets' AND is_admin());

CREATE POLICY "Admins can update company assets" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'company-assets' AND is_admin());

CREATE POLICY "Admins can delete company assets" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'company-assets' AND is_admin());

-- Insert sample contact info
INSERT INTO contact_info (phone_primary, phone_secondary, email_primary, email_secondary, address_main, working_hours, facebook_url, instagram_url, linkedin_url) VALUES 
('210 153 627', '96X XXX XXX', 'geral@rcconstrucoes.pt', 'info@rcconstrucoes.pt', 'Rua Principal, 123, Rio de Mouro, 2635-XXX Sintra', 'Segunda a Sexta: 9h-18h
Sábado: 9h-13h
Domingo: Fechado
Disponibilidade 24h para emergências', 'https://facebook.com/rcconstrucoes', 'https://instagram.com/rcconstrucoes', 'https://linkedin.com/company/rcconstrucoes');