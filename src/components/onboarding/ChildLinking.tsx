
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { QrCode, AlertCircle, Camera } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

interface ChildLinkingProps {
  onComplete: () => void;
}

export const ChildLinking = ({ onComplete }: ChildLinkingProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error('Failed to load Kidandu logo in ChildLinking:', e);
    const fallback = document.getElementById('child-linking-logo-fallback');
    if (fallback) {
      fallback.style.display = 'block';
    }
    (e.target as HTMLImageElement).style.display = 'none';
  };

  const handleQRScan = () => {
    setIsScanning(true);
    setError('');
    
    // Simulate QR code scanning
    setTimeout(() => {
      setIsScanning(false);
      
      // Store linked profile
      localStorage.setItem('linkedChildProfile', JSON.stringify({
        linkingCode: 'PARENT123',
        linkedAt: new Date().toISOString(),
      }));
      
      // Ensure there are child profiles available
      const existingProfiles = localStorage.getItem('childProfiles');
      if (!existingProfiles) {
        // Create sample child profiles
        const sampleProfiles = [
          {
            id: 'child1',
            name: 'Ayo',
            ageGroup: '5-7',
            avatar: 'avatar1',
            language: 'hausa',
            stars: 15,
            badges: ['first-story', 'word-master'],
            wordsLearned: 8,
            storiesCompleted: 2,
            plan: 'free',
            createdAt: new Date().toISOString(),
          },
          {
            id: 'child2',
            name: 'Kemi',
            ageGroup: '8-10',
            avatar: 'avatar3',
            language: 'yoruba',
            stars: 22,
            badges: ['first-story', 'word-master', 'streak-7'],
            wordsLearned: 15,
            storiesCompleted: 4,
            plan: 'free',
            createdAt: new Date().toISOString(),
          }
        ];
        localStorage.setItem('childProfiles', JSON.stringify(sampleProfiles));
      }
      
      toast({
        title: "Successfully Linked! 🎉",
        description: "Welcome! Your profile is now connected",
      });
      
      onComplete();
    }, 3000);
  };

  const handleEnterDirectly = () => {
    // Allow direct entry to child dashboard
    localStorage.setItem('linkedChildProfile', JSON.stringify({
      linkingCode: 'DIRECT_ENTRY',
      linkedAt: new Date().toISOString(),
    }));
    
    // Ensure there are child profiles available
    const existingProfiles = localStorage.getItem('childProfiles');
    if (!existingProfiles) {
      // Create sample child profiles
      const sampleProfiles = [
        {
          id: 'child1',
          name: 'Ayo',
          ageGroup: '5-7',
          avatar: 'avatar1',
          language: 'hausa',
          stars: 15,
          badges: ['first-story', 'word-master'],
          wordsLearned: 8,
          storiesCompleted: 2,
          plan: 'free',
          createdAt: new Date().toISOString(),
        },
        {
          id: 'child2',
          name: 'Kemi',
          ageGroup: '8-10',
          avatar: 'avatar3',
          language: 'yoruba',
          stars: 22,
          badges: ['first-story', 'word-master', 'streak-7'],
          wordsLearned: 15,
          storiesCompleted: 4,
          plan: 'free',
          createdAt: new Date().toISOString(),
        }
      ];
      localStorage.setItem('childProfiles', JSON.stringify(sampleProfiles));
    }
    
    toast({
      title: "Welcome! 🎉",
      description: "Entering your learning dashboard",
    });
    
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-cyan-50 to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img 
            src="/lovable-uploads/36e81c03-4c5c-47e1-a776-3832ac1c3503.png" 
            alt="Kidandu Logo" 
            className="h-16 w-auto"
            onError={handleImageError}
          />
          <div id="child-linking-logo-fallback" className="text-3xl font-bold text-blue-900" style={{ display: 'none' }}>
            Kidandu
          </div>
        </div>

        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <QrCode className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-blue-900 mb-2">Link Your Profile</h2>
          <p className="text-blue-700 text-lg">
            Ask your parent to show you their QR code
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border-2 border-blue-200 shadow-lg">
            {isScanning ? (
              <div className="space-y-4 text-center">
                <div className="relative">
                  <div className="w-48 h-48 bg-gradient-to-br from-blue-200 to-blue-300 rounded-2xl mx-auto flex items-center justify-center">
                    <div className="absolute inset-4 border-4 border-blue-500 rounded-xl animate-pulse"></div>
                    <QrCode className="w-16 h-16 text-blue-600" />
                  </div>
                </div>
                <p className="text-blue-700 font-medium">Looking for QR code...</p>
                <Button
                  variant="outline"
                  onClick={() => setIsScanning(false)}
                  className="text-blue-600"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="space-y-4 text-center">
                <div className="w-48 h-48 border-4 border-dashed border-blue-300 rounded-2xl mx-auto flex items-center justify-center bg-blue-50">
                  <QrCode className="w-20 h-20 text-blue-400" />
                </div>
                <Button 
                  onClick={handleQRScan} 
                  className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl"
                >
                  <Camera className="mr-2 h-5 w-5" />
                  Scan Parent's QR Code
                </Button>
              </div>
            )}
          </div>

          <Button
            onClick={handleEnterDirectly}
            variant="outline"
            className="w-full h-14 text-xl border-2 border-green-400 text-green-700 hover:bg-green-50 rounded-xl shadow-lg"
            size="lg"
          >
            Continue to Dashboard 🚀
          </Button>
        </div>

        <div className="text-center text-sm text-blue-600 bg-blue-50 p-4 rounded-xl">
          <p className="font-medium">Need help?</p>
          <p>Ask your parent to open their Kidandu app and show you the QR code.</p>
        </div>
      </div>
    </div>
  );
};
