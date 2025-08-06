import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import aboutTeamImage from "@/assets/about-construction-team.jpg";

const stats = [
  { number: "17+", label: "Anos de Experiência" },
  { number: "500+", label: "Projetos Concluídos" },
  { number: "100%", label: "Clientes Satisfeitos" },
  { number: "24h", label: "Apoio Nacional" }
];

const values = [
  {
    title: "Excelência",
    description: "Compromisso inabalável com a qualidade superior em cada projeto que desenvolvemos."
  },
  {
    title: "Inovação",
    description: "Utilizamos as técnicas mais avançadas e materiais de última geração do mercado."
  },
  {
    title: "Personalização",
    description: "Cada projeto é único, adaptado especificamente aos gostos e necessidades do cliente."
  },
  {
    title: "Confiança",
    description: "Relacionamentos duradouros baseados na transparência e profissionalismo."
  }
];

export default function About() {
  return (
    <section id="empresa" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
                Quem Somos
              </h2>
              <div className="w-20 h-1 bg-gradient-gold mb-8"></div>
              <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                <p>
                  Fundada em <strong className="text-primary">2006</strong>, a Construções é uma empresa líder na área da construção civil, 
                  especializada em construção e remodelação de alta qualidade.
                </p>
                <p>
                  Somos uma <strong className="text-primary">equipa jovem, qualificada e polivalente</strong>, que ao longo dos anos 
                  construiu uma sólida carteira de clientes particulares e empresariais, proporcionando-nos 
                  crescimento e diversificação dos nossos serviços.
                </p>
                <p>
                  A nossa <strong className="text-primary">dedicação, ambição e paixão</strong> pelo que fazemos reflete-se em cada projeto, 
                  garantindo resultados que superam as expectativas dos nossos clientes.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-gradient-gold hover:bg-gradient-gold/90 text-white shadow-gold">
                Conhecer Projetos
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                Falar Connosco
              </Button>
            </div>
          </div>

          {/* Company Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl shadow-luxury overflow-hidden">
              <img 
                src={aboutTeamImage} 
                alt="Equipa da Construções" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
            Os Nossos Valores
          </h3>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Princípios que orientam o nosso trabalho e garantem a excelência em cada projeto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card key={value.title} className="text-center border-0 shadow-subtle hover:shadow-luxury transition-all duration-300 bg-gradient-subtle">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4 shadow-gold">
                  <span className="text-white font-bold text-xl">{index + 1}</span>
                </div>
                <h4 className="text-xl font-serif font-bold text-primary mb-3">
                  {value.title}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}