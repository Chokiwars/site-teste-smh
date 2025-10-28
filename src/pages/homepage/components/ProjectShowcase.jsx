import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectShowcase = () => {
  const [activeMarket, setActiveMarket] = useState(0);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const markets = t('projectShowcase.markets', { returnObjects: true });

  const nextMarket = () => setActiveMarket((prev) => (prev + 1) % markets.length);
  const prevMarket = () => setActiveMarket((prev) => (prev - 1 + markets.length) % markets.length);

  const currentMarket = markets[activeMarket];

  return (
    <section className="py-20 bg-white dark:bg-[#222236]">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Título e subtítulo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            {t('projectShowcase.title')}
          </h2>
          <p className="text-xl text-text-secondary max-w-4xl mx-auto">
            {t('projectShowcase.subtitle')}
          </p>
        </motion.div>

        {/* Carrossel */}
        <div className="relative">
          <div className="bg-surface rounded-3xl overflow-hidden shadow-medium">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Imagem */}
              <div className="relative h-[500px] overflow-hidden">
                <AnimatePresence mode="wait">
                  {markets.map((market, index) =>
                    index === activeMarket ? (
                      <motion.img
                        key={market.name}
                        src={market.image || ''}
                        alt={market.name}
                        initial={{ opacity: 0, scale: 1.02 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : null
                  )}
                </AnimatePresence>
              </div>

              {/* Detalhes do mercado */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentMarket.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-3xl font-bold text-primary mb-4">
                      {currentMarket.name}
                    </h3>
                    <p className="text-text-secondary mb-6 leading-relaxed">
                      {currentMarket.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Controles */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={prevMarket}
              className="w-12 h-12 bg-white shadow-medium rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300 hover:scale-110"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>

            <div className="flex space-x-2">
              {markets.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveMarket(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeMarket
                      ? 'bg-accent scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextMarket}
              className="w-12 h-12 bg-white shadow-medium rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300 hover:scale-110"
            >
              <Icon name="ChevronRight" size={20} />
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <p className="text-lg text-text-secondary mb-6">
            {t('projectShowcase.notFound')}
          </p>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/contato')}
            iconName="MessageSquare"
            iconPosition="left"
            className="px-8 py-4 border-accent text-accent hover:bg-accent hover:text-white transition-all duration-300 ease-in-out"
          >
            {t('projectShowcase.button')}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
