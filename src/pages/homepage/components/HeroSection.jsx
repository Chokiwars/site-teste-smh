import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

// Imagens do carrossel
import image1 from '../../../assets/images/data-center-1.png';
import image2 from '../../../assets/images/smoke-detector.png';
import image3 from '../../../assets/images/3.jpg';
import image4 from '../../../assets/images/4.jpg';
import image5 from '../../../assets/images/5.jpg';
import image6 from '../../../assets/images/6.jpg';


const images = [image1, image2, image3, image4, image5, image6];
const INTERVAL_TIME = 5000;

const HeroSection = ({ onContactUs }) => {
  const WORDS = ["Negócios", "Vidas", "Dados", "Informações"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 3000);

    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, INTERVAL_TIME);

    return () => {
      clearInterval(wordInterval);
      clearInterval(imageInterval);
    };
  }, []);

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 60, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const wordVariants = {
    initial: { y: 20, opacity: 0, filter: "blur(4px)" },
    animate: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    },
    exit: {
      y: -20,
      opacity: 0,
      filter: "blur(4px)",
      transition: { duration: 0.4, ease: "easeIn" }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }
    },
    hover: { scale: 1.05, transition: { duration: 0.3, ease: "easeOut" } },
    tap: { scale: 0.95 }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Carrossel de fundo (sem mode="wait" para transição suave) */}
      <AnimatePresence>
        <motion.div
          key={images[currentImageIndex]}
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>

      {/* Camada escura opcional */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Setas de navegação */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 text-white bg-black/30 hover:bg-black/50 p-3 rounded-full"
        aria-label="Imagem anterior"
      >
        ‹
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 text-white bg-black/30 hover:bg-black/50 p-3 rounded-full"
        aria-label="Próxima imagem"
      >
        ›
      </button>

      {/* Conteúdo principal */}
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >

          <div className="relative inline-block mb-12">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight relative z-10"
              variants={textVariants}
            >
              Uma tecnologia que <span className="text-accent">Protege</span>{' '}
              <AnimatePresence mode="wait">
                <motion.span
                  key={WORDS[currentWordIndex]}
                  variants={wordVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="inline-block relative"
                  style={{ minWidth: '180px' }}
                >
                  <span className="text-white relative z-10">{WORDS[currentWordIndex]}</span>
                  <span className="absolute inset-0 bg-white/10 rounded-xl blur-md" />
                </motion.span>
              </AnimatePresence>
            </motion.h1>
          </div>

          <motion.div className="flex justify-center items-center mb-12" variants={containerVariants}>
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Button
                variant="outline"
                size="lg"
                onClick={onContactUs}
                iconName="Phone"
                iconPosition="left"
                className="border-white/50 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold relative overflow-hidden group"
              >
                <motion.span
                  className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg"
                />
                Entre em Contato
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 2.5, duration: 0.8 } }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center backdrop-blur-sm"
          animate={{
            y: [0, 12, 0],
            borderColor: ["rgba(255,255,255,0.3)", "rgba(255,255,255,0.7)", "rgba(255,255,255,0.3)"]
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;