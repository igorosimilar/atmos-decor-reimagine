import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin, Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ContactInfo } from '@/types/database';

export default function ContactManager() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    phone_primary: '',
    phone_secondary: '',
    email_primary: '',
    email_secondary: '',
    address_main: '',
    address_secondary: '',
    working_hours: '',
    facebook_url: '',
    instagram_url: '',
    linkedin_url: '',
  });

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/admin/login');
      return;
    }
    if (user && isAdmin) {
      fetchContactInfo();
    }
  }, [user, isAdmin, loading, navigate]);

  const fetchContactInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        setContactInfo(data);
        setFormData({
          phone_primary: data.phone_primary || '',
          phone_secondary: data.phone_secondary || '',
          email_primary: data.email_primary || '',
          email_secondary: data.email_secondary || '',
          address_main: data.address_main || '',
          address_secondary: data.address_secondary || '',
          working_hours: data.working_hours || '',
          facebook_url: data.facebook_url || '',
          instagram_url: data.instagram_url || '',
          linkedin_url: data.linkedin_url || '',
        });
      }
    } catch (error) {
      console.error('Error fetching contact info:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao carregar informações de contacto',
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
      if (contactInfo) {
        // Update existing record
        const { error } = await supabase
          .from('contact_info')
          .update({
            phone_primary: formData.phone_primary || null,
            phone_secondary: formData.phone_secondary || null,
            email_primary: formData.email_primary || null,
            email_secondary: formData.email_secondary || null,
            address_main: formData.address_main || null,
            address_secondary: formData.address_secondary || null,
            working_hours: formData.working_hours || null,
            facebook_url: formData.facebook_url || null,
            instagram_url: formData.instagram_url || null,
            linkedin_url: formData.linkedin_url || null,
          })
          .eq('id', contactInfo.id);

        if (error) throw error;
      } else {
        // Create new record
        const { error } = await supabase
          .from('contact_info')
          .insert({
            phone_primary: formData.phone_primary || null,
            phone_secondary: formData.phone_secondary || null,
            email_primary: formData.email_primary || null,
            email_secondary: formData.email_secondary || null,
            address_main: formData.address_main || null,
            address_secondary: formData.address_secondary || null,
            working_hours: formData.working_hours || null,
            facebook_url: formData.facebook_url || null,
            instagram_url: formData.instagram_url || null,
            linkedin_url: formData.linkedin_url || null,
          });

        if (error) throw error;
      }

      toast({
        title: 'Sucesso',
        description: 'Informações de contacto atualizadas com sucesso!',
      });
      
      fetchContactInfo();
    } catch (error) {
      console.error('Error saving contact info:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao salvar informações de contacto',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
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
          <h1 className="text-3xl font-serif font-bold text-primary">Gestão de Contactos</h1>
          <p className="text-muted-foreground">
            Configure todas as informações de contacto da empresa
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Phone Numbers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>Números de Telefone</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone_primary">Telefone Principal</Label>
                <Input
                  id="phone_primary"
                  value={formData.phone_primary}
                  onChange={(e) => handleInputChange('phone_primary', e.target.value)}
                  placeholder="210 153 627"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone_secondary">Telefone Secundário</Label>
                <Input
                  id="phone_secondary"
                  value={formData.phone_secondary}
                  onChange={(e) => handleInputChange('phone_secondary', e.target.value)}
                  placeholder="96X XXX XXX"
                />
              </div>
            </CardContent>
          </Card>

          {/* Email Addresses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Endereços de Email</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email_primary">Email Principal</Label>
                <Input
                  id="email_primary"
                  type="email"
                  value={formData.email_primary}
                  onChange={(e) => handleInputChange('email_primary', e.target.value)}
                  placeholder="geral@rcconstrucoes.pt"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email_secondary">Email Secundário</Label>
                <Input
                  id="email_secondary"
                  type="email"
                  value={formData.email_secondary}
                  onChange={(e) => handleInputChange('email_secondary', e.target.value)}
                  placeholder="info@rcconstrucoes.pt"
                />
              </div>
            </CardContent>
          </Card>

          {/* Addresses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Endereços</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address_main">Endereço Principal</Label>
                <Textarea
                  id="address_main"
                  value={formData.address_main}
                  onChange={(e) => handleInputChange('address_main', e.target.value)}
                  placeholder="Rua Principal, 123, Rio de Mouro, 2635-XXX Sintra"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address_secondary">Endereço Secundário</Label>
                <Textarea
                  id="address_secondary"
                  value={formData.address_secondary}
                  onChange={(e) => handleInputChange('address_secondary', e.target.value)}
                  placeholder="Endereço alternativo ou filial"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Working Hours */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Horário de Funcionamento</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="working_hours">Horário</Label>
                <Textarea
                  id="working_hours"
                  value={formData.working_hours}
                  onChange={(e) => handleInputChange('working_hours', e.target.value)}
                  placeholder="Segunda a Sexta: 9h-18h&#10;Sábado: 9h-13h&#10;Domingo: Fechado&#10;Disponibilidade 24h para emergências"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Social Media */}
          <Card>
            <CardHeader>
              <CardTitle>Redes Sociais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="facebook_url" className="flex items-center space-x-2">
                  <Facebook className="h-4 w-4" />
                  <span>Facebook</span>
                </Label>
                <Input
                  id="facebook_url"
                  type="url"
                  value={formData.facebook_url}
                  onChange={(e) => handleInputChange('facebook_url', e.target.value)}
                  placeholder="https://facebook.com/rcconstrucoes"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram_url" className="flex items-center space-x-2">
                  <Instagram className="h-4 w-4" />
                  <span>Instagram</span>
                </Label>
                <Input
                  id="instagram_url"
                  type="url"
                  value={formData.instagram_url}
                  onChange={(e) => handleInputChange('instagram_url', e.target.value)}
                  placeholder="https://instagram.com/rcconstrucoes"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin_url" className="flex items-center space-x-2">
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn</span>
                </Label>
                <Input
                  id="linkedin_url"
                  type="url"
                  value={formData.linkedin_url}
                  onChange={(e) => handleInputChange('linkedin_url', e.target.value)}
                  placeholder="https://linkedin.com/company/rcconstrucoes"
                />
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