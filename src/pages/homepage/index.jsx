import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import ServicesGrid from './components/ServicesGrid';
import MetricsCounter from './components/MetricsCounter';
import ProjectShowcase from './components/ProjectShowcase';
import CTASection from './components/CTASection';

const Homepage = () => {
  const navigate = useNavigate();

  const handleGetProposal = () => {
    navigate('/proposal-engine');
  };

  const handleContactUs = () => {
    window.open('tel:+5511999999999', '_self');
  };

  const handleServiceClick = (service) => {
    console.log('Service clicked:', service?.title);
    // Navigate to service detail page or show modal
    // For now, we'll scroll to contact section
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewProject = (project) => {
    console.log('Project clicked:', project?.title);
    // Navigate to project detail page or show modal
    // For now, we'll navigate to proposal engine navigate('/proposal-engine');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pt-16"
      >
        {/* Hero Section */}
        <HeroSection 
          onGetProposal={handleGetProposal}
          onContactUs={handleContactUs}
        />

        {/* Services Grid */}
        <ServicesGrid onServiceClick={handleServiceClick} />

        {/* Metrics Counter */}
        <MetricsCounter />

        {/* Project Showcase */}
        <ProjectShowcase onViewProject={handleViewProject} />

        {/* CTA Section */}
        <CTASection 
          onGetProposal={handleGetProposal}
          onContactUs={handleContactUs}
        />
      </motion.main>
      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-brand rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">SMH Digital Hub</h3>
                  <p className="text-sm text-white/70">Technology Solutions</p>
                </div>
              </div>
              <p className="text-white/80 mb-4 max-w-md">
                Transformamos negócios através da tecnologia, combinando inovação 
                com confiabilidade para entregar soluções que geram resultados reais.
              </p>
              <div className="text-sm text-white/60">
                © {new Date()?.getFullYear()} SMH Digital Hub. Todos os direitos reservados.
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold mb-4">Serviços</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li>Desenvolvimento de Software</li>
                <li>Transformação Digital</li>
                <li>Consultoria em TI</li>
                <li>Infraestrutura Cloud</li>
                <li>Segurança Cibernética</li>
                <li>Análise de Dados</li>
              </ul>
            </div>

            {/* Contact */}
            <div id="contact">
              <h4 className="font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li>(11) 99999-9999</li>
                <li>contato@smhdigitalhub.com.br</li>
                <li>São Paulo, SP - Brasil</li>
                <li>Seg-Sex: 8h às 18h</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;