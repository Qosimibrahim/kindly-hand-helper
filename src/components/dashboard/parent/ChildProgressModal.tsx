
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, BookOpen, Gamepad2, Award, TrendingUp, Calendar, Trophy } from 'lucide-react';

interface ChildProfile {
  id: string;
  name: string;
  ageGroup: string;
  avatar: string;
  language: string;
  stars?: number;
  badges?: string[];
  wordsLearned?: number;
  storiesCompleted?: number;
}

interface ChildProgressModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  childProfile: ChildProfile | null;
}

const getAvatarEmoji = (avatarId: string) => {
  const avatars: { [key: string]: string } = {
    'avatar1': '🦁',
    'avatar2': '🐸',
    'avatar3': '🦄',
    'avatar4': '🐼',
    'avatar5': '🦋',
    'avatar6': '🐙',
    'avatar7': '🦒',
    'avatar8': '🐘',
    'avatar9': '🦓',
  };
  return avatars[avatarId] || '🦁';
};

export const ChildProgressModal = ({ open, onOpenChange, childProfile }: ChildProgressModalProps) => {
  if (!childProfile) return null;

  const progressData = {
    totalStars: childProfile.stars || 25,
    storiesCompleted: childProfile.storiesCompleted || 4,
    wordsLearned: childProfile.wordsLearned || 15,
    gamesPlayed: 8,
    badges: 3,
    weeklyProgress: 85,
    streakDays: 5,
    lastActive: "1 hour ago",
    level: 3,
    nextLevelProgress: 75
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <span className="text-4xl">{getAvatarEmoji(childProfile.avatar)}</span>
            {childProfile.name}'s Learning Progress
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="text-center bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
              <CardContent className="p-6">
                <Trophy className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-yellow-800 mb-1">Level {progressData.level}</div>
                <div className="text-sm text-yellow-700">Learning Champion</div>
                <div className="mt-3">
                  <Progress value={progressData.nextLevelProgress} className="h-2" />
                  <div className="text-xs text-yellow-600 mt-1">{progressData.nextLevelProgress}% to Level 4</div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-6">
                <Calendar className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-green-800 mb-1">{progressData.streakDays}</div>
                <div className="text-sm text-green-700">Day Streak</div>
                <Badge variant="outline" className="mt-2 border-green-300 text-green-700">
                  Last active: {progressData.lastActive}
                </Badge>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
              <CardContent className="p-6">
                <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-purple-800 mb-1">{progressData.weeklyProgress}%</div>
                <div className="text-sm text-purple-700">Weekly Goal</div>
                <Progress value={progressData.weeklyProgress} className="mt-3 h-2" />
              </CardContent>
            </Card>
          </div>

          {/* Detailed Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-500" />
                Learning Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {/* Stars */}
                <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <Star className="w-10 h-10 text-yellow-600 fill-yellow-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-yellow-800">{progressData.totalStars}</div>
                  <div className="text-sm text-yellow-700">Stars Earned</div>
                </div>

                {/* Stories */}
                <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <BookOpen className="w-10 h-10 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-800">{progressData.storiesCompleted}</div>
                  <div className="text-sm text-blue-700">Stories Read</div>
                </div>

                {/* Words */}
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <Award className="w-10 h-10 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-800">{progressData.wordsLearned}</div>
                  <div className="text-sm text-green-700">Words Learned</div>
                </div>

                {/* Games */}
                <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <Gamepad2 className="w-10 h-10 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-800">{progressData.gamesPlayed}</div>
                  <div className="text-sm text-purple-700">Games Played</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-orange-500" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="text-2xl">🏆</div>
                  <div>
                    <div className="font-semibold text-yellow-800">Story Master</div>
                    <div className="text-sm text-yellow-700">Completed 5 stories in {childProfile.language}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-2xl">📖</div>
                  <div>
                    <div className="font-semibold text-green-800">Word Collector</div>
                    <div className="text-sm text-green-700">Learned 15 new words this week</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-2xl">⭐</div>
                  <div>
                    <div className="font-semibold text-blue-800">Daily Learner</div>
                    <div className="text-sm text-blue-700">5-day learning streak</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Language Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 capitalize">
                <span className="text-2xl">🇳🇬</span>
                {childProfile.language} Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Vocabulary</span>
                    <span className="text-sm text-gray-600">15/20 words</span>
                  </div>
                  <Progress value={75} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Pronunciation</span>
                    <span className="text-sm text-gray-600">12/15 sounds</span>
                  </div>
                  <Progress value={80} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Listening</span>
                    <span className="text-sm text-gray-600">8/10 exercises</span>
                  </div>
                  <Progress value={80} className="h-3" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
