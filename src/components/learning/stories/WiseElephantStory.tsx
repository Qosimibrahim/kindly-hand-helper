
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface WiseElephantStoryProps {
  onBack: () => void;
}

export const WiseElephantStory = ({ onBack }: WiseElephantStoryProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'english' | 'local'>('english');

  const story = {
    english: {
      title: "The Wise Elephant",
      content: `In a vast African savanna, there lived a wise old elephant named Kesi. Kesi was known throughout the land for her incredible memory and gentle wisdom.

One dry season, when water became scarce, all the animals came to Kesi for help. "Where can we find water?" they asked desperately.

Kesi closed her eyes and remembered. Long ago, her grandmother had shown her a hidden spring deep in the rocky hills. "Follow me," she said kindly.

She led all the animals - zebras, gazelles, lions, and birds - through the thorny bushes and over the rocky terrain to the secret spring. The water was crystal clear and cool.

"Thank you, wise Kesi!" all the animals cheered. From that day on, whenever there was trouble, the animals knew they could count on Kesi's wisdom and big heart.

The wise elephant had taught them that memory and kindness are the greatest treasures of all.`
    },
    local: {
      title: "Erin Ologbon (The Wise Elephant)",
      content: `Ni agbegbe African kan, erin ologbon kan wa ti a n pe ni Kesi. Gbogbo eniyan mo Kesi fun iranti rẹ ati ọgbọn rẹ.

Ni akoko gbigbe kan, nigbati omi di to sare, gbogbo awọn ẹranko wa si ọdọ Kesi fun iranlọwọ. "Nibo ni a le ri omi?" wọn beere.

Kesi pa oju rẹ, o si ranti. Ni ọjọ atijọ, iya-nla rẹ ti fi orisun omi kan han ni ori oke. "Ẹ tẹle mi," o sọ.

O dari gbogbo awọn ẹranko - zebra, gazelle, kiniun, ati awọn ẹiyẹ - kọja ẹgun ati paapaa to de orisun omi naa. Omi naa dara o si tutu.

"O se, Kesi ologbon!" gbogbo awọn ẹranko yo. Lati ọjọ naa lọ, igbakugba ti wahala ba wa, awọn ẹranko mọ pe wọn le gbekele ọgbọn Kesi.

Erin ologbon naa ti kọ wọn pe iranti ati inurere ni awọn ohun-ini to tobi julọ.`
    }
  };

  const handlePlayAudio = () => {
    setIsPlaying(!isPlaying);
    
    // Text-to-speech functionality
    if (!isPlaying) {
      const utterance = new SpeechSynthesisUtterance(story[currentLanguage].content);
      utterance.lang = currentLanguage === 'english' ? 'en-US' : 'yo-NG'; // Yoruba
      utterance.rate = 0.8;
      utterance.pitch = 1;
      
      utterance.onend = () => {
        setIsPlaying(false);
      };
      
      speechSynthesis.speak(utterance);
    } else {
      speechSynthesis.cancel();
    }
  };

  const handleLanguageToggle = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
    setCurrentLanguage(currentLanguage === 'english' ? 'local' : 'english');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-emerald-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex items-center text-green-700 hover:text-green-800"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Stories
          </Button>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={handleLanguageToggle}
              className="border-green-300 text-green-700 hover:bg-green-50"
            >
              {currentLanguage === 'english' ? 'Listen in Yoruba' : 'Listen in English'}
            </Button>
            
            <Button
              onClick={handlePlayAudio}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {isPlaying ? (
                <>
                  <Pause className="mr-2 h-4 w-4" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Play Story
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Story Card */}
        <Card className="shadow-xl border-green-200">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="text-8xl mb-4">🐘</div>
              <h1 className="text-4xl font-bold text-green-800 mb-2">
                {story[currentLanguage].title}
              </h1>
              <div className="flex items-center justify-center space-x-2 text-green-600">
                <Volume2 className="h-5 w-5" />
                <span className="text-lg">
                  {currentLanguage === 'english' ? 'English Version' : 'Yoruba Version'}
                </span>
              </div>
            </div>

            <div className="prose prose-lg prose-green max-w-none">
              <div className="text-gray-700 leading-relaxed text-xl whitespace-pre-line">
                {story[currentLanguage].content}
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="flex justify-center space-x-4">
                <Button
                  variant="outline"
                  onClick={handlePlayAudio}
                  className="border-green-300 text-green-700 hover:bg-green-50"
                >
                  <Volume2 className="mr-2 h-4 w-4" />
                  {isPlaying ? 'Stop Reading' : 'Listen to Story'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
