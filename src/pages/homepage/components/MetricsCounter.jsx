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
    const duration = 2000; // 2 seconds
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

        {/* Additional Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 text-white/60">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={20} />
              <span className="text-sm font-medium">Certificação ISO 27001</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Globe" size={20} />
              <span className="text-sm font-medium">Presença Nacional</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={20} />
              <span className="text-sm font-medium">Suporte 24/7</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Zap" size={20} />
              <span className="text-sm font-medium">99.9% Uptime</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MetricsCounter;