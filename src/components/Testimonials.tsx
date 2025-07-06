import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from '@/integrations/supabase/client';
import { Testimonial } from '@/types/database';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [partners, setPartners] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [testimonialsData, partnersData] = await Promise.all([
        supabase
          .from('testimonials')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true }),
        supabase
          .from('partners')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true })
      ]);

      if (testimonialsData.data) {
        setTestimonials(testimonialsData.data);
      }
      
      if (partnersData.data) {
        setPartners(partnersData.data.map(p => p.name));
      }
    } catch (error) {
      console.error('Error fetching testimonials and partners:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Testimonials */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            O Que Dizem os Nossos Clientes
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A satisfação dos nossos clientes é a nossa maior conquista. Veja o que dizem sobre o nosso trabalho.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {loading ? (
            <div className="col-span-2 flex justify-center py-8">
              <div className="text-lg text-muted-foreground">Carregando depoimentos...</div>
            </div>
          ) : (
            testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="border-0 shadow-subtle hover:shadow-luxury transition-all duration-300 bg-gradient-subtle">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {/* Rating stars */}
                  <div className="flex text-secondary">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-lg">★</span>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-muted-foreground">
                    {testimonial.project}
                  </span>
                </div>
                
                <blockquote className="text-muted-foreground leading-relaxed mb-6 italic text-lg">
                  "{testimonial.content}"
                </blockquote>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center mr-4 shadow-gold">
                    <span className="text-white font-bold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-primary">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} • {testimonial.location}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            ))
          )}
        </div>

        {/* Partners/Trust Indicators */}
        <div className="text-center">
          <h3 className="text-2xl font-serif font-bold text-primary mb-8">
            Confiam em Nós
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {partners.map((partner, index) => (
              <div 
                key={partner}
                className="flex items-center justify-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-gray-600 font-medium text-center">
                    Logo {index + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}