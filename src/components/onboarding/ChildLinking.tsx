
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { QrCode, AlertCircle, Camera, Keyboard } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

interface ChildLinkingProps {
  onComplete: () => void;
}

export const ChildLinking = ({ onComplete }: ChildLinkingProps) => {
  const [linkingCode, setLinkingCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState('');
  const [linkingMethod, setLinkingMethod] = useState<'qr' | 'code'>('qr');
  const { toast } = useToast();

  const handleQRScan = () => {
    setIsScanning(true);
    setError('');
    
    // Simulate QR code scanning
    setTimeout(() => {
      setIsScanning(false);
      // Mock successful scan
      const mockCode = 'PARENT123';
      setLinkingCode(mockCode);
      toast({
        title: "QR Code Found! 📱",
        description: "Linking code captured successfully",
      });
    }, 3000);
  };

  const handleLinking = () => {
    setError('');
    
    if (!linkingCode.trim()) {
      setError('Please scan a QR code or enter a linking code');
      return;
    }

    // Mock validation - in real app, this would validate against backend
    const validCodes = ['PARENT123', 'FAMILY456', 'KIDANDU789'];
    if (validCodes.includes(linkingCode.toUpperCase())) {
      // Store linked profile
      localStorage.setItem('linkedChildProfile', JSON.stringify({
        linkingCode: linkingCode.toUpperCase(),
        linkedAt: new Date().toISOString(),
      }));
      
      toast({
        title: "Successfully Linked! 🎉",
        description: "Welcome! Your profile is now connected",
      });
      
      onComplete();
    } else {
      setError('Invalid linking code. Please ask your parent to show you the correct code.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-cyan-50 to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img 
            src="/lovable-uploads/78db9558-bb0a-4b7c-95b8-b4fca3dd8dcc.png" 
            alt="Kidandu Logo" 
            className="h-16 w-auto"
          />
        </div>

        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <QrCode className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-blue-900 mb-2">Link Your Profile</h2>
          <p className="text-blue-700 text-lg">
            Ask your parent to show you their linking code
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          {/* Method Selection */}
          <div className="flex gap-2">
            <Button
              variant={linkingMethod === 'qr' ? 'default' : 'outline'}
              onClick={() => setLinkingMethod('qr')}
              className="flex-1 h-12"
            >
              <Camera className="mr-2 h-4 w-4" />
              Scan QR
            </Button>
            <Button
              variant={linkingMethod === 'code' ? 'default' : 'outline'}
              onClick={() => setLinkingMethod('code')}
              className="flex-1 h-12"
            >
              <Keyboard className="mr-2 h-4 w-4" />
              Enter Code
            </Button>
          </div>

          {linkingMethod === 'qr' ? (
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
          ) : (
            <div>
              <Label htmlFor="linkingCode" className="text-blue-900 font-medium text-lg">Enter Linking Code</Label>
              <Input
                id="linkingCode"
                placeholder="Ask parent for the code"
                value={linkingCode}
                onChange={(e) => setLinkingCode(e.target.value.toUpperCase())}
                className="mt-2 h-12 text-lg text-center font-mono border-blue-200 focus:border-blue-400 rounded-xl"
              />
            </div>
          )}

          <Button
            onClick={handleLinking}
            disabled={!linkingCode}
            className="w-full h-14 text-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl shadow-lg"
            size="lg"
          >
            Link My Profile 🔗
          </Button>
        </div>

        <div className="text-center text-sm text-blue-600 bg-blue-50 p-4 rounded-xl">
          <p className="font-medium">Need help?</p>
          <p>Ask your parent to open their Kidandu app and show you the linking code or QR code.</p>
        </div>
      </div>
    </div>
  );
};
