
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { QrCode } from 'lucide-react';
import { QRCodeDisplay } from './QRCodeDisplay';

interface LinkingCodeCardProps {
  linkingCode: string;
}

export const LinkingCodeCard = ({ linkingCode }: LinkingCodeCardProps) => {
  return (
    <Card className="mb-8 border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50">
      <CardHeader>
        <CardTitle className="flex items-center text-blue-900">
          <QrCode className="w-5 h-5 mr-2" />
          Child Device Linking
        </CardTitle>
        <CardDescription className="text-blue-700">
          Use this QR code to link your child's device to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <div className="flex flex-col items-center">
            <QRCodeDisplay text={linkingCode} size={200} />
            <p className="text-sm text-blue-600 mt-4 text-center font-medium">Scan with child's device</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
