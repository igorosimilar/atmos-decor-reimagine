import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2, Eye, MessageSquare } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Testimonial } from '@/types/database';
import { useToast } from '@/hooks/use-toast';

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao carregar depoimentos',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ is_active: !isActive })
        .eq('id', id);

      if (error) throw error;

      setTestimonials(testimonials.map(item => 
        item.id === id ? { ...item, is_active: !isActive } : item
      ));

      toast({
        title: 'Sucesso',
        description: `Depoimento ${!isActive ? 'ativado' : 'desativado'} com sucesso`,
      });
    } catch (error) {
      console.error('Error toggling testimonial:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao alterar status do depoimento',
        variant: 'destructive',
      });
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este depoimento?')) return;

    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setTestimonials(testimonials.filter(item => item.id !== id));
      toast({
        title: 'Sucesso',
        description: 'Depoimento excluído com sucesso',
      });
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao excluir depoimento',
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
            <h1 className="text-3xl font-serif font-bold text-primary">Depoimentos</h1>
            <p className="text-muted-foreground">
              Gerir depoimentos de clientes
            </p>
          </div>
          <Button className="bg-gradient-gold hover:bg-gradient-gold/90">
            <Plus className="h-4 w-4 mr-2" />
            Novo Depoimento
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center shadow-gold">
                      <span className="text-white font-bold">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role} • {testimonial.location}
                      </p>
                    </div>
                  </div>
                  <Badge variant={testimonial.is_active ? 'default' : 'secondary'}>
                    {testimonial.is_active ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <div className="flex text-secondary mr-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-lg">★</span>
                    ))}
                  </div>
                  {testimonial.project && (
                    <Badge variant="outline" className="text-xs">
                      {testimonial.project}
                    </Badge>
                  )}
                </div>
                
                <blockquote className="text-muted-foreground italic line-clamp-3">
                  "{testimonial.content}"
                </blockquote>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleActive(testimonial.id, testimonial.is_active)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => deleteTestimonial(testimonial.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {testimonials.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhum depoimento encontrado</h3>
              <p className="text-muted-foreground text-center mb-4">
                Comece adicionando o primeiro depoimento de cliente.
              </p>
              <Button className="bg-gradient-gold hover:bg-gradient-gold/90">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Depoimento
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}