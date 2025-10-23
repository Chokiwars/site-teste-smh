import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  Wrench,
  Sliders,
  Pipette,
  Waves,
  Gauge,
  Bell,
  Check,
  ArrowRight,
  Sparkles,
  X
} from 'lucide-react';

const iconMap = {
  Settings, Wrench, Sliders, Pipette, Waves, Gauge, Bell, Check, ArrowRight, Sparkles, X
};

const Icon = ({ name, size = 24, className = "" }) => {
  const LucideIcon = iconMap[name];
  if (!LucideIcon) return null;
  return <LucideIcon size={size} className={className} />;
};

const Button = ({ children, variant = 'default', size = 'md', onClick, iconName, iconPosition = 'right', className = "" }) => {
  let baseClasses = "font-medium rounded-xl transition duration-300 flex items-center justify-center space-x-2 shadow-lg";

  if (variant === 'default') {
    baseClasses += " bg-[#29314A] text-white hover:bg-[#29314A]/90 border border-transparent";
  } else if (variant === 'outline') {
    baseClasses += " bg-white text-[#29314A] border border-[#29314A] hover:bg-[#29314A] hover:text-white";
  }

  if (size === 'sm') baseClasses += " px-3 py-1.5 text-sm";
  else if (size === 'md') baseClasses += " px-4 py-2";
  else if (size === 'lg') baseClasses += " px-6 py-3 text-lg";

  const iconComponent = iconName ? <Icon name={iconName} size={20} /> : null;

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseClasses} ${className}`}
      type="button"
    >
      {iconName && iconPosition === 'left' && iconComponent}
      {children && (typeof children === 'string' ? <span>{children}</span> : children)}
      {iconName && iconPosition === 'right' && iconComponent}
    </motion.button>
  );
};

// --- CÓDIGO DA ANIMAÇÃO DE TEXTO ---
const wordAnimation = {
  initial: { y: 50, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', damping: 10, stiffness: 100 },
  },
};

const AnimatedText = ({ text, className, style, delay = 0 }) => {
  const words = String(text).split(' ');
  const container = {
    animate: {
      transition: { delayChildren: delay, staggerChildren: 0.05 },
    },
  };
  return (
    <motion.div
      className={`flex flex-wrap ${className || ''}`}
      style={style}
      variants={container}
      initial="initial"
      animate="animate"
    >
      {words.map((word, index) => (
        <span key={index} className="overflow-hidden inline-block mr-2">
          <motion.span className="inline-block" variants={wordAnimation}>
            {word + (index < words.length - 1 ? ' ' : '')}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
};
// --- FIM DO CÓDIGO DA ANIMAÇÃO ---

const servicesData = [
  {
    id: 1,
    title: "Manutenção Preventiva",
    description: "Executamos inspeções periódicas e ajustes técnicos para evitar falhas e manter os sistemas sempre operacionais.",
    icon: "Settings",
    features: ["Única", "Periódica", "Otimização de Performance"],
    color: "from-blue-500 to-blue-600"
  },
  {
    id: 2,
    title: "Manutenção Corretiva",
    description: "Atuamos na identificação e reparo imediato de falhas, restaurando a funcionalidade dos sistemas com agilidade.",
    icon: "Wrench",
    features: ["Infraestrutura", "Equipamento", "Mão de obra", "Atendimento 24/7"],
    color: "from-purple-500 to-purple-600"
  },
  {
    id: 3,
    title: "Adequação de Sistema",
    description: "Adaptamos e atualizamos sistemas existentes para atender às normas técnicas e às necessidades específicas do cliente.",
    icon: "Sliders",
    features: ["Infraestrutura", "Equipamento", "Mão de obra", "Compliance Legal"],
    color: "from-green-500 to-green-600"
  },
  {
    id: 4,
    title: "Teste de Estanqueidade",
    description: "Verificamos a vedação de tubulações e conexões para garantir que não haja vazamentos em sistemas pressurizados.",
    icon: "Pipette",
    features: ["Inspeção de Vazamentos", "Relatórios Detalhados", "Segurança Operacional"],
    color: "from-orange-500 to-orange-600"
  },
  {
    id: 5,
    title: "Teste de Ultrassom",
    description: "Utilizamos tecnologia ultrassônica para detectar falhas internas em materiais e componentes sem causar danos.",
    icon: "Waves",
    features: ["Análise Não Destrutiva", "Detecção de Rachaduras", "Avaliação de Integridade"],
    color: "from-red-500 to-red-600"
  },
  {
    id: 6,
    title: "Teste Hidrostático",
    description: "Realizamos ensaios com água pressurizada para avaliar a resistência e integridade de redes de combate a incêndio.",
    icon: "Gauge",
    features: ["Avaliação de Resistência", "Redes de Incêndio", "Certificação Técnica"],
    color: "from-indigo-500 to-indigo-600"
  },
  {
    id: 7,
    title: "Teste de Sirene",
    description: "Inspecionamos e testamos os sistemas de alarme sonoro para assegurar sua eficácia em situações de emergência.",
    icon: "Bell",
    features: ["Verificação de Alarme", "Simulação de Emergência", "Confiabilidade"],
    color: "from-pink-500 to-pink-600"
  }
];

const App = () => {
  const [selectedService, setSelectedService] = useState(null);

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setTimeout(() => window.scrollTo(0, 0), 0);
  };

  if (selectedService) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gray-50 p-6 md:p-12"
      >
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 lg:p-12 mt-10 border-t-4 border-[#29314A]">
          {/* Header moderno e limpo */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#29314A] flex items-center justify-center">
                <Icon name={selectedService.icon} size={22} className="text-white" />
              </div>
              <h1 className="text-3xl font-extrabold text-[#333]">
                {selectedService.title}
              </h1>
            </div>

            <Button
              variant="outline"
              onClick={() => setSelectedService(null)}
              iconName="X"
              className="p-3 rounded-full text-gray-500 hover:text-white hover:bg-red-500 border-none"
            />
          </div>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            {selectedService.description}
          </p>

          {/* Seção de benefícios reformulada */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-10">
            <h2 className="text-xl font-semibold text-[#29314A] mb-4">
              Benefícios e Detalhes
            </h2>
            <ul className="space-y-3">
              {selectedService.features?.map((feature, idx) => (
                <li key={idx} className="flex items-start text-gray-700 text-base">
                  <Icon name="Check" size={18} className="text-green-500 mr-2 mt-0.5" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center">
            <Button
              variant="default"
              size="lg"
              onClick={() =>
                console.log(`Solicitar orçamento: ${selectedService.title}`)
              }
              iconName="Sparkles"
              iconPosition="left"
              className="bg-[#29314A] hover:bg-[#29314A]/90 px-8 py-4"
            >
              Solicitar Orçamento
            </Button>

          </div>
        </div>
      </motion.div>
    );
  }

  // Grid original dos serviços
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-32 px-6 max-w-7xl mx-auto text-center">
        
        {/* --- TÍTULO COM ANIMAÇÃO --- */}
        <AnimatedText
          text="Conheça nossos serviços"
          className="text-4xl font-extrabold text-[#333] mb-2 justify-center"
          delay={0.1}
        />

        {/* --- SUBTÍTULO COM ANIMAÇÃO --- */}
        <AnimatedText
          text="Descubra como a SMH Sistemas pode impulsionar sua operação com tecnologia de alto nível."
          className="text-gray-600 text-xl max-w-3xl mx-auto mb-8 justify-center"
          delay={0.4}
        />

      </div>

      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* --- BLOCO DOS CARDS DE SERVIÇO CORRIGIDO --- */}
            {servicesData.map((service, index) => (
              <motion.div
                key={service.id}
                // Classes de estilo e 'group' unificadas aqui
                className="group bg-white rounded-2xl p-8 shadow-xl h-full flex flex-col border border-gray-100"
                
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                
                // Efeitos de hover unificados
                whileHover={{ 
                  scale: 1.03, 
                  boxShadow: "0 15px 30px rgba(41, 49, 74, 0.3)",
                  y: -8 // Equivalente a 'hover:-translate-y-2'
                }}
                
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* O 'div' interno desnecessário foi removido */}
                
                <div className="mb-6">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon name={service.icon} size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#333] mb-3 group-hover:text-[#29314A] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {service.description}
                  </p>
                </div>

                <div className="flex-grow mb-6 pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-semibold text-gray-500 mb-2">
                    Principais Focos:
                  </h4>
                  <ul className="space-y-2">
                    {service.features?.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-800">
                        <Icon
                          name="Check"
                          size={16}
                          className="text-green-500 mr-2 flex-shrink-0"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  variant="outline"
                  onClick={() => handleServiceClick(service)}
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="w-full group-hover:bg-[#29314A] group-hover:text-white group-hover:border-[#29314A] transition-all duration-300 text-base"
                >
                  Ver Detalhes
                </Button>
              </motion.div>
            ))}
            {/* --- FIM DO BLOCO DOS CARDS --- */}

          </div>
        </div>
      </section>
    </div>
  );
};

export default App;