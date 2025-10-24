import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectShowcase = ({ onViewProject }) => {
  const [activeMarket, setActiveMarket] = useState(0);
  const navigate = useNavigate();

  const markets = [
    {
      id: 1,
      name: 'Data Center',
      description:
        'Sistemas de detecção e combate a incêndio de alta performance para a segurança de terminais, hangares e infraestruturas aeroportuárias.',
      image: 'https://assets.ibm.com/is/image/ibm/22_27_p_gorodenkoff-549:2x1?dpr=on%2C1.25&wid=960&hei=480',
    },
    {
      id: 2,
      name: 'Centros Comerciais',
      description:
        'Soluções robustas para a proteção de grandes complexos comerciais, garantindo a segurança de pessoas e patrimônio.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Westminster_Arcade.jpg',
    },
    {
      id: 3,
      name: 'Construção Civil',
      description:
        'Proteção contra incêndio em novas edificações e reformas, com foco em sistemas que se integram à arquitetura moderna.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Factory_of_National_Cement_Share_Company.jpg',
    },
    {
      id: 4,
      name: 'Salas Técnicas (CPDs)',
      description:
        'Prevenção e combate a incêndio em ambientes críticos com equipamentos sensíveis, usando agentes limpos que não danificam os ativos.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/5/54/Floridaserversfront1.jpg',
    },
    {
      id: 5,
      name: 'Aeroportos',
      description:
        'Sistemas avançados de proteção contra incêndio para a continuidade de operações em data centers hyperscale e colocation.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/20140308_Airport_ground_operations.jpg',
    },
    {
      id: 6,
      name: 'Indústrias',
      description:
        'Soluções personalizadas para ambientes industriais com riscos específicos, protegendo linhas de produção e maquinário.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Kunda_tsemenditehas.jpg',
    },
    {
      id: 7,
      name: 'Logística',
      description:
        'Proteção de centros de distribuição, armazéns e estoques, com sistemas que garantem a segurança das mercadorias.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Automatisches_Kleinteilelager.jpg',
    },
    {
      id: 8,
      name: 'Mineração',
      description:
        'Tecnologia de ponta para a proteção de equipamentos pesados e infraestruturas em operações de mineração, em ambientes desafiadores.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Kalgoorlie_open_cast_mine.jpg',
    },
    {
      id: 9,
      name: 'Portos',
      description:
        'Segurança contra incêndio para instalações portuárias, terminais de carga e áreas de armazenamento de grande volume.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Porto_de_Lisboa_%282%29.jpg',
    },
    {
      id: 10,
      name: 'Shopping Centers',
      description:
        'Sistemas abrangentes para a proteção de shopping centers, assegurando a segurança dos visitantes e do complexo comercial.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Mall_of_Tripla_sis%C3%A4kuvia_2.jpg',
    },
    {
      id: 11,
      name: 'Telecomunicações',
      description:
        'Soluções críticas para centrais de telecomunicações, protegendo equipamentos eletrônicos e garantindo a continuidade dos serviços.',
      image: 'https://blog.tactium.com.br/wp-content/themes/softium/script/timthumb.php?src=https://blog.tactium.com.br/wp-content/uploads/2016/02/como-melhorar-performance-do-seu-telemarketing-ativo.jpg&w=930&h=480&zc=1&q=100',
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
            A SMH SISTEMAS é especializada na Proteção Contra Incêndio de Ambientes de Missão Crítica e Riscos Especiais, 
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
            Não encontrou seu setor? Converse conosco sobre uma solução personalizada.
          </p>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/contato')}
            iconName="MessageSquare"
            iconPosition="left"
            className="px-8 py-4 border-accent text-accent hover:bg-accent hover:text-white transition-all duration-300 ease-in-out"
          >
            Fale Conosco
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectShowcase;