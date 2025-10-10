import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CTASection = ({ onGetProposal, onContactUs }) => {
  const benefits = [
    {
      icon: "Zap",
      title: "Resposta Rápida",
      description: "Proposta personalizada em até 24 horas"
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
    <section className="py-20 bg-gradient-to-br from-primary via-secondary to-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-24 h-24 border border-white rounded-lg rotate-45"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-1/3 w-20 h-20 border border-white rounded-lg"></div>
      </div>
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pronto para Transformar seu Negócio?
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Não deixe a concorrência sair na frente. Comece sua transformação digital hoje 
            e veja resultados reais em poucos meses.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {benefits?.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <Icon name={benefit?.icon} size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {benefit?.title}
              </h3>
              <p className="text-white/80">
                {benefit?.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              variant="default"
              size="lg"
              onClick={onGetProposal}
              iconName="Calculator"
              iconPosition="left"
              className="bg-accent hover:bg-accent/90 text-white px-8 py-4 text-lg font-semibold btn-magnetic shadow-deep"
            >
              Gerar Proposta Gratuita
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={onContactUs}
              iconName="MessageCircle"
              iconPosition="left"
              className="border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold btn-magnetic"
            >
              Conversar com Especialista
            </Button>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-white/80">
            <div className="flex items-center space-x-2">
              <Icon name="Phone" size={18} />
              <span className="font-medium">(11) 99999-9999</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Mail" size={18} />
              <span className="font-medium">contato@smhdigitalhub.com.br</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={18} />
              <span className="font-medium">Seg-Sex: 8h às 18h</span>
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-white/20"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 text-white/60">
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={20} />
              <span className="text-sm font-medium">Certificação ISO 27001</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={20} />
              <span className="text-sm font-medium">LGPD Compliance</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={20} />
              <span className="text-sm font-medium">98% Satisfação</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Headphones" size={20} />
              <span className="text-sm font-medium">Suporte 24/7</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;