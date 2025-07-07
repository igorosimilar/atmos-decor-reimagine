import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Globe, Calendar, Users, Trophy, Clock, Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CompanySettings } from '@/types/database';
import ImageUpload from '@/components/admin/ImageUpload';

export default function CompanySettingsManager() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [companySettings, setCompanySettings] = useState<CompanySettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    company_name: '',
    logo_url: '',
    description: '',
    founded_year: 2006,
    years_experience: 17,
    projects_completed: 500,
    availability_hours: 24,
    meta_title: '',
    meta_description: '',
  });

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/admin/login');
      return;
    }
    if (user && isAdmin) {
      fetchCompanySettings();
    }
  }, [user, isAdmin, loading, navigate]);

  const fetchCompanySettings = async () => {
    try {
      const { data, error } = await supabase
        .from('company_settings')
        .select('*')
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        setCompanySettings(data);
        setFormData({
          company_name: data.company_name || '',
          logo_url: data.logo_url || '',
          description: data.description || '',
          founded_year: data.founded_year || 2006,
          years_experience: data.years_experience || 17,
          projects_completed: data.projects_completed || 500,
          availability_hours: data.availability_hours || 24,
          meta_title: data.meta_title || '',
          meta_description: data.meta_description || '',
        });
      }
    } catch (error) {
      console.error('Error fetching company settings:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao carregar configurações da empresa',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (companySettings) {
        // Update existing record
        const { error } = await supabase
          .from('company_settings')
          .update({
            company_name: formData.company_name,
            logo_url: formData.logo_url || null,
            description: formData.description || null,
            founded_year: formData.founded_year,
            years_experience: formData.years_experience,
            projects_completed: formData.projects_completed,
            availability_hours: formData.availability_hours,
            meta_title: formData.meta_title || null,
            meta_description: formData.meta_description || null,
          })
          .eq('id', companySettings.id);

        if (error) throw error;
      } else {
        // Create new record
        const { error } = await supabase
          .from('company_settings')
          .insert({
            company_name: formData.company_name,
            logo_url: formData.logo_url || null,
            description: formData.description || null,
            founded_year: formData.founded_year,
            years_experience: formData.years_experience,
            projects_completed: formData.projects_completed,
            availability_hours: formData.availability_hours,
            meta_title: formData.meta_title || null,
            meta_description: formData.meta_description || null,
          });

        if (error) throw error;
      }

      toast({
        title: 'Sucesso',
        description: 'Configurações da empresa atualizadas com sucesso!',
      });
      
      fetchCompanySettings();
    } catch (error) {
      console.error('Error saving company settings:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao salvar configurações da empresa',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (loading || isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary">Configurações da Empresa</h1>
          <p className="text-muted-foreground">
            Configure as informações principais da empresa
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building className="h-5 w-5" />
                <span>Informações Básicas</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company_name">Nome da Empresa</Label>
                <Input
                  id="company_name"
                  value={formData.company_name}
                  onChange={(e) => handleInputChange('company_name', e.target.value)}
                  placeholder="RC Construções"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Empresa líder em construção e remodelação..."
                  rows={4}
                />
              </div>

              <ImageUpload
                bucket="company-assets"
                currentImageUrl={formData.logo_url}
                onImageUpload={(url) => handleInputChange('logo_url', url)}
                onImageRemove={() => handleInputChange('logo_url', '')}
                folder="logos"
                accept="image/*"
              />
            </CardContent>
          </Card>

          {/* Company Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5" />
                <span>Estatísticas da Empresa</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="founded_year" className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Ano de Fundação</span>
                </Label>
                <Input
                  id="founded_year"
                  type="number"
                  value={formData.founded_year}
                  onChange={(e) => handleInputChange('founded_year', parseInt(e.target.value) || 2006)}
                  min="1900"
                  max={new Date().getFullYear()}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="years_experience" className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Anos de Experiência</span>
                </Label>
                <Input
                  id="years_experience"
                  type="number"
                  value={formData.years_experience}
                  onChange={(e) => handleInputChange('years_experience', parseInt(e.target.value) || 0)}
                  min="0"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="projects_completed" className="flex items-center space-x-2">
                  <Trophy className="h-4 w-4" />
                  <span>Projetos Realizados</span>
                </Label>
                <Input
                  id="projects_completed"
                  type="number"
                  value={formData.projects_completed}
                  onChange={(e) => handleInputChange('projects_completed', parseInt(e.target.value) || 0)}
                  min="0"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="availability_hours" className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Disponibilidade (h)</span>
                </Label>
                <Input
                  id="availability_hours"
                  type="number"
                  value={formData.availability_hours}
                  onChange={(e) => handleInputChange('availability_hours', parseInt(e.target.value) || 24)}
                  min="0"
                  max="24"
                />
              </div>
            </CardContent>
          </Card>

          {/* SEO Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Configurações SEO</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta_title">Título da Página (SEO)</Label>
                <Input
                  id="meta_title"
                  value={formData.meta_title}
                  onChange={(e) => handleInputChange('meta_title', e.target.value)}
                  placeholder="RC Construções - Construção e Remodelação"
                  maxLength={60}
                />
                <p className="text-xs text-muted-foreground">
                  Máximo 60 caracteres. Atual: {formData.meta_title.length}
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="meta_description">Descrição da Página (SEO)</Label>
                <Textarea
                  id="meta_description"
                  value={formData.meta_description}
                  onChange={(e) => handleInputChange('meta_description', e.target.value)}
                  placeholder="Empresa líder em construção e remodelação. Transformamos espaços com qualidade e profissionalismo..."
                  rows={3}
                  maxLength={160}
                />
                <p className="text-xs text-muted-foreground">
                  Máximo 160 caracteres. Atual: {formData.meta_description.length}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-gold hover:bg-gradient-gold/90"
            >
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}