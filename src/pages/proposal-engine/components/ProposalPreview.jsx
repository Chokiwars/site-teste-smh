import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProposalPreview = ({ selectedServices, projectData, pricing, onSubmit, onSave }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })?.format(value);
  };

  const getTimelineLabel = (timeline) => {
    const options = {
      '1-month': '1 mês',
      '2-3-months': '2-3 meses',
      '3-6-months': '3-6 meses',
      '6-12-months': '6-12 meses',
      '12-months': 'Mais de 12 meses'
    };
    return options?.[timeline] || timeline;
  };

  const getBudgetLabel = (budget) => {
    const options = {
      '5k-15k': 'R$ 5.000 - R$ 15.000',
      '15k-30k': 'R$ 15.000 - R$ 30.000',
      '30k-50k': 'R$ 30.000 - R$ 50.000',
      '50k-100k': 'R$ 50.000 - R$ 100.000',
      '100k+': 'Acima de R$ 100.000'
    };
    return options?.[budget] || budget;
  };

  const getIndustryLabel = (industry) => {
    const options = {
      'technology': 'Tecnologia',
      'healthcare': 'Saúde',
      'finance': 'Financeiro',
      'education': 'Educação',
      'retail': 'Varejo',
      'manufacturing': 'Manufatura',
      'services': 'Serviços',
      'other': 'Outros'
    };
    return options?.[industry] || industry;
  };

  const getCompanySizeLabel = (size) => {
    const options = {
      'startup': 'Startup (1-10 funcionários)',
      'small': 'Pequena (11-50 funcionários)',
      'medium': 'Média (51-200 funcionários)',
      'large': 'Grande (201-1000 funcionários)',
      'enterprise': 'Enterprise (1000+ funcionários)'
    };
    return options?.[size] || size;
  };

  const getFeatureLabel = (featureId) => {
    const features = {
      'performance': 'Alta Performance',
      'security': 'Segurança Avançada',
      'scalability': 'Escalabilidade',
      'integration': 'Integrações',
      'analytics': 'Analytics Avançado',
      'mobile-first': 'Mobile First',
      'automation': 'Automação',
      'support': 'Suporte 24/7'
    };
    return features?.[featureId] || featureId;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave();
    } finally {
      setIsSaving(false);
    }
  };

  const currentDate = new Date()?.toLocaleDateString('pt-BR');
  const proposalId = `SMH-${Date.now()?.toString()?.slice(-6)}`;

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Prévia da Proposta
        </h2>
        <p className="text-muted-foreground">
          Revise todos os detalhes antes de enviar sua solicitação
        </p>
      </div>
      {/* Proposal Document */}
      <div className="bg-white border border-border rounded-lg shadow-medium overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-brand text-white p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Proposta Comercial</h1>
              <p className="text-white/90">SMH Digital Hub - Soluções Tecnológicas</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-white/90">Proposta Nº</div>
              <div className="text-lg font-bold">{proposalId}</div>
              <div className="text-sm text-white/90 mt-1">{currentDate}</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Client Information */}
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Icon name="Building" size={20} className="text-accent mr-2" />
              Informações do Cliente
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/30 p-6 rounded-lg">
              <div>
                <div className="mb-3">
                  <span className="text-sm text-muted-foreground">Empresa:</span>
                  <div className="font-medium text-foreground">{projectData?.companyName}</div>
                </div>
                <div className="mb-3">
                  <span className="text-sm text-muted-foreground">Setor:</span>
                  <div className="font-medium text-foreground">{getIndustryLabel(projectData?.industry)}</div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Porte:</span>
                  <div className="font-medium text-foreground">{getCompanySizeLabel(projectData?.companySize)}</div>
                </div>
              </div>
              <div>
                <div className="mb-3">
                  <span className="text-sm text-muted-foreground">Contato:</span>
                  <div className="font-medium text-foreground">{projectData?.contactName}</div>
                </div>
                <div className="mb-3">
                  <span className="text-sm text-muted-foreground">Email:</span>
                  <div className="font-medium text-foreground">{projectData?.contactEmail}</div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Telefone:</span>
                  <div className="font-medium text-foreground">{projectData?.contactPhone}</div>
                </div>
              </div>
            </div>
          </section>

          {/* Project Overview */}
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Icon name="Target" size={20} className="text-accent mr-2" />
              Visão Geral do Projeto
            </h3>
            <div className="bg-muted/30 p-6 rounded-lg space-y-4">
              <div>
                <span className="text-sm text-muted-foreground">Nome do Projeto:</span>
                <div className="font-medium text-foreground text-lg">{projectData?.projectName}</div>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Descrição:</span>
                <div className="text-foreground mt-1">{projectData?.description}</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <span className="text-sm text-muted-foreground">Prazo Desejado:</span>
                  <div className="font-medium text-foreground">{getTimelineLabel(projectData?.timeline)}</div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Orçamento Estimado:</span>
                  <div className="font-medium text-foreground">{getBudgetLabel(projectData?.budget)}</div>
                </div>
              </div>
              {projectData?.additionalRequirements && (
                <div>
                  <span className="text-sm text-muted-foreground">Requisitos Adicionais:</span>
                  <div className="text-foreground mt-1 whitespace-pre-wrap">{projectData?.additionalRequirements}</div>
                </div>
              )}
            </div>
          </section>

          {/* Services */}
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Icon name="Package" size={20} className="text-accent mr-2" />
              Serviços Propostos
            </h3>
            <div className="space-y-4">
              {selectedServices?.map((service, index) => (
                <div key={service?.id} className="border border-border rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Icon name={service?.icon} size={20} className="text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{service?.name}</h4>
                        <p className="text-sm text-muted-foreground">Nível: {service?.complexity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-foreground">
                        {formatCurrency(pricing?.breakdown?.[index]?.total || service?.basePrice)}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{service?.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {service?.features?.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <Icon name="Check" size={14} className="text-accent flex-shrink-0" />
                        <span className="text-xs text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Priority Features */}
          {projectData?.priorityFeatures && projectData?.priorityFeatures?.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <Icon name="Star" size={20} className="text-accent mr-2" />
                Recursos Prioritários
              </h3>
              <div className="bg-muted/30 p-6 rounded-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {projectData?.priorityFeatures?.map((featureId) => (
                    <div key={featureId} className="flex items-center space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-accent" />
                      <span className="text-sm text-foreground">{getFeatureLabel(featureId)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Investment Summary */}
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Icon name="Calculator" size={20} className="text-accent mr-2" />
              Resumo do Investimento
            </h3>
            <div className="bg-gradient-to-r from-accent/5 to-primary/5 border border-accent/20 rounded-lg p-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-foreground">Subtotal dos Serviços:</span>
                  <span className="font-medium text-foreground">{formatCurrency(pricing?.subtotal)}</span>
                </div>
                
                {pricing?.featureAddons > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-foreground">Recursos Adicionais:</span>
                    <span className="font-medium text-foreground">+{formatCurrency(pricing?.featureAddons)}</span>
                  </div>
                )}
                
                {pricing?.timelineAdjustment !== 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-foreground">Ajuste de Prazo:</span>
                    <span className={`font-medium ${pricing?.timelineAdjustment >= 0 ? 'text-accent' : 'text-green-600'}`}>
                      {pricing?.timelineAdjustment >= 0 ? '+' : ''}{formatCurrency(pricing?.timelineAdjustment)}
                    </span>
                  </div>
                )}
                
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between items-center text-xl">
                    <span className="font-bold text-foreground">Total Estimado:</span>
                    <span className="font-bold text-accent">{formatCurrency(pricing?.total)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/50 p-4 rounded-lg">
                  <div className="font-medium text-foreground mb-1">À Vista (10% desconto)</div>
                  <div className="text-lg font-bold text-accent">{formatCurrency(pricing?.total * 0.9)}</div>
                </div>
                <div className="bg-white/50 p-4 rounded-lg">
                  <div className="font-medium text-foreground mb-1">Parcelado (12x sem juros)</div>
                  <div className="text-lg font-bold text-foreground">12x de {formatCurrency(pricing?.total / 12)}</div>
                </div>
              </div>
            </div>
          </section>

          {/* Next Steps */}
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Icon name="ArrowRight" size={20} className="text-accent mr-2" />
              Próximos Passos
            </h3>
            <div className="bg-muted/30 p-6 rounded-lg">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">1</div>
                  <div>
                    <div className="font-medium text-foreground">Análise Detalhada</div>
                    <div className="text-sm text-muted-foreground">Nossa equipe fará uma análise completa dos requisitos</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">2</div>
                  <div>
                    <div className="font-medium text-foreground">Reunião de Alinhamento</div>
                    <div className="text-sm text-muted-foreground">Agendaremos uma reunião para alinhar expectativas e detalhes</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">3</div>
                  <div>
                    <div className="font-medium text-foreground">Proposta Final</div>
                    <div className="text-sm text-muted-foreground">Enviaremos a proposta comercial definitiva em até 48 horas</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="outline"
          size="lg"
          onClick={handleSave}
          loading={isSaving}
          iconName="Save"
          iconPosition="left"
          className="min-w-48"
        >
          {isSaving ? 'Salvando...' : 'Salvar Rascunho'}
        </Button>
        
        <Button
          variant="default"
          size="lg"
          onClick={handleSubmit}
          loading={isSubmitting}
          iconName="Send"
          iconPosition="left"
          className="min-w-48 bg-accent hover:bg-accent/90"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Proposta'}
        </Button>
      </div>
      {/* Contact Info */}
      <div className="text-center p-6 bg-muted/30 rounded-lg">
        <h4 className="font-semibold text-foreground mb-2">Dúvidas sobre a proposta?</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Nossa equipe está pronta para esclarecer qualquer questão
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open('tel:+5511999999999', '_self')}
            iconName="Phone"
            iconPosition="left"
          >
            (11) 99999-9999
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open('mailto:contato@smhdigitalhub.com.br', '_self')}
            iconName="Mail"
            iconPosition="left"
          >
            contato@smhdigitalhub.com.br
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProposalPreview;