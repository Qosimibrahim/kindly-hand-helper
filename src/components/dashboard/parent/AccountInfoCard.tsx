
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

interface AccountInfoCardProps {
  parentData: any;
  childProfiles: any[];
  maxProfiles: number;
}

export const AccountInfoCard = ({ parentData, childProfiles, maxProfiles }: AccountInfoCardProps) => {
  return (
    <Card className="mb-8 border-orange-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
        <CardTitle className="flex items-center text-orange-900">
          <Users className="w-5 h-5 mr-2" />
          Account Information
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-orange-600 font-medium">Parent/Guardian Email</p>
            <p className="font-bold text-orange-900">{parentData.email}</p>
          </div>
          <div>
            <p className="text-sm text-orange-600 font-medium">Current Plan</p>
            <p className="font-bold text-orange-900 capitalize">{parentData.selectedPlan}</p>
          </div>
          <div>
            <p className="text-sm text-orange-600 font-medium">Child Profiles</p>
            <p className="font-bold text-orange-900">{childProfiles.length} of {maxProfiles}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
