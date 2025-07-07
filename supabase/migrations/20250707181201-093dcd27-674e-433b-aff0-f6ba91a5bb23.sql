-- Insert sample portfolio items with construction/renovation images
INSERT INTO portfolio_items (title, category, description, location, year, image_url, is_active, sort_order) VALUES
(
  'Remodelação Moderna em Cascais',
  'Remodelação Residencial',
  'Transformação completa de apartamento de 3 quartos com design moderno e acabamentos de luxo.',
  'Cascais, Lisboa',
  '2024', 
  'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop',
  true,
  1
),
(
  'Villa de Luxo na Comporta', 
  'Casa de Campo',
  'Construção de villa de luxo com 5 quartos, piscina infinita e vista para o oceano.',
  'Comporta, Setúbal',
  '2023',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
  true,
  2
),
(
  'Escritório Corporativo no Porto',
  'Espaço Comercial', 
  'Design e remodelação de escritório moderno com 500m² para empresa de tecnologia.',
  'Porto',
  '2024',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
  true,
  3
),
(
  'Apartamento de Luxo em Lisboa',
  'Projeto Premium',
  'Remodelação total de penthouse com terraço panorâmico sobre o Rio Tejo.',
  'Chiado, Lisboa', 
  '2023',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
  true,
  4
),
(
  'Casa Tradicional em Óbidos',
  'Remodelação Completa',
  'Restauro e modernização de casa tradicional portuguesa do século XVIII.',
  'Óbidos, Leiria',
  '2023',
  'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop',
  true,
  5
),
(
  'Loft Industrial em Lisboa',
  'Decoração de Interiores',
  'Transformação de antigo armazém em loft moderno com elementos industriais.',
  'Marvila, Lisboa',
  '2024',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
  true,
  6
);

-- Insert sample testimonials
INSERT INTO testimonials (name, role, location, content, rating, project, is_active, sort_order) VALUES
(
  'Ana Silva',
  'Proprietária',
  'Cascais',
  'A RC Construções transformou completamente o nosso apartamento. O resultado superou todas as nossas expectativas. Profissionalismo e qualidade excepcionais.',
  5,
  'Remodelação Residencial',
  true,
  1  
),
(
  'João Santos',
  'CEO',
  'Porto', 
  'Escolhemos a RC Construções para o nosso novo escritório e foi a melhor decisão. Cumpriram todos os prazos e o resultado é espetacular.',
  5,
  'Espaço Comercial',
  true,
  2
),
(
  'Maria Costa',
  'Arquiteta',
  'Lisboa',
  'Como arquiteta, posso dizer que a RC Construções tem uma equipa excecional. A atenção aos detalhes e a qualidade dos acabamentos são impressionantes.',
  5,
  'Projeto Premium', 
  true,
  3
),
(
  'Carlos Ferreira',
  'Empresário',
  'Comporta',
  'A construção da nossa villa foi um processo sem stress graças à RC Construções. Comunicação clara, trabalho de qualidade e resultados excepcionais.',
  5,
  'Casa de Campo',
  true,
  4
);

-- Insert sample partners
INSERT INTO partners (name, logo_url, is_active, sort_order) VALUES
('Leroy Merlin', null, true, 1),
('IKEA Portugal', null, true, 2),
('Sanitana', null, true, 3),
('Roca', null, true, 4),
('Grohe', null, true, 5),
('Velux', null, true, 6);

-- Update company settings with RC Construções info
INSERT INTO company_settings (company_name, description, founded_year, years_experience, projects_completed, availability_hours) VALUES 
('RC Construções', 'Empresa líder em construção e remodelação com mais de 17 anos de experiência', 2006, 17, 500, 24)
ON CONFLICT (id) DO UPDATE SET
company_name = EXCLUDED.company_name,
description = EXCLUDED.description,
founded_year = EXCLUDED.founded_year,
years_experience = EXCLUDED.years_experience,
projects_completed = EXCLUDED.projects_completed,
availability_hours = EXCLUDED.availability_hours;