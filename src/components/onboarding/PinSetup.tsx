
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Shield, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PinSetupProps {
  onPinSet: (pin: string) => void;
}

export const PinSetup = ({ onPinSet }: PinSetupProps) => {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [step, setStep] = useState<'create' | 'confirm'>('create');
  const { toast } = useToast();

  const handleCreatePin = () => {
    if (pin.length !== 4) {
      toast({
        title: "Invalid PIN",
        description: "Please enter a 4-digit PIN",
        variant: "destructive",
      });
      return;
    }
    setStep('confirm');
  };

  const handleConfirmPin = () => {
    if (confirmPin !== pin) {
      toast({
        title: "PINs Don't Match",
        description: "Please make sure both PINs are the same",
        variant: "destructive",
      });
      setConfirmPin('');
      return;
    }

    toast({
      title: "PIN Created",
      description: "Your parental PIN has been set successfully",
    });
    onPinSet(pin);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {step === 'create' ? 'Create Parental PIN' : 'Confirm Your PIN'}
          </h2>
          <p className="mt-2 text-gray-600">
            {step === 'create' 
              ? 'Create a 4-digit PIN to secure profile management and settings'
              : 'Please enter your PIN again to confirm'
            }
          </p>
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <Label>
              {step === 'create' ? 'Enter 4-digit PIN' : 'Confirm PIN'}
            </Label>
            <div className="mt-2 flex justify-center">
              <InputOTP
                maxLength={4}
                value={step === 'create' ? pin : confirmPin}
                onChange={(value) => step === 'create' ? setPin(value) : setConfirmPin(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          <Button
            onClick={step === 'create' ? handleCreatePin : handleConfirmPin}
            disabled={step === 'create' ? pin.length !== 4 : confirmPin.length !== 4}
            className="w-full"
            size="lg"
          >
            {step === 'create' ? (
              <>Continue</>
            ) : (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Confirm PIN
              </>
            )}
          </Button>

          {step === 'confirm' && (
            <Button
              variant="ghost"
              onClick={() => {
                setStep('create');
                setPin('');
                setConfirmPin('');
              }}
              className="w-full"
            >
              Change PIN
            </Button>
          )}
        </div>

        <div className="pt-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
