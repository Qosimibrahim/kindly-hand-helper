
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, BookOpen, Gamepad2, Award, TrendingUp, Calendar } from 'lucide-react';

interface ProgressData {
  childName: string;
  totalStars: number;
  storiesCompleted: number;
  wordsLearned: number;
  gamesPlayed: number;
  badges: number;
  weeklyProgress: number;
  streakDays: number;
  lastActive: string;
}

interface ProgressTrackerProps {
  childProfiles: any[];
}

export const ProgressTracker = ({ childProfiles }: ProgressTrackerProps) => {
  // Mock progress data - in real app this would come from backend
  const progressData: ProgressData[] = childProfiles.map(profile => ({
    childName: profile.name,
    totalStars: profile.stars || 15,
    storiesCompleted: profile.storiesCompleted || 2,
    wordsLearned: profile.wordsLearned || 8,
    gamesPlayed: 5,
    badges: profile.badges?.length || 2,
    weeklyProgress: 75,
    streakDays: 3,
    lastActive: "2 hours ago"
  }));

  if (progressData.length === 0) {
    return (
      <Card className="border-orange-200">
        <CardContent className="p-6 text-center">
          <p className="text-orange-700">No child profiles yet. Add a child to see their progress!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-orange-900 flex items-center gap-2">
        <TrendingUp className="w-6 h-6" />
        Learning Progress
      </h2>
      
      {progressData.map((child, index) => (
        <Card key={index} className="border-orange-200 hover:shadow-lg transition-shadow">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
            <CardTitle className="flex items-center justify-between">
              <span className="text-orange-900">{child.childName}'s Progress</span>
              <Badge variant="outline" className="border-green-300 text-green-700">
                <Calendar className="w-3 h-3 mr-1" />
                {child.streakDays} day streak
              </Badge>
            </CardTitle>
            <p className="text-sm text-orange-600">Last active: {child.lastActive}</p>
          </CardHeader>
          <CardContent className="p-6">
            {/* Weekly Progress */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-orange-900">Weekly Learning Goal</span>
                <span className="text-sm text-orange-700">{child.weeklyProgress}%</span>
              </div>
              <Progress value={child.weeklyProgress} className="h-3" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Stars */}
              <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <Star className="w-8 h-8 text-yellow-600 fill-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-800">{child.totalStars}</div>
                <div className="text-xs text-yellow-700">Stars Earned</div>
              </div>

              {/* Stories */}
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-800">{child.storiesCompleted}</div>
                <div className="text-xs text-blue-700">Stories Read</div>
              </div>

              {/* Words */}
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-800">{child.wordsLearned}</div>
                <div className="text-xs text-green-700">Words Learned</div>
              </div>

              {/* Games */}
              <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                <Gamepad2 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-800">{child.gamesPlayed}</div>
                <div className="text-xs text-purple-700">Games Played</div>
              </div>
            </div>

            {/* Achievements Summary */}
            <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
              <h4 className="font-medium text-amber-900 mb-2">Recent Achievements</h4>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-amber-500 text-white">🏆 Story Master</Badge>
                <Badge className="bg-green-500 text-white">📖 First Reader</Badge>
                {child.badges > 2 && (
                  <Badge variant="outline" className="border-amber-300 text-amber-700">
                    +{child.badges - 2} more badges
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
