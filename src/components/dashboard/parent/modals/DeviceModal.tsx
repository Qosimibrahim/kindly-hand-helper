
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface DeviceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DeviceModal = ({ open, onOpenChange }: DeviceModalProps) => {
  const mockDevices = [
    { id: 1, name: 'iPad - Kitchen', lastActive: '2 hours ago', profiles: ['Ayo', 'Kemi'] },
    { id: 2, name: 'Android Tablet', lastActive: '1 day ago', profiles: ['Ayo'] },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-orange-900">Manage Devices</DialogTitle>
          <DialogDescription>
            View and manage devices linked to your account
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {mockDevices.map((device) => (
            <Card key={device.id} className="border-orange-200">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-orange-900">{device.name}</h4>
                    <p className="text-sm text-orange-600">Last active: {device.lastActive}</p>
                    <p className="text-sm text-orange-600">Profiles: {device.profiles.join(', ')}</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">
                    Unlink
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          <Button className="w-full bg-orange-500 hover:bg-orange-600">
            Link New Device
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
