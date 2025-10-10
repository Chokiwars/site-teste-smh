import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HeroSection = ({ onGetProposal, onContactUs }) => {
  // Variantes para os elementos flutuantes do fundo
  const floatingVariants = {
    animate: (custom) => ({
      y: [0, -30, 0],
      x: [0, custom.x, 0],
      rotate: [0, custom.rotate, 0],
      scale: [1, 1.1, 1],
      transition: {
        duration: custom.duration,
        repeat: Infinity,
        ease: "easeInOut"
      }
    })
  };

  // Variantes para animação de entrada dos textos
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: custom * 0.2,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  // Variantes para os botões
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: (custom) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: custom * 0.15,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  // Variantes para os indicadores de confiança
  const indicatorVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (custom) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: 1.2 + custom * 0.1,
        ease: "easeOut"
      }
    })
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-secondary to-primary overflow-hidden">
      {/* Background Pattern - Animado */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 border-2 border-white rounded-full"
          variants={floatingVariants}
          animate="animate"
          custom={{ x: 15, rotate: 360, duration: 8 }}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 border-2 border-white rounded-lg rotate-45"
          variants={floatingVariants}
          animate="animate"
          custom={{ x: -20, rotate: -180, duration: 10 }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-16 h-16 border-2 border-white rounded-full"
          variants={floatingVariants}
          animate="animate"
          custom={{ x: 25, rotate: 180, duration: 7 }}
        />
        <motion.div
          className="absolute bottom-20 right-1/3 w-20 h-20 border-2 border-white rounded-lg"
          variants={floatingVariants}
          animate="animate"
          custom={{ x: -15, rotate: 360, duration: 9 }}
        />
        
        {/* Elementos adicionais flutuantes */}
        <motion.div
          className="absolute top-1/3 left-1/3 w-12 h-12 border border-white rounded-full"
          variants={floatingVariants}
          animate="animate"
          custom={{ x: 10, rotate: -360, duration: 12 }}
        />
        <motion.div
          className="absolute top-2/3 right-1/4 w-28 h-28 border border-white rounded-lg rotate-12"
          variants={floatingVariants}
          animate="animate"
          custom={{ x: -25, rotate: 180, duration: 11 }}
        />
        
        {/* Partículas flutuantes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div>
            {/* Título Principal */}
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              Tecnologia que{' '}
              <span className="text-accent">Transforma</span>{' '}
              Negócios
            </motion.h1>
            
            {/* Parágrafo */}
            <motion.p
              className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              Somos seu parceiro em transformação digital, combinando inovação tecnológica 
              com confiabilidade corporativa para entregar soluções que geram resultados reais.
            </motion.p>

            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <motion.div
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                custom={2}
              >
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
              </motion.div>
              
              <motion.div
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                custom={3}
              >
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
              </motion.div>
            </div>

            {/* Trust Indicators */}
            <motion.div 
              className="flex flex-wrap justify-center items-center gap-8 text-white/80"
              initial="hidden"
              animate="visible"
            >
              {[
                { icon: 'Shield', text: '100% Seguro' },
                { icon: 'Clock', text: 'Resposta em 24h' },
                { icon: 'Award', text: 'Certificado ISO' },
                { icon: 'Users', text: '500+ Clientes' }
              ].map((item, index) => (
                <motion.div
                  key={item.text}
                  className="flex items-center space-x-2"
                  variants={indicatorVariants}
                  custom={index}
                >
                  <Icon name={item.icon} size={20} />
                  <span className="text-sm font-medium">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { delay: 1.5, duration: 0.6 }
        }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div 
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;