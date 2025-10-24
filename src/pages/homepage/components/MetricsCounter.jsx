import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon'; 

const MetricsCounter = () => {
  const [counters, setCounters] = useState({
    clients: 0,
    projects: 0,
    satisfaction: 0,
    experience: 0
  });

  const finalValues = {
    clients: 1000,
    projects: 1200,
    satisfaction: 100,
    experience: 30
  };

  const metrics = [
    {
      key: 'clients',
      label: 'Clientes Atendidos',
      value: counters?.clients,
      suffix: '+',
      icon: 'Users',
      color: 'text-blue-600'
    },
    {
      key: 'projects',
      label: 'Projetos Entregues',
      value: counters?.projects,
      suffix: '+',
      icon: 'CheckCircle',
      color: 'text-green-600'
    },
    {
      key: 'satisfaction',
      label: 'Satisfação do Cliente',
      value: counters?.satisfaction,
      suffix: '%',
      icon: 'Heart',
      color: 'text-red-600'
    },
    {
      key: 'experience',
      label: 'Anos de Experiência',
      value: counters?.experience,
      suffix: '+',
      icon: 'Award',
      color: 'text-purple-600'
    }
  ];

  useEffect(() => {
    const duration = 2000; 
    const steps = 60;
    const stepDuration = duration / steps;

    const intervals = Object.keys(finalValues)?.map(key => {
      const increment = finalValues?.[key] / steps;
      let currentValue = 0;
      let step = 0;

      return setInterval(() => {
        step++;
        currentValue = Math.min(Math.ceil(increment * step), finalValues?.[key]);
        
        setCounters(prev => ({
          ...prev,
          [key]: currentValue
        }));

        if (step >= steps) {
          clearInterval(intervals?.find(interval => interval === this));
        }
      }, stepDuration);
    });

    return () => {
      intervals?.forEach(interval => clearInterval(interval));
    };
  }, []);

  const certifications = [
    {
      title: 'ISO 37001:2017',
      subtitle: '(Sistema de Gestão Antissuborno)',
      description: 'Estabelece requisitos e fornece orientações para estabelecer, implementar, manter e melhorar um sistema de gestão antissuborno, promovendo uma cultura de transparência e responsabilidade.',
      link: '#', // ⚠️ ATUALIZE ESTE LINK
      icon: 'Gavel' 
    },
    {
      title: 'ISO 37301:2021',
      subtitle: '(Sistema de Gestão de Compliance)',
      description: 'Define os padrões para sistemas de gestão de compliance, assegurando o cumprimento de leis e regulamentações, além de demonstrar dedicação a práticas empresariais éticas e legais.',
      link: '#', // ⚠️ ATUALIZE ESTE LINK
      icon: 'Scale' 
    },
    {
      title: 'ISO 9001:2015',
      subtitle: '(Sistema de Gestão da Qualidade)',
      description: 'Voltada para gestão da qualidade, garantindo que processos sejam otimizados para a satisfação do cliente, aprimorando a eficiência e a consistência dos produtos e serviços.',
      link: '#', // ⚠️ ATUALIZE ESTE LINK
      icon: 'Star' 
    }
  ];

  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Números que Falam por Si
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Nossa trajetória de sucesso é medida pelos resultados que entregamos 
            e pela confiança que nossos clientes depositam em nós.
          </p>
        </motion.div>

        {/* Grid dos Contadores (com hover) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics?.map((metric, index) => (
            <motion.div
              key={metric?.key}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors duration-300">
                    <Icon name={metric?.icon} size={32} className="text-white" />
                  </div>
                </div>
                
                <div className="mb-2">
                  <span className="text-4xl md:text-5xl font-bold text-white">
                    {metric?.value}
                  </span>
                  <span className="text-2xl font-bold text-accent">
                    {metric?.suffix}
                  </span>
                </div>
                
                <p className="text-white/80 font-medium text-lg">
                  {metric?.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* SEÇÃO DE CERTIFICAÇÃO ISO - COM ÍCONES E HOVER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 pt-16 border-t border-white/20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              CERTIFICAÇÕES ISO
            </h3>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Nosso compromisso com a excelência transparece em cada ação, garantindo qualidade, integridade e conformidade, comprovadas pelas certificações ABNT NBR ISO.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                // HOVER ADICIONADO AQUI:
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 flex flex-col h-full transition-all duration-300 hover:scale-105 hover:bg-white/20"
              >
                <div className="mb-4">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon name={cert.icon} size={28} className="text-white" />
                  </div>
                </div>

                <span className="text-accent font-semibold text-sm uppercase">
                  Certificação
                </span>
                <h4 className="text-xl font-bold text-white mt-2">
                  {cert.title}
                </h4>
                <p className="text-white/70 text-sm mb-4">
                  {cert.subtitle}
                </p>
                
                <p className="text-white/90 text-base mb-6 flex-grow">
                  {cert.description}
                </p>

                <a 
                  href={cert.link}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-accent font-semibold hover:text-white transition-colors duration-300 inline-flex items-center group mt-auto"
                >
                  Ver Certificado
                  <Icon name="ExternalLink" size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MetricsCounter;