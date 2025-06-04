
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Shield, CheckCircle, Lock } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

interface PinSetupProps {
  onPinSet: (pin: string) => void;
}

export const PinSetup = ({ onPinSet }: PinSetupProps) => {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [step, setStep] = useState<'create' | 'confirm'>('create');
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleCreatePin = () => {
    setError('');
    if (pin.length !== 4) {
      setError('Please enter a 4-digit PIN');
      return;
    }
    
    // Store PIN creation progress
    localStorage.setItem('onboardingProgress', JSON.stringify({ 
      step: 'pin-confirm', 
      email: localStorage.getItem('verifiedEmail'),
      pin: pin 
    }));
    
    setStep('confirm');
  };

  const handleConfirmPin = () => {
    setError('');
    if (confirmPin.length !== 4) {
      setError('Please enter your PIN again');
      return;
    }

    if (confirmPin !== pin) {
      setError("PINs don't match. Please try again.");
      setConfirmPin('');
      return;
    }

    // Encrypt and store PIN (in real app, use proper encryption)
    const encryptedPin = btoa(pin); // Basic encoding for demo
    localStorage.setItem('parentalPin', encryptedPin);
    localStorage.setItem('pinCreated', 'true');

    toast({
      title: "PIN Created! 🔒",
      description: "Your parental PIN is now set up",
    });
    onPinSet(pin);
  };

  const resetPin = () => {
    setStep('create');
    setPin('');
    setConfirmPin('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="max-w-sm w-full space-y-6">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img 
            src="/lovable-uploads/78db9558-bb0a-4b7c-95b8-b4fca3dd8dcc.png" 
            alt="Kidandu Logo" 
            className="h-16 w-auto"
          />
        </div>

        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
            {step === 'create' ? <Shield className="w-10 h-10 text-white" /> : <Lock className="w-10 h-10 text-white" />}
          </div>
          <h2 className="text-2xl font-bold text-green-900 mb-2">
            {step === 'create' ? 'Create Your PIN' : 'Confirm Your PIN'}
          </h2>
          <p className="text-green-700">
            {step === 'create' 
              ? 'Choose a 4-digit PIN to keep settings safe'
              : 'Enter your PIN again to confirm'
            }
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          <div className="text-center">
            <Label className="text-green-900 font-medium text-lg">
              {step === 'create' ? 'Enter 4-digit PIN' : 'Confirm PIN'}
            </Label>
            <div className="mt-4 flex justify-center">
              <InputOTP
                maxLength={4}
                value={step === 'create' ? pin : confirmPin}
                onChange={(value) => step === 'create' ? setPin(value) : setConfirmPin(value)}
                className="gap-4"
              >
                <InputOTPGroup className="gap-4">
                  <InputOTPSlot index={0} className="w-14 h-14 text-2xl border-2 border-green-200 rounded-xl" />
                  <InputOTPSlot index={1} className="w-14 h-14 text-2xl border-2 border-green-200 rounded-xl" />
                  <InputOTPSlot index={2} className="w-14 h-14 text-2xl border-2 border-green-200 rounded-xl" />
                  <InputOTPSlot index={3} className="w-14 h-14 text-2xl border-2 border-green-200 rounded-xl" />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          <Button
            onClick={step === 'create' ? handleCreatePin : handleConfirmPin}
            disabled={step === 'create' ? pin.length !== 4 : confirmPin.length !== 4}
            className={`w-full h-12 text-lg rounded-xl shadow-lg ${
              step === 'create' 
                ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700' 
                : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
            }`}
            size="lg"
          >
            {step === 'create' ? (
              <>Continue</>
            ) : (
              <>
                <CheckCircle className="mr-2 h-5 w-5" />
                Confirm PIN
              </>
            )}
          </Button>

          {step === 'confirm' && (
            <Button
              variant="ghost"
              onClick={resetPin}
              className="w-full text-green-600 hover:text-green-700 hover:bg-green-50"
            >
              Change PIN
            </Button>
          )}
        </div>

        <div className="pt-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-orange-300 rounded-full"></div>
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <div className="w-3 h-3 bg-orange-300 rounded-full"></div>
            <div className="w-3 h-3 bg-orange-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
