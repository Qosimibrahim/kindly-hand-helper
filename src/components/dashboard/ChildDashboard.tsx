
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Star, BookOpen, Gamepad2, Award, Mic, User, Lock, ArrowLeft, WifiOff, Download, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { OfflineIndicator } from '../common/OfflineIndicator';
import { ContentCard } from '../learning/ContentCard';
import { GameCenter } from '../learning/GameCenter';
import { RewardsScreen } from '../learning/RewardsScreen';
import { InteractiveGame } from '../learning/InteractiveGame';

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
  onLogout?: () => void;
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

export const ChildDashboard = ({ profile, onSwitchProfile, onLogout }: ChildDashboardProps) => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'games' | 'rewards' | 'interactive-game'>('dashboard');
  const [activeGame, setActiveGame] = useState<{id: string, title: string, type: 'vocabulary' | 'story' | 'pronunciation' | 'sentence-builder'} | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [downloadedContent, setDownloadedContent] = useState<string[]>([]);
  const [currentProfile, setCurrentProfile] = useState(profile);
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

  const handleLogout = () => {
    localStorage.removeItem('activeChildProfile');
    localStorage.removeItem('linkedChildProfile');
    if (onLogout) {
      onLogout();
    } else {
      window.location.reload();
    }
  };

  const handleGameStart = (gameId: string, gameTitle: string, gameType: 'vocabulary' | 'story' | 'pronunciation' | 'sentence-builder') => {
    setActiveGame({ id: gameId, title: gameTitle, type: gameType });
    setCurrentView('interactive-game');
  };

  const handleGameComplete = (starsEarned: number) => {
    const updatedProfile = {
      ...currentProfile,
      stars: currentProfile.stars + starsEarned
    };
    setCurrentProfile(updatedProfile);
    localStorage.setItem('activeChildProfile', JSON.stringify(updatedProfile));
    
    // Update profile in childProfiles array
    const childProfiles = JSON.parse(localStorage.getItem('childProfiles') || '[]');
    const updatedProfiles = childProfiles.map((p: ChildProfile) => 
      p.id === updatedProfile.id ? updatedProfile : p
    );
    localStorage.setItem('childProfiles', JSON.stringify(updatedProfiles));
  };

  // Show different views based on currentView state
  if (currentView === 'games') {
    return <GameCenter profile={currentProfile} onBack={() => setCurrentView('dashboard')} onGameStart={handleGameStart} />;
  }

  if (currentView === 'rewards') {
    return <RewardsScreen profile={currentProfile} onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'interactive-game' && activeGame) {
    return (
      <InteractiveGame
        gameId={activeGame.id}
        gameTitle={activeGame.title}
        gameType={activeGame.type}
        onBack={() => setCurrentView('dashboard')}
        onComplete={handleGameComplete}
      />
    );
  }

  const mockStories = [
    { id: '1', title: 'The Lion and the Mouse', locked: false, completed: true, image: '🦁' },
    { id: '2', title: 'The Wise Elephant', locked: false, completed: false, image: '🐘' },
    { id: '3', title: 'The Dancing Butterfly', locked: true, completed: false, image: '🦋' },
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
    
    // Check if it's a story that should start an interactive game
    if (activityId === '1') {
      handleGameStart('story-lion', 'The Lion and the Mouse', 'story');
      return;
    }
    
    // Award stars for activity completion
    if (activityId === 'story') {
      toast({
        title: "🎉 You earned 2 stars!",
        description: "Great job reading the story!",
      });
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
    
    handleGameStart('vocab-practice', 'Vocabulary Practice', 'pronunciation');
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
            <h1 className="text-2xl font-bold text-orange-900">Hi, {currentProfile.name}! 👋</h1>
          </div>
          
          <Button
            variant="ghost"
            onClick={() => setShowProfileModal(true)}
            className="flex items-center gap-2 bg-white/50 hover:bg-white/70 rounded-full p-3 shadow-lg"
          >
            <span className="text-2xl">{getAvatarEmoji(currentProfile.avatar)}</span>
            <span className="font-medium text-orange-900">{currentProfile.name}</span>
          </Button>
        </div>

        {/* Stars Progress Bar */}
        <Card className="mb-6 bg-gradient-to-r from-yellow-200 to-amber-200 border-yellow-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Star className="w-8 h-8 text-yellow-600 fill-yellow-400" />
                <div>
                  <p className="text-xl font-bold text-yellow-800">{currentProfile.stars} Stars</p>
                  <p className="text-sm text-yellow-700">5 more to unlock new avatar item!</p>
                </div>
              </div>
              <div className="w-24 h-3 bg-white/50 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${(currentProfile.stars % 10) * 10}%` }}></div>
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
                plan={currentProfile.plan}
              />
            ))}
          </CardContent>
        </Card>

        {/* Main Activity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Play Games */}
          <Card 
            className="hover:shadow-xl transition-all duration-200 transform hover:scale-105 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 cursor-pointer"
            onClick={() => setCurrentView('games')}
          >
            <CardContent className="p-6 text-center">
              <Gamepad2 className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-purple-900 mb-2">Play a Game</h3>
              <p className="text-purple-700 mb-4">Fun games to practice what you've learned</p>
              <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                Go to Game Center
              </Button>
            </CardContent>
          </Card>

          {/* My Rewards */}
          <Card 
            className="hover:shadow-xl transition-all duration-200 transform hover:scale-105 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 cursor-pointer"
            onClick={() => setCurrentView('rewards')}
          >
            <CardContent className="p-6 text-center">
              <Award className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-amber-900 mb-2">My Rewards</h3>
              <div className="flex justify-center gap-4 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-amber-800">{currentProfile.badges.length}</p>
                  <p className="text-xs text-amber-600">Badges</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-amber-800">{currentProfile.wordsLearned}</p>
                  <p className="text-xs text-amber-600">Words</p>
                </div>
              </div>
              <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                View My Collection
              </Button>
            </CardContent>
          </Card>
        </div>

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

          {/* Learning Progress */}
          <Card className="hover:shadow-xl transition-all duration-200 transform hover:scale-105 border-indigo-200 bg-gradient-to-br from-indigo-50 to-blue-50">
            <CardContent className="p-6 text-center">
              <Star className="w-12 h-12 text-indigo-600 mx-auto mb-4 fill-indigo-400" />
              <h3 className="text-lg font-bold text-indigo-900 mb-2">Learning Progress</h3>
              <div className="flex justify-center gap-4 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-indigo-800">{currentProfile.storiesCompleted}</p>
                  <p className="text-xs text-indigo-600">Stories</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-indigo-800">3</p>
                  <p className="text-xs text-indigo-600">Streak</p>
                </div>
              </div>
              <Button 
                variant="outline"
                className="border-indigo-300 text-indigo-700 hover:bg-indigo-50 w-full"
                onClick={() => handleActivityTap('progress')}
              >
                View Details
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
                  <span className="text-4xl">{getAvatarEmoji(currentProfile.avatar)}</span>
                </div>
                {currentProfile.name}
              </DialogTitle>
              <DialogDescription className="text-center space-y-2">
                <p><strong>Age:</strong> {currentProfile.ageGroup}</p>
                <p><strong>Language:</strong> {getLanguageFlag(currentProfile.language)} {currentProfile.language.charAt(0).toUpperCase() + currentProfile.language.slice(1)}</p>
                <p><strong>Stars:</strong> ⭐ {currentProfile.stars}</p>
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
                className="w-full h-12 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
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
