
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { UserPlus, Globe } from 'lucide-react';
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
];

const languages = [
  { id: 'spanish', name: 'Spanish', flag: '🇪🇸' },
  { id: 'french', name: 'French', flag: '🇫🇷' },
  { id: 'german', name: 'German', flag: '🇩🇪' },
  { id: 'italian', name: 'Italian', flag: '🇮🇹' },
  { id: 'portuguese', name: 'Portuguese', flag: '🇵🇹' },
  { id: 'chinese', name: 'Chinese', flag: '🇨🇳' },
];

export const ChildProfileSetup = ({ selectedPlan, onProfileCreated }: ChildProfileSetupProps) => {
  const [childName, setChildName] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const { toast } = useToast();

  const handleCreateProfile = () => {
    if (!childName || !ageGroup || !selectedAvatar || !selectedLanguage) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to create the profile",
        variant: "destructive",
      });
      return;
    }

    // Store child profile
    const childProfile = {
      name: childName,
      ageGroup,
      avatar: selectedAvatar,
      language: selectedLanguage,
      createdAt: new Date().toISOString(),
    };

    const existingProfiles = JSON.parse(localStorage.getItem('childProfiles') || '[]');
    existingProfiles.push(childProfile);
    localStorage.setItem('childProfiles', JSON.stringify(existingProfiles));

    toast({
      title: "Profile Created",
      description: `${childName}'s profile has been created successfully!`,
    });

    onProfileCreated();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <UserPlus className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Create Child Profile</h2>
          <p className="mt-2 text-gray-600">
            Set up your child's learning profile to get started
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <Label htmlFor="childName">Child's Name or Nickname</Label>
            <Input
              id="childName"
              placeholder="Enter child's name"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label>Age Group</Label>
            <Select value={ageGroup} onValueChange={setAgeGroup}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select age group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2-4">2-4 years</SelectItem>
                <SelectItem value="5-7">5-7 years</SelectItem>
                <SelectItem value="8-10">8-10 years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Choose an Avatar</Label>
            <RadioGroup value={selectedAvatar} onValueChange={setSelectedAvatar} className="mt-2">
              <div className="grid grid-cols-3 gap-4">
                {avatars.map((avatar) => (
                  <Card
                    key={avatar.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedAvatar === avatar.id ? 'ring-2 ring-purple-600' : ''
                    }`}
                  >
                    <CardContent className="p-4 text-center">
                      <RadioGroupItem value={avatar.id} className="sr-only" />
                      <div className="text-4xl mb-2">{avatar.emoji}</div>
                      <div className="text-sm font-medium">{avatar.name}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label className="flex items-center">
              <Globe className="w-4 h-4 mr-2" />
              Learning Language
            </Label>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select learning language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((language) => (
                  <SelectItem key={language.id} value={language.id}>
                    <span className="flex items-center">
                      <span className="mr-2">{language.flag}</span>
                      {language.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-500 mt-1">
              This language will be locked to this profile after setup
            </p>
          </div>

          <Button
            onClick={handleCreateProfile}
            className="w-full"
            size="lg"
          >
            Create Profile
          </Button>
        </div>

        <div className="pt-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
