import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CTASection = ({ onGetProposal, onContactUs }) => {
  const benefits = [
    {
      icon: "Zap",
      title: "Resposta Rápida",
      description: "Proposta personalizada na hora"
    },
    {
      icon: "Shield",
      title: "Sem Compromisso",
      description: "Análise gratuita das suas necessidades"
    },
    {
      icon: "Users",
      title: "Consultoria Especializada",
      description: "Conversa direta com nossos especialistas"
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-primary via-secondary to-primary relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Conecte-se com especialistas que entendem do seu negócio.
          </h2>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 backdrop-blur-sm">
                <Icon name={benefit.icon} size={28} className="text-white sm:text-2xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm sm:text-base text-white/80">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16 sm:mt-20"
        >
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center items-center mb-8">
            <Button
              variant="default"
              size="lg"
              onClick={onGetProposal}
              iconName="Calculator"
              iconPosition="left"
              className="bg-accent hover:bg-accent/90 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold btn-magnetic shadow-deep w-full sm:w-auto"
            >
              Gerar Proposta Gratuita
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={onContactUs}
              iconName="MessageCircle"
              iconPosition="left"
              className="border-white text-white hover:bg-white hover:text-primary px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold btn-magnetic w-full sm:w-auto"
            >
              Conversar com Especialista
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
