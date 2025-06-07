
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Lock, Play, Gamepad2, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ContentCard } from './ContentCard';

interface GameCenterProps {
  profile: any;
  onBack: () => void;
  onGameStart?: (gameId: string, gameTitle: string, gameType: 'vocabulary' | 'story' | 'pronunciation' | 'sentence-builder') => void;
}

export const GameCenter = ({ profile, onBack, onGameStart }: GameCenterProps) => {
  const { toast } = useToast();
  const [downloadedContent] = useState(JSON.parse(localStorage.getItem('downloadedContent') || '[]'));
  const [currentGameIndex, setCurrentGameIndex] = useState(0);

  const storyBasedGames = [
    { id: 'sg1', title: 'Lion Story Game', linkedStory: 'The Lion and the Mouse', completed: true, locked: false, image: '🦁', type: 'story' as const },
    { id: 'sg2', title: 'Elephant Memory', linkedStory: 'The Wise Elephant', completed: false, locked: false, image: '🐘', type: 'story' as const },
    { id: 'sg3', title: 'Butterfly Dance', linkedStory: 'The Dancing Butterfly', completed: false, locked: false, image: '🦋', type: 'story' as const },
  ];

  const learningGames = [
    { id: 'lg1', title: 'Word Match Safari', type: 'vocabulary' as const, locked: false, image: '🎯', gameType: 'vocabulary' as const },
    { id: 'lg2', title: 'Sentence Builder', type: 'sentence-builder' as const, locked: profile.plan === 'free', image: '🧩', gameType: 'sentence-builder' as const },
    { id: 'lg3', title: 'Sound Explorer', type: 'pronunciation' as const, locked: false, image: '🔊', gameType: 'pronunciation' as const },
    { id: 'lg4', title: 'Animal Friends Quiz', type: 'vocabulary' as const, locked: false, image: '🦓', gameType: 'vocabulary' as const },
    { id: 'lg5', title: 'Color Learning Game', type: 'vocabulary' as const, locked: profile.plan === 'free', image: '🌈', gameType: 'vocabulary' as const },
  ];

  const allGames = [...storyBasedGames, ...learningGames];

  const handleGameTap = (gameId: string, locked: boolean, gameTitle?: string, gameType?: 'vocabulary' | 'story' | 'pronunciation' | 'sentence-builder') => {
    if (locked) {
      toast({
        title: "Oops! This game isn't available right now 🔒",
        description: "Ask your parent to unlock it for you!",
        action: (
          <Button 
            size="sm" 
            onClick={() => {
              toast({
                title: "Request Sent! 📨",
                description: "Your parent will get a notification about this game.",
              });
            }}
          >
            Ask My Parent
          </Button>
        ),
      });
      return;
    }

    // Find the game index for progression
    const gameIndex = allGames.findIndex(game => game.id === gameId);
    if (gameIndex !== -1) {
      setCurrentGameIndex(gameIndex);
    }

    if (onGameStart && gameTitle && gameType) {
      onGameStart(gameId, gameTitle, gameType);
    } else {
      toast({
        title: "Starting Game! 🎮",
        description: "Get ready for some fun learning!",
      });
    }
  };

  const handleNextGame = () => {
    const nextIndex = (currentGameIndex + 1) % allGames.length;
    const nextGame = allGames[nextIndex];
    
    if (!nextGame.locked) {
      setCurrentGameIndex(nextIndex);
      if (onGameStart) {
        onGameStart(nextGame.id, nextGame.title, nextGame.gameType || nextGame.type);
      }
      toast({
        title: "Next Game! 🎮",
        description: `Starting ${nextGame.title}`,
      });
    } else {
      toast({
        title: "Game Locked 🔒",
        description: "Ask your parent to unlock more games!",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-purple-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="p-2 hover:bg-white/70 rounded-full"
          >
            <ArrowLeft className="w-6 h-6 text-purple-700" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-purple-900 flex items-center gap-3">
              <Gamepad2 className="w-8 h-8" />
              Game Center
            </h1>
            <p className="text-purple-700">Choose a fun game to play!</p>
          </div>
        </div>

        {/* Story-Based Games */}
        <Card className="mb-6 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardHeader className="text-center pb-3">
            <CardTitle className="flex items-center justify-center gap-2 text-blue-900">
              <BookOpen className="w-6 h-6" />
              From Your Stories
            </CardTitle>
            <p className="text-sm text-blue-700">Games unlocked by completing stories</p>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {storyBasedGames.map((game) => (
              <Card 
                key={game.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  !game.locked ? 'hover:scale-105 border-green-200' : 'opacity-75 border-gray-200'
                }`}
                onClick={() => handleGameTap(game.id, game.locked, game.title, game.type)}
              >
                <CardHeader className="text-center pb-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-3xl">{game.image}</span>
                  </div>
                  <CardTitle className={`text-lg ${!game.locked ? 'text-blue-900' : 'text-gray-600'}`}>
                    {game.title}
                  </CardTitle>
                  <p className="text-sm text-blue-600">From: {game.linkedStory}</p>
                </CardHeader>
                <CardContent className="text-center p-4">
                  {game.locked ? (
                    <div className="space-y-2">
                      <Badge variant="outline" className="border-gray-400 text-gray-600">
                        <Lock className="w-3 h-3 mr-1" />
                        Story Required
                      </Badge>
                      <p className="text-xs text-gray-500">Finish the story to unlock!</p>
                    </div>
                  ) : (
                    <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                      <Play className="w-4 h-4 mr-2" />
                      Play Game
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Learning Games */}
        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
          <CardHeader className="text-center pb-3">
            <CardTitle className="flex items-center justify-center gap-2 text-purple-900">
              <Gamepad2 className="w-6 h-6" />
              Learning Games
            </CardTitle>
            <p className="text-sm text-purple-700">Practice vocabulary, grammar, and pronunciation</p>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {learningGames.map((game) => (
              <div key={game.id} onClick={() => handleGameTap(game.id, game.locked, game.title, game.gameType)}>
                <ContentCard
                  id={game.id}
                  title={game.title}
                  type="game"
                  image={game.image}
                  locked={game.locked}
                  downloaded={downloadedContent.includes(game.id)}
                  onTap={() => {}} // handled by parent div
                  plan={profile.plan}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
