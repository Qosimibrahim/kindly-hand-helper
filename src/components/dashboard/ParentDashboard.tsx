
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Settings, LogOut, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ChildProfile {
  name: string;
  ageGroup: string;
  avatar: string;
  language: string;
  createdAt: string;
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
      toast({
        title: "Profile Limit Reached",
        description: `You've reached your profile limit. Upgrade your plan to add more children.`,
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would navigate to add child flow
    toast({
      title: "Add Child Profile",
      description: "This would navigate to the add child profile flow",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('parentSession');
    localStorage.removeItem('childProfiles');
    window.location.reload();
  };

  if (!parentData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const maxProfiles = getMaxProfiles(parentData.selectedPlan);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Parent Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Manage your children's language learning journey
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="px-3 py-1">
              {parentData.selectedPlan.charAt(0).toUpperCase() + parentData.selectedPlan.slice(1)} Plan
            </Badge>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Account Info */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Parent/Guardian Email</p>
                <p className="font-medium">{parentData.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Current Plan</p>
                <p className="font-medium capitalize">{parentData.selectedPlan}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Child Profiles</p>
                <p className="font-medium">{childProfiles.length} of {maxProfiles}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Child Profiles */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Child Profiles</h2>
            <Button onClick={handleAddChild} className="flex items-center">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Child
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {childProfiles.map((profile, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">
                      {profile.avatar === 'avatar1' ? '🦁' :
                       profile.avatar === 'avatar2' ? '🐸' :
                       profile.avatar === 'avatar3' ? '🦄' :
                       profile.avatar === 'avatar4' ? '🐼' :
                       profile.avatar === 'avatar5' ? '🦋' : '🐙'}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{profile.name}</CardTitle>
                  <CardDescription>Age: {profile.ageGroup}</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-2">
                  <div className="flex justify-center items-center space-x-2">
                    <span className="text-lg">
                      {profile.language === 'spanish' ? '🇪🇸' :
                       profile.language === 'french' ? '🇫🇷' :
                       profile.language === 'german' ? '🇩🇪' :
                       profile.language === 'italian' ? '🇮🇹' :
                       profile.language === 'portuguese' ? '🇵🇹' : '🇨🇳'}
                    </span>
                    <span className="font-medium capitalize">{profile.language}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    View Progress
                  </Button>
                </CardContent>
              </Card>
            ))}

            {childProfiles.length < maxProfiles && (
              <Card 
                className="border-2 border-dashed border-gray-300 hover:border-blue-400 cursor-pointer transition-colors duration-200"
                onClick={handleAddChild}
              >
                <CardContent className="flex flex-col items-center justify-center h-64 text-gray-500">
                  <UserPlus className="w-12 h-12 mb-4" />
                  <p className="text-lg font-medium">Add Child Profile</p>
                  <p className="text-sm text-center">
                    {maxProfiles - childProfiles.length} more profile{maxProfiles - childProfiles.length > 1 ? 's' : ''} available
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {childProfiles.length >= maxProfiles && (
            <Card className="mt-6 border-orange-200 bg-orange-50">
              <CardContent className="p-6 text-center">
                <p className="text-orange-800 font-medium mb-2">
                  You've reached your profile limit
                </p>
                <p className="text-orange-700 mb-4">
                  Upgrade your plan to add more children to your account
                </p>
                <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-100">
                  Upgrade Plan
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
