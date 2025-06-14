
import { useState, useEffect } from 'react';
import { UserTypeSelection } from '@/components/onboarding/UserTypeSelection';
import { ParentOnboarding } from '@/components/onboarding/ParentOnboarding';
import { ChildLinking } from '@/components/onboarding/ChildLinking';
import { ParentDashboard } from '@/components/dashboard/ParentDashboard';
import { ChildDashboard } from '@/components/dashboard/ChildDashboard';
import { ProfileSwitcher } from '@/components/dashboard/ProfileSwitcher';
import { useToast } from '@/hooks/use-toast';

type AppMode = 'user-type' | 'parent-onboarding' | 'child-linking' | 'parent-dashboard' | 'child-dashboard' | 'profile-switcher';

interface ChildProfile {
  id: string;
  name: string;
  ageGroup: string;
  avatar: string;
  language: string;
  stars: number;
  badges: string[];
  wordsLearned: number;
  storiesCompleted: number;
  plan: string;
}

const Index = () => {
  const [currentMode, setCurrentMode] = useState<AppMode>('user-type');
  const [activeChildProfile, setActiveChildProfile] = useState<ChildProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Handle online/offline sync
    const handleOnline = () => {
      const offlineProgress = localStorage.getItem('offlineProgress');
      if (offlineProgress) {
        toast({
          title: "Syncing Progress... 🔄",
          description: "Updating your achievements and progress",
        });
        
        setTimeout(() => {
          localStorage.removeItem('offlineProgress');
          toast({
            title: "Progress Synced! ✅",
            description: "All your offline learning has been saved",
          });
        }, 2000);
      }
    };

    window.addEventListener('online', handleOnline);

    const checkExistingSession = () => {
      const parentSession = localStorage.getItem('parentSession');
      const linkedChildProfile = localStorage.getItem('linkedChildProfile');
      const activeProfile = localStorage.getItem('activeChildProfile');
      const onboardingComplete = localStorage.getItem('onboardingComplete');
      const onboardingProgress = localStorage.getItem('onboardingProgress');
      
      // Check if there's an active child profile
      if (activeProfile) {
        const profile = JSON.parse(activeProfile);
        setActiveChildProfile(profile);
        setCurrentMode('child-dashboard');
      } else if (linkedChildProfile) {
        // Child device is linked, check for child profiles
        const childProfiles = JSON.parse(localStorage.getItem('childProfiles') || '[]');
        if (childProfiles.length > 0) {
          const firstProfile = childProfiles[0];
          setActiveChildProfile(firstProfile);
          localStorage.setItem('activeChildProfile', JSON.stringify(firstProfile));
          setCurrentMode('child-dashboard');
        } else {
          // No profiles exist, go to user type selection
          setCurrentMode('user-type');
        }
      } else if (parentSession && onboardingComplete) {
        setCurrentMode('parent-dashboard');
      } else if (onboardingProgress) {
        const progress = JSON.parse(onboardingProgress);
        if (progress.step === 'otp' || progress.step === 'pin-confirm' || progress.step === 'plan-selected') {
          setCurrentMode('parent-onboarding');
        } else {
          setCurrentMode('user-type');
        }
      } else {
        setCurrentMode('user-type');
      }
      setIsLoading(false);
    };

    checkExistingSession();

    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, [toast]);

  const handleUserTypeSelect = (type: 'parent' | 'child') => {
    if (type === 'parent') {
      setCurrentMode('parent-onboarding');
    } else {
      setCurrentMode('child-linking');
    }
  };

  const handleOnboardingComplete = () => {
    setCurrentMode('parent-dashboard');
  };

  const handleChildLinkingComplete = () => {
    // After linking, check for child profiles
    const childProfiles = JSON.parse(localStorage.getItem('childProfiles') || '[]');
    if (childProfiles.length > 0) {
      const firstProfile = childProfiles[0];
      setActiveChildProfile(firstProfile);
      localStorage.setItem('activeChildProfile', JSON.stringify(firstProfile));
      setCurrentMode('child-dashboard');
    } else {
      // No profiles available, go back to user type selection
      toast({
        title: "No Child Profiles Found",
        description: "Ask your parent to create a profile for you first.",
      });
      setCurrentMode('user-type');
    }
  };

  const handleSwitchProfile = () => {
    setCurrentMode('profile-switcher');
  };

  const handleProfileSelected = (profile: ChildProfile) => {
    setActiveChildProfile(profile);
    localStorage.setItem('activeChildProfile', JSON.stringify(profile));
    setCurrentMode('child-dashboard');
  };

  const handleBackToChild = () => {
    setCurrentMode('child-dashboard');
  };

  const handleLogout = () => {
    setCurrentMode('user-type');
    setActiveChildProfile(null);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error('Failed to load Kidandu logo in loading screen:', e);
    // Show fallback text
    const fallback = document.getElementById('loading-logo-fallback');
    if (fallback) {
      fallback.style.display = 'block';
    }
    (e.target as HTMLImageElement).style.display = 'none';
  };

  const handleImageLoad = () => {
    console.log('Loading screen Kidandu logo loaded successfully');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-orange-50 to-amber-50">
        <div className="text-center">
          <img 
            src="/lovable-uploads/kidandu-logo.png" 
            alt="Kidandu Logo" 
            className="h-16 w-auto mx-auto mb-6"
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
          <div id="loading-logo-fallback" className="text-3xl font-bold text-orange-900 mb-6" style={{ display: 'none' }}>
            Kidandu
          </div>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-orange-800 text-lg">Loading Kidandu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {currentMode === 'user-type' && (
        <UserTypeSelection onUserTypeSelect={handleUserTypeSelect} />
      )}
      {currentMode === 'parent-onboarding' && (
        <ParentOnboarding onComplete={handleOnboardingComplete} />
      )}
      {currentMode === 'child-linking' && (
        <ChildLinking onComplete={handleChildLinkingComplete} />
      )}
      {currentMode === 'parent-dashboard' && (
        <ParentDashboard />
      )}
      {currentMode === 'child-dashboard' && activeChildProfile && (
        <ChildDashboard 
          profile={activeChildProfile} 
          onSwitchProfile={handleSwitchProfile}
          onLogout={handleLogout}
        />
      )}
      {currentMode === 'profile-switcher' && activeChildProfile && (
        <ProfileSwitcher 
          currentProfile={activeChildProfile}
          onProfileSelect={handleProfileSelected}
          onBack={handleBackToChild}
        />
      )}
    </div>
  );
};

export default Index;
