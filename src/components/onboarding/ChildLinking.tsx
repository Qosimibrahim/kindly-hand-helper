
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { QrCode, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

interface ChildLinkingProps {
  onComplete: () => void;
}

export const ChildLinking = ({ onComplete }: ChildLinkingProps) => {
  const [linkingCode, setLinkingCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleQRScan = () => {
    setIsScanning(true);
    // Simulate QR code scanning
    setTimeout(() => {
      setIsScanning(false);
      // Mock successful scan
      const mockCode = 'PARENT123';
      setLinkingCode(mockCode);
      toast({
        title: "QR Code Scanned",
        description: "Linking code captured successfully",
      });
    }, 2000);
  };

  const handleLinking = () => {
    setError('');
    
    if (!linkingCode) {
      setError('Please scan a QR code or enter a linking code');
      return;
    }

    // Mock validation - in real app, this would validate against backend
    if (linkingCode === 'PARENT123' || linkingCode === 'FAMILY456') {
      // Store linked profile
      localStorage.setItem('linkedChildProfile', JSON.stringify({
        linkingCode,
        linkedAt: new Date().toISOString(),
      }));
      
      toast({
        title: "Successfully Linked",
        description: "Your profile has been linked to the parent account",
      });
      
      onComplete();
    } else {
      setError('Invalid linking code. Please check with your parent or guardian.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <QrCode className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Link Your Profile</h2>
          <p className="mt-2 text-gray-600">
            Ask your parent or guardian to show you their QR code
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            {isScanning ? (
              <div className="space-y-4">
                <div className="animate-pulse">
                  <div className="w-32 h-32 bg-gray-300 rounded-lg mx-auto mb-4"></div>
                </div>
                <p className="text-gray-600">Scanning for QR code...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg mx-auto flex items-center justify-center">
                  <QrCode className="w-12 h-12 text-gray-400" />
                </div>
                <Button onClick={handleQRScan} variant="outline" className="w-full">
                  Scan QR Code
                </Button>
              </div>
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or</span>
            </div>
          </div>

          <div>
            <Label htmlFor="linkingCode">Enter Linking Code</Label>
            <Input
              id="linkingCode"
              placeholder="Enter code from parent's device"
              value={linkingCode}
              onChange={(e) => setLinkingCode(e.target.value.toUpperCase())}
              className="mt-1"
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            onClick={handleLinking}
            disabled={!linkingCode}
            className="w-full"
            size="lg"
          >
            Link Profile
          </Button>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>Need help? Ask your parent or guardian to show you their device.</p>
        </div>
      </div>
    </div>
  );
};
