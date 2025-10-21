import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Observações:
 * - Use a variável CSS --header-height para controlar o espaço superior que evita que o conteúdo
 *   seja escondido pelo menu fixo. Ajuste essa variável conforme a altura real do seu header.
 * - O componente calcula dinamicamente quantos logos exibir por slide conforme a largura da janela.
 * - Pausa o autoplay ao passar o mouse sobre o carrossel.
 */

/* animação por palavra */
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

const ClientLogoBox = ({ clientName, logoUrl }) => (
  <div
    className="flex-1 flex items-center justify-center p-6 bg-white rounded-lg border border-gray-200 shadow-md h-24 md:h-32 transition-transform duration-300 hover:shadow-xl hover:scale-[1.02]"
    style={{ color: 'var(--smh-900)' }}
  >
    <div className="flex items-center justify-center w-full h-full p-2">
      <img src={logoUrl} alt={clientName} className="max-w-full max-h-full object-contain" />
    </div>
  </div>
);

const cardVariants = {
  initial: { opacity: 0, y: 50, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -50, scale: 0.95 },
};

function ClientsCarousel({ clients }) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(() => {
    if (typeof window === 'undefined') return 4;
    const w = window.innerWidth;
    if (w >= 1024) return 4;
    if (w >= 640) return 3;
    return 2;
  });

  const updateVisibleCount = useCallback(() => {
    const w = window.innerWidth;
    const newCount = w >= 1024 ? 4 : w >= 640 ? 3 : 2;
    setVisibleCount(newCount);
  }, []);

  useEffect(() => {
    const onResize = () => {
      updateVisibleCount();
      setIndex(0);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [updateVisibleCount]);

  const totalSlides = Math.max(1, Math.ceil(clients.length / visibleCount));

  const next = useCallback(() => {
    setIndex(prev => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prev = useCallback(() => {
    setIndex(prev => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  const startIndex = index * visibleCount;
  const currentClients = clients.slice(startIndex, startIndex + visibleCount);
  const animationKey = `${index}-${visibleCount}`;

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full max-w-6xl mx-auto mb-12"
    >
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

      <motion.button
        onClick={prev}
        className="absolute z-20 p-3 bg-white text-[var(--smh-900)] rounded-full shadow-lg transition border border-gray-200 left-0 top-1/2 -translate-y-1/2"
        aria-label="Anterior"
      >
        <ChevronLeft size={24} />
      </motion.button>
      <motion.button
        onClick={next}
        className="absolute z-20 p-3 bg-white text-[var(--smh-900)] rounded-full shadow-lg transition border border-gray-200 right-0 top-1/2 -translate-y-1/2"
        aria-label="Próximo"
      >
        <ChevronRight size={24} />
      </motion.button>

      <div className="mt-8 flex space-x-2 justify-center">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setIndex(i)}
            animate={{
              backgroundColor: i === index ? 'var(--smh-accent1)' : 'rgb(209, 213, 219)',
              width: i === index ? '20px' : '12px',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="h-3 rounded-full"
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function SMHClientsCarousel() {
  const groupedClients = {
    Bancos: [
      { id: 5, name: 'Banco do Brasil', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Banco_do_Brasil_logo.svg' },
      { id: 6, name: 'Bradesco', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Banco_Bradesco_logo_%28horizontal%29.png' },
      { id: 8, name: 'Banco BMG', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Logo_do_Banco_Bmg.svg' },
      { id: 9, name: 'Banif Banco', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Logo_banif.jpg' },
      { id: 10, name: 'Banrisul', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Banrisul_logotipo_2022.svg' },
      { id: 16, name: 'BTG Pactual', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Btg-logo-blue.svg' },
      { id: 17, name: 'Banco BV', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Banco_BV_Logo.svg' },
      { id: 38, name: 'Julius Bar', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Julius_B%C3%A4r_Logo.svg' }
    ],
    Tecnologia: [
      { id: 2, name: 'Adata', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/ADATA_Technology_logo_svg.png' },
      { id: 31, name: 'Google', logoUrl: 'https://pngimg.com/uploads/google/google_PNG19644.png' },
      { id: 34, name: 'IBM', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg' },
      { id: 44, name: 'Microsoft', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
      { id: 41, name: 'Linkedin', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/LinkedIn_2021.svg' },
      { id: 36, name: 'Ipiranga', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Ipiranga_Logo.jpg' }
    ],
    Energia: [
      { id: 3, name: 'AES Eletropaulo', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/AES_Eletropaulo.svg' },
      { id: 30, name: 'Furnas', logoUrl: 'https://images.seeklogo.com/logo-png/23/1/furnas-logo-png_seeklogo-237269.png' },
      { id: 26, name: 'ExxonMobil', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Exxon_Mobil_Logo.svg' },
    ],
    Saúde: [
      { id: 1, name: 'Accumed Glicomed', logoUrl: 'https://www.smh.com.br/wp-content/uploads/2021/03/accumed.png' },
      { id: 27, name: 'Farmácias São João', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Logotipo_Farm%C3%A1cias_S%C3%A3o_Jo%C3%A3o.jpg' },
      { id: 39, name: 'Iron BR', logoUrl: 'https://ironbr.com.br/wp-content/uploads/2019/08/div_center-branco.png' },
    ]
  };

  return (
    <div
      style={{
        ['--smh-900']: '#0C233F',
        ['--smh-800']: '#29314A',
        ['--smh-accent1']: '#ED1C24',
        ['--smh-accent2']: '#EF313A',
        fontFamily: "'Inter', sans-serif",
      }}
      className="page-content pt-0 bg-gray-50 text-[var(--smh-900)] p-4 sm:p-6"
    >
      <style>{`
        :root { --header-height: 140px; }
        .page-content { padding-top: var(--header-height); }
        @media (max-width: 640px) {
          :root { --header-height: 96px; }
        }
        @media (min-width: 1024px) {
          :root { --header-height: 140px; }
        }
      `}</style>

      <AnimatedText
        text="Clientes Parceiros"
        className="text-3xl sm:text-4xl font-extrabold mb-1 text-center justify-center"
        style={{ color: 'var(--smh-900)' }}
        delay={0.1}
      />
      <AnimatedText
        text="Grandes marcas que confiam na SMH Sistemas"
        className="mb-8 sm:mb-12 text-md sm:text-lg font-medium text-center justify-center"
        style={{ color: 'var(--smh-accent1)' }}
        delay={0.4}
      />

      {Object.entries(groupedClients).map(([groupName, clients]) => (
        <section key={groupName} className="w-full max-w-6xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">{groupName}</h2>
          <ClientsCarousel clients={clients} />
        </section>
      ))}
    </div>
  );
}
