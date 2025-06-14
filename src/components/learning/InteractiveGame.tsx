
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Star, Trophy, Mic, Volume2, RefreshCw, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface InteractiveGameProps {
  gameId: string;
  gameTitle: string;
  gameType: 'vocabulary' | 'story' | 'pronunciation' | 'sentence-builder';
  onBack: () => void;
  onComplete: (stars: number) => void;
  onNextGame?: () => void;
}

export const InteractiveGame = ({ gameId, gameTitle, gameType, onBack, onComplete, onNextGame }: InteractiveGameProps) => {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const { toast } = useToast();

  const vocabularyWords = [
    { word: 'Lion', hausa: 'Zaki', image: '🦁' },
    { word: 'Water', hausa: 'Ruwa', image: '💧' },
    { word: 'Tree', hausa: 'Bishiya', image: '🌳' },
    { word: 'House', hausa: 'Gida', image: '🏠' },
  ];

  // Different stories based on gameId
  const getStoryContent = (gameId: string) => {
    switch (gameId) {
      case 'story-lion':
        return [
          { text: "Once upon a time, there was a brave lion.", hausa: "Da zamanin da, akwai wani zakimai." },
          { text: "The lion lived in a big forest.", hausa: "Zakin yana zaune a babban daji." },
          { text: "Every day, he helped other animals.", hausa: "Kullum yana taimaka wa sauran dabbobi." },
          { text: "The animals loved their kind lion king.", hausa: "Dabbobi sun so sarkinsu zakimai." },
        ];
      case 'story-elephant':
        return [
          { text: "In the heart of Africa lived a wise old elephant.", hausa: "A tsakiyar Afirka akwai wani tsohon giwa mai hikima." },
          { text: "The elephant remembered where water could be found during dry seasons.", hausa: "Giwan yana tunawa da inda za'a sami ruwa a lokacin rani." },
          { text: "All the animals came to him for advice and guidance.", hausa: "Dukan dabbobi suna zuwa gare shi don neman shawara da jagora." },
          { text: "His wisdom saved the forest community many times.", hausa: "Hikimensa ya ceci al'ummar daji sau da yawa." },
        ];
      case 'story-butterfly':
        return [
          { text: "A beautiful butterfly lived in a colorful garden.", hausa: "Kyakkyawar malam buɗe ido tana zaune a lambu mai launi." },
          { text: "She danced from flower to flower every morning.", hausa: "Kowace safiya tana rawa daga fure zuwa fure." },
          { text: "The other insects watched her graceful movements.", hausa: "Sauran kwari suna kallon motsin ta na kyau." },
          { text: "She taught them that beauty comes from being kind.", hausa: "Ta koya musu cewa kyau yana fitowa daga yin alheri." },
        ];
      default:
        return [
          { text: "Once upon a time, there was a brave lion.", hausa: "Da zamanin da, akwai wani zakimai." },
          { text: "The lion lived in a big forest.", hausa: "Zakin yana zaune a babban daji." },
          { text: "Every day, he helped other animals.", hausa: "Kullum yana taimaka wa sauran dabbobi." },
          { text: "The animals loved their kind lion king.", hausa: "Dabbobi sun so sarkinsu zakimai." },
        ];
    }
  };

  const storyContent = getStoryContent(gameId);

  const handleAnswerSelect = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 10);
      toast({
        title: "Correct! 🎉",
        description: "You earned 10 points!",
      });
    } else {
      toast({
        title: "Try again! 💪",
        description: "You can do better!",
      });
    }

    if (currentQuestion < vocabularyWords.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeGame();
    }
  };

  const handlePronunciationPractice = () => {
    setIsListening(true);
    
    // Simulate speech recognition
    setTimeout(() => {
      setIsListening(false);
      const accuracy = Math.random() > 0.3 ? 'good' : 'try-again';
      
      if (accuracy === 'good') {
        setScore(score + 15);
        toast({
          title: "Great pronunciation! 🎤",
          description: "You earned 15 points!",
        });
        
        // Auto-progress to next word after successful pronunciation
        if (currentQuestion < vocabularyWords.length - 1) {
          setTimeout(() => setCurrentQuestion(currentQuestion + 1), 1500);
        } else {
          setTimeout(() => completeGame(), 1500);
        }
      } else {
        toast({
          title: "Good try! 🔄",
          description: "Listen again and try to match the sound",
        });
      }
    }, 2000);
  };

  const playAudio = (text: string) => {
    toast({
      title: "Playing audio... 🔊",
      description: `"${text}"`,
    });
  };

  const completeGame = () => {
    setGameCompleted(true);
    const starsEarned = Math.floor(score / 20);
    onComplete(starsEarned);
    
    toast({
      title: "Game Complete! 🏆",
      description: `You earned ${starsEarned} stars!`,
    });
  };

  const resetGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setGameCompleted(false);
  };

  const handleNextGame = () => {
    if (onNextGame) {
      onNextGame();
    } else {
      onBack();
    }
  };

  if (gameCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-green-100 p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader className="text-center">
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <CardTitle className="text-2xl text-green-900">Congratulations!</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-lg text-green-700">You completed {gameTitle}!</p>
              <div className="flex justify-center gap-4">
                <Badge variant="outline" className="border-yellow-300 text-yellow-700 px-4 py-2">
                  <Star className="w-4 h-4 mr-1 fill-yellow-400" />
                  {Math.floor(score / 20)} Stars Earned
                </Badge>
                <Badge variant="outline" className="border-green-300 text-green-700 px-4 py-2">
                  {score} Points
                </Badge>
              </div>
              <div className="flex gap-3 justify-center">
                <Button onClick={resetGame} variant="outline" className="border-green-300 text-green-700">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Play Again
                </Button>
                {onNextGame && (
                  <Button onClick={handleNextGame} className="bg-blue-500 hover:bg-blue-600">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Next Game
                  </Button>
                )}
                <Button onClick={onBack} className="bg-green-500 hover:bg-green-600">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Games
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-purple-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="p-2 hover:bg-white/70 rounded-full"
          >
            <ArrowLeft className="w-6 h-6 text-purple-700" />
          </Button>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-purple-900">{gameTitle}</h1>
            <p className="text-purple-700">Score: {score} points</p>
          </div>
          <div className="w-10"></div>
        </div>

        {/* Game Content */}
        {gameType === 'vocabulary' && (
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
            <CardHeader className="text-center">
              <CardTitle className="text-blue-900">Match the Word!</CardTitle>
              <p className="text-blue-700">Question {currentQuestion + 1} of {vocabularyWords.length}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-6xl mb-4">{vocabularyWords[currentQuestion].image}</div>
                <p className="text-xl font-bold text-blue-900 mb-2">{vocabularyWords[currentQuestion].word}</p>
                <Button
                  variant="outline"
                  onClick={() => playAudio(vocabularyWords[currentQuestion].hausa)}
                  className="border-blue-300 text-blue-700"
                >
                  <Volume2 className="w-4 h-4 mr-2" />
                  Listen in Hausa
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => handleAnswerSelect(true)}
                  className="h-16 bg-green-500 hover:bg-green-600 text-white"
                >
                  {vocabularyWords[currentQuestion].hausa}
                </Button>
                <Button
                  onClick={() => handleAnswerSelect(false)}
                  className="h-16 bg-red-500 hover:bg-red-600 text-white"
                >
                  Wrong Answer
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {gameType === 'story' && (
          <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
            <CardHeader className="text-center">
              <CardTitle className="text-orange-900">Interactive Story</CardTitle>
              <p className="text-orange-700">Part {currentQuestion + 1} of {storyContent.length}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="text-6xl mb-4">📖</div>
                <p className="text-lg text-orange-900">{storyContent[currentQuestion].text}</p>
                <p className="text-md text-orange-700 italic">{storyContent[currentQuestion].hausa}</p>
                
                <div className="flex gap-3 justify-center">
                  <Button
                    variant="outline"
                    onClick={() => playAudio(storyContent[currentQuestion].text)}
                    className="border-orange-300 text-orange-700"
                  >
                    <Volume2 className="w-4 h-4 mr-2" />
                    Listen in English
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => playAudio(storyContent[currentQuestion].hausa)}
                    className="border-orange-300 text-orange-700"
                  >
                    <Volume2 className="w-4 h-4 mr-2" />
                    Listen in Hausa
                  </Button>
                </div>
                
                <Button
                  onClick={() => handleAnswerSelect(true)}
                  className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Continue Story
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {gameType === 'pronunciation' && (
          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader className="text-center">
              <CardTitle className="text-green-900">Practice Speaking</CardTitle>
              <p className="text-green-700">Say the word: {vocabularyWords[currentQuestion].hausa}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="text-6xl mb-4">{vocabularyWords[currentQuestion].image}</div>
                <p className="text-2xl font-bold text-green-900">{vocabularyWords[currentQuestion].hausa}</p>
                
                <Button
                  variant="outline"
                  onClick={() => playAudio(vocabularyWords[currentQuestion].hausa)}
                  className="border-green-300 text-green-700"
                >
                  <Volume2 className="w-4 h-4 mr-2" />
                  Listen First
                </Button>
                
                <Button
                  onClick={handlePronunciationPractice}
                  disabled={isListening}
                  className={`w-32 h-32 rounded-full text-white ${
                    isListening 
                      ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                      : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  <Mic className="w-8 h-8" />
                </Button>
                
                <p className="text-sm text-green-600">
                  {isListening ? 'Listening... speak now!' : 'Tap the microphone and say the word'}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
