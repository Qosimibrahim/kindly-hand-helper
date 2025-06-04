
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Star, BookOpen, Gamepad2, Award, Mic, User, Lock, ArrowLeft, WifiOff, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { OfflineIndicator } from '../common/OfflineIndicator';
import { ContentCard } from '../learning/ContentCard';

interface ChildProfile {
  id: string;
  name: string;
  ageGroup: string;
  avatar: string;
  language: string;
  stars: number;
  badges: string[];
  wordsLearned: number;
  storiesCompleted: number;
  plan: string;
}

interface ChildDashboardProps {
  profile: ChildProfile;
  onSwitchProfile: () => void;
}

const getAvatarEmoji = (avatarId: string) => {
  const avatars: { [key: string]: string } = {
    'avatar1': '🦁', 'avatar2': '🐸', 'avatar3': '🦄', 'avatar4': '🐼',
    'avatar5': '🦋', 'avatar6': '🐙', 'avatar7': '🦒', 'avatar8': '🐘', 'avatar9': '🦓',
  };
  return avatars[avatarId] || '🦁';
};

const getLanguageFlag = (languageId: string) => {
  const flags: { [key: string]: string } = {
    'hausa': '🇳🇬', 'swahili': '🇰🇪', 'yoruba': '🇳🇬', 'igbo': '🇳🇬',
    'english': '🇬🇧', 'amharic': '🇪🇹', 'zulu': '🇿🇦', 'arabic': '🇪🇬',
  };
  return flags[languageId] || '🌍';
};

export const ChildDashboard = ({ profile, onSwitchProfile }: ChildDashboardProps) => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [downloadedContent, setDownloadedContent] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load downloaded content
    const downloaded = JSON.parse(localStorage.getItem('downloadedContent') || '[]');
    setDownloadedContent(downloaded);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const mockStories = [
    { id: '1', title: 'The Lion and the Mouse', locked: false, completed: true, image: '🦁' },
    { id: '2', title: 'The Wise Elephant', locked: false, completed: false, image: '🐘' },
    { id: '3', title: 'The Dancing Butterfly', locked: true, completed: false, image: '🦋' },
  ];

  const mockGames = [
    { id: '4', title: 'Lion Story Game', type: 'vocabulary', locked: false, image: '🎯' },
    { id: '5', title: 'Elephant Vocabulary', type: 'grammar', locked: false, image: '🧩' },
    { id: '6', title: 'Word Match Safari', type: 'pronunciation', locked: profile.plan === 'free', image: '🔊' },
  ];

  const handleActivityTap = (activityId: string) => {
    const isDownloaded = downloadedContent.includes(activityId);
    
    if (!isOnline && !isDownloaded) {
      toast({
        title: "Need Internet or Download 📶",
        description: "Ask your parent to download this for offline use!",
      });
      return;
    }
    
    toast({
      title: `Opening activity...`,
      description: "Loading your learning adventure! 🚀",
    });
  };

  const handleVocabularyPractice = () => {
    if (!isOnline) {
      toast({
        title: "Voice Practice Needs Internet 🌐",
        description: "Voice practice is only available when connected to the internet.",
      });
      return;
    }
    
    toast({
      title: "Starting Voice Practice! 🎤",
      description: "Get ready to practice your pronunciation!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-amber-100 p-4">
      <OfflineIndicator />
      
      <div className="max-w-4xl mx-auto">
        {/* Header with Profile */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/78db9558-bb0a-4b7c-95b8-b4fca3dd8dcc.png" 
              alt="Kidandu Logo" 
              className="h-8 w-auto"
            />
            <h1 className="text-2xl font-bold text-orange-900">Hi, {profile.name}! 👋</h1>
          </div>
          
          <Button
            variant="ghost"
            onClick={() => setShowProfileModal(true)}
            className="flex items-center gap-2 bg-white/50 hover:bg-white/70 rounded-full p-3 shadow-lg"
          >
            <span className="text-2xl">{getAvatarEmoji(profile.avatar)}</span>
            <span className="font-medium text-orange-900">{profile.name}</span>
          </Button>
        </div>

        {/* Stars Progress Bar */}
        <Card className="mb-6 bg-gradient-to-r from-yellow-200 to-amber-200 border-yellow-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Star className="w-8 h-8 text-yellow-600 fill-yellow-400" />
                <div>
                  <p className="text-xl font-bold text-yellow-800">{profile.stars} Stars</p>
                  <p className="text-sm text-yellow-700">5 more to unlock new avatar item!</p>
                </div>
              </div>
              <div className="w-24 h-3 bg-white/50 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${(profile.stars % 10) * 10}%` }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stories Section */}
        <Card className="mb-6 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardHeader className="text-center pb-3">
            <CardTitle className="flex items-center justify-center gap-2 text-blue-900">
              <BookOpen className="w-6 h-6" />
              Read a Story
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockStories.map((story) => (
              <ContentCard
                key={story.id}
                id={story.id}
                title={story.title}
                type="story"
                image={story.image}
                locked={story.locked}
                completed={story.completed}
                downloaded={downloadedContent.includes(story.id)}
                onTap={handleActivityTap}
                plan={profile.plan}
              />
            ))}
          </CardContent>
        </Card>

        {/* Games Section */}
        <Card className="mb-6 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
          <CardHeader className="text-center pb-3">
            <CardTitle className="flex items-center justify-center gap-2 text-purple-900">
              <Gamepad2 className="w-6 h-6" />
              Play a Game
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockGames.map((game) => (
              <ContentCard
                key={game.id}
                id={game.id}
                title={game.title}
                type="game"
                image={game.image}
                locked={game.locked}
                downloaded={downloadedContent.includes(game.id)}
                onTap={handleActivityTap}
                plan={profile.plan}
              />
            ))}
          </CardContent>
        </Card>

        {/* Secondary Activities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Practice Speaking */}
          <Card className="hover:shadow-xl transition-all duration-200 transform hover:scale-105 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-6 text-center">
              <div className="relative">
                <Mic className={`w-12 h-12 mx-auto mb-4 ${isOnline ? 'text-green-600' : 'text-gray-400'}`} />
                {!isOnline && (
                  <WifiOff className="w-6 h-6 text-red-500 absolute -top-1 -right-1" />
                )}
              </div>
              <h3 className="text-lg font-bold text-green-900 mb-2">Practice Speaking</h3>
              <p className={`mb-4 ${isOnline ? 'text-green-700' : 'text-gray-600'}`}>
                {isOnline ? 'Learn new words and practice pronunciation' : 'Voice practice needs internet'}
              </p>
              <Button 
                className={`w-full ${
                  isOnline 
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                }`}
                onClick={handleVocabularyPractice}
                disabled={!isOnline}
              >
                {isOnline ? 'Start Practice Session' : 'Needs Internet Connection'}
              </Button>
            </CardContent>
          </Card>

          {/* My Rewards */}
          <Card className="hover:shadow-xl transition-all duration-200 transform hover:scale-105 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
            <CardContent className="p-6 text-center">
              <Award className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-amber-900 mb-2">My Rewards</h3>
              <div className="flex justify-center gap-4 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-amber-800">{profile.badges.length}</p>
                  <p className="text-xs text-amber-600">Badges</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-amber-800">{profile.wordsLearned}</p>
                  <p className="text-xs text-amber-600">Words</p>
                </div>
              </div>
              <Button 
                variant="outline"
                className="border-amber-300 text-amber-700 hover:bg-amber-50 w-full"
                onClick={() => handleActivityTap('rewards')}
              >
                View My Collection
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Profile Modal */}
        <Dialog open={showProfileModal} onOpenChange={setShowProfileModal}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle className="text-center text-xl text-orange-900">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">{getAvatarEmoji(profile.avatar)}</span>
                </div>
                {profile.name}
              </DialogTitle>
              <DialogDescription className="text-center space-y-2">
                <p><strong>Age:</strong> {profile.ageGroup}</p>
                <p><strong>Language:</strong> {getLanguageFlag(profile.language)} {profile.language.charAt(0).toUpperCase() + profile.language.slice(1)}</p>
                <p><strong>Stars:</strong> ⭐ {profile.stars}</p>
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 pt-4">
              <Button 
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                onClick={onSwitchProfile}
              >
                <User className="mr-2 h-4 w-4" />
                Switch Profile
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-orange-300 text-orange-700 hover:bg-orange-50"
                onClick={() => setShowProfileModal(false)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Learning
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
