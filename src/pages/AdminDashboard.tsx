import { useEffect, useState } from 'react';
import { FileImage, MessageSquare, Users, Phone, TrendingUp, Calendar } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { StatsGrid } from '@/components/admin/StatsCards';
import { LeadsTable } from '@/components/admin/LeadsTable';

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
      const [portfolioData, testimonialsData, partnersData, messagesData, recentMessages] = await Promise.all([
        supabase.from('portfolio_items').select('id', { count: 'exact', head: true }),
        supabase.from('testimonials').select('id', { count: 'exact', head: true }),
        supabase.from('partners').select('id', { count: 'exact', head: true }),
        supabase.from('contact_messages').select('id', { count: 'exact', head: true }),
        supabase.from('contact_messages')
          .select('id')
          .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
          .order('created_at', { ascending: false })
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
      value: loading ? '...' : stats.portfolioItems,
      icon: FileImage,
      color: 'text-blue-600',
      trend: { value: 12, isPositive: true }
    },
    {
      title: 'Depoimentos',
      value: loading ? '...' : stats.testimonials,
      icon: MessageSquare,
      color: 'text-green-600',
      trend: { value: 8, isPositive: true }
    },
    {
      title: 'Parceiros',
      value: loading ? '...' : stats.partners,
      icon: Users,
      color: 'text-purple-600',
      trend: { value: 5, isPositive: true }
    },
    {
      title: 'Leads Recebidos',
      value: loading ? '...' : stats.contactMessages,
      icon: Phone,
      color: 'text-orange-600',
      trend: { value: 23, isPositive: true }
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo ao painel administrativo da Construções
          </p>
        </div>

        <StatsGrid stats={statCards} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LeadsTable />
          
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Ações Rápidas
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 border rounded-lg hover:bg-muted transition-colors text-left group">
                  <FileImage className="h-6 w-6 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="font-medium">Novo Projeto</h4>
                  <p className="text-sm text-muted-foreground">Adicionar ao portfolio</p>
                </button>
                <button className="p-4 border rounded-lg hover:bg-muted transition-colors text-left group">
                  <MessageSquare className="h-6 w-6 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="font-medium">Novo Depoimento</h4>
                  <p className="text-sm text-muted-foreground">Adicionar testemunho</p>
                </button>
              </div>
            </div>

            {/* Performance Overview */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Performance do Mês
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Novos Leads</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{stats.contactMessages}</span>
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">+23%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Taxa de Conversão</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">8.5%</span>
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">+2.1%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Projetos Concluídos</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">12</span>
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">+4</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}