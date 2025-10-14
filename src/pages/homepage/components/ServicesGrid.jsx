import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServicesGrid = ({ onServiceClick }) => {
  const services = [
    {
      id: 1,
      title: "Manutenção Preventiva",
      description: "Executamos inspeções periódicas e ajustes técnicos para evitar falhas e manter os sistemas sempre operacionais.",
      icon: "Settings",
      features: ["Única", "Periódica"],
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      title: "Manutenção Corretiva",
      description: "Atuamos na identificação e reparo imediato de falhas, restaurando a funcionalidade dos sistemas com agilidade.",
      icon: "Wrench",
      features: ["Infraestrutura", "Equipamento", "Mão de obra"],
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 3,
      title: "Adequação de Sistema",
      description: "Adaptamos e atualizamos sistemas existentes para atender às normas técnicas e às necessidades específicas do cliente.",
      icon: "Sliders",
      features: ["Infraestrutura", "Equipamento", "Mão de obra"],
      color: "from-green-500 to-green-600"
    },
    {
      id: 4,
      title: "Teste de Estanqueidade",
      description: "Verificamos a vedação de tubulações e conexões para garantir que não haja vazamentos em sistemas pressurizados.",
      icon: "Pipette",
      features: ["AWS & Azure", "DevOps & CI/CD", "Monitoramento 24/7", "Backup & Recovery"],
      color: "from-orange-500 to-orange-600"
    },
    {
      id: 5,
      title: "Teste de Ultrassom",
      description: "Utilizamos tecnologia ultrassônica para detectar falhas internas em materiais e componentes sem causar danos.",
      icon: "Waves",
      features: ["Penetration Testing", "LGPD Compliance", "Security Training", "Incident Response"],
      color: "from-red-500 to-red-600"
    },
    {
      id: 6,
      title: "Teste Hidrostático",
      description: "Realizamos ensaios com água pressurizada para avaliar a resistência e integridade de redes de combate a incêndio.",
      icon: "Gauge",
      features: ["Business Intelligence", "Machine Learning", "Data Visualization", "Predictive Analytics"],
      color: "from-indigo-500 to-indigo-600"
    },
    {
      id: 7,
      title: "Teste de Sirene",
      description: "Inspecionamos e testamos os sistemas de alarme sonoro para assegurar sua eficácia em situações de emergência.",
      icon: "Bell",
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