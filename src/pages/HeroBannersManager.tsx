import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import AdminLayout from '@/components/admin/AdminLayout';
import ImageUpload from '@/components/admin/ImageUpload';

interface HeroBanner {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string | null;
  cta_text: string | null;
  cta_link: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export default function HeroBannersManager() {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [banners, setBanners] = useState<HeroBanner[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<HeroBanner | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    image_url: '',
    cta_text: 'Solicitar Orçamento',
    cta_link: '#contactos',
    is_active: true,
    sort_order: 0
  });

  useEffect(() => {
    if (!user || !isAdmin) {
      window.location.href = '/admin/login';
      return;
    }
    fetchBanners();
  }, [user, isAdmin]);

  const fetchBanners = async () => {
    try {
      const { data, error } = await supabase
        .from('hero_banners')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setBanners(data || []);
    } catch (error) {
      console.error('Error fetching banners:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar banners",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingBanner) {
        const { error } = await supabase
          .from('hero_banners')
          .update(formData)
          .eq('id', editingBanner.id);

        if (error) throw error;

        toast({
          title: "Sucesso",
          description: "Banner atualizado com sucesso",
        });
      } else {
        const { error } = await supabase
          .from('hero_banners')
          .insert([formData]);

        if (error) throw error;

        toast({
          title: "Sucesso",
          description: "Banner criado com sucesso",
        });
      }

      setIsDialogOpen(false);
      setEditingBanner(null);
      resetForm();
      fetchBanners();
    } catch (error) {
      console.error('Error saving banner:', error);
      toast({
        title: "Erro",
        description: "Erro ao salvar banner",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem a certeza que deseja eliminar este banner?')) return;

    try {
      const { error } = await supabase
        .from('hero_banners')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Banner eliminado com sucesso",
      });
      fetchBanners();
    } catch (error) {
      console.error('Error deleting banner:', error);
      toast({
        title: "Erro",
        description: "Erro ao eliminar banner",
        variant: "destructive",
      });
    }
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('hero_banners')
        .update({ is_active: !isActive })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: `Banner ${!isActive ? 'ativado' : 'desativado'} com sucesso`,
      });
      fetchBanners();
    } catch (error) {
      console.error('Error toggling banner:', error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar status do banner",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (banner: HeroBanner) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title,
      subtitle: banner.subtitle || '',
      image_url: banner.image_url || '',
      cta_text: banner.cta_text || 'Solicitar Orçamento',
      cta_link: banner.cta_link || '#contactos',
      is_active: banner.is_active,
      sort_order: banner.sort_order
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      image_url: '',
      cta_text: 'Solicitar Orçamento',
      cta_link: '#contactos',
      is_active: true,
      sort_order: 0
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">Carregando...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif font-bold text-primary">Gestão de Banners Hero</h1>
            <p className="text-muted-foreground">
              Gerir banners da secção principal do website
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                className="bg-gradient-gold hover:bg-gradient-gold/90"
                onClick={() => {
                  setEditingBanner(null);
                  resetForm();
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Novo Banner
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingBanner ? 'Editar Banner' : 'Novo Banner'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Título do banner"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="subtitle">Subtítulo</Label>
                  <Input
                    id="subtitle"
                    value={formData.subtitle}
                    onChange={(e) => handleInputChange('subtitle', e.target.value)}
                    placeholder="Subtítulo (opcional)"
                  />
                </div>

                <div>
                  <Label>Imagem de Fundo</Label>
                  <ImageUpload
                    currentImageUrl={formData.image_url}
                    onImageUpload={(url) => handleInputChange('image_url', url)}
                    bucket="company-assets"
                    folder="hero-banners"
                  />
                </div>

                <div>
                  <Label htmlFor="cta_text">Texto do Botão</Label>
                  <Input
                    id="cta_text"
                    value={formData.cta_text}
                    onChange={(e) => handleInputChange('cta_text', e.target.value)}
                    placeholder="Texto do botão call-to-action"
                  />
                </div>

                <div>
                  <Label htmlFor="cta_link">Link do Botão</Label>
                  <Input
                    id="cta_link"
                    value={formData.cta_link}
                    onChange={(e) => handleInputChange('cta_link', e.target.value)}
                    placeholder="Link ou âncora (ex: #contactos)"
                  />
                </div>

                <div>
                  <Label htmlFor="sort_order">Ordem de Exibição</Label>
                  <Input
                    id="sort_order"
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => handleInputChange('sort_order', parseInt(e.target.value))}
                    placeholder="0"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => handleInputChange('is_active', checked)}
                  />
                  <Label htmlFor="is_active">Ativo</Label>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-gradient-gold hover:bg-gradient-gold/90">
                    {editingBanner ? 'Atualizar' : 'Criar'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6">
          {banners.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-muted-foreground">Nenhum banner encontrado</p>
              </CardContent>
            </Card>
          ) : (
            banners.map((banner) => (
              <Card key={banner.id} className={`${!banner.is_active ? 'opacity-50' : ''}`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {banner.title}
                        {banner.is_active ? (
                          <Eye className="h-4 w-4 text-green-600" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-red-600" />
                        )}
                      </CardTitle>
                      {banner.subtitle && (
                        <p className="text-muted-foreground">{banner.subtitle}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleActive(banner.id, banner.is_active)}
                      >
                        {banner.is_active ? 'Desativar' : 'Ativar'}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditDialog(banner)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(banner.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {banner.image_url && (
                    <div className="mb-4">
                      <img 
                        src={banner.image_url} 
                        alt={banner.title}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Botão:</span> {banner.cta_text}
                    </div>
                    <div>
                      <span className="font-medium">Link:</span> {banner.cta_link}
                    </div>
                    <div>
                      <span className="font-medium">Ordem:</span> {banner.sort_order}
                    </div>
                    <div>
                      <span className="font-medium">Status:</span> {banner.is_active ? 'Ativo' : 'Inativo'}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}