import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Telefone / Fax",
    content: "210 153 627",
    link: "tel:+351210153627"
  },
  {
    icon: Phone,
    title: "Telemóvel",
    content: "912 300 498", 
    link: "tel:+351912300498"
  },
  {
    icon: Mail,
    title: "Email",
    content: "geral@atmosdecor.pt",
    link: "mailto:geral@atmosdecor.pt"
  },
  {
    icon: Clock,
    title: "Horário",
    content: "24h Disponível",
    subtitle: "Todo o território nacional"
  }
];

const locations = [
  {
    type: "SEDE",
    address: "Rua Bartolomeu Dias, 34",
    postalCode: "2635-353 Rio de Mouro",
    isMain: true
  },
  {
    type: "ESCRITÓRIO",
    address: "Avenida Via Láctea, 41 - Loja Esq",
    postalCode: "2635-265 Rio de Mouro",
    isMain: false
  }
];

export default function Contact() {
  return (
    <section id="contactos" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            Entre em Contacto
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Pronto para transformar o seu espaço? Entre em contacto connosco para uma consulta gratuita 
            e descubra como podemos tornar os seus sonhos realidade.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h3 className="text-2xl font-serif font-bold text-primary mb-6">
                Informações de Contacto
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <div key={info.title} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-gold rounded-lg flex items-center justify-center shadow-gold flex-shrink-0">
                      <info.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary">{info.title}</h4>
                      {info.link ? (
                        <a 
                          href={info.link} 
                          className="text-secondary hover:text-secondary/80 transition-colors"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{info.content}</p>
                      )}
                      {info.subtitle && (
                        <p className="text-sm text-muted-foreground">{info.subtitle}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Locations */}
            <div>
              <h3 className="text-xl font-serif font-bold text-primary mb-4">
                As Nossas Localizações
              </h3>
              <div className="space-y-4">
                {locations.map((location) => (
                  <Card key={location.type} className={`border-0 shadow-subtle ${location.isMain ? 'bg-white' : 'bg-gray-50'}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-primary text-sm">
                            {location.type}
                          </h4>
                          <p className="text-muted-foreground text-sm">
                            {location.address}
                          </p>
                          <p className="text-muted-foreground text-sm">
                            {location.postalCode}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-luxury bg-white">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-primary">
                  Solicite o Seu Orçamento Gratuito
                </CardTitle>
                <p className="text-muted-foreground">
                  Preencha o formulário abaixo e entraremos em contacto consigo em breve.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-primary mb-2 block">
                      Nome Completo *
                    </label>
                    <Input 
                      placeholder="O seu nome"
                      className="border-muted-foreground/30 focus:border-secondary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-primary mb-2 block">
                      Email *
                    </label>
                    <Input 
                      type="email"
                      placeholder="O seu email"
                      className="border-muted-foreground/30 focus:border-secondary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-primary mb-2 block">
                      Telefone *
                    </label>
                    <Input 
                      placeholder="O seu telefone"
                      className="border-muted-foreground/30 focus:border-secondary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-primary mb-2 block">
                      Tipo de Projeto
                    </label>
                    <select className="w-full p-3 border border-muted-foreground/30 rounded-md focus:border-secondary focus:outline-none">
                      <option>Selecione uma opção</option>
                      <option>Remodelação Completa</option>
                      <option>Decoração de Interiores</option>
                      <option>Construção Civil</option>
                      <option>Consultoria</option>
                      <option>Outro</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-primary mb-2 block">
                    Localização do Projeto
                  </label>
                  <Input 
                    placeholder="Cidade/Localidade"
                    className="border-muted-foreground/30 focus:border-secondary"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-primary mb-2 block">
                    Descreva o Seu Projeto *
                  </label>
                  <Textarea 
                    placeholder="Conte-nos sobre o seu projeto, as suas necessidades e expectativas..."
                    rows={5}
                    className="border-muted-foreground/30 focus:border-secondary resize-none"
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <input 
                    type="checkbox" 
                    id="privacy"
                    className="mt-1"
                  />
                  <label htmlFor="privacy" className="text-sm text-muted-foreground">
                    Concordo com o armazenamento dos meus dados de acordo com as Políticas de Privacidade 
                    e autorizo o contacto por parte da Atmos Decor para fins comerciais.
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-gradient-gold hover:bg-gradient-gold/90 text-white shadow-gold flex-1">
                    Enviar Pedido de Orçamento
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    Ligar Agora
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-primary rounded-2xl p-8 text-white shadow-luxury max-w-4xl mx-auto">
            <h3 className="text-3xl font-serif font-bold mb-4">
              Pronto para Começar?
            </h3>
            <p className="text-lg mb-8 opacity-90">
              Não espere mais. Entre em contacto connosco hoje mesmo e dê o primeiro passo 
              para transformar o seu espaço num ambiente extraordinário.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-secondary hover:bg-secondary/90 text-primary px-8 py-3">
                <Phone className="mr-2 h-5 w-5" />
                Ligar: 210 153 627
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary px-8 py-3"
              >
                Visitar Showroom
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}