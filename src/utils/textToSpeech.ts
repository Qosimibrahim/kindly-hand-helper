
export class TextToSpeechService {
  private static instance: TextToSpeechService;
  private synthesis: SpeechSynthesis;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  private constructor() {
    this.synthesis = window.speechSynthesis;
  }

  static getInstance(): TextToSpeechService {
    if (!TextToSpeechService.instance) {
      TextToSpeechService.instance = new TextToSpeechService();
    }
    return TextToSpeechService.instance;
  }

  speak(text: string, language: 'english' | 'yoruba' | 'igbo' | 'hausa' | 'swahili' | 'kikongo' = 'english'): Promise<void> {
    return new Promise((resolve, reject) => {
      // Stop any current speech
      this.stop();

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set language codes
      const languageCodes = {
        english: 'en-US',
        yoruba: 'yo-NG',
        igbo: 'ig-NG',
        hausa: 'ha-NE',
        swahili: 'sw-KE',
        kikongo: 'kg-AO'
      };

      utterance.lang = languageCodes[language] || 'en-US';
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onend = () => {
        this.currentUtterance = null;
        resolve();
      };

      utterance.onerror = (event) => {
        this.currentUtterance = null;
        reject(event.error);
      };

      this.currentUtterance = utterance;
      this.synthesis.speak(utterance);
    });
  }

  stop(): void {
    if (this.synthesis.speaking) {
      this.synthesis.cancel();
    }
    this.currentUtterance = null;
  }

  isSpeaking(): boolean {
    return this.synthesis.speaking;
  }

  pause(): void {
    if (this.synthesis.speaking) {
      this.synthesis.pause();
    }
  }

  resume(): void {
    if (this.synthesis.paused) {
      this.synthesis.resume();
    }
  }
}

export const ttsService = TextToSpeechService.getInstance();
