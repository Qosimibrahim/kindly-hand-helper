
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserPlus, AlertTriangle, Crown, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

interface ChildProfilesSectionProps {
  childProfiles: ChildProfile[];
  maxProfiles: number;
  onAddChild: () => void;
  onUpgradeModal: () => void;
  onDeleteChild: (childId: string) => void;
}

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

export const ChildProfilesSection = ({ 
  childProfiles, 
  maxProfiles, 
  onAddChild, 
  onUpgradeModal,
  onDeleteChild
}: ChildProfilesSectionProps) => {
  const { toast } = useToast();

  const handleDeleteChild = (childId: string, childName: string) => {
    if (confirm(`Are you sure you want to delete ${childName}'s profile? This action cannot be undone.`)) {
      onDeleteChild(childId);
      toast({
        title: "Profile Deleted",
        description: `${childName}'s profile has been removed.`,
      });
    }
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-orange-900">Child Profiles</h2>
        {childProfiles.length < maxProfiles && (
          <Button 
            onClick={onAddChild} 
            className="flex items-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add Child
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {childProfiles.map((profile) => (
          <Card key={profile.id} className="hover:shadow-xl transition-all duration-200 transform hover:scale-105 border-orange-200 relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDeleteChild(profile.id, profile.name)}
              className="absolute top-2 right-2 h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
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
              <div className="flex justify-center gap-4 text-sm">
                <div className="text-center">
                  <p className="font-bold text-orange-900">{profile.stars || 0}</p>
                  <p className="text-orange-600">Stars</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-orange-900">{profile.storiesCompleted || 0}</p>
                  <p className="text-orange-600">Stories</p>
                </div>
              </div>
              <Badge variant="outline" className="border-orange-300 text-orange-700">
                {profile.plan?.charAt(0).toUpperCase() + profile.plan?.slice(1) || 'Free'} Plan
              </Badge>
              <Button variant="outline" size="sm" className="w-full border-orange-300 text-orange-700 hover:bg-orange-50">
                View Progress
              </Button>
            </CardContent>
          </Card>
        ))}

        {childProfiles.length === 0 && (
          <Card 
            className="border-2 border-dashed border-orange-300 hover:border-orange-400 cursor-pointer transition-colors duration-200 hover:bg-orange-50 col-span-full"
            onClick={onAddChild}
          >
            <CardContent className="flex flex-col items-center justify-center h-80 text-orange-600">
              <UserPlus className="w-16 h-16 mb-4" />
              <p className="text-lg font-bold">Add Your First Child Profile</p>
              <p className="text-sm text-center">
                Get started by creating a profile for your child
              </p>
            </CardContent>
          </Card>
        )}

        {childProfiles.length > 0 && childProfiles.length < maxProfiles && (
          <Card 
            className="border-2 border-dashed border-orange-300 hover:border-orange-400 cursor-pointer transition-colors duration-200 hover:bg-orange-50"
            onClick={onAddChild}
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
              onClick={onUpgradeModal}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
            >
              <Crown className="mr-2 h-4 w-4" />
              Upgrade Plan
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
