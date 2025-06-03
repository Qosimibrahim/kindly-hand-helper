
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
      
      if (parentSession) {
        setCurrentStep('dashboard');
      } else if (childProfile) {
        // Child is already linked, redirect to child app
        setCurrentStep('dashboard');
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-orange-800">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 via-orange-100 to-amber-100">
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
