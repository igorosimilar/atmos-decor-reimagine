import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import PortfolioManager from "./pages/PortfolioManager";
import TestimonialsManager from "./pages/TestimonialsManager";
import PartnersManager from "./pages/PartnersManager";
import ContactManager from "./pages/ContactManager";
import CompanySettingsManager from "./pages/CompanySettingsManager";
import ContactMessagesManager from "./pages/ContactMessagesManager";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/portfolio" element={<PortfolioManager />} />
            <Route path="/admin/testimonials" element={<TestimonialsManager />} />
            <Route path="/admin/partners" element={<PartnersManager />} />
            <Route path="/admin/contact" element={<ContactManager />} />
            <Route path="/admin/settings" element={<CompanySettingsManager />} />
            <Route path="/admin/messages" element={<ContactMessagesManager />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
