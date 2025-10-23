import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon'; // --- CERTIFIQUE-SE que seu AppIcon tem: 'Phone', 'Mail', 'Instagram', 'Linkedin', 'Facebook'
import Button from './Button'; // Assumindo que seu Button é um <button> simples
import Logo from '@/assets/images/smh_sistemas_logo.jpg';

// --- DEFINIÇÃO DE CORES PRIMÁRIAS (para consistência) ---
const primaryColor = {
  text: 'text-[#003366]',
  textHover: 'hover:text-[#003366]',
  bgHover: 'hover:bg-[#003366]/5', // 5% de opacidade
  bgActive: 'bg-[#003366]/10',  // 10% de opacidade
};
// --------------------------------------------------------

const Header = ({ className = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Início', path: '/homepage', icon: 'Home' },
    { name: 'Sobre Nós', path: '/sobre-nos', icon: 'Users' },
    { name: 'Soluções', path: '#solutions', icon: 'Layers' },
    { name: 'Serviços', path: '/services', icon: 'Settings' },
    { name: 'Clientes', path: '/clientes', icon: 'Briefcase' },
    { name: 'Formulario', path: '/formulario-pedidos-clientes', icon: 'Home'},
    { name: 'Cadastro', path: '/cadastro-clientes', icon: 'Users'},
    { name: 'Login', path: '/login-clientes', icon: 'User'},
  ];

  const socialLinks = [
    { name: 'Instagram', href: 'https://www.instagram.com/smhsistemas/', icon: 'Instagram' },
    { name: 'Linkedin', href: 'https://br.linkedin.com/company/smhsistemas', icon: 'Linkedin' },
    { name: 'Facebook', href: 'https://www.facebook.com/smhsistemas/', icon: 'Facebook' },
  ];

  const handleNavigation = (path) => {
    if (path?.startsWith('#')) {
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    if (path?.startsWith('#')) return false;
    return location?.pathname === path;
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-lg' : ''
      } ${className}`}
    >
      {/* Informações de Contato Acima do Header */}
      <div className="bg-[#003366] text-white py-1.5 text-sm font-medium">
        <div className="container mx-auto flex justify-between items-center px-4">
          
          <div className="hidden md:flex items-center gap-6">
            <a href="tel:+551150605777" className="flex items-center gap-1.5 hover:text-gray-300 transition-colors">
              <Icon name="Phone" size={16} />
              <span>+55 11 5060-5777</span>
            </a>
            <a href="mailto:smh@smh.com.br" className="flex items-center gap-1.5 hover:text-gray-300 transition-colors">
              <Icon name="Mail" size={16} />
              <span>smh@smh.com.br</span>
            </a>
          </div>

          <div className="flex items-center space-x-4 ml-auto">
            {/* Ícones Sociais (Desktop) */}
            <div className="hidden lg:flex items-center space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300 transform hover:scale-110 transition-all duration-300"
                  aria-label={social.name}
                >
                  <Icon name={social.icon} size={20} />
                </a>
              ))}
            </div>

            <div className="hidden lg:block w-px h-5 bg-white/30"></div>

            <Button 
              onClick={() => navigate('/contato')} 
              className="bg-white/10 text-white border border-white/30 hover:bg-white/20 px-4 py-1.5 rounded-lg text-sm transition-all duration-300 transform hover:scale-105"
            >
              Fale Conosco
            </Button>
          </div>
        </div>
      </div>

      {/* Header Interno */}
      <header className="bg-white border-b border-gray-200 w-full shadow-sm">
        <div className="flex items-center justify-between h-18 px-6 lg:px-8">
          {/* Logo */}
          <a href="/homepage" className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 transition-transform duration-300 transform hover:scale-105">
            <img
              src={Logo}
              alt="Logo SMH Sistemas"
              className="w-full h-full object-contain rounded-lg"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navigationItems.slice(0, 8).map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 group ${
                  isActivePath(item.path)
                    ? `${primaryColor.text} ${primaryColor.bgActive} font-semibold` // Estado Ativo
                    // --- MUDANÇA AQUI ---
                    : `text-slate-600 hover:text-red-600 ${primaryColor.bgHover}` // Estado Inativo
                }`}
              >
                <Icon
                  name={item.icon}
                  size={16}
                  className="transition-transform duration-300"
                />
                <span>{item.name}</span>
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-slate-700 hover:text-blue-600 hover:bg-gray-100 transition-all duration-300 transform hover:scale-110"
            aria-label="Toggle mobile menu"
          >
            <Icon
              name={isMobileMenuOpen ? 'X' : 'Menu'}
              size={24}
              className={`transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : 'rotate-0'}`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-out ${
            isMobileMenuOpen
              ? 'max-h-screen opacity-100'
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-300 ${
                    isActivePath(item.path)
                      ? `${primaryColor.text} ${primaryColor.bgActive} font-semibold` // Estado Ativo
                      // --- MUDANÇA AQUI ---
                      : `text-slate-700 hover:text-red-600 hover:bg-gray-200` // Estado Inativo
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </nav>
            
            <div className="lg:hidden flex justify-center space-x-6 pt-5 mt-4 border-t border-gray-200">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-black transform hover:scale-110 transition-all duration-300"
                  aria-label={social.name}
                >
                  <Icon name={social.icon} size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;