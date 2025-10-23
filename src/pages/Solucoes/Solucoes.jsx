import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Flame,
  ShieldCheck,
  Droplet,
  Cloud,
  Building2,
  AlertTriangle,
  Check,
  ArrowRight,
  X,
  Sparkles
} from 'lucide-react';

const iconMap = { Flame, ShieldCheck, Droplet, Cloud, Building2, AlertTriangle, Check, ArrowRight, X, Sparkles };

const Icon = ({ name, size = 24, className = "" }) => {
  const LucideIcon = iconMap[name];
  return LucideIcon ? <LucideIcon size={size} className={className} /> : null;
};

const Button = ({ children, variant = 'default', size = 'md', onClick, iconName, iconPosition = 'right', className = "" }) => {
  let baseClasses = "font-medium rounded-xl transition duration-300 flex items-center justify-center space-x-2 shadow-lg";
  if (variant === 'default')
    baseClasses += " bg-[#29314A] text-white hover:bg-[#29314A]/90 border border-transparent";
  else if (variant === 'outline')
    baseClasses += " bg-white text-[#29314A] border border-[#29314A] hover:bg-[#29314A] hover:text-white";
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
    >
      {iconName && iconPosition === 'left' && iconComponent}
      {children && <span>{children}</span>}
      {iconName && iconPosition === 'right' && iconComponent}
    </motion.button>
  );
};

// --- Animação dos títulos principais ---
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
    animate: { transition: { delayChildren: delay, staggerChildren: 0.05 } },
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

// --- Animação calma para subtítulos/textos ---
const CardText = ({ children, delay = 0, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 5 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const systemsData = [
  {
    id: 1,
    title: "Sistemas eletrônicos de detecção e alarme de incêndio",
    description: "Tecnologias avançadas para identificação precoce de incêndios e alertas imediatos.",
    icon: "AlertTriangle",
    color: "from-red-500 to-orange-600",
    details: "Estes sistemas permitem monitoramento contínuo e integração com centrais de alarme inteligentes, garantindo respostas rápidas e eficientes em caso de incêndio.",
    items: [
      "Sistema de detecção de incêndio a laser (VESDA / HSSD)",
      "Sistema de detecção de incêndio convencional e endereçável",
      "Sistema de alarme de incêndio por aspiração",
      "Sistema de monitoramento e supervisão de alarmes"
    ]
  },
  {
    id: 2,
    title: "Sistemas de combate com agentes gasosos",
    description: "Soluções limpas e eficazes para áreas sensíveis e equipamentos eletrônicos.",
    icon: "Cloud",
    color: "from-blue-500 to-indigo-600",
    details: "Permitem rápida extinção sem danificar equipamentos eletrônicos, ideal para salas de servidores e laboratórios.",
    items: [
      "Sistema de combate a incêndio por agente limpo (FM200, NOVEC 1230, CO₂)",
      "Sistema de detecção e liberação automática de agente",
      "Sistema de pressurização e descarga controlada"
    ]
  },
  {
    id: 3,
    title: "Sistemas hidráulicos de combate a incêndio",
    description: "Estruturas robustas que garantem o fornecimento de água em situações de emergência.",
    icon: "Droplet",
    color: "from-sky-500 to-blue-600",
    details: "Inclui bombas de alta pressão, hidrantes e sistemas de reservatórios dimensionados para qualquer tipo de edifício.",
    items: [
      "Sistema de hidrantes e mangotinhos",
      "Sistema de bombas de incêndio (elétricas e a diesel)",
      "Reservatórios e casas de bombas"
    ]
  },
  {
    id: 4,
    title: "Sistemas automáticos de chuveiros automáticos (sprinklers)",
    description: "Reduzem rapidamente o avanço das chamas e minimizam danos estruturais.",
    icon: "Flame",
    color: "from-orange-500 to-yellow-500",
    details: "Tipos úmidos, secos, de pré-ação e dilúvio com monitoramento eletrônico integrado.",
    items: [
      "Sistema de sprinklers úmidos e secos",
      "Sistema de pré-ação e dilúvio",
      "Monitoramento e controle eletrônico dos sistemas"
    ]
  },
  {
    id: 5,
    title: "Sistemas de detecção de gases e fumaça",
    description: "Monitoramento preciso de ambientes com risco de gases inflamáveis ou tóxicos.",
    icon: "ShieldCheck",
    color: "from-green-500 to-emerald-600",
    details: "Inclui detectores fixos e portáteis, integrados a sistemas de alarme e supervisão centralizada.",
    items: [
      "Sistema fixo de detecção de gases tóxicos e inflamáveis",
      "Sistema portátil de detecção de gases",
      "Sistema de supervisão e alarme integrado"
    ]
  },
  {
    id: 6,
    title: "Sistemas de proteção passiva contra incêndio",
    description: "Barreiras e revestimentos que retardam a propagação do fogo e da fumaça.",
    icon: "Building2",
    color: "from-gray-500 to-slate-600",
    details: "Revestimentos, portas corta-fogo e selagens que aumentam a segurança estrutural do edifício.",
    items: [
      "Vedação corta-fogo e selagem de shafts",
      "Revestimentos e tintas intumescentes",
      "Portas e barreiras corta-fogo"
    ]
  }
];

const App = () => {
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [showMore, setShowMore] = useState(false);

  const handleClick = (system) => {
    setSelectedSystem(system);
    setShowMore(false);
    setTimeout(() => window.scrollTo(0, 0), 0);
  };

  if (selectedSystem) {
    return (
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="min-h-screen bg-gray-50 p-6 md:p-12">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 lg:p-12 mt-10 border-t-4 border-[#29314A]">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#29314A] flex items-center justify-center">
                <Icon name={selectedSystem.icon} size={22} className="text-white" />
              </div>
              <AnimatedText text={selectedSystem.title} className="text-3xl font-extrabold text-[#333]" delay={0.1} />
            </div>
            <Button variant="outline" onClick={() => setSelectedSystem(null)} iconName="X" className="p-3 rounded-full text-gray-500 hover:text-white hover:bg-red-500 border-none" />
          </div>

          <CardText className="text-lg text-gray-600 mb-8 leading-relaxed" delay={0.2}>
            {selectedSystem.description}
          </CardText>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-10">
            <CardText className="text-xl font-semibold text-[#29314A] mb-4" delay={0.3}>Componentes e Sistemas</CardText>
            <ul className="space-y-3">
              {selectedSystem.items.map((item, idx) => (
                <CardText key={idx} className="flex items-start text-gray-700 text-base" delay={0.35 + idx * 0.05}>
                  <Icon name="Check" size={18} className="text-green-500 mr-2 mt-0.5" />
                  {item}
                </CardText>
              ))}
            </ul>
          </div>

          <div className="text-center">
            <Button
              variant="default"
              size="lg"
              onClick={() => setShowMore(!showMore)}
              iconName="Sparkles"
              iconPosition="left"
              className="bg-[#29314A] hover:bg-[#29314A]/90 px-8 py-4"
            >
              Saiba mais sobre esta categoria
            </Button>

            {showMore && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mt-6 text-gray-700 bg-gray-100 rounded-xl p-4">
                {selectedSystem.details}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-32 px-6 max-w-7xl mx-auto text-center">
        <AnimatedText text="Sistemas de Incêndio" className="text-4xl font-extrabold text-[#333] mb-2 justify-center" delay={0.1} />
        <AnimatedText text="Conheça nossos sistemas projetados para garantir segurança, eficiência e confiabilidade na prevenção e combate a incêndios." className="text-gray-600 text-xl max-w-3xl mx-auto mb-8 justify-center" delay={0.4} />
      </div>

      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {systemsData.map((system, index) => (
              <motion.div
                key={system.id}
                className="group bg-white rounded-2xl p-8 shadow-xl h-full flex flex-col border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03, y: -8, boxShadow: "0 15px 30px rgba(41,49,74,0.3)" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mb-6">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${system.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon name={system.icon} size={32} className="text-white" />
                  </div>
                  <CardText className="text-2xl font-bold text-[#333] mb-3 group-hover:text-[#29314A] transition-colors duration-300" delay={0.2}>
                    {system.title}
                  </CardText>
                  <CardText className="text-gray-600 leading-relaxed text-sm" delay={0.25}>
                    {system.description}
                  </CardText>
                </div>

                <div className="flex-grow mb-6 pt-4 border-t border-gray-100">
                  <CardText className="text-sm font-semibold text-gray-500 mb-2" delay={0.3}>
                    Principais Sistemas:
                  </CardText>
                  <ul className="space-y-2">
                    {system.items.slice(0, 2).map((item, idx) => (
                      <CardText key={idx} className="flex items-center text-sm text-gray-800" delay={0.35 + idx * 0.05}>
                        <Icon name="Check" size={16} className="text-green-500 mr-2 flex-shrink-0" />
                        {item}
                      </CardText>
                    ))}
                    {system.items.length > 2 && (
                      <CardText className="text-sm text-gray-500 italic" delay={0.45}>
                        + {system.items.length - 2} outros...
                      </CardText>
                    )}
                  </ul>
                </div>

                <Button
                  variant="outline"
                  onClick={() => handleClick(system)}
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="w-full group-hover:bg-[#29314A] group-hover:text-white group-hover:border-[#29314A] transition-all duration-300 text-base"
                >
                  Ver Detalhes
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
