
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Star, BookOpen, Gamepad2, Award, Mic, User, Lock, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();

  const mockStories = [
    { id: 1, title: 'The Lion and the Mouse', locked: false, completed: true, image: '🦁' },
    { id: 2, title: 'The Wise Elephant', locked: false, completed: false, image: '🐘' },
    { id: 3, title: 'The Dancing Butterfly', locked: true, completed: false, image: '🦋' },
  ];

  const mockGames = [
    { id: 1, title: 'Word Match', type: 'vocabulary', locked: false, image: '🎯' },
    { id: 2, title: 'Sentence Builder', type: 'grammar', locked: false, image: '🧩' },
    { id: 3, title: 'Sound Safari', type: 'pronunciation', locked: profile.plan === 'free', image: '🔊' },
  ];

  const handleActivityTap = (activity: string, locked: boolean) => {
    if (locked) {
      toast({
        title: "Oops! This isn't available right now",
        description: "Ask your parent to unlock it for you! 🙏",
      });
      return;
    }
    
    toast({
      title: `Opening ${activity}...`,
      description: "Loading your learning adventure! 🚀",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-amber-100 p-4">
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

        {/* Main Activity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Stories */}
          <Card className="hover:shadow-xl transition-all duration-200 transform hover:scale-105 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
            <CardHeader className="text-center pb-3">
              <CardTitle className="flex items-center justify-center gap-2 text-blue-900">
                <BookOpen className="w-6 h-6" />
                Read a Story
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockStories.slice(0, 2).map((story) => (
                <Button
                  key={story.id}
                  variant={story.locked ? "outline" : "default"}
                  className={`w-full h-16 text-left justify-start gap-3 ${
                    story.locked 
                      ? 'border-gray-300 text-gray-500 hover:bg-gray-50' 
                      : story.completed
                      ? 'bg-green-100 border-green-300 text-green-800 hover:bg-green-200'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                  onClick={() => handleActivityTap(`Story: ${story.title}`, story.locked)}
                  disabled={story.locked}
                >
                  <span className="text-2xl">{story.image}</span>
                  <div className="flex-1">
                    <p className="font-medium">{story.title}</p>
                    <p className="text-xs opacity-75">
                      {story.completed ? 'Completed ✅' : story.locked ? 'Locked 🔒' : 'Start reading'}
                    </p>
                  </div>
                  {story.locked && <Lock className="w-4 h-4" />}
                </Button>
              ))}
              <Button 
                variant="ghost" 
                className="w-full text-blue-600 hover:bg-blue-50"
                onClick={() => handleActivityTap('Story Library', false)}
              >
                See all stories →
              </Button>
            </CardContent>
          </Card>

          {/* Games */}
          <Card className="hover:shadow-xl transition-all duration-200 transform hover:scale-105 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
            <CardHeader className="text-center pb-3">
              <CardTitle className="flex items-center justify-center gap-2 text-purple-900">
                <Gamepad2 className="w-6 h-6" />
                Play a Game
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockGames.slice(0, 2).map((game) => (
                <Button
                  key={game.id}
                  variant={game.locked ? "outline" : "default"}
                  className={`w-full h-16 text-left justify-start gap-3 ${
                    game.locked 
                      ? 'border-gray-300 text-gray-500 hover:bg-gray-50' 
                      : 'bg-purple-500 hover:bg-purple-600 text-white'
                  }`}
                  onClick={() => handleActivityTap(`Game: ${game.title}`, game.locked)}
                  disabled={game.locked}
                >
                  <span className="text-2xl">{game.image}</span>
                  <div className="flex-1">
                    <p className="font-medium">{game.title}</p>
                    <p className="text-xs opacity-75">
                      {game.locked ? 'Ask parent to unlock' : 'Tap to play'}
                    </p>
                  </div>
                  {game.locked && <Lock className="w-4 h-4" />}
                </Button>
              ))}
              <Button 
                variant="ghost" 
                className="w-full text-purple-600 hover:bg-purple-50"
                onClick={() => handleActivityTap('Game Center', false)}
              >
                See all games →
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Activities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Practice Speaking */}
          <Card className="hover:shadow-xl transition-all duration-200 transform hover:scale-105 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-6 text-center">
              <Mic className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-green-900 mb-2">Practice Speaking</h3>
              <p className="text-green-700 mb-4">Learn new words and practice pronunciation</p>
              <Button 
                className="bg-green-500 hover:bg-green-600 text-white w-full"
                onClick={() => handleActivityTap('Vocabulary Practice', false)}
              >
                Start Practice Session
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
                onClick={() => handleActivityTap('Rewards', false)}
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
