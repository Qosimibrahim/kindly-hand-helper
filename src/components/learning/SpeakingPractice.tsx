
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Mic, Volume2, Star, BookOpen, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SpeakingPracticeProps {
  profile: any;
  onBack: () => void;
}

interface DailyWord {
  id: string;
  word: string;
  translation: string;
  pronunciation: string;
  sentence: string;
  sentenceTranslation: string;
  image: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const dailyWords: DailyWord[] = [
  {
    id: 'day1',
    word: 'Zaki',
    translation: 'Lion',
    pronunciation: 'ZAH-kee',
    sentence: 'Zaki yana zaune a daji.',
    sentenceTranslation: 'The lion lives in the forest.',
    image: '🦁',
    difficulty: 'easy'
  },
  {
    id: 'day2',
    word: 'Ruwa',
    translation: 'Water',
    pronunciation: 'ROO-wah',
    sentence: 'Ina bukatan ruwa.',
    sentenceTranslation: 'I need water.',
    image: '💧',
    difficulty: 'easy'
  },
  {
    id: 'day3',
    word: 'Gida',
    translation: 'House',
    pronunciation: 'GEE-dah',
    sentence: 'Gidana yana da kyau.',
    sentenceTranslation: 'My house is beautiful.',
    image: '🏠',
    difficulty: 'easy'
  },
  {
    id: 'day4',
    word: 'Abinci',
    translation: 'Food',
    pronunciation: 'ah-BIN-chee',
    sentence: 'Abinci yana da dadi.',
    sentenceTranslation: 'The food is delicious.',
    image: '🍽️',
    difficulty: 'medium'
  },
  {
    id: 'day5',
    word: 'Makaranta',
    translation: 'School',
    pronunciation: 'mah-kah-RAN-tah',
    sentence: 'Zan je makaranta gobe.',
    sentenceTranslation: 'I will go to school tomorrow.',
    image: '🏫',
    difficulty: 'medium'
  }
];

export const SpeakingPractice = ({ profile, onBack }: SpeakingPracticeProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [practiceMode, setPracticeMode] = useState<'word' | 'sentence'>('word');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const { toast } = useToast();

  const currentWord = dailyWords[currentWordIndex];

  useEffect(() => {
    // Get today's word based on date
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    const wordIndex = (dayOfYear - 1) % dailyWords.length;
    setCurrentWordIndex(wordIndex);
  }, []);

  const playAudio = (text: string, isHausa: boolean = true) => {
    // Create audio feedback
    const utterance = new SpeechSynthesisUtterance(text);
    
    if (isHausa) {
      // Set voice to a more appropriate accent if available
      const voices = speechSynthesis.getVoices();
      const hausaVoice = voices.find(voice => voice.lang.includes('ha')) || voices[0];
      utterance.voice = hausaVoice;
      utterance.rate = 0.8; // Slower for learning
    }
    
    speechSynthesis.speak(utterance);
    
    toast({
      title: "🔊 Playing audio",
      description: `"${text}"`,
    });
  };

  const handleSpeechPractice = () => {
    setIsListening(true);
    setAttempts(attempts + 1);

    // Simulate speech recognition
    setTimeout(() => {
      setIsListening(false);
      const accuracy = Math.random() > 0.3 ? 'good' : 'try-again';
      
      if (accuracy === 'good') {
        const points = practiceMode === 'word' ? 10 : 15;
        setScore(score + points);
        
        toast({
          title: "Excellent! 🎉",
          description: `Great pronunciation! +${points} points`,
        });

        // Auto-progress after success
        if (practiceMode === 'word') {
          setTimeout(() => setPracticeMode('sentence'), 1500);
        } else {
          setTimeout(() => {
            if (currentWordIndex < dailyWords.length - 1) {
              setCurrentWordIndex(currentWordIndex + 1);
              setPracticeMode('word');
            } else {
              toast({
                title: "🏆 Practice Complete!",
                description: "You've mastered today's words!",
              });
            }
          }, 1500);
        }
      } else {
        toast({
          title: "Good try! 💪",
          description: "Listen carefully and try again",
        });
      }
    }, 2000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'hard': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-green-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="p-2 hover:bg-white/70 rounded-full"
          >
            <ArrowLeft className="w-6 h-6 text-green-700" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-green-900 flex items-center gap-3">
              <Mic className="w-8 h-8" />
              Speaking Practice
            </h1>
            <p className="text-green-700">Daily word: {currentWordIndex + 1} of {dailyWords.length}</p>
          </div>
        </div>

        {/* Score Display */}
        <Card className="mb-6 bg-gradient-to-r from-yellow-200 to-amber-200 border-yellow-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Star className="w-8 h-8 text-yellow-600 fill-yellow-400" />
                <div>
                  <p className="text-xl font-bold text-yellow-800">Score: {score}</p>
                  <p className="text-sm text-yellow-700">Attempts: {attempts}</p>
                </div>
              </div>
              <Badge className={getDifficultyColor(currentWord.difficulty)}>
                {currentWord.difficulty}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Word Practice */}
        <Card className="mb-6 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-green-900">
              <Target className="w-6 h-6" />
              Today's Word
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="text-8xl mb-4">{currentWord.image}</div>
            
            <div className="space-y-2">
              <h2 className="text-4xl font-bold text-green-900">{currentWord.word}</h2>
              <p className="text-2xl text-green-700">{currentWord.translation}</p>
              <p className="text-lg text-green-600 italic">Pronunciation: {currentWord.pronunciation}</p>
            </div>

            <div className="flex gap-4 justify-center">
              <Button
                variant="outline"
                onClick={() => playAudio(currentWord.word)}
                className="border-green-300 text-green-700"
              >
                <Volume2 className="w-4 h-4 mr-2" />
                Listen to Word
              </Button>
              <Button
                variant="outline"
                onClick={() => playAudio(currentWord.translation, false)}
                className="border-green-300 text-green-700"
              >
                <Volume2 className="w-4 h-4 mr-2" />
                Listen in English
              </Button>
            </div>

            {practiceMode === 'word' && (
              <div className="space-y-4">
                <p className="text-green-700">Practice saying: <strong>{currentWord.word}</strong></p>
                <Button
                  onClick={handleSpeechPractice}
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
                  {isListening ? 'Listening... speak now!' : 'Tap to practice pronunciation'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sentence Practice */}
        {practiceMode === 'sentence' && (
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-blue-900">
                <BookOpen className="w-6 h-6" />
                Practice in a Sentence
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="space-y-3">
                <p className="text-2xl font-bold text-blue-900">{currentWord.sentence}</p>
                <p className="text-lg text-blue-700 italic">{currentWord.sentenceTranslation}</p>
              </div>

              <div className="flex gap-4 justify-center">
                <Button
                  variant="outline"
                  onClick={() => playAudio(currentWord.sentence)}
                  className="border-blue-300 text-blue-700"
                >
                  <Volume2 className="w-4 h-4 mr-2" />
                  Listen to Sentence
                </Button>
                <Button
                  variant="outline"
                  onClick={() => playAudio(currentWord.sentenceTranslation, false)}
                  className="border-blue-300 text-blue-700"
                >
                  <Volume2 className="w-4 h-4 mr-2" />
                  Listen in English
                </Button>
              </div>

              <div className="space-y-4">
                <p className="text-blue-700">Now practice the full sentence:</p>
                <Button
                  onClick={handleSpeechPractice}
                  disabled={isListening}
                  className={`w-32 h-32 rounded-full text-white ${
                    isListening 
                      ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  <Mic className="w-8 h-8" />
                </Button>
                <p className="text-sm text-blue-600">
                  {isListening ? 'Listening... speak the sentence!' : 'Tap to practice sentence'}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex gap-4 justify-center mt-6">
          <Button
            variant="outline"
            onClick={() => setPracticeMode('word')}
            className={`${practiceMode === 'word' ? 'bg-green-100 border-green-400' : 'border-green-300'} text-green-700`}
          >
            Practice Word
          </Button>
          <Button
            variant="outline"
            onClick={() => setPracticeMode('sentence')}
            className={`${practiceMode === 'sentence' ? 'bg-blue-100 border-blue-400' : 'border-blue-300'} text-blue-700`}
          >
            Practice Sentence
          </Button>
        </div>
      </div>
    </div>
  );
};
