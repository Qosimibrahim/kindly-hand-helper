
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, Lock, Wifi, WifiOff, Play } from 'lucide-react';

interface ContentCardProps {
  id: string;
  title: string;
  type: 'story' | 'game';
  image: string;
  locked: boolean;
  completed?: boolean;
  downloaded: boolean;
  onTap: (id: string) => void;
  plan: string;
}

export const ContentCard = ({ 
  id, 
  title, 
  type, 
  image, 
  locked, 
  completed, 
  downloaded, 
  onTap, 
  plan 
}: ContentCardProps) => {
  const [isOnline] = useState(navigator.onLine);
  const isAccessible = downloaded || isOnline;
  const canPlay = !locked && isAccessible;

  const getStatusBadge = () => {
    if (completed) return <Badge className="bg-green-500 text-white">Completed ✅</Badge>;
    if (locked) return <Badge variant="outline" className="border-gray-400 text-gray-600">🔒 Locked</Badge>;
    if (!isAccessible) return <Badge variant="outline" className="border-orange-400 text-orange-600">Needs Internet</Badge>;
    if (downloaded) return <Badge className="bg-blue-500 text-white">📱 Downloaded</Badge>;
    return null;
  };

  const getAccessibilityIcon = () => {
    if (downloaded) return <Download className="w-4 h-4 text-blue-600" />;
    if (isOnline) return <Wifi className="w-4 h-4 text-green-600" />;
    return <WifiOff className="w-4 h-4 text-gray-400" />;
  };

  const handleTap = () => {
    if (!canPlay) {
      if (locked) {
        // Show locked message
        return;
      }
      if (!isAccessible) {
        // Show offline message
        return;
      }
    }
    onTap(id);
  };

  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
        canPlay 
          ? 'hover:scale-105 border-green-200' 
          : 'opacity-75 border-gray-200'
      }`}
      onClick={handleTap}
    >
      <CardHeader className="text-center pb-3">
        <div className="flex justify-between items-start mb-2">
          {getAccessibilityIcon()}
          {getStatusBadge()}
        </div>
        <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-2">
          <span className="text-3xl">{image}</span>
        </div>
        <CardTitle className={`text-lg ${canPlay ? 'text-orange-900' : 'text-gray-600'}`}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center p-4">
        <Button
          variant={canPlay ? "default" : "outline"}
          size="sm"
          className={`w-full ${
            canPlay 
              ? 'bg-orange-500 hover:bg-orange-600 text-white' 
              : 'border-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!canPlay}
        >
          {locked ? (
            <>
              <Lock className="w-4 h-4 mr-2" />
              Ask Parent to Unlock
            </>
          ) : !isAccessible ? (
            <>
              <WifiOff className="w-4 h-4 mr-2" />
              Needs Internet or Download
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              {type === 'story' ? 'Read Story' : 'Play Game'}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
