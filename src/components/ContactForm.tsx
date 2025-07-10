import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, Send, Phone, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [hasPlans, setHasPlans] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    project_type: "",
    project_area: "",
    estimated_budget: "",
    desired_timeline: "",
    location: "",
    project_description: "",
    message: "",
    contact_preference: "phone"
  });

  const projectTypes = [
    "Construção Nova",
    "Remodelação Total", 
    "Remodelação Cozinha",
    "Remodelação Casa de Banho",
    "Ampliação",
    "Decoração de Interiores",
    "Projeto Comercial",
    "Restauro",
    "Outro"
  ];

  const budgetRanges = [
    "Até 10.000€",
    "10.000€ - 25.000€",
    "25.000€ - 50.000€", 
    "50.000€ - 100.000€",
    "100.000€ - 250.000€",
    "250.000€ - 500.000€",
    "Mais de 500.000€",
    "A definir"
  ];

  const timelines = [
    "Urgente (até 1 mês)",
    "Curto prazo (1-3 meses)",
    "Médio prazo (3-6 meses)",
    "Longo prazo (6-12 meses)",
    "Flexível"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submissionData = {
        ...formData,
        project_area: formData.project_area ? parseFloat(formData.project_area) : null,
        has_plans: hasPlans,
        message: formData.message || formData.project_description
      };

      const { error } = await supabase
        .from('contact_messages')
        .insert([submissionData]);

      if (error) throw error;

      toast({
        title: "Pedido enviado com sucesso!",
        description: "Entraremos em contacto consigo em breve para discutir o seu projeto.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        project_type: "",
        project_area: "",
        estimated_budget: "",
        desired_timeline: "",
        location: "",
        project_description: "",
        message: "",
        contact_preference: "phone"
      });
      setHasPlans(false);

    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Erro ao enviar pedido",
        description: "Ocorreu um erro. Tente novamente ou contacte-nos diretamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Contact Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-serif">Solicitar Orçamento Detalhado</CardTitle>
          <p className="text-muted-foreground">
            Forneça-nos informações detalhadas sobre o seu projeto para um orçamento preciso e personalizado.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                  placeholder="O seu nome"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  placeholder="email@exemplo.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                  placeholder="912 345 678"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_preference">Preferência de Contacto</Label>
                <Select value={formData.contact_preference} onValueChange={(value) => handleInputChange("contact_preference", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="phone">Telefone</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Project Details */}
            <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
              <h3 className="font-semibold text-lg">Detalhes do Projeto</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="project_type">Tipo de Projeto *</Label>
                  <Select value={formData.project_type} onValueChange={(value) => handleInputChange("project_type", value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Localização do Projeto *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    required
                    placeholder="Cidade, Concelho"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="project_area">Área Aproximada (m²)</Label>
                  <Input
                    id="project_area"
                    type="number"
                    value={formData.project_area}
                    onChange={(e) => handleInputChange("project_area", e.target.value)}
                    placeholder="Ex: 120"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estimated_budget">Orçamento Estimado</Label>
                  <Select value={formData.estimated_budget} onValueChange={(value) => handleInputChange("estimated_budget", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o orçamento" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetRanges.map(budget => (
                        <SelectItem key={budget} value={budget}>{budget}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="desired_timeline">Prazo Desejado</Label>
                <Select value={formData.desired_timeline} onValueChange={(value) => handleInputChange("desired_timeline", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Quando pretende iniciar?" />
                  </SelectTrigger>
                  <SelectContent>
                    {timelines.map(timeline => (
                      <SelectItem key={timeline} value={timeline}>{timeline}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="project_description">Descrição Detalhada do Projeto *</Label>
                <Textarea
                  id="project_description"
                  value={formData.project_description}
                  onChange={(e) => handleInputChange("project_description", e.target.value)}
                  required
                  rows={4}
                  placeholder="Descreva o seu projeto em detalhe: que tipo de trabalho pretende, materiais preferidos, estilo, características especiais, etc."
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="has_plans"
                  checked={hasPlans}
                  onCheckedChange={(checked) => setHasPlans(checked === true)}
                />
                <Label htmlFor="has_plans" className="text-sm">
                  Tenho plantas ou desenhos técnicos do projeto
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Informações Adicionais</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                rows={3}
                placeholder="Alguma informação adicional que considere relevante..."
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-gold hover:bg-gradient-gold/90 text-white shadow-gold"
              disabled={loading}
            >
              {loading ? (
                "A enviar..."
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Enviar Pedido de Orçamento
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-serif">Contacto Direto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-secondary" />
              <div>
                <p className="font-medium">Telefone</p>
                <p className="text-muted-foreground">210 153 627</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-secondary" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-muted-foreground">geral@construcoes.pt</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-serif">Processo de Orçamentação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex space-x-3">
                <div className="w-6 h-6 bg-secondary text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <h4 className="font-medium">Análise do Pedido</h4>
                  <p className="text-sm text-muted-foreground">Revisão detalhada das suas necessidades e requisitos</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <div className="w-6 h-6 bg-secondary text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <h4 className="font-medium">Visita Técnica</h4>
                  <p className="text-sm text-muted-foreground">Avaliação presencial do local e discussão do projeto</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <div className="w-6 h-6 bg-secondary text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <h4 className="font-medium">Proposta Detalhada</h4>
                  <p className="text-sm text-muted-foreground">Orçamento completo com materiais, prazos e condições</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}