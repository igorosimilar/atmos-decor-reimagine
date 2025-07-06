import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileImage, MessageSquare, Users, Phone } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';

interface Stats {
  portfolioItems: number;
  testimonials: number;
  partners: number;
  contactMessages: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    portfolioItems: 0,
    testimonials: 0,
    partners: 0,
    contactMessages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [portfolioData, testimonialsData, partnersData, messagesData] = await Promise.all([
        supabase.from('portfolio_items').select('id', { count: 'exact', head: true }),
        supabase.from('testimonials').select('id', { count: 'exact', head: true }),
        supabase.from('partners').select('id', { count: 'exact', head: true }),
        supabase.from('contact_messages').select('id', { count: 'exact', head: true }),
      ]);

      setStats({
        portfolioItems: portfolioData.count || 0,
        testimonials: testimonialsData.count || 0,
        partners: partnersData.count || 0,
        contactMessages: messagesData.count || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Projetos no Portfolio',
      value: stats.portfolioItems,
      icon: FileImage,
      color: 'text-blue-600',
    },
    {
      title: 'Depoimentos',
      value: stats.testimonials,
      icon: MessageSquare,
      color: 'text-green-600',
    },
    {
      title: 'Parceiros',
      value: stats.partners,
      icon: Users,
      color: 'text-purple-600',
    },
    {
      title: 'Mensagens de Contacto',
      value: stats.contactMessages,
      icon: Phone,
      color: 'text-orange-600',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo ao painel administrativo da Atmos Decor
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loading ? '...' : stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 border rounded-lg hover:bg-muted transition-colors text-left">
                  <FileImage className="h-6 w-6 text-blue-600 mb-2" />
                  <h3 className="font-medium">Novo Projeto</h3>
                  <p className="text-sm text-muted-foreground">Adicionar ao portfolio</p>
                </button>
                <button className="p-4 border rounded-lg hover:bg-muted transition-colors text-left">
                  <MessageSquare className="h-6 w-6 text-green-600 mb-2" />
                  <h3 className="font-medium">Novo Depoimento</h3>
                  <p className="text-sm text-muted-foreground">Adicionar testemunho</p>
                </button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estatísticas do Site</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Projetos Ativos</span>
                  <span className="text-sm text-muted-foreground">{stats.portfolioItems}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Depoimentos Publicados</span>
                  <span className="text-sm text-muted-foreground">{stats.testimonials}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Parceiros Ativos</span>
                  <span className="text-sm text-muted-foreground">{stats.partners}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}