import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Logo from '@/assets/images/smh_sistemas_logo.jpg';

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
    // 1. CONTAINER PRINCIPAL FIXO
    // Este novo `div` agora envolve tudo e é responsável por fixar o cabeçalho no topo.
    // A lógica de `isScrolled` também foi movida para cá.
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'shadow-md' // A sombra agora se aplica ao container todo
          : ''
      } ${className}`}
    >
      {/* Informações de Contato Acima do Header */}
      <div className="bg-[#003366] text-white py-2 text-sm font-medium">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div>
            <span className="mr-6">Telefone: (11) 1234-5678</span>
            <span>E-mail: contato@smhsistemas.com.br</span>
          </div>
          <div>
            <Button onClick={() => navigate('/contato')} className="bg-white text-[#003366] hover:bg-gray-100 px-4 py-2 rounded-md">
              Fale Conosco
            </Button>
          </div>
        </div>
      </div>

      {/* 2. HEADER INTERNO
          As classes de posicionamento ('fixed', 'top-0', etc.) foram removidas daqui.
          Ele agora é apenas um bloco dentro do container principal. */}
      <header className="bg-white border-b border-border w-full">
        <div className="flex items-center justify-between h-16 px-6 lg:px-8">
          {/* Logo */}
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
            <img
              src={Logo}
              alt="Logo SMH Sistemas"
              className="w-full h-full object-contain rounded-xl shadow-md ring-1 ring-border group-hover:ring-primary transition-all duration-300"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.slice(0, 8).map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center space-x-2 group ${
                  isActivePath(item.path)
                    ? 'text-accent bg-accent/10'
                    : 'text-foreground hover:text-accent hover:bg-accent/5'
                }`}
              >
                <Icon
                  name={item.icon}
                  size={16}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
                <span>{item.name}</span>
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-foreground hover:text-accent hover:bg-accent/5 transition-colors duration-300"
            aria-label="Toggle mobile menu"
          >
            <Icon
              name={isMobileMenuOpen ? 'X' : 'Menu'}
              size={24}
              className="transition-transform duration-300"
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-out ${
            isMobileMenuOpen
              ? 'max-h-96 opacity-100'
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="px-6 py-4 bg-white border-t border-border">
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md text-left transition-all duration-300 ${
                    isActivePath(item.path)
                      ? 'text-accent bg-accent/10'
                      : 'text-foreground hover:text-accent hover:bg-accent/5'
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;