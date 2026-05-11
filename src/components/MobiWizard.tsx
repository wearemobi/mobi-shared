import React from 'react';
import { MobiCard } from './MobiCard';
import { MobiButton } from './MobiButton';

export interface MobiWizardStep {
  id: string;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  /**
   * Determine if the user can move forward from this step (e.g., validation matches)
   * @default true
   */
  isValid?: boolean;
}

export interface MobiWizardProps {
  steps: MobiWizardStep[];
  activeStepIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onCancel?: () => void;
  onComplete?: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  /**
   * Style buttons and cards in technical/monospace style
   */
  technical?: boolean;
  /**
   * Custom CSS class wrapper overrides
   */
  className?: string;
}

export const MobiWizard: React.FC<MobiWizardProps> = ({
  steps,
  activeStepIndex,
  onNext,
  onPrev,
  onCancel,
  onComplete,
  isFirstStep,
  isLastStep,
  technical = false,
  className = '',
}) => {
  const currentStep = steps[activeStepIndex] || steps[0];
  const progressPercent = Math.round(((activeStepIndex + 1) / steps.length) * 100);

  return (
    <div className={`space-y-6 w-full ${className}`}>
      {/* Steps Progress Header Tracker */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-mobi-text-muted">
          <span>
            STEP {activeStepIndex + 1} OF {steps.length}
          </span>
          <span className="font-mono">{progressPercent}% COMPLETE</span>
        </div>
        
        {/* Progress Line Bar */}
        <div className="h-1 w-full bg-mobi-border/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-mobi-primary transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Steps Bubbles List Grid */}
        <div className="hidden sm:flex justify-between items-center pt-2 gap-4">
          {steps.map((s, index) => {
            const isActive = index === activeStepIndex;
            const isCompleted = index < activeStepIndex;
            return (
              <div 
                key={s.id} 
                className="flex-1 flex flex-col gap-1.5 border-t border-mobi-border/20 pt-2 transition-colors duration-200"
              >
                <span className={`text-[9px] font-black uppercase tracking-widest ${
                  isActive 
                    ? 'text-mobi-primary' 
                    : isCompleted 
                    ? 'text-emerald-500' 
                    : 'text-mobi-text-muted/60'
                }`}>
                  0{index + 1}. {s.title}
                </span>
                {s.subtitle && (
                  <span className="text-[10px] text-mobi-text-muted/50 truncate">
                    {s.subtitle}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Card viewport */}
      <MobiCard 
        title={currentStep.title} 
        className="shadow-md"
      >
        {currentStep.subtitle && (
          <p className="text-xs text-mobi-text-muted mb-4 -mt-2">
            {currentStep.subtitle}
          </p>
        )}
        <div className="py-2 min-h-[140px] text-mobi-text font-sans">
          {currentStep.content}
        </div>

        {/* Footer actions slot */}
        <div className="mt-8 pt-4 border-t border-mobi-border/40 flex flex-wrap gap-3 items-center justify-between">
          <div>
            {onCancel && (
              <MobiButton 
                variant="ghost" 
                size="sm" 
                technical={technical} 
                onClick={onCancel}
              >
                Cancel
              </MobiButton>
            )}
          </div>

          <div className="flex gap-3">
            {!isFirstStep && (
              <MobiButton 
                variant="outline" 
                size="sm" 
                technical={technical} 
                onClick={onPrev}
              >
                Back
              </MobiButton>
            )}

            <MobiButton 
              variant="solid" 
              size="sm" 
              technical={technical} 
              disabled={currentStep.isValid === false}
              onClick={isLastStep ? onComplete : onNext}
            >
              {isLastStep ? 'Complete Sync' : 'Next Step'}
            </MobiButton>
          </div>
        </div>
      </MobiCard>
    </div>
  );
};
