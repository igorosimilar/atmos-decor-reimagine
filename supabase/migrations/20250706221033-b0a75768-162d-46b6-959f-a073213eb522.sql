-- Create storage bucket for partner logos
INSERT INTO storage.buckets (id, name, public) VALUES ('partner-logos', 'partner-logos', true);

-- Create policies for partner logo uploads
CREATE POLICY "Partner logos are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'partner-logos');

CREATE POLICY "Admins can upload partner logos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'partner-logos' AND is_admin());

CREATE POLICY "Admins can update partner logos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'partner-logos' AND is_admin());

CREATE POLICY "Admins can delete partner logos" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'partner-logos' AND is_admin());

-- Create storage bucket for portfolio images
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio-images', 'portfolio-images', true);

-- Create policies for portfolio images
CREATE POLICY "Portfolio images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'portfolio-images');

CREATE POLICY "Admins can upload portfolio images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'portfolio-images' AND is_admin());

CREATE POLICY "Admins can update portfolio images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'portfolio-images' AND is_admin());

CREATE POLICY "Admins can delete portfolio images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'portfolio-images' AND is_admin());