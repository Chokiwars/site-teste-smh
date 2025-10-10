import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectShowcase = ({ onViewProject }) => {
  const [activeProject, setActiveProject] = useState(0);

  const projects = [
    {
      id: 1,
      title: "Sistema ERP Corporativo",
      client: "TechCorp Brasil",
      category: "Desenvolvimento de Software",
      description: "Desenvolvimento de sistema ERP completo para gestão empresarial, integrando todos os departamentos em uma única plataforma.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
      technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
      results: [
        "40% redução no tempo de processos",
        "R$ 2.5M economia anual",
        "99.9% disponibilidade do sistema"
      ],
      duration: "8 meses",
      status: "Concluído"
    },
    {
      id: 2,
      title: "Plataforma E-commerce B2B",
      client: "MegaDistribuidora",
      category: "Transformação Digital",
      description: "Criação de plataforma e-commerce B2B com integração completa ao sistema de gestão existente.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      technologies: ["Next.js", "Stripe", "MongoDB", "Docker"],
      results: [
        "300% aumento nas vendas online",
        "50% redução no tempo de pedidos",
        "95% satisfação dos clientes"
      ],
      duration: "6 meses",
      status: "Concluído"
    },
    {
      id: 3,
      title: "Migração Cloud AWS",
      client: "FinanceGroup",
      category: "Infraestrutura Cloud",
      description: "Migração completa da infraestrutura on-premise para AWS com implementação de DevOps.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
      technologies: ["AWS", "Kubernetes", "Terraform", "Jenkins"],
      results: [
        "60% redução nos custos de TI",
        "99.99% disponibilidade",
        "Escalabilidade automática"
      ],
      duration: "4 meses",
      status: "Concluído"
    },
    {
      id: 4,
      title: "Sistema de BI e Analytics",
      client: "RetailChain",
      category: "Análise de Dados",
      description: "Implementação de sistema de Business Intelligence para análise de dados de vendas e estoque.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      technologies: ["Power BI", "Python", "SQL Server", "Azure"],
      results: [
        "Insights em tempo real",
        "25% otimização do estoque",
        "Previsões 90% precisas"
      ],
      duration: "5 meses",
      status: "Em Andamento"
    }
  ];

  const nextProject = () => {
    setActiveProject((prev) => (prev + 1) % projects?.length);
  };

  const prevProject = () => {
    setActiveProject((prev) => (prev - 1 + projects?.length) % projects?.length);
  };

  const currentProject = projects?.[activeProject];

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
            Projetos em Destaque
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Conheça alguns dos projetos que transformaram negócios e geraram 
            resultados excepcionais para nossos clientes.
          </p>
        </motion.div>

        <div className="relative">
          {/* Main Project Display */}
          <div className="bg-surface rounded-3xl overflow-hidden shadow-medium">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Project Image */}
              <div className="relative h-96 lg:h-auto overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentProject?.id}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="h-full"
                  >
                    <Image
                      src={currentProject?.image}
                      alt={currentProject?.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    currentProject?.status === 'Concluído' 
                      ? 'bg-green-100 text-green-800' :'bg-blue-100 text-blue-800'
                  }`}>
                    {currentProject?.status}
                  </span>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentProject?.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="mb-4">
                      <span className="text-accent font-semibold text-sm uppercase tracking-wide">
                        {currentProject?.category}
                      </span>
                    </div>
                    
                    <h3 className="text-3xl font-bold text-primary mb-4">
                      {currentProject?.title}
                    </h3>
                    
                    <p className="text-text-secondary mb-6 leading-relaxed">
                      {currentProject?.description}
                    </p>

                    {/* Client & Duration */}
                    <div className="flex flex-wrap gap-6 mb-6 text-sm">
                      <div className="flex items-center space-x-2">
                        <Icon name="Building" size={16} className="text-accent" />
                        <span className="font-medium">Cliente: {currentProject?.client}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Clock" size={16} className="text-accent" />
                        <span className="font-medium">Duração: {currentProject?.duration}</span>
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-foreground mb-3">Tecnologias:</h4>
                      <div className="flex flex-wrap gap-2">
                        {currentProject?.technologies?.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Results */}
                    <div className="mb-8">
                      <h4 className="font-semibold text-foreground mb-3">Resultados:</h4>
                      <ul className="space-y-2">
                        {currentProject?.results?.map((result, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <Icon name="Check" size={16} className="text-green-500 mr-2 flex-shrink-0" />
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      variant="default"
                      onClick={() => onViewProject(currentProject)}
                      iconName="ExternalLink"
                      iconPosition="right"
                      className="bg-accent hover:bg-accent/90 btn-magnetic"
                    >
                      Ver Detalhes do Projeto
                    </Button>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={prevProject}
              className="w-12 h-12 bg-white shadow-medium rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300 hover:scale-110"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>

            {/* Project Indicators */}
            <div className="flex space-x-2">
              {projects?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveProject(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeProject 
                      ? 'bg-accent scale-125' :'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextProject}
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
            Quer ver seu projeto aqui? Vamos conversar sobre suas necessidades.
          </p>
          <Button
            variant="outline"
            size="lg"
            onClick={() => onViewProject({ title: 'Novo Projeto' })}
            iconName="Plus"
            iconPosition="left"
            className="px-8 py-4 btn-magnetic border-accent text-accent hover:bg-accent hover:text-white"
          >
            Iniciar Novo Projeto
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectShowcase;