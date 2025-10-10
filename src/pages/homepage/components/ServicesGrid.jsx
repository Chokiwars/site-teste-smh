import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServicesGrid = ({ onServiceClick }) => {
  const services = [
    {
      id: 1,
      title: "Desenvolvimento de Software",
      description: "Soluções personalizadas com tecnologias modernas para impulsionar seu negócio digital.",
      icon: "Code",
      features: ["React & Node.js", "APIs RESTful", "Arquitetura Escalável", "Testes Automatizados"],
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      title: "Transformação Digital",
      description: "Modernize seus processos e sistemas para aumentar eficiência e competitividade.",
      icon: "Zap",
      features: ["Automação de Processos", "Integração de Sistemas", "Cloud Migration", "Digital Strategy"],
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 3,
      title: "Consultoria em TI",
      description: "Expertise técnica para orientar suas decisões estratégicas de tecnologia.",
      icon: "Users",
      features: ["Arquitetura de Soluções", "Code Review", "Performance Optimization", "Security Audit"],
      color: "from-green-500 to-green-600"
    },
    {
      id: 4,
      title: "Infraestrutura Cloud",
      description: "Migração e otimização de infraestrutura para ambientes cloud seguros e escaláveis.",
      icon: "Cloud",
      features: ["AWS & Azure", "DevOps & CI/CD", "Monitoramento 24/7", "Backup & Recovery"],
      color: "from-orange-500 to-orange-600"
    },
    {
      id: 5,
      title: "Segurança Cibernética",
      description: "Proteção completa dos seus dados e sistemas contra ameaças digitais.",
      icon: "Shield",
      features: ["Penetration Testing", "LGPD Compliance", "Security Training", "Incident Response"],
      color: "from-red-500 to-red-600"
    },
    {
      id: 6,
      title: "Análise de Dados",
      description: "Transforme dados em insights estratégicos para tomada de decisões inteligentes.",
      icon: "BarChart3",
      features: ["Business Intelligence", "Machine Learning", "Data Visualization", "Predictive Analytics"],
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Nossos Serviços
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Oferecemos soluções tecnológicas completas para impulsionar sua transformação digital 
            e garantir o sucesso do seu negócio no mundo digital.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((service, index) => (
            <motion.div
              key={service?.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-subtle hover:shadow-medium transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                {/* Icon Header */}
                <div className="mb-6">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service?.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon name={service?.icon} size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                    {service?.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {service?.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="flex-grow mb-6">
                  <ul className="space-y-2">
                    {service?.features?.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-foreground">
                        <Icon name="Check" size={16} className="text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <Button
                  variant="outline"
                  onClick={() => onServiceClick(service)}
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="w-full group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-300"
                >
                  Saiba Mais
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-text-secondary mb-6">
            Não encontrou exatamente o que precisa? Criamos soluções personalizadas.
          </p>
          <Button
            variant="default"
            size="lg"
            onClick={() => onServiceClick({ title: 'Solução Personalizada' })}
            iconName="Sparkles"
            iconPosition="left"
            className="bg-accent hover:bg-accent/90 px-8 py-4 btn-magnetic"
          >
            Solicitar Solução Personalizada
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGrid;