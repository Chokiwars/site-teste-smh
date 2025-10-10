import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

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
    { name: 'Home', path: '/homepage', icon: 'Home' },
    { name: 'Services', path: '#services', icon: 'Settings' },
    { name: 'Solutions', path: '#solutions', icon: 'Layers' },
    { name: 'About', path: '#about', icon: 'Users' },
    { name: 'Proposal Engine', path: '/proposal-engine', icon: 'Calculator' }
  ];

  const handleNavigation = (path) => {
    if (path?.startsWith('#')) {
      // Handle anchor links
      const element = document.querySelector(path);
      if (element) {
        element?.scrollIntoView({ behavior: 'smooth' });
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
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-medium border-b border-border' 
          : 'bg-transparent'
      } ${className}`}
    >
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-6 lg:px-8">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => handleNavigation('/homepage')}
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-brand rounded-lg flex items-center justify-center shadow-subtle group-hover:shadow-medium transition-all duration-300">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">H</span>
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
                  SMH Digital Hub
                </h1>
                <p className="text-xs text-text-secondary -mt-1">Technology Solutions</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.slice(0, 4)?.map((item) => (
              <button
                key={item?.name}
                onClick={() => handleNavigation(item?.path)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center space-x-2 group ${
                  isActivePath(item?.path)
                    ? 'text-accent bg-accent/10' :'text-foreground hover:text-accent hover:bg-accent/5'
                }`}
              >
                <Icon 
                  name={item?.icon} 
                  size={16} 
                  className="group-hover:scale-110 transition-transform duration-300" 
                />
                <span>{item?.name}</span>
              </button>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleNavigation('/proposal-engine')}
              iconName="Calculator"
              iconPosition="left"
              className="btn-magnetic"
            >
              Get Proposal
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => window.open('tel:+5511999999999', '_self')}
              iconName="Phone"
              iconPosition="left"
              className="btn-magnetic bg-accent hover:bg-accent/90"
            >
              Contact Us
            </Button>
          </div>

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
              ? 'max-h-96 opacity-100' :'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="px-6 py-4 bg-background/95 backdrop-blur-md border-t border-border">
            <nav className="space-y-2">
              {navigationItems?.map((item) => (
                <button
                  key={item?.name}
                  onClick={() => handleNavigation(item?.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md text-left transition-all duration-300 ${
                    isActivePath(item?.path)
                      ? 'text-accent bg-accent/10' :'text-foreground hover:text-accent hover:bg-accent/5'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span className="font-medium">{item?.name}</span>
                </button>
              ))}
            </nav>
            
            {/* Mobile CTA Buttons */}
            <div className="mt-4 pt-4 border-t border-border space-y-3">
              <Button
                variant="outline"
                fullWidth
                onClick={() => handleNavigation('/proposal-engine')}
                iconName="Calculator"
                iconPosition="left"
              >
                Get Custom Proposal
              </Button>
              <Button
                variant="default"
                fullWidth
                onClick={() => window.open('tel:+5511999999999', '_self')}
                iconName="Phone"
                iconPosition="left"
                className="bg-accent hover:bg-accent/90"
              >
                Contact Us Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;