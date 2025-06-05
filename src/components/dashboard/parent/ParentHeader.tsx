
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Smartphone, Download, Settings, LogOut } from 'lucide-react';

interface ParentHeaderProps {
  parentData: any;
  onDeviceModalOpen: () => void;
  onDownloadModalOpen: () => void;
  onSettingsModalOpen: () => void;
  onLogout: () => void;
}

export const ParentHeader = ({ 
  parentData, 
  onDeviceModalOpen, 
  onDownloadModalOpen, 
  onSettingsModalOpen, 
  onLogout 
}: ParentHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <div className="flex items-center gap-4">
        <img 
          src="/lovable-uploads/78db9558-bb0a-4b7c-95b8-b4fca3dd8dcc.png" 
          alt="Kidandu Logo" 
          className="h-12 w-auto"
        />
        <div>
          <h1 className="text-3xl font-bold text-orange-900">Parent Dashboard</h1>
          <p className="text-orange-700 mt-1">
            Manage your children's African language learning journey
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant="outline" className="px-3 py-1 border-orange-300 text-orange-800">
          <Crown className="w-4 h-4 mr-1" />
          {parentData?.selectedPlan.charAt(0).toUpperCase() + parentData?.selectedPlan.slice(1)} Plan
        </Badge>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="border-orange-300 text-orange-700 hover:bg-orange-50"
          onClick={onDeviceModalOpen}
        >
          <Smartphone className="w-4 h-4 mr-2" />
          Devices
        </Button>

        <Button 
          variant="outline" 
          size="sm" 
          className="border-orange-300 text-orange-700 hover:bg-orange-50"
          onClick={onDownloadModalOpen}
        >
          <Download className="w-4 h-4 mr-2" />
          Downloads
        </Button>

        <Button 
          variant="outline" 
          size="sm" 
          className="border-orange-300 text-orange-700 hover:bg-orange-50"
          onClick={onSettingsModalOpen}
        >
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>

        <Button variant="ghost" size="sm" onClick={onLogout} className="text-orange-600 hover:bg-orange-50">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};
