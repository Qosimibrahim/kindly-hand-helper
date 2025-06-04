
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Download, Trash2, Wifi, WifiOff, HardDrive, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DownloadItem {
  id: string;
  title: string;
  type: 'story' | 'game';
  size: string;
  status: 'available' | 'downloading' | 'downloaded' | 'failed';
  profileId?: string;
  unlocked: boolean;
  linkedStoryId?: string;
}

interface DownloadManagerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DownloadManager = ({ open, onOpenChange }: DownloadManagerProps) => {
  const [downloadItems, setDownloadItems] = useState<DownloadItem[]>([]);
  const [storageUsed, setStorageUsed] = useState(245); // MB
  const [storageLimit] = useState(2000); // 2GB limit
  const { toast } = useToast();

  useEffect(() => {
    // Load available content for download
    const mockItems: DownloadItem[] = [
      { id: '1', title: 'The Lion and the Mouse', type: 'story', size: '45 MB', status: 'downloaded', unlocked: true },
      { id: '2', title: 'The Wise Elephant', type: 'story', size: '38 MB', status: 'available', unlocked: true },
      { id: '3', title: 'Dancing Butterfly', type: 'story', size: '42 MB', status: 'available', unlocked: false },
      { id: '4', title: 'Lion Story Game', type: 'game', size: '28 MB', status: 'downloaded', unlocked: true, linkedStoryId: '1' },
      { id: '5', title: 'Elephant Vocabulary', type: 'game', size: '22 MB', status: 'available', unlocked: false, linkedStoryId: '2' },
      { id: '6', title: 'Word Match Safari', type: 'game', size: '35 MB', status: 'available', unlocked: true },
    ];
    
    const savedDownloads = localStorage.getItem('downloadedContent');
    if (savedDownloads) {
      const downloaded = JSON.parse(savedDownloads);
      const updatedItems = mockItems.map(item => {
        if (downloaded.includes(item.id)) {
          return { ...item, status: 'downloaded' as const };
        }
        return item;
      });
      setDownloadItems(updatedItems);
    } else {
      setDownloadItems(mockItems);
    }
  }, []);

  const handleDownload = (item: DownloadItem) => {
    if (storageUsed + parseInt(item.size) > storageLimit) {
      toast({
        title: "Storage Full",
        description: "Delete some content to free up space",
        variant: "destructive"
      });
      return;
    }

    setDownloadItems(prev => prev.map(i => 
      i.id === item.id ? { ...i, status: 'downloading' } : i
    ));

    // Simulate download
    setTimeout(() => {
      setDownloadItems(prev => prev.map(i => 
        i.id === item.id ? { ...i, status: 'downloaded' } : i
      ));
      
      setStorageUsed(prev => prev + parseInt(item.size));
      
      // Save to localStorage
      const currentDownloads = JSON.parse(localStorage.getItem('downloadedContent') || '[]');
      currentDownloads.push(item.id);
      localStorage.setItem('downloadedContent', JSON.stringify(currentDownloads));
      
      toast({
        title: "Download Complete! 📱",
        description: `${item.title} is now available offline`,
      });
    }, 2000);
  };

  const handleDelete = (item: DownloadItem) => {
    setDownloadItems(prev => prev.map(i => 
      i.id === item.id ? { ...i, status: 'available' } : i
    ));
    
    setStorageUsed(prev => prev - parseInt(item.size));
    
    // Remove from localStorage
    const currentDownloads = JSON.parse(localStorage.getItem('downloadedContent') || '[]');
    const updated = currentDownloads.filter((id: string) => id !== item.id);
    localStorage.setItem('downloadedContent', JSON.stringify(updated));
    
    toast({
      title: "Content Removed",
      description: `${item.title} deleted from device`,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'downloaded': return <Download className="w-4 h-4 text-green-600" />;
      case 'downloading': return <Clock className="w-4 h-4 text-blue-600 animate-spin" />;
      case 'failed': return <WifiOff className="w-4 h-4 text-red-600" />;
      default: return <Wifi className="w-4 h-4 text-gray-400" />;
    }
  };

  const storagePercentage = (storageUsed / storageLimit) * 100;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-orange-900">
            <Download className="w-5 h-5" />
            Download Manager
          </DialogTitle>
          <DialogDescription>
            Manage offline content for your children
          </DialogDescription>
        </DialogHeader>

        {/* Storage Usage */}
        <Card className="border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-orange-600" />
                <span className="font-medium text-orange-900">Storage Usage</span>
              </div>
              <span className="text-sm text-orange-700">{storageUsed} MB / {storageLimit} MB</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-orange-500 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${Math.min(storagePercentage, 100)}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        {/* Download Items */}
        <div className="space-y-4">
          <h3 className="font-semibold text-orange-900">Available Content</h3>
          <div className="grid gap-3">
            {downloadItems.map((item) => (
              <Card key={item.id} className={`border ${item.unlocked ? 'border-green-200' : 'border-gray-200'}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(item.status)}
                      <div>
                        <h4 className="font-medium text-orange-900">{item.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-orange-600">
                          <Badge variant={item.type === 'story' ? 'default' : 'secondary'}>
                            {item.type}
                          </Badge>
                          <span>{item.size}</span>
                          {!item.unlocked && <Badge variant="outline">Plan Locked</Badge>}
                          {item.linkedStoryId && <span>• Requires story completion</span>}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {item.status === 'downloaded' ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(item)}
                          className="text-red-600 border-red-300 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      ) : item.status === 'downloading' ? (
                        <Button size="sm" disabled>
                          Downloading...
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleDownload(item)}
                          disabled={!item.unlocked}
                          className="bg-orange-500 hover:bg-orange-600"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
