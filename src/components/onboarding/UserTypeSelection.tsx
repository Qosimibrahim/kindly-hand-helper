
import { Button } from '@/components/ui/button';
import { Users, UserCheck } from 'lucide-react';

interface UserTypeSelectionProps {
  onUserTypeSelect: (type: 'parent' | 'child') => void;
}

export const UserTypeSelection = ({ onUserTypeSelect }: UserTypeSelectionProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-6">
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/78db9558-bb0a-4b7c-95b8-b4fca3dd8dcc.png" 
              alt="Kidandu Logo" 
              className="h-24 w-auto"
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-orange-900">
              Whose device is this?
            </h1>
            <p className="text-lg text-orange-700">
              Let us know who will be using this device to get started
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => onUserTypeSelect('parent')}
            className="w-full h-16 text-lg bg-orange-600 hover:bg-orange-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            size="lg"
          >
            <Users className="mr-3 h-6 w-6" />
            I'm a Parent or Guardian
          </Button>

          <Button
            onClick={() => onUserTypeSelect('child')}
            variant="outline"
            className="w-full h-16 text-lg border-2 border-amber-400 text-amber-800 hover:bg-amber-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            size="lg"
          >
            <UserCheck className="mr-3 h-6 w-6" />
            I'm a Child – My Profile is Linked
          </Button>
        </div>

        <div className="pt-8">
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
