import React from 'react';
import Icon from '../../../components/AppIcon';

const StepIndicator = ({ currentStep, steps }) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-6 left-0 w-full h-0.5 bg-border z-0">
          <div 
            className="h-full bg-accent transition-all duration-500 ease-out"
            style={{ width: `${((currentStep - 1) / (steps?.length - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        {steps?.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const isUpcoming = stepNumber > currentStep;

          return (
            <div key={step?.id} className="flex flex-col items-center relative z-10">
              {/* Step Circle */}
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-accent text-white shadow-medium' 
                    : isActive 
                    ? 'bg-accent text-white shadow-medium scale-110' 
                    : 'bg-background border-2 border-border text-muted-foreground'
                }`}
              >
                {isCompleted ? (
                  <Icon name="Check" size={20} className="text-white" />
                ) : (
                  <span className="font-semibold">{stepNumber}</span>
                )}
              </div>
              {/* Step Label */}
              <div className="mt-3 text-center">
                <h3 
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isActive ? 'text-accent' : isCompleted ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {step?.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 max-w-20">
                  {step?.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;