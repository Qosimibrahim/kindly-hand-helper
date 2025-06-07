
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QrCode, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { QRCodeDisplay } from './QRCodeDisplay';

interface LinkingCodeCardProps {
  linkingCode: string;
}

export const LinkingCodeCard = ({ linkingCode }: LinkingCodeCardProps) => {
  const { toast } = useToast();

  const copyLinkingCode = () => {
    navigator.clipboard.writeText(linkingCode);
    toast({
      title: "Code Copied! 📋",
      description: "Share this code with your child's device",
    });
  };

  return (
    <Card className="mb-8 border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50">
      <CardHeader>
        <CardTitle className="flex items-center text-blue-900">
          <QrCode className="w-5 h-5 mr-2" />
          Child Device Linking
        </CardTitle>
        <CardDescription className="text-blue-700">
          Use this code or QR code to link your child's device to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row items-center gap-6">
          {/* QR Code Section */}
          <div className="flex flex-col items-center">
            <QRCodeDisplay text={linkingCode} size={150} />
            <p className="text-sm text-blue-600 mt-2 text-center">Scan with child's device</p>
          </div>
          
          {/* Code Section */}
          <div className="flex-1 w-full">
            <div className="bg-white border-2 border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-2xl font-mono font-bold text-blue-900 text-center">{linkingCode}</p>
            </div>
            <Button 
              onClick={copyLinkingCode} 
              variant="outline" 
              className="w-full border-blue-300 text-blue-700 hover:bg-blue-50"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Code
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
