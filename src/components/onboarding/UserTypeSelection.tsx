
import { Button } from '@/components/ui/button';
import { Users, UserCheck } from 'lucide-react';

interface UserTypeSelectionProps {
  onUserTypeSelect: (type: 'parent' | 'child') => void;
}

export const UserTypeSelection = ({ onUserTypeSelect }: UserTypeSelectionProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-50 to-amber-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-6">
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/78db9558-bb0a-4b7c-95b8-b4fca3dd8dcc.png" 
              alt="Kidandu Logo" 
              className="h-32 w-auto drop-shadow-lg"
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-orange-900">
              Whose device is this?
            </h1>
            <p className="text-xl text-orange-700">
              Let's set up your African language learning adventure!
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => onUserTypeSelect('parent')}
            className="w-full h-20 text-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:scale-105"
            size="lg"
          >
            <Users className="mr-4 h-8 w-8" />
            I'm a Parent or Guardian
          </Button>

          <Button
            onClick={() => onUserTypeSelect('child')}
            variant="outline"
            className="w-full h-20 text-xl border-4 border-amber-400 text-amber-800 hover:bg-amber-50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:scale-105"
            size="lg"
          >
            <UserCheck className="mr-4 h-8 w-8" />
            I'm a Child – My Profile is Linked
          </Button>
        </div>

        <div className="pt-8">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-4 h-4 bg-orange-600 rounded-full animate-pulse"></div>
            <div className="w-4 h-4 bg-orange-300 rounded-full"></div>
            <div className="w-4 h-4 bg-orange-300 rounded-full"></div>
            <div className="w-4 h-4 bg-orange-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
