import React from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const ServiceSelector = ({ selectedServices, onServiceChange, onServiceDetails }) => {
  const services = [
    {
      id: 'web-development',
      name: 'Desenvolvimento Web',
      description: 'Sites responsivos e aplicações web modernas',
      icon: 'Globe',
      basePrice: 5000,
      features: ['Design Responsivo', 'SEO Otimizado', 'CMS Integrado', 'Analytics'],
      complexity: ['Básico', 'Intermediário', 'Avançado', 'Enterprise']
    },
    {
      id: 'mobile-app',
      name: 'Aplicativo Mobile',
      description: 'Apps nativos para iOS e Android',
      icon: 'Smartphone',
      basePrice: 15000,
      features: ['Design Nativo', 'Push Notifications', 'Offline Support', 'App Store Deploy'],
      complexity: ['MVP', 'Completo', 'Enterprise', 'Multi-plataforma']
    },
    {
      id: 'ecommerce',
      name: 'E-commerce',
      description: 'Lojas virtuais completas e seguras',
      icon: 'ShoppingCart',
      basePrice: 8000,
      features: ['Gateway Pagamento', 'Gestão Estoque', 'Dashboard Admin', 'Multi-idioma'],
      complexity: ['Básico', 'Profissional', 'Enterprise', 'Marketplace']
    },
    {
      id: 'cloud-infrastructure',
      name: 'Infraestrutura Cloud',
      description: 'Soluções escaláveis na nuvem',
      icon: 'Cloud',
      basePrice: 3000,
      features: ['Auto Scaling', 'Backup Automático', 'Monitoramento 24/7', 'CDN Global'],
      complexity: ['Básico', 'Profissional', 'Enterprise', 'Multi-Cloud']
    },
    {
      id: 'data-analytics',
      name: 'Analytics & BI',
      description: 'Inteligência de negócios e análise de dados',
      icon: 'BarChart3',
      basePrice: 12000,
      features: ['Dashboards Interativos', 'Relatórios Automáticos', 'ML Integration', 'Real-time Data'],
      complexity: ['Básico', 'Avançado', 'Enterprise', 'Custom AI']
    },
    {
      id: 'digital-marketing',
      name: 'Marketing Digital',
      description: 'Estratégias digitais para crescimento',
      icon: 'TrendingUp',
      basePrice: 4000,
      features: ['SEO/SEM', 'Social Media', 'Email Marketing', 'Analytics'],
      complexity: ['Básico', 'Profissional', 'Enterprise', 'Omnichannel']
    }
  ];

  const handleServiceToggle = (serviceId) => {
    const isSelected = selectedServices?.some(s => s?.id === serviceId);
    if (isSelected) {
      onServiceChange(selectedServices?.filter(s => s?.id !== serviceId));
    } else {
      const service = services?.find(s => s?.id === serviceId);
      onServiceChange([...selectedServices, { ...service, complexity: service?.complexity?.[0] }]);
    }
  };

  const handleComplexityChange = (serviceId, complexity) => {
    onServiceChange(selectedServices?.map(service => 
      service?.id === serviceId ? { ...service, complexity } : service
    ));
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Selecione os Serviços Desejados
        </h2>
        <p className="text-muted-foreground">
          Escolha os serviços que melhor atendem às suas necessidades
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services?.map((service) => {
          const isSelected = selectedServices?.some(s => s?.id === service?.id);
          const selectedService = selectedServices?.find(s => s?.id === service?.id);

          return (
            <div
              key={service?.id}
              className={`relative p-6 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'border-accent bg-accent/5 shadow-medium'
                  : 'border-border bg-card hover:border-accent/50 hover:shadow-subtle'
              }`}
              onClick={() => handleServiceToggle(service?.id)}
            >
              {/* Selection Checkbox */}
              <div className="absolute top-4 right-4">
                <Checkbox
                  checked={isSelected}
                  onChange={() => handleServiceToggle(service?.id)}
                  className="pointer-events-none"
                />
              </div>
              {/* Service Icon */}
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                isSelected ? 'bg-accent text-white' : 'bg-muted text-muted-foreground'
              }`}>
                <Icon name={service?.icon} size={24} />
              </div>
              {/* Service Info */}
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {service?.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {service?.description}
              </p>
              {/* Base Price */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">A partir de:</span>
                <span className="text-lg font-bold text-accent">
                  R$ {service?.basePrice?.toLocaleString('pt-BR')}
                </span>
              </div>
              {/* Features */}
              <div className="space-y-2 mb-4">
                {service?.features?.slice(0, 3)?.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon name="Check" size={14} className="text-accent flex-shrink-0" />
                    <span className="text-xs text-muted-foreground">{feature}</span>
                  </div>
                ))}
                {service?.features?.length > 3 && (
                  <div className="text-xs text-accent font-medium">
                    +{service?.features?.length - 3} recursos adicionais
                  </div>
                )}
              </div>
              {/* Complexity Selector - Only show if selected */}
              {isSelected && (
                <div className="mt-4 pt-4 border-t border-border">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nível de Complexidade:
                  </label>
                  <select
                    value={selectedService?.complexity || service?.complexity?.[0]}
                    onChange={(e) => handleComplexityChange(service?.id, e?.target?.value)}
                    className="w-full p-2 border border-border rounded-md bg-background text-foreground text-sm focus:ring-2 focus:ring-accent focus:border-accent"
                    onClick={(e) => e?.stopPropagation()}
                  >
                    {service?.complexity?.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {selectedServices?.length > 0 && (
        <div className="mt-8 p-6 bg-accent/5 rounded-lg border border-accent/20">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Serviços Selecionados ({selectedServices?.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedServices?.map((service) => (
              <div key={service?.id} className="flex items-center justify-between p-3 bg-background rounded-md">
                <div className="flex items-center space-x-3">
                  <Icon name={service?.icon} size={20} className="text-accent" />
                  <div>
                    <span className="font-medium text-foreground">{service?.name}</span>
                    <div className="text-sm text-muted-foreground">{service?.complexity}</div>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e?.stopPropagation();
                    handleServiceToggle(service?.id);
                  }}
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  <Icon name="X" size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceSelector;