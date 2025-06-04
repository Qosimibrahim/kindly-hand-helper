import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPlus, Settings, LogOut, Users, Crown, AlertTriangle, QrCode, Copy, Smartphone, Download, Shield, Globe, Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ChildProfile {
  id: string;
  name: string;
  ageGroup: string;
  avatar: string;
  language: string;
  createdAt: string;
  plan: string;
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

const getAvatarEmoji = (avatarId: string) => {
  const avatars: { [key: string]: string } = {
    'avatar1': '🦁',
    'avatar2': '🐸',
    'avatar3': '🦄',
    'avatar4': '🐼',
    'avatar5': '🦋',
    'avatar6': '🐙',
    'avatar7': '🦒',
    'avatar8': '🐘',
    'avatar9': '🦓',
  };
  return avatars[avatarId] || '🦁';
};

const getLanguageFlag = (languageId: string) => {
  const flags: { [key: string]: string } = {
    'hausa': '🇳🇬',
    'swahili': '🇰🇪',
    'yoruba': '🇳🇬',
    'igbo': '🇳🇬',
    'english': '🇬🇧',
    'amharic': '🇪🇹',
    'zulu': '🇿🇦',
    'arabic': '🇪🇬',
  };
  return flags[languageId] || '🌍';
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
    const profiles = localStorage.getItem('childProfiles');
    
    if (parentSession) {
      setParentData(JSON.parse(parentSession));
    }
    
    if (profiles) {
      setChildProfiles(JSON.parse(profiles));
    }
  }, []);

  const handleAddChild = () => {
    if (!parentData) return;
    
    const maxProfiles = getMaxProfiles(parentData.selectedPlan);
    
    if (childProfiles.length >= maxProfiles) {
      setShowUpgradeModal(true);
      return;
    }

    // In a real app, this would navigate to add child flow
    toast({
      title: "Add Child Profile",
      description: "This would navigate to the add child profile flow",
    });
  };

  const mockDevices = [
    { id: 1, name: 'iPad - Kitchen', lastActive: '2 hours ago', profiles: ['Ayo', 'Kemi'] },
    { id: 2, name: 'Android Tablet', lastActive: '1 day ago', profiles: ['Ayo'] },
  ];

  const mockDownloads = [
    { id: 1, title: 'Lion Stories Pack', size: '45 MB', status: 'downloaded', profile: 'Ayo' },
    { id: 2, title: 'Swahili Vocabulary', size: '28 MB', status: 'pending', profile: 'Kemi' },
    { id: 3, title: 'Pronunciation Games', size: '67 MB', status: 'available', profile: 'All' },
  ];

  const copyLinkingCode = () => {
    navigator.clipboard.writeText(linkingCode);
    toast({
      title: "Code Copied! 📋",
      description: "Share this code with your child's device",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('parentSession');
    localStorage.removeItem('childProfiles');
    localStorage.removeItem('onboardingProgress');
    localStorage.removeItem('onboardingComplete');
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
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <img 
              src="/lovable-uploads/78db9558-bb0a-4b7c-95b8-b4fca3dd8dcc.png" 
              alt="Kidandu Logo" 
              className="h-12 w-auto"
            />
            <div>
              <h1 className="text-3xl font-bold text-orange-900">Parent Dashboard</h1>
              <p className="text-orange-700 mt-1">
                Manage your children's African language learning journey
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="px-3 py-1 border-orange-300 text-orange-800">
              <Crown className="w-4 h-4 mr-1" />
              {parentData?.selectedPlan.charAt(0).toUpperCase() + parentData?.selectedPlan.slice(1)} Plan
            </Badge>
            
            <Dialog open={showDeviceModal} onOpenChange={setShowDeviceModal}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="border-orange-300 text-orange-700 hover:bg-orange-50">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Devices
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-orange-900">Manage Devices</DialogTitle>
                  <DialogDescription>
                    View and manage devices linked to your account
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  {mockDevices.map((device) => (
                    <Card key={device.id} className="border-orange-200">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-orange-900">{device.name}</h4>
                            <p className="text-sm text-orange-600">Last active: {device.lastActive}</p>
                            <p className="text-sm text-orange-600">Profiles: {device.profiles.join(', ')}</p>
                          </div>
                          <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">
                            Unlink
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    Link New Device
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={showDownloadModal} onOpenChange={setShowDownloadModal}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="border-orange-300 text-orange-700 hover:bg-orange-50">
                  <Download className="w-4 h-4 mr-2" />
                  Downloads
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-orange-900">Downloads Manager</DialogTitle>
                  <DialogDescription>
                    Manage offline content for your children
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  {mockDownloads.map((item) => (
                    <Card key={item.id} className="border-orange-200">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium text-orange-900">{item.title}</h4>
                            <p className="text-sm text-orange-600">{item.size} • {item.profile}</p>
                          </div>
                          <Badge variant={item.status === 'downloaded' ? 'default' : 'outline'}>
                            {item.status}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={showSettingsModal} onOpenChange={setShowSettingsModal}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="border-orange-300 text-orange-700 hover:bg-orange-50">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-orange-900">
                    <Settings className="w-5 h-5 mr-2 inline" />
                    Settings
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <div>
                    <Label className="text-orange-900 font-medium">Subtitle Preferences</Label>
                    <Select value={subtitleSetting} onValueChange={setSubtitleSetting}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="local">Show subtitles in Local Language</SelectItem>
                        <SelectItem value="english">Show subtitles in English</SelectItem>
                        <SelectItem value="both">Show both</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-orange-900 font-medium">App Interface Language</Label>
                    <Select value={appLanguage} onValueChange={setAppLanguage}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="french">Français</SelectItem>
                        <SelectItem value="portuguese">Português</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-orange-900 font-medium">Push Notifications</Label>
                    <Button
                      variant={notifications ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNotifications(!notifications)}
                    >
                      <Bell className="w-4 h-4 mr-1" />
                      {notifications ? 'On' : 'Off'}
                    </Button>
                  </div>

                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    <Shield className="w-4 h-4 mr-2" />
                    Update Parental PIN
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-orange-600 hover:bg-orange-50">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Account Info Card */}
        <Card className="mb-8 border-orange-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
            <CardTitle className="flex items-center text-orange-900">
              <Users className="w-5 h-5 mr-2" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-orange-600 font-medium">Parent/Guardian Email</p>
                <p className="font-bold text-orange-900">{parentData.email}</p>
              </div>
              <div>
                <p className="text-sm text-orange-600 font-medium">Current Plan</p>
                <p className="font-bold text-orange-900 capitalize">{parentData.selectedPlan}</p>
              </div>
              <div>
                <p className="text-sm text-orange-600 font-medium">Child Profiles</p>
                <p className="font-bold text-orange-900">{childProfiles.length} of {maxProfiles}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Linking Code Card */}
        <Card className="mb-8 border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-900">
              <QrCode className="w-5 h-5 mr-2" />
              Child Device Linking
            </CardTitle>
            <CardDescription className="text-blue-700">
              Use this code to link your child's device to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="bg-white border-2 border-blue-200 rounded-lg p-4 flex-1">
                <p className="text-2xl font-mono font-bold text-blue-900 text-center">{linkingCode}</p>
              </div>
              <Button onClick={copyLinkingCode} variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                <Copy className="w-4 h-4 mr-2" />
                Copy Code
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Child Profiles Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-orange-900">Child Profiles</h2>
            <Button 
              onClick={handleAddChild} 
              className="flex items-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Add Child
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {childProfiles.map((profile) => (
              <Card key={profile.id} className="hover:shadow-xl transition-all duration-200 transform hover:scale-105 border-orange-200">
                <CardHeader className="text-center bg-gradient-to-br from-orange-50 to-amber-50">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-4xl">
                      {getAvatarEmoji(profile.avatar)}
                    </span>
                  </div>
                  <CardTitle className="text-xl text-orange-900">{profile.name}</CardTitle>
                  <CardDescription className="text-orange-700">Age: {profile.ageGroup}</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-3 p-6">
                  <div className="flex justify-center items-center gap-2">
                    <span className="text-2xl">
                      {getLanguageFlag(profile.language)}
                    </span>
                    <span className="font-bold text-orange-900 capitalize">{profile.language}</span>
                  </div>
                  <Badge variant="outline" className="border-orange-300 text-orange-700">
                    {profile.plan.charAt(0).toUpperCase() + profile.plan.slice(1)} Plan
                  </Badge>
                  <Button variant="outline" size="sm" className="w-full border-orange-300 text-orange-700 hover:bg-orange-50">
                    View Progress
                  </Button>
                </CardContent>
              </Card>
            ))}

            {childProfiles.length < maxProfiles && (
              <Card 
                className="border-2 border-dashed border-orange-300 hover:border-orange-400 cursor-pointer transition-colors duration-200 hover:bg-orange-50"
                onClick={handleAddChild}
              >
                <CardContent className="flex flex-col items-center justify-center h-80 text-orange-600">
                  <UserPlus className="w-16 h-16 mb-4" />
                  <p className="text-lg font-bold">Add Child Profile</p>
                  <p className="text-sm text-center">
                    {maxProfiles - childProfiles.length} more profile{maxProfiles - childProfiles.length > 1 ? 's' : ''} available
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {childProfiles.length >= maxProfiles && (
            <Card className="mt-6 border-amber-300 bg-gradient-to-r from-amber-50 to-orange-50">
              <CardContent className="p-6 text-center">
                <AlertTriangle className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                <p className="text-amber-900 font-bold text-lg mb-2">
                  Profile Limit Reached
                </p>
                <p className="text-amber-800 mb-4">
                  Upgrade your plan to add more children to your account and unlock more African languages!
                </p>
                <Button 
                  onClick={() => setShowUpgradeModal(true)}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                >
                  <Crown className="mr-2 h-4 w-4" />
                  Upgrade Plan
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Upgrade Modal */}
        <Dialog open={showUpgradeModal} onOpenChange={setShowUpgradeModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-xl text-orange-900">
                <Crown className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                Upgrade Your Plan
              </DialogTitle>
              <DialogDescription className="text-center text-orange-700">
                You've reached your profile limit. Upgrade to add more children and unlock premium features!
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <Button 
                className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                onClick={() => {
                  toast({
                    title: "Upgrade Plan",
                    description: "This would navigate to plan upgrade flow",
                  });
                  setShowUpgradeModal(false);
                }}
              >
                View Upgrade Options
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-orange-300 text-orange-700 hover:bg-orange-50"
                onClick={() => setShowUpgradeModal(false)}
              >
                Maybe Later
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
