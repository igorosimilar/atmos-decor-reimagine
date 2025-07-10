import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Phone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import heroConstruction from "@/assets/hero-construction.jpg";

interface HeroBanner {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string | null;
  cta_text: string;
  cta_link: string;
}

export default function HeroDynamic() {
  const [banner, setBanner] = useState<HeroBanner | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActiveBanner();
  }, []);

  const fetchActiveBanner = async () => {
    try {
      const { data, error } = await supabase
        .from('hero_banners')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching banner:', error);
        return;
      }

      setBanner(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fallback content
  const defaultBanner = {
    title: "Construções de Excelência",
    subtitle: "Mais de 17 anos de experiência em construção e remodelação de qualidade superior.",
    cta_text: "Solicitar Orçamento"
  };

  const currentBanner = banner || defaultBanner;

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with real image */}
      <div className="absolute inset-0">
        <img 
          src={banner?.image_url || heroConstruction}
          alt="Projetos de construção"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-up">
          <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight">
            {currentBanner.title}
            {currentBanner.subtitle && (
              <span className="block text-transparent bg-gradient-to-r from-secondary to-amber-300 bg-clip-text text-4xl md:text-5xl mt-4">
                {currentBanner.subtitle}
              </span>
            )}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
            Construímos o futuro com tradição, inovação e compromisso absoluto com a qualidade. 
            Cada projeto é uma obra-prima pensada ao detalhe.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button 
              size="lg" 
              className="bg-gradient-gold hover:bg-gradient-gold/90 text-white shadow-gold px-8 py-4 text-lg font-semibold animate-luxury-pulse"
              onClick={() => document.getElementById('contactos')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Phone className="mr-2 h-5 w-5" />
              {currentBanner.cta_text || "Solicitar Orçamento"}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg backdrop-blur-sm"
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Conhecer Portfólio
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">17+</div>
              <div className="text-gray-300">Anos de Experiência</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">500+</div>
              <div className="text-gray-300">Projetos Concluídos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">24h</div>
              <div className="text-gray-300">Disponibilidade Nacional</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <ArrowDown className="h-6 w-6 text-white/70" />
          </div>
        </div>
      </div>
    </section>
  );
}