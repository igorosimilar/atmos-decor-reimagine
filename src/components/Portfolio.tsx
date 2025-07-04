import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const portfolioItems = [
  {
    title: "Apartamento de Luxo",
    category: "Remodelação Residencial",
    description: "Transformação completa de apartamento de 200m² com design contemporâneo e materiais premium.",
    location: "Lisboa",
    year: "2024"
  },
  {
    title: "Moradia Moderna",
    category: "Decoração de Interiores", 
    description: "Design sofisticado para moradia de 350m² com ambientes integrados e toques dourados.",
    location: "Cascais",
    year: "2023"
  },
  {
    title: "Escritório Corporativo",
    category: "Espaço Comercial",
    description: "Remodelação de escritório empresarial focada na produtividade e bem-estar dos colaboradores.",
    location: "Porto",
    year: "2024"
  },
  {
    title: "Penthouse Exclusivo",
    category: "Projeto Premium",
    description: "Projeto de alta decoração para penthouse com vista panorâmica e acabamentos de luxo.",
    location: "Estoril",
    year: "2023"
  },
  {
    title: "Loft Industrial",
    category: "Remodelação Completa",
    description: "Conversão de espaço industrial em loft moderno mantendo elementos arquitetónicos originais.",
    location: "Lisboa",
    year: "2024"
  },
  {
    title: "Villa Mediterrânica",
    category: "Casa de Campo",
    description: "Remodelação de villa com inspiração mediterrânica e integração harmoniosa com o jardim.",
    location: "Sintra",
    year: "2023"
  }
];

const categories = [
  "Todos os Projetos",
  "Remodelação Residencial", 
  "Decoração de Interiores",
  "Espaço Comercial",
  "Projeto Premium"
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            Portfolio de Excelência
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Descubra alguns dos nossos projetos mais emblemáticos. Cada espaço conta uma história única 
            de transformação, elegância e sofisticação.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "Todos os Projetos" ? "default" : "outline"}
              className={category === "Todos os Projetos" 
                ? "bg-gradient-gold hover:bg-gradient-gold/90 text-white shadow-gold" 
                : "border-muted-foreground text-muted-foreground hover:border-secondary hover:text-secondary"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {portfolioItems.map((item, index) => (
            <Card 
              key={item.title}
              className="group overflow-hidden border-0 shadow-subtle hover:shadow-luxury transition-all duration-500 hover:scale-105 bg-white"
            >
              {/* Image placeholder */}
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-3 shadow-gold opacity-80">
                      <span className="text-white font-bold text-xl">{index + 1}</span>
                    </div>
                    <p className="text-sm">Imagem do Projeto</p>
                  </div>
                </div>
                
                {/* Overlay content */}
                <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <Button 
                    size="sm" 
                    className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-primary"
                  >
                    Ver Projeto
                  </Button>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {item.year}
                  </span>
                </div>
                
                <h3 className="text-xl font-serif font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">📍 {item.location}</span>
                  <span className="text-secondary font-medium">Ver Detalhes →</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white rounded-2xl p-8 shadow-luxury max-w-4xl mx-auto">
            <h3 className="text-3xl font-serif font-bold text-primary mb-4">
              Gostou do Que Viu?
            </h3>
            <p className="text-muted-foreground mb-8 text-lg">
              Estes são apenas alguns exemplos do nosso trabalho. Temos muito mais para lhe mostrar. 
              Entre em contacto connosco para conhecer todo o nosso portfolio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-gold hover:bg-gradient-gold/90 text-white shadow-gold px-8 py-3">
                Ver Portfolio Completo
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-3">
                Agendar Visita ao Showroom
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}