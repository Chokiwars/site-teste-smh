import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ProjectDetails = ({ projectData, onProjectDataChange }) => {
  const timelineOptions = [
    { value: '1-month', label: '1 mês' },
    { value: '2-3-months', label: '2-3 meses' },
    { value: '3-6-months', label: '3-6 meses' },
    { value: '6-12-months', label: '6-12 meses' },
    { value: '12-months', label: 'Mais de 12 meses' }
  ];

  const budgetOptions = [
    { value: '5k-15k', label: 'R$ 5.000 - R$ 15.000' },
    { value: '15k-30k', label: 'R$ 15.000 - R$ 30.000' },
    { value: '30k-50k', label: 'R$ 30.000 - R$ 50.000' },
    { value: '50k-100k', label: 'R$ 50.000 - R$ 100.000' },
    { value: '100k+', label: 'Acima de R$ 100.000' }
  ];

  const industryOptions = [
    { value: 'technology', label: 'Tecnologia' },
    { value: 'healthcare', label: 'Saúde' },
    { value: 'finance', label: 'Financeiro' },
    { value: 'education', label: 'Educação' },
    { value: 'retail', label: 'Varejo' },
    { value: 'manufacturing', label: 'Manufatura' },
    { value: 'services', label: 'Serviços' },
    { value: 'other', label: 'Outros' }
  ];

  const companySizeOptions = [
    { value: 'startup', label: 'Startup (1-10 funcionários)' },
    { value: 'small', label: 'Pequena (11-50 funcionários)' },
    { value: 'medium', label: 'Média (51-200 funcionários)' },
    { value: 'large', label: 'Grande (201-1000 funcionários)' },
    { value: 'enterprise', label: 'Enterprise (1000+ funcionários)' }
  ];

  const priorityFeatures = [
    { id: 'performance', label: 'Alta Performance', icon: 'Zap' },
    { id: 'security', label: 'Segurança Avançada', icon: 'Shield' },
    { id: 'scalability', label: 'Escalabilidade', icon: 'TrendingUp' },
    { id: 'integration', label: 'Integrações', icon: 'Link' },
    { id: 'analytics', label: 'Analytics Avançado', icon: 'BarChart3' },
    { id: 'mobile-first', label: 'Mobile First', icon: 'Smartphone' },
    { id: 'automation', label: 'Automação', icon: 'Bot' },
    { id: 'support', label: 'Suporte 24/7', icon: 'Headphones' }
  ];

  const handleInputChange = (field, value) => {
    onProjectDataChange({
      ...projectData,
      [field]: value
    });
  };

  const handleFeatureToggle = (featureId) => {
    const currentFeatures = projectData?.priorityFeatures || [];
    const isSelected = currentFeatures?.includes(featureId);
    
    if (isSelected) {
      handleInputChange('priorityFeatures', currentFeatures?.filter(f => f !== featureId));
    } else {
      handleInputChange('priorityFeatures', [...currentFeatures, featureId]);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Detalhes do Projeto
        </h2>
        <p className="text-muted-foreground">
          Nos conte mais sobre seu projeto para criarmos uma proposta personalizada
        </p>
      </div>
      {/* Project Basic Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Input
            label="Nome do Projeto"
            type="text"
            placeholder="Ex: Sistema de Gestão Empresarial"
            value={projectData?.projectName || ''}
            onChange={(e) => handleInputChange('projectName', e?.target?.value)}
            required
          />

          <Input
            label="Descrição do Projeto"
            type="text"
            placeholder="Descreva brevemente o objetivo do projeto"
            value={projectData?.description || ''}
            onChange={(e) => handleInputChange('description', e?.target?.value)}
            required
          />

          <Select
            label="Prazo Desejado"
            options={timelineOptions}
            value={projectData?.timeline || ''}
            onChange={(value) => handleInputChange('timeline', value)}
            placeholder="Selecione o prazo"
            required
          />

          <Select
            label="Orçamento Estimado"
            options={budgetOptions}
            value={projectData?.budget || ''}
            onChange={(value) => handleInputChange('budget', value)}
            placeholder="Selecione a faixa de orçamento"
            required
          />
        </div>

        <div className="space-y-6">
          <Input
            label="Nome da Empresa"
            type="text"
            placeholder="Nome da sua empresa"
            value={projectData?.companyName || ''}
            onChange={(e) => handleInputChange('companyName', e?.target?.value)}
            required
          />

          <Select
            label="Setor de Atuação"
            options={industryOptions}
            value={projectData?.industry || ''}
            onChange={(value) => handleInputChange('industry', value)}
            placeholder="Selecione o setor"
            required
          />

          <Select
            label="Tamanho da Empresa"
            options={companySizeOptions}
            value={projectData?.companySize || ''}
            onChange={(value) => handleInputChange('companySize', value)}
            placeholder="Selecione o tamanho"
            required
          />

          <Input
            label="Website Atual (opcional)"
            type="url"
            placeholder="https://www.suaempresa.com.br"
            value={projectData?.currentWebsite || ''}
            onChange={(e) => handleInputChange('currentWebsite', e?.target?.value)}
          />
        </div>
      </div>
      {/* Priority Features */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Recursos Prioritários
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Selecione os recursos mais importantes para seu projeto
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {priorityFeatures?.map((feature) => {
            const isSelected = (projectData?.priorityFeatures || [])?.includes(feature?.id);
            
            return (
              <div
                key={feature?.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? 'border-accent bg-accent/5 shadow-subtle'
                    : 'border-border bg-card hover:border-accent/50'
                }`}
                onClick={() => handleFeatureToggle(feature?.id)}
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isSelected ? 'bg-accent text-white' : 'bg-muted text-muted-foreground'
                  }`}>
                    <Icon name={feature?.icon} size={20} />
                  </div>
                  <span className={`text-sm font-medium ${
                    isSelected ? 'text-accent' : 'text-foreground'
                  }`}>
                    {feature?.label}
                  </span>
                  <div className="absolute top-2 right-2">
                    <Checkbox
                      checked={isSelected}
                      onChange={() => handleFeatureToggle(feature?.id)}
                      className="pointer-events-none"
                      size="sm"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Additional Requirements */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          Requisitos Adicionais
        </h3>
        <textarea
          placeholder="Descreva qualquer requisito específico, integrações necessárias, ou detalhes importantes para o projeto..."
          value={projectData?.additionalRequirements || ''}
          onChange={(e) => handleInputChange('additionalRequirements', e?.target?.value)}
          rows={4}
          className="w-full p-4 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-accent focus:border-accent resize-none"
        />
      </div>
      {/* Contact Information */}
      <div className="bg-muted/30 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Informações de Contato
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nome Completo"
            type="text"
            placeholder="Seu nome completo"
            value={projectData?.contactName || ''}
            onChange={(e) => handleInputChange('contactName', e?.target?.value)}
            required
          />
          <Input
            label="Email"
            type="email"
            placeholder="seu@email.com"
            value={projectData?.contactEmail || ''}
            onChange={(e) => handleInputChange('contactEmail', e?.target?.value)}
            required
          />
          <Input
            label="Telefone"
            type="tel"
            placeholder="(11) 99999-9999"
            value={projectData?.contactPhone || ''}
            onChange={(e) => handleInputChange('contactPhone', e?.target?.value)}
            required
          />
          <Input
            label="Cargo"
            type="text"
            placeholder="Ex: Diretor de TI"
            value={projectData?.contactRole || ''}
            onChange={(e) => handleInputChange('contactRole', e?.target?.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;