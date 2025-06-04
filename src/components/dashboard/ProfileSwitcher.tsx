
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Lock, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

interface ProfileSwitcherProps {
  currentProfile: ChildProfile;
  onProfileSelect: (profile: ChildProfile) => void;
  onBack: () => void;
}

const getAvatarEmoji = (avatarId: string) => {
  const avatars: { [key: string]: string } = {
    'avatar1': '🦁', 'avatar2': '🐸', 'avatar3': '🦄', 'avatar4': '🐼',
    'avatar5': '🦋', 'avatar6': '🐙', 'avatar7': '🦒', 'avatar8': '🐘', 'avatar9': '🦓',
  };
  return avatars[avatarId] || '🦁';
};

export const ProfileSwitcher = ({ currentProfile, onProfileSelect, onBack }: ProfileSwitcherProps) => {
  const [step, setStep] = useState<'pin' | 'profiles'>('pin');
  const [pin, setPin] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimeLeft, setLockTimeLeft] = useState(0);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const allProfiles: ChildProfile[] = JSON.parse(localStorage.getItem('childProfiles') || '[]');
  const otherProfiles = allProfiles.filter(p => p.id !== currentProfile.id);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLocked && lockTimeLeft > 0) {
      interval = setInterval(() => {
        setLockTimeLeft(prev => {
          if (prev <= 1) {
            setIsLocked(false);
            setAttempts(0);
            setError('');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLocked, lockTimeLeft]);

  const handlePinSubmit = () => {
    setError('');
    
    if (pin.length !== 4) {
      setError('Please enter your 4-digit PIN');
      return;
    }

    // Mock PIN validation - in real app, this would decrypt and compare
    const storedPin = localStorage.getItem('parentalPin');
    const expectedPin = storedPin ? atob(storedPin) : '1234';

    if (pin === expectedPin) {
      setStep('profiles');
      toast({
        title: "PIN Correct! 🔓",
        description: "Choose a profile to switch to",
      });
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setPin('');
      
      if (newAttempts >= 3) {
        setIsLocked(true);
        setLockTimeLeft(30);
        setError('Too many incorrect attempts. Please wait 30 seconds.');
      } else {
        setError(`Incorrect PIN. ${3 - newAttempts} attempts remaining.`);
      }
    }
  };

  const handleProfileSelect = (profile: ChildProfile) => {
    localStorage.setItem('activeChildProfile', JSON.stringify(profile));
    toast({
      title: `Switched to ${profile.name}! 🎉`,
      description: "Loading their learning dashboard...",
    });
    onProfileSelect(profile);
  };

  if (step === 'pin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-sm w-full space-y-6">
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/78db9558-bb0a-4b7c-95b8-b4fca3dd8dcc.png" 
              alt="Kidandu Logo" 
              className="h-16 w-auto"
            />
          </div>

          <div className="text-center">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
              {isLocked ? <Lock className="w-10 h-10 text-white" /> : <Shield className="w-10 h-10 text-white" />}
            </div>
            <h2 className="text-2xl font-bold text-blue-900 mb-2">
              {isLocked ? 'Locked' : 'Parent PIN Required'}
            </h2>
            <p className="text-blue-700">
              {isLocked 
                ? `Please wait ${lockTimeLeft} seconds before trying again`
                : 'Enter your parental PIN to switch profiles'
              }
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          {!isLocked && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="mt-4 flex justify-center">
                  <InputOTP
                    maxLength={4}
                    value={pin}
                    onChange={setPin}
                    className="gap-4"
                    disabled={isLocked}
                  >
                    <InputOTPGroup className="gap-4">
                      <InputOTPSlot index={0} className="w-14 h-14 text-2xl border-2 border-blue-200 rounded-xl" />
                      <InputOTPSlot index={1} className="w-14 h-14 text-2xl border-2 border-blue-200 rounded-xl" />
                      <InputOTPSlot index={2} className="w-14 h-14 text-2xl border-2 border-blue-200 rounded-xl" />
                      <InputOTPSlot index={3} className="w-14 h-14 text-2xl border-2 border-blue-200 rounded-xl" />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>

              <Button
                onClick={handlePinSubmit}
                disabled={pin.length !== 4 || isLocked}
                className="w-full h-12 text-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl shadow-lg"
                size="lg"
              >
                Continue
              </Button>
            </div>
          )}

          <Button
            variant="ghost"
            onClick={onBack}
            className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Learning
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-6">
        <div className="flex justify-center mb-6">
          <img 
            src="/lovable-uploads/78db9558-bb0a-4b7c-95b8-b4fca3dd8dcc.png" 
            alt="Kidandu Logo" 
            className="h-16 w-auto"
          />
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-900 mb-2">Choose a Profile</h2>
          <p className="text-green-700">Select which child should use the device now</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {otherProfiles.map((profile) => (
            <Card
              key={profile.id}
              className="cursor-pointer transition-all duration-200 hover:shadow-xl hover:scale-105 border-green-200 bg-white"
              onClick={() => handleProfileSelect(profile)}
            >
              <CardHeader className="text-center bg-gradient-to-br from-green-50 to-emerald-50">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                  <span className="text-3xl">{getAvatarEmoji(profile.avatar)}</span>
                </div>
                <CardTitle className="text-lg text-green-900">{profile.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-2 p-4">
                <p className="text-sm text-green-700">Age: {profile.ageGroup}</p>
                <p className="text-sm text-green-700">⭐ {profile.stars} stars</p>
                <Button variant="outline" size="sm" className="w-full border-green-300 text-green-700 hover:bg-green-50">
                  Switch to {profile.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button
          variant="ghost"
          onClick={onBack}
          className="w-full text-green-600 hover:text-green-700 hover:bg-green-50"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to {currentProfile.name}'s Dashboard
        </Button>
      </div>
    </div>
  );
};
