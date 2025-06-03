
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Star, Users } from 'lucide-react';

interface PlanSelectionProps {
  onPlanSelected: (plan: string) => void;
}

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 'Free',
    profiles: 1,
    features: ['1 child profile', 'Basic learning games', 'Limited content'],
    icon: Users,
    popular: false,
  },
  {
    id: 'basic',
    name: 'Basic',
    price: '$4.99/month',
    profiles: 2,
    features: ['2 child profiles', 'All learning games', 'Progress tracking'],
    icon: Star,
    popular: false,
  },
  {
    id: 'standard',
    name: 'Standard',
    price: '$8.99/month',
    profiles: 4,
    features: ['4 child profiles', 'Advanced activities', 'Detailed reports', 'Language switching'],
    icon: Crown,
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$12.99/month',
    profiles: 8,
    features: ['8 child profiles', 'Unlimited access', 'Premium content', 'Priority support'],
    icon: Crown,
    popular: false,
  },
];

export const PlanSelection = ({ onPlanSelected }: PlanSelectionProps) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('');

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleContinue = () => {
    if (!selectedPlan) return;
    
    if (selectedPlan === 'free') {
      onPlanSelected(selectedPlan);
    } else {
      // In a real app, this would redirect to payment gateway
      // For now, we'll simulate successful payment
      setTimeout(() => {
        onPlanSelected(selectedPlan);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Choose Your Plan</h2>
          <p className="mt-2 text-gray-600">
            Select a plan that fits your family's needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isSelected = selectedPlan === plan.id;
            
            return (
              <Card
                key={plan.id}
                className={`relative cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  isSelected ? 'ring-2 ring-blue-600 shadow-lg' : ''
                } ${plan.popular ? 'border-blue-200' : ''}`}
                onClick={() => handlePlanSelect(plan.id)}
              >
                {plan.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-600">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription className="text-2xl font-bold text-gray-900">
                    {plan.price}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-600">
                      {plan.profiles} Child Profile{plan.profiles > 1 ? 's' : ''}
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {isSelected && (
                    <div className="pt-2">
                      <div className="w-full h-1 bg-blue-600 rounded-full"></div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button
            onClick={handleContinue}
            disabled={!selectedPlan}
            size="lg"
            className="px-8"
          >
            {selectedPlan === 'free' ? 'Continue with Free Plan' : 'Proceed to Payment'}
          </Button>
        </div>

        <div className="pt-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
