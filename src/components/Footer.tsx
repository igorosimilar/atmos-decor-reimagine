import { Phone, Mail, MapPin, Clock } from "lucide-react";

const quickLinks = [
  { name: "Início", href: "#home" },
  { name: "Empresa", href: "#empresa" },
  { name: "Serviços", href: "#servicos" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Contactos", href: "#contactos" }
];

const services = [
  "Remodelação Completa",
  "Decoração de Interiores", 
  "Construção Civil",
  "Climatização",
  "Pinturas & Acabamentos",
  "Microcimento"
];

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-gold rounded-lg flex items-center justify-center shadow-gold">
                  <span className="text-white font-bold text-xl">RC</span>
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold">RC CONSTRUÇÕES</h3>
                  <p className="text-xs text-white/80 tracking-wider">CONSTRUÇÃO & REMODELAÇÃO</p>
                </div>
              </div>
              <p className="text-white/80 leading-relaxed">
                Há mais de 17 anos transformamos sonhos em realidade, criando espaços únicos 
                e sofisticados que refletem o seu estilo de vida.
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-sm">17+</span>
              </div>
              <span className="text-white/80">Anos de Experiência</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-serif font-bold mb-6">Navegação</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-white/80 hover:text-secondary transition-colors duration-300 hover:underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-serif font-bold mb-6">Serviços</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-white/80 text-sm">
                    • {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-serif font-bold mb-6">Contactos</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white/80">
                    <a href="tel:+351210153627" className="hover:text-secondary transition-colors">
                      210 153 627
                    </a>
                  </p>
                  <p className="text-white/80">
                    <a href="tel:+351912300498" className="hover:text-secondary transition-colors">
                      912 300 498
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                <a 
                  href="mailto:geral@rcconstrucoes.pt"
                  className="text-white/80 hover:text-secondary transition-colors"
                >
                  geral@rcconstrucoes.pt
                </a>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                <div className="text-white/80 text-sm">
                  <p className="font-medium">SEDE:</p>
                  <p>Rua Bartolomeu Dias, 34</p>
                  <p>2635-353 Rio de Mouro</p>
                  
                  <p className="font-medium mt-3">ESCRITÓRIO:</p>
                  <p>Av. Via Láctea, 41 - Loja Esq</p>
                  <p>2635-265 Rio de Mouro</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                <div className="text-white/80 text-sm">
                  <p className="font-medium">Disponibilidade:</p>
                  <p>24h em todo o território nacional</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-white/60 text-sm">
              © 2024 RC Construções. Todos os direitos reservados.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-white/60">
              <a href="#" className="hover:text-secondary transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                Termos e Condições
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                Resolução de Litígios
              </a>
            </div>
          </div>
          
          <div className="text-center text-white/40 text-xs mt-6">
            Desenvolvido com excelência para uma empresa de excelência.
          </div>
        </div>
      </div>
    </footer>
  );
}