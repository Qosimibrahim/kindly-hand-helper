
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Lock, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PaymentPageProps {
  selectedPlan: string;
  onPaymentComplete: () => void;
  onBack: () => void;
}

const planPrices = {
  free: 'Free',
  basic: '$4.99/month',
  standard: '$8.99/month',
  premium: '$12.99/month',
};

export const PaymentPage = ({ selectedPlan, onPaymentComplete, onBack }: PaymentPageProps) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error('Failed to load Kidandu logo in PaymentPage:', e);
    const fallback = document.getElementById('payment-logo-fallback');
    if (fallback) {
      fallback.style.display = 'block';
    }
    (e.target as HTMLImageElement).style.display = 'none';
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handlePayment = () => {
    if (!cardNumber || !expiryDate || !cvv || !cardholderName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all payment details.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      localStorage.setItem('paymentCompleted', 'true');
      toast({
        title: "Payment Successful! 💳",
        description: "Your subscription has been activated.",
      });
      onPaymentComplete();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img 
            src="/lovable-uploads/36e81c03-4c5c-47e1-a776-3832ac1c3503.png" 
            alt="Kidandu Logo" 
            className="h-16 w-auto"
            onError={handleImageError}
          />
          <div id="payment-logo-fallback" className="text-2xl font-bold text-blue-900" style={{ display: 'none' }}>
            Kidandu
          </div>
        </div>

        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <CreditCard className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-blue-900 mb-2">Complete Payment</h2>
          <p className="text-blue-700">
            {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Plan - {planPrices[selectedPlan as keyof typeof planPrices]}
          </p>
        </div>

        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-900">
              <Lock className="w-5 h-5 mr-2" />
              Secure Payment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="cardholderName" className="text-blue-900 font-medium">Cardholder Name</Label>
              <Input
                id="cardholderName"
                placeholder="John Doe"
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
                className="mt-1 h-12 border-blue-200 focus:border-blue-400 rounded-xl"
                disabled={isProcessing}
              />
            </div>

            <div>
              <Label htmlFor="cardNumber" className="text-blue-900 font-medium">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                className="mt-1 h-12 border-blue-200 focus:border-blue-400 rounded-xl"
                maxLength={19}
                disabled={isProcessing}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate" className="text-blue-900 font-medium">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                  className="mt-1 h-12 border-blue-200 focus:border-blue-400 rounded-xl"
                  maxLength={5}
                  disabled={isProcessing}
                />
              </div>
              <div>
                <Label htmlFor="cvv" className="text-blue-900 font-medium">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ''))}
                  className="mt-1 h-12 border-blue-200 focus:border-blue-400 rounded-xl"
                  maxLength={4}
                  disabled={isProcessing}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full h-12 text-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl shadow-lg"
            size="lg"
          >
            {isProcessing ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing Payment...
              </div>
            ) : (
              `Pay ${planPrices[selectedPlan as keyof typeof planPrices]}`
            )}
          </Button>

          <Button
            variant="ghost"
            onClick={onBack}
            disabled={isProcessing}
            className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Plan Selection
          </Button>
        </div>

        <div className="pt-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
            <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
