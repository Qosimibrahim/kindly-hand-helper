
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Star, Award, Lock, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RewardsScreenProps {
  profile: any;
  onBack: () => void;
}

export const RewardsScreen = ({ profile, onBack }: RewardsScreenProps) => {
  const { toast } = useToast();

  const badges = [
    { id: 'first-story', name: 'First Story', description: 'Read your first story', unlocked: true, icon: '📖' },
    { id: 'word-master', name: 'Word Master', description: 'Learned 10 words', unlocked: true, icon: '🎓' },
    { id: 'streak-7', name: '7-Day Streak', description: 'Learn for 7 days in a row', unlocked: false, icon: '🔥' },
    { id: 'pronunciation-pro', name: 'Pronunciation Pro', description: 'Perfect pronunciation 10 times', unlocked: false, icon: '🎤' },
    { id: 'game-champion', name: 'Game Champion', description: 'Win 5 games in a row', unlocked: false, icon: '🏆' },
    { id: 'explorer', name: 'Explorer', description: 'Complete 5 different stories', unlocked: false, icon: '🗺️' },
  ];

  const avatarItems = [
    { id: 'hat1', name: 'Safari Hat', cost: 20, unlocked: true, category: 'hats', icon: '🎩' },
    { id: 'hat2', name: 'Crown', cost: 50, unlocked: false, category: 'hats', icon: '👑' },
    { id: 'acc1', name: 'Magic Glasses', cost: 30, unlocked: false, category: 'accessories', icon: '🤓' },
    { id: 'acc2', name: 'Superhero Cape', cost: 40, unlocked: false, category: 'accessories', icon: '🦸' },
    { id: 'bg1', name: 'Forest Background', cost: 25, unlocked: true, category: 'backgrounds', icon: '🌳' },
    { id: 'bg2', name: 'Space Background', cost: 60, unlocked: false, category: 'backgrounds', icon: '🚀' },
  ];

  const handleUnlockRequest = (itemName: string) => {
    toast({
      title: "Ask your parent to unlock this item 🔒",
      description: `${itemName} requires parent approval`,
      action: (
        <Button 
          size="sm" 
          onClick={() => {
            toast({
              title: "Request Sent! 📨",
              description: "Your parent will get a notification.",
            });
          }}
        >
          Ask My Parent
        </Button>
      ),
    });
  };

  const nextStarGoal = Math.ceil(profile.stars / 10) * 10;
  const progressToNext = ((profile.stars % 10) / 10) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="p-2 hover:bg-white/70 rounded-full"
          >
            <ArrowLeft className="w-6 h-6 text-amber-700" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-amber-900 flex items-center gap-3">
              <Award className="w-8 h-8" />
              My Rewards
            </h1>
            <p className="text-amber-700">Your amazing achievements!</p>
          </div>
        </div>

        {/* Stars Progress */}
        <Card className="mb-6 bg-gradient-to-r from-yellow-200 to-amber-200 border-yellow-300">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <Star className="w-12 h-12 text-yellow-600 fill-yellow-400 mx-auto mb-2" />
              <h2 className="text-2xl font-bold text-yellow-800">{profile.stars} Stars</h2>
              <p className="text-yellow-700">{nextStarGoal - profile.stars} more to unlock new rewards!</p>
            </div>
            <div className="w-full bg-white/50 rounded-full h-4 overflow-hidden">
              <div 
                className="h-full bg-yellow-500 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                style={{ width: `${progressToNext}%` }}
              >
                {progressToNext > 20 && <Sparkles className="w-3 h-3 text-white animate-pulse" />}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Badges Collection */}
        <Card className="mb-6 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <Award className="w-6 h-6" />
              Badge Collection ({badges.filter(b => b.unlocked).length}/{badges.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {badges.map((badge) => (
              <Card 
                key={badge.id}
                className={`text-center p-4 transition-all duration-200 ${
                  badge.unlocked 
                    ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:scale-105' 
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
              >
                <div className="text-4xl mb-2">{badge.icon}</div>
                <h3 className={`font-bold ${badge.unlocked ? 'text-green-900' : 'text-gray-600'}`}>
                  {badge.name}
                </h3>
                <p className={`text-sm ${badge.unlocked ? 'text-green-700' : 'text-gray-500'}`}>
                  {badge.description}
                </p>
                {!badge.unlocked && (
                  <Lock className="w-4 h-4 text-gray-400 mx-auto mt-2" />
                )}
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Avatar Items */}
        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-900">
              <Sparkles className="w-6 h-6" />
              Avatar Items ({avatarItems.filter(item => item.unlocked).length}/{avatarItems.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {avatarItems.map((item) => (
              <Card 
                key={item.id}
                className={`text-center p-4 transition-all duration-200 cursor-pointer ${
                  item.unlocked 
                    ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:scale-105' 
                    : 'bg-gray-50 border-gray-200'
                }`}
                onClick={() => !item.unlocked && handleUnlockRequest(item.name)}
              >
                <div className="text-4xl mb-2">{item.icon}</div>
                <h3 className={`font-bold ${item.unlocked ? 'text-purple-900' : 'text-gray-600'}`}>
                  {item.name}
                </h3>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-400" />
                  <span className={`text-sm ${item.unlocked ? 'text-purple-700' : 'text-gray-500'}`}>
                    {item.cost}
                  </span>
                </div>
                {item.unlocked ? (
                  <Badge className="mt-2 bg-green-500 text-white">Unlocked</Badge>
                ) : profile.stars >= item.cost ? (
                  <Button 
                    size="sm" 
                    className="mt-2 w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (profile.plan === 'free' && item.cost > 30) {
                        handleUnlockRequest(item.name);
                      } else {
                        toast({
                          title: "Item Unlocked! 🎉",
                          description: `You got the ${item.name}!`,
                        });
                      }
                    }}
                  >
                    Unlock
                  </Button>
                ) : (
                  <Badge variant="outline" className="mt-2 border-gray-400 text-gray-600">
                    <Lock className="w-3 h-3 mr-1" />
                    {item.cost - profile.stars} more stars
                  </Badge>
                )}
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
