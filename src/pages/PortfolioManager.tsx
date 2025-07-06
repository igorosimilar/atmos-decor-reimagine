import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2, Eye, FileImage } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { PortfolioItem } from '@/types/database';
import { useToast } from '@/hooks/use-toast';

export default function PortfolioManager() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching portfolio items:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao carregar projetos do portfolio',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('portfolio_items')
        .update({ is_active: !isActive })
        .eq('id', id);

      if (error) throw error;

      setItems(items.map(item => 
        item.id === id ? { ...item, is_active: !isActive } : item
      ));

      toast({
        title: 'Sucesso',
        description: `Projeto ${!isActive ? 'ativado' : 'desativado'} com sucesso`,
      });
    } catch (error) {
      console.error('Error toggling item:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao alterar status do projeto',
        variant: 'destructive',
      });
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este projeto?')) return;

    try {
      const { error } = await supabase
        .from('portfolio_items')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setItems(items.filter(item => item.id !== id));
      toast({
        title: 'Sucesso',
        description: 'Projeto excluído com sucesso',
      });
    } catch (error) {
      console.error('Error deleting item:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao excluir projeto',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Carregando...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif font-bold text-primary">Portfolio</h1>
            <p className="text-muted-foreground">
              Gerir projetos do portfolio
            </p>
          </div>
          <Button className="bg-gradient-gold hover:bg-gradient-gold/90">
            <Plus className="h-4 w-4 mr-2" />
            Novo Projeto
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 relative">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-3 shadow-gold opacity-80">
                      <span className="text-white font-bold text-xl">{item.sort_order}</span>
                    </div>
                    <p className="text-sm">Imagem do Projeto</p>
                  </div>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <Badge variant={item.is_active ? 'default' : 'secondary'}>
                    {item.is_active ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>
                <Badge variant="outline" className="w-fit">
                  {item.category}
                </Badge>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex justify-between text-sm text-muted-foreground mb-4">
                  <span>📍 {item.location}</span>
                  <span>{item.year}</span>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleActive(item.id, item.is_active)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => deleteItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {items.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileImage className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhum projeto encontrado</h3>
              <p className="text-muted-foreground text-center mb-4">
                Comece adicionando o primeiro projeto ao seu portfolio.
              </p>
              <Button className="bg-gradient-gold hover:bg-gradient-gold/90">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Projeto
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}