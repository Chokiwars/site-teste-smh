import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';



// Importação dos ícones do Lucide
import { 
  Linkedin, Instagram, Facebook, 
  Phone, Mail, MapPin, Clock,
  MessagesSquare 
} from 'lucide-react'; 

// Importações de componentes (mantidas)
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
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewProject = (project) => {
    console.log('Project clicked:', project?.title);
  };

  // Configuração dos Links das Redes Sociais
  const socialLinks = [
    { 
      name: 'WhatsApp', 
      url: 'https://wa.me/5511999999999?text=Ol%C3%A1%2C+gostaria+de+um+or%C3%A7amento.', // ⚠️ Ajuste o número
      icon: MessagesSquare, 
      style: 'hover:text-[#25D366]' 
    },
    { name: 'LinkedIn', url: 'https://br.linkedin.com/company/smhsistemas', icon: Linkedin, style: 'hover:text-[#0A66C2]' },
    { name: 'Instagram', url: 'https://www.instagram.com/smhsistemas/', icon: Instagram, style: 'hover:text-[#E4405F]' },
    { name: 'Facebook', url: 'https://web.facebook.com/smhsistemas?_rdc=1&_rdr#', icon: Facebook, style: 'hover:text-[#1877F2]' },
  ];
  
  // Dados de Contato com Ícones
  const contactInfo = [
    { icon: Phone, text: '+55 11 5060-5777', link: 'tel:+551150605777' }, 
    { icon: Mail, text: 'smh@smh.com.br', link: 'mailto:smh@smh.com.br' },
    { icon: MapPin, text: 'Av. Camilo Castelo Branco, 90, Vl. Gumercindo', link: 'https://www.google.com/maps/place/SMH+Sistemas+Contra+Inc%C3%AAndio/data=!4m2!3m1!1s0x0:0xf9a9f70eeef20071?sa=X&ved=1t:2428&ictx=111' },
    { icon: Clock, text: 'Seg-Sex: 8h às 18h' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pt-16"
      >
        {/* ... Seções da Página ... */}
        <HeroSection onGetProposal={handleGetProposal} onContactUs={handleContactUs} />
        <ServicesGrid onServiceClick={handleServiceClick} />
        <MetricsCounter />
        <ProjectShowcase onViewProject={handleViewProject} />
        <CTASection onGetProposal={handleGetProposal} onContactUs={handleContactUs} />
      </motion.main>
      
      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="container mx-auto px-6 lg:px-8">
          {/* Ajuste do grid para 3 colunas em MD: 2 para Info e 1 para Contato */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Company Info e Redes Sociais (Ocupa 2 colunas em MD+) */}
            <div className="col-span-1 md:col-span-2"> 
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-brand rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">SMH Sistemas</h3>
                </div>
              </div>
              
              {/* Seção de Redes Sociais */}
              <div className="mt-6 mb-4">
                <h4 className="font-semibold mb-3">Siga-nos</h4>
                <div className="flex space-x-4"> 
                  {socialLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Acesse nosso ${link.name}`}
                        className={`text-white/90 transition duration-300 ease-in-out hover:scale-110 ${link.style}`}
                      >
                        <Icon size={28} /> 
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="text-sm text-white/60 mt-8">
                © {new Date()?.getFullYear()} SMH Sistemas. Todos os direitos reservados.
              </div>
            </div>

            {/* Contact (Ocupa 1 coluna em MD+) */}
            <div id="contact" className="col-span-1"> 
              <h4 className="font-semibold mb-4">Contato</h4>
              <ul className="space-y-3 text-sm text-white/80">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  // Se houver link, renderiza como <a>, senão como <li>
                  const Content = item.link ? 'a' : 'li'; 

                  return (
                    <Content 
                      key={index} 
                      href={item.link}
                      target={item.link && (item.text.includes('smh@smh.com.br') || item.text.includes('+55')) ? '_self' : '_blank'}
                      rel={item.link ? 'noopener noreferrer' : undefined}
                      className={`flex items-start ${item.link ? 'hover:text-secondary transition duration-200' : ''}`}
                    >
                      <Icon size={18} className="mr-3 mt-[2px] flex-shrink-0" />
                      <span>{item.text}</span>
                    </Content>
                  );
                })}
              </ul>
            </div>
            
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;