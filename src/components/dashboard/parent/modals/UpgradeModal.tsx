
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Crown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UpgradeModal = ({ open, onOpenChange }: UpgradeModalProps) => {
  const { toast } = useToast();

  const handleUpgrade = () => {
    toast({
      title: "Upgrade Plan",
      description: "This would navigate to plan upgrade flow",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl text-orange-900">
            <Crown className="w-8 h-8 mx-auto mb-2 text-orange-600" />
            Upgrade Your Plan
          </DialogTitle>
          <DialogDescription className="text-center text-orange-700">
            You've reached your profile limit. Upgrade to add more children and unlock premium features!
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <Button 
            className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
            onClick={handleUpgrade}
          >
            View Upgrade Options
          </Button>
          <Button 
            variant="outline" 
            className="w-full border-orange-300 text-orange-700 hover:bg-orange-50"
            onClick={() => onOpenChange(false)}
          >
            Maybe Later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
