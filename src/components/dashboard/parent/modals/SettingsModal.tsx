
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Shield, Bell } from 'lucide-react';

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subtitleSetting: string;
  setSubtitleSetting: (value: string) => void;
  appLanguage: string;
  setAppLanguage: (value: string) => void;
  notifications: boolean;
  setNotifications: (value: boolean) => void;
}

export const SettingsModal = ({ 
  open, 
  onOpenChange, 
  subtitleSetting, 
  setSubtitleSetting, 
  appLanguage, 
  setAppLanguage, 
  notifications, 
  setNotifications 
}: SettingsModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-orange-900">
            <Settings className="w-5 h-5 mr-2 inline" />
            Settings
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <Label className="text-orange-900 font-medium">Subtitle Preferences</Label>
            <Select value={subtitleSetting} onValueChange={setSubtitleSetting}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="local">Show subtitles in Local Language</SelectItem>
                <SelectItem value="english">Show subtitles in English</SelectItem>
                <SelectItem value="both">Show both</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-orange-900 font-medium">App Interface Language</Label>
            <Select value={appLanguage} onValueChange={setAppLanguage}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="french">Français</SelectItem>
                <SelectItem value="portuguese">Português</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-orange-900 font-medium">Push Notifications</Label>
            <Button
              variant={notifications ? "default" : "outline"}
              size="sm"
              onClick={() => setNotifications(!notifications)}
            >
              <Bell className="w-4 h-4 mr-1" />
              {notifications ? 'On' : 'Off'}
            </Button>
          </div>

          <Button className="w-full bg-orange-500 hover:bg-orange-600">
            <Shield className="w-4 h-4 mr-2" />
            Update Parental PIN
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
