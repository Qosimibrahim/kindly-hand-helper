
import { useState } from 'react';
import { EmailVerification } from './EmailVerification';
import { PinSetup } from './PinSetup';
import { PlanSelection } from './PlanSelection';
import { ChildProfileSetup } from './ChildProfileSetup';

interface ParentOnboardingProps {
  onComplete: () => void;
}

type OnboardingStep = 'email' | 'pin' | 'plan' | 'child-profile';

export const ParentOnboarding = ({ onComplete }: ParentOnboardingProps) => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('email');
  const [parentData, setParentData] = useState({
    email: '',
    pin: '',
    selectedPlan: '',
  });

  const handleEmailVerified = (email: string) => {
    setParentData(prev => ({ ...prev, email }));
    setCurrentStep('pin');
  };

  const handlePinSet = (pin: string) => {
    setParentData(prev => ({ ...prev, pin }));
    setCurrentStep('plan');
  };

  const handlePlanSelected = (plan: string) => {
    setParentData(prev => ({ ...prev, selectedPlan: plan }));
    setCurrentStep('child-profile');
  };

  const handleChildProfileCreated = () => {
    // Store parent session
    localStorage.setItem('parentSession', JSON.stringify(parentData));
    onComplete();
  };

  return (
    <div className="min-h-screen">
      {currentStep === 'email' && (
        <EmailVerification onVerified={handleEmailVerified} />
      )}
      {currentStep === 'pin' && (
        <PinSetup onPinSet={handlePinSet} />
      )}
      {currentStep === 'plan' && (
        <PlanSelection onPlanSelected={handlePlanSelected} />
      )}
      {currentStep === 'child-profile' && (
        <ChildProfileSetup 
          selectedPlan={parentData.selectedPlan}
          onProfileCreated={handleChildProfileCreated} 
        />
      )}
    </div>
  );
};
