
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { DownloadManager } from './DownloadManager';
import { ProgressTracker } from './ProgressTracker';
import { ParentHeader } from './parent/ParentHeader';
import { AccountInfoCard } from './parent/AccountInfoCard';
import { LinkingCodeCard } from './parent/LinkingCodeCard';
import { ChildProfilesSection } from './parent/ChildProfilesSection';
import { UpgradeModal } from './parent/modals/UpgradeModal';
import { SettingsModal } from './parent/modals/SettingsModal';
import { DeviceModal } from './parent/modals/DeviceModal';

interface ChildProfile {
  id: string;
  name: string;
  ageGroup: string;
  avatar: string;
  language: string;
  createdAt: string;
  plan: string;
  stars?: number;
  badges?: string[];
  wordsLearned?: number;
  storiesCompleted?: number;
}

const getMaxProfiles = (plan: string) => {
  switch (plan) {
    case 'free': return 1;
    case 'basic': return 2;
    case 'standard': return 4;
    case 'premium': return 8;
    default: return 1;
  }
};

export const ParentDashboard = () => {
  const [parentData, setParentData] = useState<any>(null);
  const [childProfiles, setChildProfiles] = useState<ChildProfile[]>([]);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showDeviceModal, setShowDeviceModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [linkingCode] = useState('PARENT123');
  const [subtitleSetting, setSubtitleSetting] = useState('local');
  const [appLanguage, setAppLanguage] = useState('english');
  const [notifications, setNotifications] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const parentSession = localStorage.getItem('parentSession');
    let profiles = localStorage.getItem('childProfiles');
    
    if (parentSession) {
      setParentData(JSON.parse(parentSession));
    }
    
    if (profiles) {
      const parsedProfiles = JSON.parse(profiles);
      setChildProfiles(parsedProfiles);
    } else {
      // Initialize with empty array instead of sample data
      setChildProfiles([]);
      localStorage.setItem('childProfiles', JSON.stringify([]));
    }
  }, []);

  const handleAddChild = () => {
    if (!parentData) return;
    
    const maxProfiles = getMaxProfiles(parentData.selectedPlan);
    
    if (childProfiles.length >= maxProfiles) {
      setShowUpgradeModal(true);
      return;
    }

    toast({
      title: "Add Child Profile",
      description: "This would navigate to the add child profile flow",
    });
  };

  const handleDeleteChild = (childId: string) => {
    const updatedProfiles = childProfiles.filter(profile => profile.id !== childId);
    setChildProfiles(updatedProfiles);
    localStorage.setItem('childProfiles', JSON.stringify(updatedProfiles));
    
    // Remove active child profile if it's the one being deleted
    const activeProfile = localStorage.getItem('activeChildProfile');
    if (activeProfile) {
      const active = JSON.parse(activeProfile);
      if (active.id === childId) {
        localStorage.removeItem('activeChildProfile');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('parentSession');
    localStorage.removeItem('childProfiles');
    localStorage.removeItem('onboardingProgress');
    localStorage.removeItem('onboardingComplete');
    localStorage.removeItem('activeChildProfile');
    localStorage.removeItem('linkedChildProfile');
    window.location.reload();
  };

  if (!parentData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-amber-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-orange-800">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const maxProfiles = getMaxProfiles(parentData.selectedPlan);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-50 to-amber-50 p-4">
      <div className="max-w-6xl mx-auto">
        <ParentHeader 
          parentData={parentData}
          onDeviceModalOpen={() => setShowDeviceModal(true)}
          onDownloadModalOpen={() => setShowDownloadModal(true)}
          onSettingsModalOpen={() => setShowSettingsModal(true)}
          onLogout={handleLogout}
        />

        <AccountInfoCard 
          parentData={parentData}
          childProfiles={childProfiles}
          maxProfiles={maxProfiles}
        />

        <LinkingCodeCard linkingCode={linkingCode} />

        {childProfiles.length > 0 && (
          <div className="mb-8">
            <ProgressTracker childProfiles={childProfiles} />
          </div>
        )}

        <ChildProfilesSection 
          childProfiles={childProfiles}
          maxProfiles={maxProfiles}
          onAddChild={handleAddChild}
          onUpgradeModal={() => setShowUpgradeModal(true)}
          onDeleteChild={handleDeleteChild}
        />

        <DownloadManager 
          open={showDownloadModal} 
          onOpenChange={setShowDownloadModal} 
        />

        <UpgradeModal 
          open={showUpgradeModal} 
          onOpenChange={setShowUpgradeModal} 
        />

        <SettingsModal 
          open={showSettingsModal}
          onOpenChange={setShowSettingsModal}
          subtitleSetting={subtitleSetting}
          setSubtitleSetting={setSubtitleSetting}
          appLanguage={appLanguage}
          setAppLanguage={setAppLanguage}
          notifications={notifications}
          setNotifications={setNotifications}
        />

        <DeviceModal 
          open={showDeviceModal}
          onOpenChange={setShowDeviceModal}
        />
      </div>
    </div>
  );
};
