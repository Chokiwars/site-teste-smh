import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// ⚠️ PASSO 1: IMPORTAR SEU LOGO
// Ajuste o caminho abaixo para apontar para o arquivo do seu logo
import seuLogo from '../../assets/images/smh_sistemas_logo.jpg'; 

// Importações de Ícones
import { 
  Linkedin, Instagram, Facebook, 
  Phone, Mail, MapPin, Clock,
  SendHorizonal
} from 'lucide-react'; 
import { BsWhatsapp } from 'react-icons/bs'; 

// Importações de componentes (mantidas)
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import ServicesGrid from './components/ServicesGrid';
import MetricsCounter from './components/MetricsCounter';
import ProjectShowcase from './components/ProjectShowcase';
import CTASection from './components/CTASection';

const Homepage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('E-mail cadastrado na newsletter:', email);
    alert('Obrigado por se inscrever!');
    setEmail(''); 
  };

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

  const socialLinks = [
    { 
      name: 'WhatsApp', 
      url: 'https://wa.me/5511999999999?text=Ol%C3%A1%2C+gostaria+de+um+or%C3%A7amento.', // ⚠️ Ajuste o número
      icon: BsWhatsapp,
      style: 'hover:text-[#25D366]' 
    },
    { name: 'LinkedIn', url: 'https://br.linkedin.com/company/smhsistemas', icon: Linkedin, style: 'hover:text-[#0A66C2]' },
    { name: 'Instagram', url: 'https://www.instagram.com/smhsistemas/', icon: Instagram, style: 'hover:text-[#E4405F]' },
    { name: 'Facebook', url: 'https://web.facebook.com/smhsistemas?_rdc=1&_rdr#', icon: Facebook, style: 'hover:text-[#1877F2]' },
  ];
  
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
      <footer className="bg-primary text-white pt-16 pb-8">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            
            <div className="col-span-1 md:col-span-2"> 
              <div className="flex items-center space-x-4 mb-4">
                
                <img 
                  src={seuLogo} 
                  alt="Logo SMH Sistemas" 
                  className="w-20 h-20 rounded-full object-cover shadow-lg"
                />
                
                <div>
                  <h3 className="text-2xl font-bold">SMH Sistemas</h3>
                  <p className="text-lg text-white/80">Contra Incêndio</p>
                </div>
              </div>

              <p className="text-sm text-white/70 mt-4 max-w-md">
                Líder em soluções de engenharia e sistemas de combate a incêndio, 
                garantindo segurança e conformidade para seu patrimônio.
              </p>
              
              {/* Seção de Redes Sociais */}
              <div className="mt-8 mb-4">
                <h4 className="font-semibold mb-4">Acompanhe</h4>
                <div className="flex space-x-5"> 
                  {socialLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Acesse nosso ${link.name}`}
                        // MUDANÇA: Efeito de hover mais pronunciado
                        className={`text-white/90 transition duration-300 ease-in-out transform hover:scale-125 ${link.style}`}
                      >
                        <Icon size={28} /> 
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            <div id="contact" className="col-span-1"> 
              <h4 className="text-lg font-semibold mb-5">Contato</h4>
              <ul className="space-y-4 text-sm text-white/80">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  const Content = item.link ? 'a' : 'li'; 

                  return (
                    <Content 
                      key={index} 
                      href={item.link}
                      target={item.link && (item.text.includes('smh@smh.com.br') || item.text.includes('+55')) ? '_self' : '_blank'}
                      rel={item.link ? 'noopener noreferrer' : undefined}
                      className={`flex items-start group ${item.link ? 'transition duration-200' : ''}`}
                    >
                      <Icon size={18} className={`mr-3 mt-[3px] flex-shrink-0 text-secondary ${item.link ? 'group-hover:scale-110 transition-transform' : ''}`} />
                      <span className={`${item.link ? 'group-hover:text-secondary' : ''}`}>{item.text}</span>
                    </Content>
                  );
                })}
              </ul>
            </div>
            
            {/* Newsletter (Ocupa 1 coluna) */}
            <div className="col-span-1">
              <h4 className="text-lg font-semibold mb-5">Newsletter</h4>
              <p className="text-sm text-white/80 mb-5">
                Receba nossas últimas notícias e ofertas.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="relative flex">
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email para newsletter"
                  className="w-full rounded-l-md border-transparent bg-white/20 px-4 py-3 text-white placeholder-white/60 transition duration-300 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-primary"
                />
                <button
                  type="submit"
                  aria-label="Assinar newsletter"
                  className="flex-shrink-0 rounded-r-md bg-secondary px-4 py-3 text-primary transition duration-300 hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-primary"
                >
                  <SendHorizonal size={20} />
                </button>
              </form>
              <p className="mt-3 text-xs text-white/50">
                Respeitamos sua privacidade. Sem spam.
              </p>
            </div>
            
          </div>
          <div className="mt-12 border-t border-white/20 pt-8 text-center">
            <p className="text-sm text-white/60">
              © {new Date()?.getFullYear()} SMH Sistemas. Todos os direitos reservados.
            </p>

          </div>

        </div>
      </footer>
    </div>
  );
};

export default Homepage;