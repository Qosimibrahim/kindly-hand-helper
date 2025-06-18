import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Mail, ArrowRight, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

interface EmailVerificationProps {
  onVerified: (email: string) => void;
}

export const EmailVerification = ({ onVerified }: EmailVerificationProps) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpAttempts, setOtpAttempts] = useState(0);
  const { toast } = useToast();

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error('Failed to load Kidandu logo in EmailVerification:', e);
    const fallback = document.getElementById('email-logo-fallback');
    if (fallback) {
      fallback.style.display = 'block';
    }
    (e.target as HTMLImageElement).style.display = 'none';
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return emailRegex.test(email);
  };

  const handleSendOTP = async () => {
    setError('');
    if (!validateEmail(email)) {
      setError('Please enter a valid Gmail address');
      return;
    }

    setIsLoading(true);
    // Simulate OTP sending with realistic delay
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      // Store email verification progress
      localStorage.setItem('onboardingProgress', JSON.stringify({ step: 'otp', email }));
      toast({
        title: "Code Sent! 📧",
        description: "Check your Gmail for the 6-digit code",
      });
    }, 2000);
  };

  const handleVerifyOTP = () => {
    setError('');
    if (otp.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    // Simulate OTP verification - accept "123456" or last 6 digits of email
    const validOtp = '123456';
    if (otp === validOtp) {
      localStorage.setItem('emailVerified', 'true');
      localStorage.setItem('verifiedEmail', email);
      toast({
        title: "Email Verified! ✅",
        description: "Great! Your Gmail has been verified",
      });
      onVerified(email);
    } else {
      setOtpAttempts(prev => prev + 1);
      if (otpAttempts >= 2) {
        setError('Too many failed attempts. Please request a new code.');
        setStep('email');
        setOtp('');
        setOtpAttempts(0);
      } else {
        setError('Invalid code. Please try again.');
      }
      setOtp('');
    }
  };

  const handleResendOTP = () => {
    setError('');
    setOtp('');
    setOtpAttempts(0);
    handleSendOTP();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-50 to-amber-50 flex items-center justify-center p-4">
      <div className="max-w-sm w-full space-y-6">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img 
            src="/lovable-uploads/36e81c03-4c5c-47e1-a776-3832ac1c3503.png" 
            alt="Kidandu Logo" 
            className="h-16 w-auto"
            onError={handleImageError}
          />
          <div id="email-logo-fallback" className="text-2xl font-bold text-orange-900" style={{ display: 'none' }}>
            Kidandu
          </div>
        </div>

        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <Mail className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-orange-900 mb-2">
            {step === 'email' ? 'Enter Your Gmail' : 'Enter Your Code'}
          </h2>
          <p className="text-orange-700">
            {step === 'email' 
              ? 'We need your Gmail to keep your account safe'
              : `Check your Gmail for the 6-digit code`
            }
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        {step === 'email' ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-orange-900 font-medium">Gmail Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 h-12 text-lg border-orange-200 focus:border-orange-400 rounded-xl"
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={handleSendOTP}
              disabled={!email || isLoading}
              className="w-full h-12 text-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl shadow-lg"
              size="lg"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Sending Code...
                </div>
              ) : (
                <>
                  Send Code
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <Label className="text-orange-900 font-medium text-lg">Enter 6-digit code</Label>
              <div className="mt-4 flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                  className="gap-3"
                >
                  <InputOTPGroup className="gap-3">
                    <InputOTPSlot index={0} className="w-12 h-12 text-xl border-2 border-orange-200 rounded-xl" />
                    <InputOTPSlot index={1} className="w-12 h-12 text-xl border-2 border-orange-200 rounded-xl" />
                    <InputOTPSlot index={2} className="w-12 h-12 text-xl border-2 border-orange-200 rounded-xl" />
                    <InputOTPSlot index={3} className="w-12 h-12 text-xl border-2 border-orange-200 rounded-xl" />
                    <InputOTPSlot index={4} className="w-12 h-12 text-xl border-2 border-orange-200 rounded-xl" />
                    <InputOTPSlot index={5} className="w-12 h-12 text-xl border-2 border-orange-200 rounded-xl" />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            <Button
              onClick={handleVerifyOTP}
              disabled={otp.length !== 6}
              className="w-full h-12 text-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl shadow-lg"
              size="lg"
            >
              <CheckCircle className="mr-2 h-5 w-5" />
              Verify Code
            </Button>

            <div className="text-center space-y-2">
              <Button
                variant="ghost"
                onClick={handleResendOTP}
                className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Send New Code
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setStep('email');
                  setOtp('');
                  setError('');
                }}
                className="w-full text-orange-600 hover:text-orange-700 hover:bg-orange-50"
              >
                Change Email Address
              </Button>
            </div>
          </div>
        )}

        <div className="pt-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
            <div className="w-3 h-3 bg-orange-300 rounded-full"></div>
            <div className="w-3 h-3 bg-orange-300 rounded-full"></div>
            <div className="w-3 h-3 bg-orange-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
