import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Partner } from '@/types/database';
import ImageUpload from '@/components/admin/ImageUpload';

export default function PartnersManager() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    logo_url: '',
    is_active: true,
    sort_order: 0,
  });

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/admin/login');
      return;
    }
    if (user && isAdmin) {
      fetchPartners();
    }
  }, [user, isAdmin, loading, navigate]);

  const fetchPartners = async () => {
    try {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setPartners(data || []);
    } catch (error) {
      console.error('Error fetching partners:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao carregar parceiros',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsSubmitting(true);
    
    try {
      if (editingPartner) {
        const { error } = await supabase
          .from('partners')
          .update({
            name: formData.name,
            logo_url: formData.logo_url || null,
            is_active: formData.is_active,
            sort_order: formData.sort_order,
          })
          .eq('id', editingPartner.id);

        if (error) throw error;

        toast({
          title: 'Sucesso',
          description: 'Parceiro atualizado com sucesso!',
        });
      } else {
        const { error } = await supabase
          .from('partners')
          .insert({
            name: formData.name,
            logo_url: formData.logo_url || null,
            is_active: formData.is_active,
            sort_order: formData.sort_order,
          });

        if (error) throw error;

        toast({
          title: 'Sucesso',
          description: 'Parceiro adicionado com sucesso!',
        });
      }

      resetForm();
      setIsDialogOpen(false);
      fetchPartners();
    } catch (error) {
      console.error('Error saving partner:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao salvar parceiro',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (partner: Partner) => {
    setEditingPartner(partner);
    setFormData({
      name: partner.name,
      logo_url: partner.logo_url || '',
      is_active: partner.is_active,
      sort_order: partner.sort_order,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem a certeza que deseja eliminar este parceiro?')) return;

    try {
      const { error } = await supabase
        .from('partners')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Sucesso',
        description: 'Parceiro eliminado com sucesso!',
      });
      
      fetchPartners();
    } catch (error) {
      console.error('Error deleting partner:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao eliminar parceiro',
        variant: 'destructive',
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      logo_url: '',
      is_active: true,
      sort_order: 0,
    });
    setEditingPartner(null);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    resetForm();
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold text-primary">Gestão de Parceiros</h1>
            <p className="text-muted-foreground">
              Gerir logos e informações dos parceiros
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-gold hover:bg-gradient-gold/90">
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Parceiro
              </Button>
            </DialogTrigger>
            
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingPartner ? 'Editar Parceiro' : 'Adicionar Parceiro'}
                </DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Parceiro</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Nome da empresa parceira"
                    required
                  />
                </div>

                <ImageUpload
                  bucket="partner-logos"
                  currentImageUrl={formData.logo_url}
                  onImageUpload={(url) => setFormData(prev => ({ ...prev, logo_url: url }))}
                  onImageRemove={() => setFormData(prev => ({ ...prev, logo_url: '' }))}
                  folder="logos"
                  accept="image/*"
                />

                <div className="space-y-2">
                  <Label htmlFor="sort_order">Ordem de Exibição</Label>
                  <Input
                    id="sort_order"
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => setFormData(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
                    min="0"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                  />
                  <Label htmlFor="is_active">Ativo</Label>
                </div>

                <div className="flex space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleDialogClose}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-gold hover:bg-gradient-gold/90"
                  >
                    {isSubmitting ? 'Salvando...' : editingPartner ? 'Atualizar' : 'Adicionar'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Parceiros</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{partners.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Parceiros Ativos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {partners.filter(p => p.is_active).length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Com Logo</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {partners.filter(p => p.logo_url).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Partners List */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Parceiros</CardTitle>
          </CardHeader>
          <CardContent>
            {partners.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhum parceiro encontrado</p>
                <p className="text-sm">Adicione o primeiro parceiro para começar</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {partners.map((partner) => (
                  <Card key={partner.id} className="relative group">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                          {partner.logo_url ? (
                            <img
                              src={partner.logo_url}
                              alt={partner.name}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <Users className="h-8 w-8 text-muted-foreground" />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold truncate">{partner.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant={partner.is_active ? "default" : "secondary"}>
                              {partner.is_active ? 'Ativo' : 'Inativo'}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              Ordem: {partner.sort_order}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex space-x-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(partner)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(partner.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}