import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import StepIndicator from './components/StepIndicator';
import ServiceSelector from './components/ServiceSelector';
import ProjectDetails from './components/ProjectDetails';
import PriceCalculator from './components/PriceCalculator';
import ProposalPreview from './components/ProposalPreview';

const ProposalEngine = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [projectData, setProjectData] = useState({});
  const [pricing, setPricing] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [savedProposals, setSavedProposals] = useState([]);

  const steps = [
    {
      id: 1,
      title: 'Serviços',
      description: 'Selecione os serviços'
    },
    {
      id: 2,
      title: 'Detalhes',
      description: 'Informações do projeto'
    },
    {
      id: 3,
      title: 'Preços',
      description: 'Calculadora de custos'
    },
    {
      id: 4,
      title: 'Proposta',
      description: 'Revisão final'
    }
  ];

  // Load saved data on component mount
  useEffect(() => {
    const saved = localStorage.getItem('smh-proposal-draft');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setSelectedServices(data?.selectedServices || []);
        setProjectData(data?.projectData || {});
        setPricing(data?.pricing || {});
        if (data?.currentStep) {
          setCurrentStep(data?.currentStep);
        }
      } catch (error) {
        console.error('Error loading saved proposal:', error);
      }
    }

    // Load saved proposals list
    const savedList = localStorage.getItem('smh-saved-proposals');
    if (savedList) {
      try {
        setSavedProposals(JSON.parse(savedList));
      } catch (error) {
        console.error('Error loading saved proposals list:', error);
      }
    }
  }, []);

  // Auto-save draft
  useEffect(() => {
    const draftData = {
      currentStep,
      selectedServices,
      projectData,
      pricing,
      lastSaved: new Date()?.toISOString()
    };
    localStorage.setItem('smh-proposal-draft', JSON.stringify(draftData));
  }, [currentStep, selectedServices, projectData, pricing]);

  const handleNext = () => {
    if (currentStep < steps?.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepNumber) => {
    // Allow navigation to previous steps or current step
    if (stepNumber <= currentStep) {
      setCurrentStep(stepNumber);
    }
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return selectedServices?.length > 0;
      case 2:
        return projectData?.projectName && 
               projectData?.contactName && 
               projectData?.contactEmail && 
               projectData?.companyName &&
               projectData?.timeline &&
               projectData?.budget;
      case 3:
        return pricing?.total > 0;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleServiceChange = (services) => {
    setSelectedServices(services);
  };

  const handleProjectDataChange = (data) => {
    setProjectData(data);
  };

  const handlePriceUpdate = (newPricing) => {
    setPricing(newPricing);
  };

  const handleSaveProposal = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const proposalId = `SMH-${Date.now()?.toString()?.slice(-6)}`;
      const savedProposal = {
        id: proposalId,
        projectName: projectData?.projectName,
        companyName: projectData?.companyName,
        total: pricing?.total,
        services: selectedServices?.length,
        createdAt: new Date()?.toISOString(),
        status: 'draft'
      };

      const updatedSaved = [...savedProposals, savedProposal];
      setSavedProposals(updatedSaved);
      localStorage.setItem('smh-saved-proposals', JSON.stringify(updatedSaved));
      
      // Show success message (you could use a toast library here)
      alert('Proposta salva com sucesso! ID: ' + proposalId);
      
    } catch (error) {
      console.error('Error saving proposal:', error);
      alert('Erro ao salvar proposta. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitProposal = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const proposalId = `SMH-${Date.now()?.toString()?.slice(-6)}`;
      
      // Clear draft after successful submission
      localStorage.removeItem('smh-proposal-draft');
      
      // Show success message and redirect
      alert(`Proposta enviada com sucesso!\n\nID: ${proposalId}\n\nNossa equipe entrará em contato em até 24 horas para agendar uma reunião de alinhamento.\n\nVocê receberá a proposta comercial definitiva em até 48 horas.`);
      
      // Reset form
      setCurrentStep(1);
      setSelectedServices([]);
      setProjectData({});
      setPricing({});
      
      // Redirect to homepage
      navigate('/homepage');
      
    } catch (error) {
      console.error('Error submitting proposal:', error);
      alert('Erro ao enviar proposta. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ServiceSelector
            selectedServices={selectedServices}
            onServiceChange={handleServiceChange}
            onServiceDetails={() => {}}
          />
        );
      case 2:
        return (
          <ProjectDetails
            projectData={projectData}
            onProjectDataChange={handleProjectDataChange}
          />
        );
      case 3:
        return (
          <PriceCalculator
            selectedServices={selectedServices}
            projectData={projectData}
            onPriceUpdate={handlePriceUpdate}
          />
        );
      case 4:
        return (
          <ProposalPreview
            selectedServices={selectedServices}
            projectData={projectData}
            pricing={pricing}
            onSubmit={handleSubmitProposal}
            onSave={handleSaveProposal}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Motor de Propostas
                <span className="text-gradient-brand"> Inteligente</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Crie sua proposta personalizada em poucos minutos com nossa ferramenta revolucionária de três etapas
              </p>
            </motion.div>
          </div>

          {/* Step Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <StepIndicator 
              currentStep={currentStep} 
              steps={steps}
              onStepClick={handleStepClick}
            />
          </motion.div>
        </div>
      </section>
      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="min-h-96"
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-between mt-12 pt-8 border-t border-border"
            >
              <Button
                variant="outline"
                size="lg"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                iconName="ArrowLeft"
                iconPosition="left"
                className="min-w-40"
              >
                Voltar
              </Button>

              <div className="flex items-center space-x-4">
                {/* Progress Indicator */}
                <div className="hidden sm:flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    Etapa {currentStep} de {steps?.length}
                  </span>
                  <div className="w-32 h-2 bg-border rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent transition-all duration-500"
                      style={{ width: `${(currentStep / steps?.length) * 100}%` }}
                    />
                  </div>
                </div>

                <Button
                  variant="default"
                  size="lg"
                  onClick={handleNext}
                  disabled={!canProceedToNext()}
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="min-w-40 bg-accent hover:bg-accent/90"
                >
                  {currentStep === steps?.length - 1 ? 'Finalizar' : 'Continuar'}
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </section>
      {/* Saved Proposals Sidebar (if any) */}
      {savedProposals?.length > 0 && currentStep === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="fixed right-6 top-1/2 transform -translate-y-1/2 w-80 bg-card border border-border rounded-lg shadow-deep p-6 hidden xl:block"
        >
          <h3 className="font-semibold text-foreground mb-4 flex items-center">
            <Icon name="FileText" size={20} className="text-accent mr-2" />
            Propostas Salvas ({savedProposals?.length})
          </h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {savedProposals?.slice(-3)?.map((proposal) => (
              <div key={proposal?.id} className="p-3 bg-muted/30 rounded-lg">
                <div className="font-medium text-foreground text-sm">{proposal?.projectName}</div>
                <div className="text-xs text-muted-foreground">{proposal?.companyName}</div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-accent font-medium">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })?.format(proposal?.total)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(proposal.createdAt)?.toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <div className="bg-card border border-border rounded-lg p-8 text-center shadow-deep">
              <div className="animate-spin mb-4">
                <Icon name="Loader2" size={48} className="text-accent mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Processando sua proposta...
              </h3>
              <p className="text-muted-foreground">
                Aguarde enquanto finalizamos os detalhes
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-6 mb-4">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-accent" />
                <span className="text-sm text-muted-foreground">Dados Seguros</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-accent" />
                <span className="text-sm text-muted-foreground">Resposta em 24h</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={16} className="text-accent" />
                <span className="text-sm text-muted-foreground">Sem Compromisso</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} SMH Digital Hub. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProposalEngine;