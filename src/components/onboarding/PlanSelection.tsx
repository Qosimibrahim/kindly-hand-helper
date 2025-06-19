
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Star, Users, Zap, LogIn } from 'lucide-react';

interface PlanSelectionProps {
  onPlanSelected: (plan: string) => void;
  onPaymentRequired: (plan: string) => void;
  onExistingParentLogin: () => void;
}

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 'Free',
    profiles: 1,
    features: ['1 child profile', 'Basic learning games', 'Limited content', '2 African languages'],
    icon: Users,
    popular: false,
    color: 'bg-gradient-to-br from-gray-400 to-gray-500',
  },
  {
    id: 'basic',
    name: 'Basic',
    price: '$4.99/month',
    profiles: 2,
    features: ['2 child profiles', 'All learning games', 'Progress tracking', '3 African languages'],
    icon: Star,
    popular: false,
    color: 'bg-gradient-to-br from-blue-400 to-blue-500',
  },
  {
    id: 'standard',
    name: 'Standard',
    price: '$8.99/month',
    profiles: 4,
    features: ['4 child profiles', 'Advanced activities', 'Detailed reports', '4 African languages', 'Language switching'],
    icon: Crown,
    popular: true,
    color: 'bg-gradient-to-br from-orange-400 to-orange-500',
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$12.99/month',
    profiles: 8,
    features: ['8 child profiles', 'Unlimited access', 'Premium content', 'All 5 languages + extras', 'Priority support', 'Offline mode'],
    icon: Zap,
    popular: false,
    color: 'bg-gradient-to-br from-purple-400 to-purple-500',
  },
];

export const PlanSelection = ({ onPlanSelected, onPaymentRequired, onExistingParentLogin }: PlanSelectionProps) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error('Failed to load Kidandu logo in PlanSelection:', e);
    const fallback = document.getElementById('plan-logo-fallback');
    if (fallback) {
      fallback.style.display = 'block';
    }
    (e.target as HTMLImageElement).style.display = 'none';
  };

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleContinue = () => {
    if (!selectedPlan) return;
    
    setIsProcessing(true);
    
    // Store plan selection progress
    localStorage.setItem('onboardingProgress', JSON.stringify({ 
      step: 'plan-selected', 
      email: localStorage.getItem('verifiedEmail'),
      pin: 'set',
      selectedPlan: selectedPlan 
    }));
    
    if (selectedPlan === 'free') {
      setTimeout(() => {
        onPlanSelected(selectedPlan);
      }, 1000);
    } else {
      // For paid plans, go to payment page
      setTimeout(() => {
        onPaymentRequired(selectedPlan);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-6">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img 
            src="/lovable-uploads/36e81c03-4c5c-47e1-a776-3832ac1c3503.png" 
            alt="Kidandu Logo" 
            className="h-16 w-auto"
            onError={handleImageError}
          />
          <div id="plan-logo-fallback" className="text-2xl font-bold text-purple-900" style={{ display: 'none' }}>
            Kidandu
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-purple-900 mb-2">Choose Your Plan</h2>
          <p className="text-purple-700 text-lg">
            Pick the perfect plan for your family's African language learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isSelected = selectedPlan === plan.id;
            
            return (
              <Card
                key={plan.id}
                className={`relative cursor-pointer transition-all duration-200 hover:shadow-xl transform hover:scale-105 ${
                  isSelected ? 'ring-4 ring-purple-400 shadow-2xl scale-105' : 'hover:shadow-lg'
                } ${plan.popular ? 'border-orange-300 border-2' : ''}`}
                onClick={() => handlePlanSelect(plan.id)}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-1 text-sm font-bold">
                    🌟 Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto w-16 h-16 ${plan.color} rounded-full flex items-center justify-center mb-3 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-3xl font-bold text-gray-900">
                    {plan.price}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-purple-600 bg-purple-100 rounded-lg py-2 px-4">
                      {plan.profiles} Child Profile{plan.profiles > 1 ? 's' : ''}
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {isSelected && (
                    <div className="pt-3">
                      <div className="w-full h-2 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center space-y-4">
          <Button
            onClick={handleContinue}
            disabled={!selectedPlan || isProcessing}
            size="lg"
            className="px-12 py-4 text-xl bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-xl shadow-lg h-14"
          >
            {isProcessing ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                {selectedPlan === 'free' ? 'Setting up...' : 'Proceeding to payment...'}
              </div>
            ) : (
              selectedPlan === 'free' ? 'Continue with Free Plan' : 'Proceed to Payment'
            )}
          </Button>

          <div className="pt-4">
            <Button
              variant="outline"
              onClick={onExistingParentLogin}
              className="flex items-center px-8 py-3 text-lg border-purple-300 text-purple-700 hover:bg-purple-50 rounded-xl"
            >
              <LogIn className="mr-2 h-5 w-5" />
              Already have an account? Login
            </Button>
          </div>
        </div>

        <div className="pt-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-orange-300 rounded-full"></div>
            <div className="w-3 h-3 bg-orange-300 rounded-full"></div>
            <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
            <div className="w-3 h-3 bg-orange-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
