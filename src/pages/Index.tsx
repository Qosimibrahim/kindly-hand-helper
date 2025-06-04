
import { useState, useEffect } from 'react';
import { UserTypeSelection } from '@/components/onboarding/UserTypeSelection';
import { ParentOnboarding } from '@/components/onboarding/ParentOnboarding';
import { ChildLinking } from '@/components/onboarding/ChildLinking';
import { ParentDashboard } from '@/components/dashboard/ParentDashboard';

type OnboardingStep = 'user-type' | 'parent-onboarding' | 'child-linking' | 'dashboard';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('user-type');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user session or child profile exists
    const checkExistingSession = () => {
      const parentSession = localStorage.getItem('parentSession');
      const childProfile = localStorage.getItem('linkedChildProfile');
      const onboardingComplete = localStorage.getItem('onboardingComplete');
      const onboardingProgress = localStorage.getItem('onboardingProgress');
      
      if (parentSession && onboardingComplete) {
        setCurrentStep('dashboard');
      } else if (childProfile) {
        // Child is already linked, redirect to child app
        setCurrentStep('dashboard');
      } else if (onboardingProgress) {
        // Resume onboarding from where user left off
        const progress = JSON.parse(onboardingProgress);
        if (progress.step === 'otp' || progress.step === 'pin-confirm' || progress.step === 'plan-selected') {
          setCurrentStep('parent-onboarding');
        } else {
          setCurrentStep('user-type');
        }
      } else {
        setCurrentStep('user-type');
      }
      setIsLoading(false);
    };

    checkExistingSession();
  }, []);

  const handleUserTypeSelect = (type: 'parent' | 'child') => {
    if (type === 'parent') {
      setCurrentStep('parent-onboarding');
    } else {
      setCurrentStep('child-linking');
    }
  };

  const handleOnboardingComplete = () => {
    setCurrentStep('dashboard');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-orange-50 to-amber-50">
        <div className="text-center">
          <img 
            src="/lovable-uploads/78db9558-bb0a-4b7c-95b8-b4fca3dd8dcc.png" 
            alt="Kidandu Logo" 
            className="h-16 w-auto mx-auto mb-6"
          />
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-orange-800 text-lg">Loading Kidandu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {currentStep === 'user-type' && (
        <UserTypeSelection onUserTypeSelect={handleUserTypeSelect} />
      )}
      {currentStep === 'parent-onboarding' && (
        <ParentOnboarding onComplete={handleOnboardingComplete} />
      )}
      {currentStep === 'child-linking' && (
        <ChildLinking onComplete={handleOnboardingComplete} />
      )}
      {currentStep === 'dashboard' && (
        <ParentDashboard />
      )}
    </div>
  );
};

export default Index;
