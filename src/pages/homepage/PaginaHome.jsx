import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import seuLogo from '../../assets/images/smh_sistemas_logo.jpg'; 

// Ícones
import { Linkedin, Instagram, Facebook, Phone, Mail, MapPin, Clock, SendHorizonal } from 'lucide-react'; 
import { BsWhatsapp } from 'react-icons/bs'; 

// Componentes
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import ServicesGrid from './components/ServicesGrid';
import MetricsCounter from './components/MetricsCounter';
import ProjectShowcase from './components/ProjectShowcase';
import CTASection from './components/CTASection';

const Homepage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  // Handlers
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('E-mail cadastrado na newsletter:', email);
    alert(t('newsletter.thankYou'));
    setEmail('');
  };

  const handleGetProposal = () => navigate('/proposal-engine');
  const handleContactUs = () => window.open('tel:+5511999999999', '_self');

  const handleServiceClick = (service) => {
    console.log('Service clicked:', service?.title);
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewProject = (project) => console.log('Project clicked:', project?.title);

  const socialLinks = [
    { name: 'WhatsApp', url: 'https://wa.me/5511945443842?text=Ol%C3%A1!%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es.', icon: BsWhatsapp, style: 'hover:text-[#25D366]' },
    { name: 'LinkedIn', url: 'https://br.linkedin.com/company/smhsistemas', icon: Linkedin, style: 'hover:text-[#0A66C2]' },
    { name: 'Instagram', url: 'https://www.instagram.com/smhsistemas/', icon: Instagram, style: 'hover:text-[#E4405F]' },
    { name: 'Facebook', url: 'https://web.facebook.com/smhsistemas?_rdc=1&_rdr#', icon: Facebook, style: 'hover:text-[#1877F2]' },
  ];
  
  const contactInfo = [
    { icon: Phone, text: '+55 11 5060-5777', link: 'tel:+551150605777' }, 
    { icon: Mail, text: 'smh@smh.com.br', link: 'mailto:smh@smh.com.br' },
    { icon: MapPin, text: 'Av. Camilo Castelo Branco, 90, Vl. Gumercindo', link: 'https://www.google.com/maps/place/SMH+Sistemas+Contra+Inc%C3%AAndio/data=!4m2!3m1!1s0x0:0xf9a9f70eeef20071?sa=X&ved=1t:2428&ictx=111' },
    { icon: Clock, text: t('footer.hours') },
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
            
            {/* Logo e Sobre */}
            <div className="col-span-1 md:col-span-2"> 
              <div className="flex items-center space-x-4 mb-4">
                <img src={seuLogo} alt={t('footer.logoAlt')} className="w-20 h-20 rounded-full object-cover shadow-lg" />
                <div>
                  <h3 className="text-2xl font-bold">{t('footer.companyName')}</h3>
                  <p className="text-lg text-white/80">{t('footer.tagline')}</p>
                </div>
              </div>
              <p className="text-sm text-white/70 mt-4 max-w-md">{t('footer.description')}</p>

              {/* Redes Sociais */}
              <div className="mt-8 mb-4">
                <h4 className="font-semibold mb-4">{t('footer.follow')}</h4>
                <div className="flex space-x-5"> 
                  {socialLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${t('footer.access')} ${link.name}`}
                        className={`text-white/90 transition duration-300 ease-in-out transform hover:scale-125 ${link.style}`}
                      >
                        <Icon size={28} /> 
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Contato */}
            <div id="contact" className="col-span-1"> 
              <h4 className="text-lg font-semibold mb-5">{t('footer.contact')}</h4>
              <ul className="space-y-4 text-sm text-white/80">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  const Content = item.link ? 'a' : 'li'; 
                  return (
                    <Content 
                      key={index} 
                      href={item.link}
                      target={item.link ? '_self' : undefined}
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
            
            {/* Newsletter */}
            <div className="col-span-1">
              <h4 className="text-lg font-semibold mb-5">{t('footer.newsletter')}</h4>
              <p className="text-sm text-white/80 mb-5">{t('footer.newsletterDesc')}</p>
              <form onSubmit={handleNewsletterSubmit} className="relative flex">
                <input
                  type="email"
                  placeholder={t('footer.emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label={t('footer.emailPlaceholder')}
                  className="w-full rounded-l-md border-transparent bg-white/20 px-4 py-3 text-white placeholder-white/60 transition duration-300 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-primary"
                />
                <button
                  type="submit"
                  aria-label={t('footer.subscribe')}
                  className="flex-shrink-0 rounded-r-md bg-secondary px-4 py-3 text-primary transition duration-300 hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-primary"
                >
                  <SendHorizonal size={20} />
                </button>
              </form>
              <p className="mt-3 text-xs text-white/50">{t('footer.privacy')}</p>
            </div>
            
          </div>
          <div className="mt-12 border-t border-white/20 pt-8 text-center">
            <p className="text-sm text-white/60">
              © {new Date().getFullYear()} SMH Sistemas. {t('footer.rights')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
