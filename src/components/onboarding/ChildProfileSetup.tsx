
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UserPlus, Globe, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ChildProfileSetupProps {
  selectedPlan: string;
  onProfileCreated: () => void;
}

const avatars = [
  { id: 'avatar1', emoji: '🦁', name: 'Lion' },
  { id: 'avatar2', emoji: '🐸', name: 'Frog' },
  { id: 'avatar3', emoji: '🦄', name: 'Unicorn' },
  { id: 'avatar4', emoji: '🐼', name: 'Panda' },
  { id: 'avatar5', emoji: '🦋', name: 'Butterfly' },
  { id: 'avatar6', emoji: '🐙', name: 'Octopus' },
  { id: 'avatar7', emoji: '🦒', name: 'Giraffe' },
  { id: 'avatar8', emoji: '🐘', name: 'Elephant' },
  { id: 'avatar9', emoji: '🦓', name: 'Zebra' },
];

const languages = [
  { id: 'swahili', name: 'Swahili', flag: '🇰🇪', region: 'East Africa' },
  { id: 'hausa', name: 'Hausa', flag: '🇳🇬', region: 'Nigeria/Niger' },
  { id: 'igbo', name: 'Igbo', flag: '🇳🇬', region: 'Nigeria' },
  { id: 'yoruba', name: 'Yoruba', flag: '🇳🇬', region: 'Nigeria' },
  { id: 'english', name: 'English', flag: '🇬🇧', region: 'Global' },
  { id: 'amharic', name: 'Amharic', flag: '🇪🇹', region: 'Ethiopia' },
  { id: 'zulu', name: 'Zulu', flag: '🇿🇦', region: 'South Africa' },
  { id: 'xhosa', name: 'Xhosa', flag: '🇿🇦', region: 'South Africa' },
  { id: 'oromo', name: 'Oromo', flag: '🇪🇹', region: 'Ethiopia' },
  { id: 'arabic', name: 'Arabic', flag: '🇪🇬', region: 'North Africa' },
  { id: 'somali', name: 'Somali', flag: '🇸🇴', region: 'Somalia' },
  { id: 'wolof', name: 'Wolof', flag: '🇸🇳', region: 'Senegal' },
  { id: 'akan', name: 'Akan/Twi', flag: '🇬🇭', region: 'Ghana' },
  { id: 'luganda', name: 'Luganda', flag: '🇺🇬', region: 'Uganda' },
  { id: 'kikongo', name: 'Kikongo', flag: '🇨🇩', region: 'Central Africa' },
  { id: 'shona', name: 'Shona', flag: '🇿🇼', region: 'Zimbabwe' },
];

const getAvailableLanguages = (plan: string) => {
  switch (plan) {
    case 'free': return languages.slice(0, 3);
    case 'basic': return languages.slice(0, 6);
    case 'standard': return languages.slice(0, 12);
    case 'premium': return languages;
    default: return languages.slice(0, 3);
  }
};

export const ChildProfileSetup = ({ selectedPlan, onProfileCreated }: ChildProfileSetupProps) => {
  const [childName, setChildName] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [error, setError] = useState('');
  const { toast } = useToast();

  const availableLanguages = getAvailableLanguages(selectedPlan);

  const handleCreateProfile = () => {
    setError('');
    
    if (!childName.trim()) {
      setError('Please enter your child\'s name');
      return;
    }
    
    if (!ageGroup) {
      setError('Please select an age group');
      return;
    }
    
    if (!selectedAvatar) {
      setError('Please choose an avatar');
      return;
    }
    
    if (!selectedLanguage) {
      setError('Please select a learning language');
      return;
    }

    // Store child profile
    const childProfile = {
      id: Date.now().toString(),
      name: childName.trim(),
      ageGroup,
      avatar: selectedAvatar,
      language: selectedLanguage,
      createdAt: new Date().toISOString(),
      plan: selectedPlan,
    };

    const existingProfiles = JSON.parse(localStorage.getItem('childProfiles') || '[]');
    existingProfiles.push(childProfile);
    localStorage.setItem('childProfiles', JSON.stringify(existingProfiles));

    // Mark onboarding as complete
    localStorage.setItem('onboardingComplete', 'true');

    toast({
      title: "Profile Created! 🎉",
      description: `${childName}'s learning journey begins now!`,
    });

    onProfileCreated();
  };

  const handleAvatarSelect = (avatarId: string) => {
    setSelectedAvatar(avatarId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-6">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img 
            src="/lovable-uploads/78db9558-bb0a-4b7c-95b8-b4fca3dd8dcc.png" 
            alt="Kidandu Logo" 
            className="h-16 w-auto"
          />
        </div>

        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <UserPlus className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-emerald-900 mb-2">Create Child Profile</h2>
          <p className="text-emerald-700">
            Let's set up your child's African language learning adventure!
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          <div>
            <Label htmlFor="childName" className="text-emerald-900 font-medium text-lg">Child's Name or Nickname</Label>
            <Input
              id="childName"
              placeholder="Enter child's name"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              className="mt-2 h-12 text-lg border-emerald-200 focus:border-emerald-400 rounded-xl"
            />
          </div>

          <div>
            <Label className="text-emerald-900 font-medium text-lg">Age Group</Label>
            <Select value={ageGroup} onValueChange={setAgeGroup}>
              <SelectTrigger className="mt-2 h-12 text-lg border-emerald-200 rounded-xl">
                <SelectValue placeholder="Select age group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2-4">2-4 years (Early Learning)</SelectItem>
                <SelectItem value="5-7">5-7 years (Primary)</SelectItem>
                <SelectItem value="8-10">8-10 years (Advanced)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-emerald-900 font-medium text-lg">Choose an Avatar</Label>
            <RadioGroup value={selectedAvatar} onValueChange={handleAvatarSelect} className="mt-3">
              <div className="grid grid-cols-3 gap-3">
                {avatars.map((avatar) => (
                  <div
                    key={avatar.id}
                    onClick={() => handleAvatarSelect(avatar.id)}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg transform hover:scale-105 ${
                      selectedAvatar === avatar.id ? 'ring-4 ring-emerald-400 shadow-xl scale-105' : ''
                    }`}
                  >
                    <Card>
                      <CardContent className="p-4 text-center">
                        <RadioGroupItem value={avatar.id} className="sr-only" />
                        <div className="text-4xl mb-2">{avatar.emoji}</div>
                        <div className="text-sm font-medium text-emerald-800">{avatar.name}</div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label className="flex items-center text-emerald-900 font-medium text-lg">
              <Globe className="w-5 h-5 mr-2" />
              Learning Language
            </Label>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="mt-2 h-12 text-lg border-emerald-200 rounded-xl">
                <SelectValue placeholder="Select African language to learn" />
              </SelectTrigger>
              <SelectContent>
                {availableLanguages.map((language) => (
                  <SelectItem key={language.id} value={language.id}>
                    <div className="flex items-center">
                      <span className="text-xl mr-3">{language.flag}</span>
                      <div>
                        <div className="font-medium">{language.name}</div>
                        <div className="text-xs text-gray-500">{language.region}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Alert className="mt-3 border-blue-200 bg-blue-50">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                This language will be locked to this profile. {selectedPlan !== 'standard' && selectedPlan !== 'premium' && 'Upgrade to Standard or Premium to switch languages later.'}
              </AlertDescription>
            </Alert>
          </div>

          <Button
            onClick={handleCreateProfile}
            className="w-full h-14 text-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-xl shadow-lg"
            size="lg"
          >
            Create Profile & Start Learning! 🚀
          </Button>
        </div>

        <div className="pt-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
            <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
            <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
            <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
