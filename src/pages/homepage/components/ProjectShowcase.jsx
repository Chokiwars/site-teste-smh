import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon'; 
import Button from '../../../components/ui/Button';

const ProjectShowcase = ({ onViewProject }) => {
  const [activeMarket, setActiveMarket] = useState(0);


  const BASE_IMAGE_URL = "https://images.unsplash.com/photo-1579766946019-21664e48227b?w=800&h=600&fit=crop";

  const markets = [
    {
      id: 1,
      name: "Aeroportos",
      description: "Sistemas de detecção e combate a incêndio de alta performance para a segurança de terminais, hangares e infraestruturas aeroportuárias.",
      image: BASE_IMAGE_URL
    },
    {
      id: 2,
      name: "Centros Comerciais",
      description: "Soluções robustas para a proteção de grandes complexos comerciais, garantindo a segurança de pessoas e patrimônio.",
      image: "https://images.unsplash.com/photo-1542318047-9754c0032b49?w=800&h=600&fit=crop"
    },
    {
      id: 3,
      name: "Construção Civil",
      description: "Proteção contra incêndio em novas edificações e reformas, com foco em sistemas que se integram à arquitetura moderna.",
      image: "https://images.unsplash.com/photo-1497366367807-775731300977?w=800&h=600&fit=crop"
    },
    {
      id: 4,
      name: "Salas Técnicas (CPDs)",
      description: "Prevenção e combate a incêndio em ambientes críticos com equipamentos sensíveis, usando agentes limpos que não danificam os ativos.",
      image: "https://images.unsplash.com/photo-1557088164-96860d2b706c?w=800&h=600&fit=crop"
    },
    {
      id: 5,
      name: "Data Centers",
      description: "Sistemas avançados de proteção contra incêndio para a continuidade de operações em data centers hyperscale e colocation.",
      image: "https://images.unsplash.com/photo-1542621307-e817c76766d3?w=800&h=600&fit=crop"
    },
    {
      id: 6,
      name: "Governo",
      description: "Sistemas de segurança contra incêndio para edifícios públicos, arquivos e infraestruturas críticas governamentais.",
      image: "https://images.unsplash.com/photo-1577907572620-80a22ed9b26e?w=800&h=600&fit=crop"
    },
    {
      id: 7,
      name: "Indústrias",
      description: "Soluções personalizadas para ambientes industriais com riscos específicos, protegendo linhas de produção e maquinário.",
      image: "https://images.unsplash.com/photo-1542621307-e817c76766d3?w=800&h=600&fit=crop"
    },
    {
      id: 8,
      name: "Logística",
      description: "Proteção de centros de distribuição, armazéns e estoques, com sistemas que garantem a segurança das mercadorias.",
      image: "https://images.unsplash.com/photo-1589988891487-1111624c9c3e?w=800&h=600&fit=crop"
    },
    {
      id: 9,
      name: "Mineração",
      description: "Tecnologia de ponta para a proteção de equipamentos pesados e infraestruturas em operações de mineração, em ambientes desafiadores.",
      image: "https://images.unsplash.com/photo-1596753066635-f09c7333550b?w=800&h=600&fit=crop"
    },
    {
      id: 10,
      name: "Portos",
      description: "Segurança contra incêndio para instalações portuárias, terminais de carga e áreas de armazenamento de grande volume.",
      image: "https://images.unsplash.com/photo-1547833019-38be98e826f5?w=800&h=600&fit=crop"
    },
    {
      id: 11,
      name: "Shopping Centers",
      description: "Sistemas abrangentes para a proteção de shopping centers, assegurando a segurança dos visitantes e do complexo comercial.",
      image: "https://images.unsplash.com/photo-1601633512211-1a3556f8f553?w=800&h=600&fit=crop"
    },
    {
      id: 12,
      name: "Telecomunicações",
      description: "Soluções críticas para centrais de telecomunicações, protegendo equipamentos eletrônicos e garantindo a continuidade dos serviços.",
      image: "https://images.unsplash.com/photo-1510511991475-7b5871f11a41?w=800&h=600&fit=crop"
    }
  ];

  const nextMarket = () => {
    setActiveMarket((prev) => (prev + 1) % markets?.length);
  };

  const prevMarket = () => {
    setActiveMarket((prev) => (prev - 1 + markets?.length) % markets?.length);
  };

  const currentMarket = markets?.[activeMarket];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
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

        <div className="relative">
          {/* Main Market Display */}
          <div className="bg-surface rounded-3xl overflow-hidden shadow-medium">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Market Image */}
              <div className="relative h-96 lg:h-auto overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentMarket?.id}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="h-full"
                  >
                    {/* ⚠️ Alteração: Usando a tag <img> nativa em vez do componente Image customizado */}
                    <img
                      src={currentMarket?.image}
                      alt={currentMarket?.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
                
                {/* Removido: Status Badge, pois não se aplica a Mercados */}
              </div>

              {/* Market Details */}
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
                    
                    {/* Removidos todos os detalhes do projeto que não são mais relevantes */}

                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={prevMarket}
              className="w-12 h-12 bg-white shadow-medium rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300 hover:scale-110"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>

            {/* Market Indicators */}
            <div className="flex space-x-2">
              {markets?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveMarket(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeMarket 
                      ? 'bg-accent scale-125' :'bg-gray-300 hover:bg-gray-400'
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

        {/* Bottom CTA */}
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