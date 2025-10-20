import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Componente para exibir a logo de cada cliente
const ClientLogoBox = ({ clientName, logoUrl }) => (
  <div 
    className="flex-1 flex items-center justify-center p-6 bg-white rounded-lg border border-gray-200 shadow-md h-24 md:h-32 transition-transform duration-300 hover:shadow-xl hover:scale-[1.02]"
    style={{ color: 'var(--smh-900)' }}
  >
    <div className="flex items-center justify-center w-full h-full p-2">
      <img 
        src={logoUrl} 
        alt={clientName} 
        className="max-w-full max-h-full object-contain"
      />
    </div>
  </div>
);

// Variantes de animação do Framer Motion
const cardVariants = {
  initial: { opacity: 0, y: 50, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -50, scale: 0.95 },
};

export default function SMHClientsCarousel() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const clients = [
    // Link corrigido para HTTPS:
    { id: 1, name: 'Accumed Glicomed', logoUrl: 'https://www.smh.com.br/wp-content/uploads/2021/03/accumed.png' }, 
    { id: 2, name: 'Adata', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/ADATA_Technology_logo_svg.png' },
    { id: 3, name: 'Rede Saúde Gama', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
    { id: 4, name: 'Logística Delta', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { id: 5, name: 'Indústria Épsilon', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg' },
    { id: 6, name: 'Universidade Zeta', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Google.png' },
    { id: 7, name: 'Fintech Ómega', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Instagram_logo_2016.svg' },
    { id: 8, name: 'Serviços Sigma', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg' },
  ];

  // Determina quantos clientes mostrar por slide
  const getVisibleCount = () => {
    if (typeof window === 'undefined') return 4; // Previne erro no Server-Side Rendering
    if (window.innerWidth >= 1024) return 4;
    if (window.innerWidth >= 640) return 3;
    return 2;
  };

  const visibleClientsCount = getVisibleCount();
  const totalSlides = Math.ceil(clients.length / visibleClientsCount);

  const next = useCallback(() => {
    setIndex(prev => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prev = () => setIndex(prev => (prev - 1 + totalSlides) % totalSlides);

  useEffect(() => {
    // Adicionamos a lógica para atualizar a contagem de cards visíveis na mudança de tamanho da tela
    const handleResize = () => setIndex(0); // Reinicia o carrossel ao redimensionar
    window.addEventListener('resize', handleResize);
    
    if (isPaused) return;
    const interval = setInterval(next, 5000);
    
    return () => {
        clearInterval(interval);
        window.removeEventListener('resize', handleResize);
    };
  }, [isPaused, next]);

  const startIndex = index * visibleClientsCount;
  const currentClients = clients.slice(startIndex, startIndex + visibleClientsCount);

  const animationKey = index;

  return (
    <div
      style={{
        ['--smh-900']: '#0C233F',
        ['--smh-800']: '#29314A',
        ['--smh-accent1']: '#ED1C24',
        ['--smh-accent2']: '#EF313A'
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-[var(--smh-900)] p-4 sm:p-6"
    >
      {/* Título e Carrossel (sem alterações) */}
        <motion.h1 
            // ...
            className="text-3xl sm:text-4xl font-extrabold mb-1 text-center"
            style={{ color: 'var(--smh-900)' }}
        >
            Clientes Parceiros
        </motion.h1>
        <motion.p 
            // ...
            className="mb-8 sm:mb-12 text-md sm:text-lg font-medium text-center"
            style={{ color: 'var(--smh-accent1)' }}
        >
            Grandes marcas que confiam na SMH Sistemas
        </motion.p>
        
        <div className="relative w-full max-w-6xl">
          <AnimatePresence mode="wait">
            <motion.div 
              key={animationKey}
              className="flex justify-center gap-4 sm:gap-6"
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.6 }}
            >
              {currentClients.map((client, i) => (
                <motion.div 
                  key={client.id} 
                  className="w-1/2 sm:w-1/3 lg:w-1/4 flex-shrink-0"
                  variants={cardVariants}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <ClientLogoBox clientName={client.name} logoUrl={client.logoUrl} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Botões de navegação e Indicadores (sem alterações) */}
            <motion.button onClick={prev} className="absolute z-20 p-3 bg-white text-[var(--smh-900)] rounded-full shadow-lg transition border border-gray-200 left-0 top-1/2 -translate-y-1/2">
                <ChevronLeft size={24} />
            </motion.button>
            <motion.button onClick={next} className="absolute z-20 p-3 bg-white text-[var(--smh-900)] rounded-full shadow-lg transition border border-gray-200 right-0 top-1/2 -translate-y-1/2">
                <ChevronRight size={24} />
            </motion.button>
        </div>

        <div className="mt-8 sm:mt-12 flex space-x-2">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setIndex(i)}
              animate={{ 
                backgroundColor: i === index ? 'var(--smh-accent1)' : 'rgb(209, 213, 219)', 
                width: i === index ? '20px' : '12px' 
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="h-3 rounded-full"
            />
          ))}
        </div>
      </div>
  );
}