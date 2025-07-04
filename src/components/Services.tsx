import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Decoração de Interiores",
    description: "Criamos ambientes únicos e personalizados que refletem a sua personalidade e estilo de vida, utilizando materiais de alta qualidade e design contemporâneo.",
    features: [
      "Consultoria personalizada",
      "Seleção de materiais premium",
      "Design 3D e visualizações",
      "Acompanhamento completo"
    ],
    image: "decoracao"
  },
  {
    title: "Remodelação Completa",
    description: "Transformamos completamente os seus espaços, desde remodelações parciais até projetos totais, sempre com foco na funcionalidade e elegância.",
    features: [
      "Remodelação total ou parcial",
      "Projetos residenciais e comerciais",
      "Gestão completa da obra",
      "Equipas especializadas"
    ],
    image: "remodelacao"
  },
  {
    title: "Construção Civil",
    description: "Oferecemos todos os serviços especializados na área da construção civil com as técnicas mais avançadas do mercado.",
    features: [
      "Climatização profissional",
      "Instalações elétricas",
      "Canalizações",
      "Pinturas e acabamentos",
      "Microcimento"
    ],
    image: "construcao"
  }
];

export default function Services() {
  return (
    <section id="servicos" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            Os Nossos Serviços
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Oferecemos uma gama completa de serviços para transformar os seus espaços em ambientes extraordinários, 
            sempre com o mais alto padrão de qualidade e sofisticação.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card 
              key={service.title} 
              className="group hover:shadow-luxury transition-all duration-300 hover:scale-105 border-0 shadow-subtle bg-white/80 backdrop-blur-sm"
            >
              <CardHeader className="pb-4">
                {/* Service icon/image placeholder */}
                <div className="w-16 h-16 bg-gradient-gold rounded-xl mb-4 flex items-center justify-center shadow-gold">
                  <span className="text-white font-bold text-2xl">{index + 1}</span>
                </div>
                <CardTitle className="text-2xl font-serif text-primary group-hover:text-secondary transition-colors">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-secondary rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full mt-6 border-secondary text-secondary hover:bg-secondary hover:text-white"
                >
                  Saber Mais
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white rounded-2xl p-8 shadow-luxury max-w-4xl mx-auto">
            <h3 className="text-3xl font-serif font-bold text-primary mb-4">
              Pronto para Transformar o Seu Espaço?
            </h3>
            <p className="text-muted-foreground mb-8 text-lg">
              Entre em contacto connosco e descubra como podemos tornar a sua visão realidade. 
              Oferecemos consulta gratuita e orçamento sem compromisso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-gold hover:bg-gradient-gold/90 text-white shadow-gold px-8 py-3">
                Orçamento Gratuito
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-3">
                Marcar Consulta
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}