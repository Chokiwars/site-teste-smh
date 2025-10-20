import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import imgAirport from '@/assets/images/airport.jpg';
import imgComercialCenter from '@/assets/images/comercial-center.jpg';
import imgConstruction from '@/assets/images/construction.jpg';
import imgCPD from '@/assets/images/cpd.jpg';
import imgDataCenter from '@/assets/images/data-center.jpg';
import imgIndustries from '@/assets/images/industries.jpg';
import imgLogistics from '@/assets/images/logistics.jpg';
import imgMall from '@/assets/images/mall.jpg';
import imgMining from '@/assets/images/mining.jpg';
import imgPort from '@/assets/images/ports.jpg';
import imgTelemarketing from '@/assets/images/telemarketing.jpg';

const ProjectShowcase = ({ onViewProject }) => {
  const [activeMarket, setActiveMarket] = useState(0);

  const markets = [
    {
      id: 1,
      name: 'Aeroportos',
      description:
        'Sistemas de detecção e combate a incêndio de alta performance para a segurança de terminais, hangares e infraestruturas aeroportuárias.',
      image: imgAirport,
    },
    {
      id: 2,
      name: 'Centros Comerciais',
      description:
        'Soluções robustas para a proteção de grandes complexos comerciais, garantindo a segurança de pessoas e patrimônio.',
      image: imgComercialCenter,
    },
    {
      id: 3,
      name: 'Construção Civil',
      description:
        'Proteção contra incêndio em novas edificações e reformas, com foco em sistemas que se integram à arquitetura moderna.',
      image: imgConstruction,
    },
    {
      id: 4,
      name: 'Salas Técnicas (CPDs)',
      description:
        'Prevenção e combate a incêndio em ambientes críticos com equipamentos sensíveis, usando agentes limpos que não danificam os ativos.',
      image: imgCPD,
    },
    {
      id: 5,
      name: 'Data Centers',
      description:
        'Sistemas avançados de proteção contra incêndio para a continuidade de operações em data centers hyperscale e colocation.',
      image: imgDataCenter,
    },
    {
      id: 6,
      name: 'Indústrias',
      description:
        'Soluções personalizadas para ambientes industriais com riscos específicos, protegendo linhas de produção e maquinário.',
      image: imgIndustries,
    },
    {
      id: 7,
      name: 'Logística',
      description:
        'Proteção de centros de distribuição, armazéns e estoques, com sistemas que garantem a segurança das mercadorias.',
      image: imgLogistics,
    },
    {
      id: 8,
      name: 'Mineração',
      description:
        'Tecnologia de ponta para a proteção de equipamentos pesados e infraestruturas em operações de mineração, em ambientes desafiadores.',
      image: imgMining,
    },
    {
      id: 9,
      name: 'Portos',
      description:
        'Segurança contra incêndio para instalações portuárias, terminais de carga e áreas de armazenamento de grande volume.',
      image: imgPort,
    },
    {
      id: 10,
      name: 'Shopping Centers',
      description:
        'Sistemas abrangentes para a proteção de shopping centers, assegurando a segurança dos visitantes e do complexo comercial.',
      image: imgMall,
    },
    {
      id: 11,
      name: 'Telecomunicações',
      description:
        'Soluções críticas para centrais de telecomunicações, protegendo equipamentos eletrônicos e garantindo a continuidade dos serviços.',
      image: imgTelemarketing,
    },
  ];

  const nextMarket = () => {
    setActiveMarket((prev) => (prev + 1) % markets.length);
  };

  const prevMarket = () => {
    setActiveMarket((prev) => (prev - 1 + markets.length) % markets.length);
  };

  const currentMarket = markets[activeMarket];

  return (
    <section className="py-20 bg-white">
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
            Mercados Atendidos
          </h2>
          <p className="text-xl text-text-secondary max-w-4xl mx-auto">
            A SMH SISTEMAS é especializada na Proteção Contra Incêndio de Ambientes de Missão Crítica e Riscos Especiais, 
            atendendo a diversos setores.
          </p>
        </motion.div>

        {/* Carrossel */}
        <div className="relative">
          <div className="bg-surface rounded-3xl overflow-hidden shadow-medium">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              
              {/* Imagem com transição fluida */}
              <div className="relative h-[500px] overflow-hidden">

                <AnimatePresence mode="wait">
                  {markets.map((market, index) =>
                    index === activeMarket ? (
                      <motion.img
                        key={market.id}
                        src={market.image}
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
                    key={currentMarket?.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-3xl font-bold text-primary mb-4">
                      {currentMarket?.name}
                    </h3>
                    <p className="text-text-secondary mb-6 leading-relaxed">
                      {currentMarket?.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Controles de navegação */}
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

        {/* CTA final */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-text-secondary mb-6">
            Não encontrou seu setor? Converse conosco sobre uma solução personalizada.
          </p>
          <Button
            variant="outline"
            size="lg"
            onClick={() => onViewProject({ title: 'Novo Projeto' })}
            iconName="MessageSquare"
            iconPosition="left"
            className="px-8 py-4 btn-magnetic border-accent text-accent hover:bg-accent hover:text-white"
          >
            Fale Conosco
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
