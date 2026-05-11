import { useState, useCallback } from 'react';

export interface UseMobiWizardOptions {
  totalSteps: number;
  initialStep?: number;
  onStepChange?: (stepIndex: number) => void;
  onComplete?: () => void;
}

export function useMobiWizard({
  totalSteps,
  initialStep = 0,
  onStepChange,
  onComplete,
}: UseMobiWizardOptions) {
  const [activeStep, setActiveStep] = useState<number>(initialStep);

  const goToStep = useCallback(
    (stepIndex: number) => {
      const sanitized = Math.max(0, Math.min(stepIndex, totalSteps - 1));
      setActiveStep(sanitized);
      if (onStepChange) {
        onStepChange(sanitized);
      }
    },
    [totalSteps, onStepChange]
  );

  const nextStep = useCallback(() => {
    if (activeStep < totalSteps - 1) {
      goToStep(activeStep + 1);
    } else if (activeStep === totalSteps - 1 && onComplete) {
      onComplete();
    }
  }, [activeStep, totalSteps, goToStep, onComplete]);

  const prevStep = useCallback(() => {
    if (activeStep > 0) {
      goToStep(activeStep - 1);
    }
  }, [activeStep, goToStep]);

  const resetWizard = useCallback(() => {
    goToStep(0);
  }, [goToStep]);

  return {
    activeStep,
    isFirstStep: activeStep === 0,
    isLastStep: activeStep === totalSteps - 1,
    progressPercent: Math.round(((activeStep + 1) / totalSteps) * 100),
    goToStep,
    nextStep,
    prevStep,
    resetWizard,
  };
}
