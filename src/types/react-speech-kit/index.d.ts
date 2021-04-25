declare module "react-speech-kit" {
  export function useSpeechSynthesis(props?: {}): {
    supported: boolean;
    speak: (args?: {
      text: string;
      voice?: SpeechSynthesisVoice;
      rate?: number;
      pitch?: number;
      volume?: number;
    }) => void;
    speaking: boolean;
    cancel: () => void;
    voices: SpeechSynthesisVoice[];
  };

  export function useSpeechRecognition(props?: {}): {
    listen: (args: any) => never;
    listening: boolean;
    stop: (args: any) => never;
    supported: boolean;
  };
}
