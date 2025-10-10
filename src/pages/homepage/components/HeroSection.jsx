import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HeroSection = ({ onGetProposal, onContactUs }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-secondary to-primary overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border border-white rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-white rounded-lg rotate-45"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 border border-white rounded-full"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 border border-white rounded-lg"></div>
      </div>
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Tecnologia que{' '}
              <span className="text-accent">Transforma</span>{' '}
              Negócios
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Somos seu parceiro em transformação digital, combinando inovação tecnológica 
              com confiabilidade corporativa para entregar soluções que geram resultados reais.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                variant="default"
                size="lg"
                onClick={onGetProposal}
                iconName="Calculator"
                iconPosition="left"
                className="bg-accent hover:bg-accent/90 text-white px-8 py-4 text-lg font-semibold btn-magnetic"
              >
                Gerar Proposta Personalizada
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={onContactUs}
                iconName="Phone"
                iconPosition="left"
                className="border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold btn-magnetic"
              >
                Falar com Especialista
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-white/80">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={20} />
                <span className="text-sm font-medium">100% Seguro</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={20} />
                <span className="text-sm font-medium">Resposta em 24h</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={20} />
                <span className="text-sm font-medium">Certificado ISO</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={20} />
                <span className="text-sm font-medium">500+ Clientes</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;