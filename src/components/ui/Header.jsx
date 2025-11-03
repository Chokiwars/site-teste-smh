import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Icon from '../AppIcon';
import Button from './Button';
import Logo from '@/assets/images/smh_sistemas_logo2.png';

const BRFlag = 'https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg';
const UKFlag = 'https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg';

const primaryColor = {
  text: 'text-[#003366]',
  textHover: 'hover:text-[#003366]',
  bgHover: 'hover:bg-[#003366]/5',
  bgActive: 'bg-[#003366]/10',
};

const Header = ({ className = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // Mantido para o shadow-lg
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || 'pt');

  useEffect(() => setLanguage(i18n.language), [i18n.language]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsMobileMenuOpen(false), [location.pathname]);

  const navigationItems = [
    { key: 'home', path: '/homepage', icon: 'Home' },
    { key: 'about', path: '/sobre-nos', icon: 'Users' },
    { key: 'solutions', path: '/solucoes', icon: 'Layers' },
    { key: 'services', path: '/services', icon: 'Settings' },
    { key: 'clients', path: '/clientes', icon: 'Briefcase' },
    { key: 'compliance', path: '/compliance-qualidade', icon: 'ShieldCheck' },
  ];

  const socialLinks = [
    { name: 'Instagram', href: 'https://www.instagram.com/smhsistemas/', icon: 'Instagram' },
    { name: 'Linkedin', href: 'https://br.linkedin.com/company/smhsistemas', icon: 'Linkedin' },
    { name: 'Facebook', href: 'https://www.facebook.com/smhsistemas/', icon: 'Facebook' },
  ];

  const handleNavigation = (path) => {
    if (path.startsWith('#')) {
      const element = document.querySelector(path);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(path);
    }
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => location.pathname === path;

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 ${className} ${isScrolled ? 'shadow-lg' : ''}`}>
      {/* Top Bar */}
      <div className="bg-[#003366] text-white py-1.5 text-sm font-medium">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="hidden md:flex items-center gap-6">
            <a href="tel:+551150605777" className="flex items-center gap-1.5 hover:text-gray-300 transition-colors">
              <Icon name="Phone" size={16} />
              +55 11 5060-5777
            </a>
            <a href="mailto:smh@smh.com.br" className="flex items-center gap-1.5 hover:text-gray-300 transition-colors">
              <Icon name="Mail" size={16} />
              smh@smh.com.br
            </a>
          </div>

          <div className="hidden lg:flex items-center space-x-4 ml-auto">
            <div className="flex items-center space-x-3">
              {socialLinks.map((social) => (
                <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                  <Icon name={social.icon} size={20} />
                </a>
              ))}
            </div>

            <div className="w-px h-5 bg-white/30"></div>

            <div className="flex items-center space-x-2">
              <button onClick={() => changeLanguage('pt')} className={`p-1 rounded-full border ${language === 'pt' ? 'border-white' : 'border-transparent'}`}>
                <img src={BRFlag} alt="Português" className="w-5 h-5 rounded-full" />
              </button>
              <button onClick={() => changeLanguage('en')} className={`p-1 rounded-full border ${language === 'en' ? 'border-white' : 'border-transparent'}`}>
                <img src={UKFlag} alt="English" className="w-5 h-5 rounded-full" />
              </button>
            </div>

            <div className="w-px h-5 bg-white/30"></div>

            <Button onClick={() => navigate('/contato')} className="bg-white/10 text-white border border-white/30 hover:bg-white/20 px-4 py-1.5 rounded-lg text-sm">
              {t('contact')}
            </Button>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-200 w-full shadow-sm">
        {/* ✨ ESTA LINHA FOI AJUSTADA (lógica de scroll removida) ✨ */}
        <div className="flex items-center justify-between h-20 sm:h-32 px-6 lg:px-8">

          {/*Logo*/}
        {/* ✨ ESTA LINHA FOI AJUSTADA (lógica de scroll removida) ✨ */}
          <a href="/homepage" className="relative w-32 h-20 sm:w-44 sm:h-32 flex-shrink-0">
            <img src={Logo} alt="Logo SMH Sistemas" className="w-full h-full object-contain rounded-lg" />
          </a>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navigationItems.map((item) => (
              <button key={item.key} onClick={() => handleNavigation(item.path)} className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${isActivePath(item.path) ? `${primaryColor.text} ${primaryColor.bgActive} font-semibold` : 'text-slate-600 hover:text-red-600'}`}>
                <Icon name={item.icon} size={16} />
                <span>{item.key === 'compliance' ? t('nav_compliance') : t(item.key)}</span>
              </button>
            ))}
          </nav>

          {/* Mobile Button */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 rounded-md text-slate-700 hover:text-blue-600 hover:bg-gray-100">
            <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-gray-50 border-t border-gray-200 shadow-md">
            <nav className="flex flex-col px-6 py-4 space-y-2">
              {navigationItems.map((item) => (
                <button key={item.key} onClick={() => handleNavigation(item.path)} className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left ${isActivePath(item.path) ? `${primaryColor.text} ${primaryColor.bgActive}` : 'text-slate-700 hover:text-red-600 hover:bg-gray-200'}`}>
                  <Icon name={item.icon} size={20} />
                  <span>{item.key === 'compliance' ? t('nav_compliance') : t(item.key)}</span>
                </button>
              ))}
            </nav>

            {/* Social + Language */}
            <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-gray-200 space-y-3 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-3">
                {socialLinks.map((social) => (
                  <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black">
                    <Icon name={social.icon} size={24} />
                  </a>
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={() => changeLanguage('pt')} className={`p-1 rounded-full border ${language === 'pt' ? 'border-gray-700' : 'border-transparent'}`}>
                  <img src={BRFlag} alt="Português" className="w-5 h-5 rounded-full" />
                </button>
              _ <button onClick={() => changeLanguage('en')} className={`p-1 rounded-full border ${language === 'en' ? 'border-gray-700' : 'border-transparent'}`}>
        _         <img src={UKFlag} alt="English" className="w-5 h-5 rounded-full" />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;