import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const PriceCalculator = ({ selectedServices, projectData, onPriceUpdate }) => {
  const [pricing, setPricing] = useState({
    subtotal: 0,
    complexityMultiplier: 1,
    featureAddons: 0,
    timelineAdjustment: 0,
    total: 0,
    breakdown: []
  });

  const [isCalculating, setIsCalculating] = useState(false);

  // Complexity multipliers
  const complexityMultipliers = {
    'Básico': 1,
    'MVP': 1,
    'Intermediário': 1.3,
    'Profissional': 1.3,
    'Avançado': 1.6,
    'Completo': 1.6,
    'Enterprise': 2,
    'Custom AI': 2.2,
    'Multi-plataforma': 1.8,
    'Multi-Cloud': 1.7,
    'Marketplace': 1.9,
    'Omnichannel': 1.8
  };

  // Timeline adjustments
  const timelineAdjustments = {
    '1-month': 0.3, // Rush job
    '2-3-months': 0.1,
    '3-6-months': 0,
    '6-12-months': -0.05,
    '12-months': -0.1
  };

  // Feature addon costs
  const featureAddonCosts = {
    'performance': 2000,
    'security': 3000,
    'scalability': 2500,
    'integration': 1500,
    'analytics': 2000,
    'mobile-first': 1800,
    'automation': 2200,
    'support': 1000
  };

  useEffect(() => {
    calculatePricing();
  }, [selectedServices, projectData]);

  const calculatePricing = () => {
    setIsCalculating(true);
    
    // Simulate calculation delay for better UX
    setTimeout(() => {
      let subtotal = 0;
      let breakdown = [];

      // Calculate base service costs
      selectedServices?.forEach(service => {
        const complexityMultiplier = complexityMultipliers?.[service?.complexity] || 1;
        const serviceTotal = service?.basePrice * complexityMultiplier;
        
        subtotal += serviceTotal;
        breakdown?.push({
          name: service?.name,
          complexity: service?.complexity,
          basePrice: service?.basePrice,
          multiplier: complexityMultiplier,
          total: serviceTotal
        });
      });

      // Calculate feature addons
      const priorityFeatures = projectData?.priorityFeatures || [];
      let featureAddons = 0;
      priorityFeatures?.forEach(featureId => {
        featureAddons += featureAddonCosts?.[featureId] || 0;
      });

      // Calculate timeline adjustment
      const timelineMultiplier = timelineAdjustments?.[projectData?.timeline] || 0;
      const timelineAdjustment = subtotal * timelineMultiplier;

      // Calculate total
      const total = subtotal + featureAddons + timelineAdjustment;

      const newPricing = {
        subtotal,
        complexityMultiplier: selectedServices?.reduce((acc, service) => 
          acc + (complexityMultipliers?.[service?.complexity] || 1), 0) / selectedServices?.length,
        featureAddons,
        timelineAdjustment,
        total: Math.max(total, 0),
        breakdown
      };

      setPricing(newPricing);
      onPriceUpdate(newPricing);
      setIsCalculating(false);
    }, 1500);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })?.format(value);
  };

  const getTimelineLabel = (timeline) => {
    const option = [
      { value: '1-month', label: '1 mês' },
      { value: '2-3-months', label: '2-3 meses' },
      { value: '3-6-months', label: '3-6 meses' },
      { value: '6-12-months', label: '6-12 meses' },
      { value: '12-months', label: 'Mais de 12 meses' }
    ]?.find(opt => opt?.value === timeline);
    return option ? option?.label : timeline;
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

  if (selectedServices?.length === 0) {
    return (
      <div className="text-center py-12">
        <Icon name="Calculator" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Nenhum Serviço Selecionado
        </h3>
        <p className="text-muted-foreground">
          Volte ao passo anterior para selecionar os serviços desejados
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Calculadora de Preços
        </h2>
        <p className="text-muted-foreground">
          Estimativa personalizada baseada nas suas necessidades
        </p>
      </div>
      {/* Calculation Status */}
      {isCalculating && (
        <div className="bg-accent/5 border border-accent/20 rounded-lg p-6">
          <div className="flex items-center justify-center space-x-3">
            <div className="animate-spin">
              <Icon name="Loader2" size={24} className="text-accent" />
            </div>
            <span className="text-accent font-medium">Calculando proposta personalizada...</span>
          </div>
        </div>
      )}
      {/* Price Breakdown */}
      {!isCalculating && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Service Breakdown */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <Icon name="Package" size={20} className="text-accent mr-2" />
                Serviços Selecionados
              </h3>
              
              <div className="space-y-4">
                {pricing?.breakdown?.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div>
                      <h4 className="font-medium text-foreground">{item?.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Nível: {item?.complexity} (×{item?.multiplier})
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground line-through">
                        {formatCurrency(item?.basePrice)}
                      </div>
                      <div className="font-semibold text-foreground">
                        {formatCurrency(item?.total)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Features */}
            {projectData?.priorityFeatures && projectData?.priorityFeatures?.length > 0 && (
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <Icon name="Plus" size={20} className="text-accent mr-2" />
                  Recursos Adicionais
                </h3>
                
                <div className="space-y-3">
                  {projectData?.priorityFeatures?.map((featureId) => (
                    <div key={featureId} className="flex items-center justify-between">
                      <span className="text-foreground">{getFeatureLabel(featureId)}</span>
                      <span className="font-medium text-foreground">
                        {formatCurrency(featureAddonCosts?.[featureId] || 0)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Timeline Adjustment */}
            {projectData?.timeline && (
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <Icon name="Clock" size={20} className="text-accent mr-2" />
                  Ajuste de Prazo
                </h3>
                
                <div className="flex items-center justify-between">
                  <span className="text-foreground">
                    Prazo: {getTimelineLabel(projectData?.timeline)}
                  </span>
                  <span className={`font-medium ${
                    pricing?.timelineAdjustment >= 0 ? 'text-accent' : 'text-green-600'
                  }`}>
                    {pricing?.timelineAdjustment >= 0 ? '+' : ''}
                    {formatCurrency(pricing?.timelineAdjustment)}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Price Summary */}
          <div className="space-y-6">
            <div className="bg-gradient-brand text-white rounded-lg p-6 sticky top-6">
              <h3 className="text-xl font-bold mb-6">Resumo do Investimento</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Subtotal dos Serviços:</span>
                  <span>{formatCurrency(pricing?.subtotal)}</span>
                </div>
                
                {pricing?.featureAddons > 0 && (
                  <div className="flex justify-between items-center">
                    <span>Recursos Adicionais:</span>
                    <span>+{formatCurrency(pricing?.featureAddons)}</span>
                  </div>
                )}
                
                {pricing?.timelineAdjustment !== 0 && (
                  <div className="flex justify-between items-center">
                    <span>Ajuste de Prazo:</span>
                    <span>
                      {pricing?.timelineAdjustment >= 0 ? '+' : ''}
                      {formatCurrency(pricing?.timelineAdjustment)}
                    </span>
                  </div>
                )}
                
                <div className="border-t border-white/20 pt-4">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total Estimado:</span>
                    <span>{formatCurrency(pricing?.total)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white/10 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Icon name="Info" size={16} className="text-white mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium mb-1">Importante:</p>
                    <p className="text-white/90">
                      Esta é uma estimativa inicial. O valor final será definido após análise detalhada dos requisitos.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <Icon name="CreditCard" size={20} className="text-accent mr-2" />
                Opções de Pagamento
              </h3>
              
              <div className="space-y-3">
                <div className="p-3 border border-border rounded-lg">
                  <div className="font-medium text-foreground">À Vista</div>
                  <div className="text-sm text-muted-foreground">10% de desconto</div>
                  <div className="font-semibold text-accent">
                    {formatCurrency(pricing?.total * 0.9)}
                  </div>
                </div>
                
                <div className="p-3 border border-border rounded-lg">
                  <div className="font-medium text-foreground">Parcelado</div>
                  <div className="text-sm text-muted-foreground">Até 12x sem juros</div>
                  <div className="font-semibold text-foreground">
                    12x de {formatCurrency(pricing?.total / 12)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceCalculator;