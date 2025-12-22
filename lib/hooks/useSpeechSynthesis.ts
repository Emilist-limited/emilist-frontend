import { useCallback, useRef, useState, useEffect } from "react";

interface UseSpeechSynthesisOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  voice?: SpeechSynthesisVoice | null;
}

interface UseSpeechSynthesisReturn {
  isSupported: boolean;
  isSpeaking: boolean;
  voices: SpeechSynthesisVoice[];
  speak: (text: string, onEnd?: () => void) => void;
  cancel: () => void;
}

export function useSpeechSynthesis(
  options: UseSpeechSynthesisOptions = {}
): UseSpeechSynthesisReturn {
  const { rate = 0.9, pitch = 1, volume = 1, voice = null } = options;

  const [isSupported, setIsSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Initialize and load voices
  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("speechSynthesis" in window) {
      setIsSupported(true);
      synthRef.current = window.speechSynthesis;

      const loadVoices = () => {
        const availableVoices = synthRef.current?.getVoices() || [];
        setVoices(availableVoices);
      };

      loadVoices();
      if (synthRef.current) {
        synthRef.current.addEventListener("voiceschanged", loadVoices);
      }

      return () => {
        if (synthRef.current) {
          synthRef.current.removeEventListener("voiceschanged", loadVoices);
        }
      };
    }
  }, []);

  const speak = useCallback(
    (text: string, onEnd?: () => void) => {
      if (!synthRef.current || !text) return;

      // Cancel any ongoing speech
      synthRef.current.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = volume;

      if (voice) {
        utterance.voice = voice;
      }

      const handleStart = () => setIsSpeaking(true);
      const handleEnd = () => {
        setIsSpeaking(false);
        onEnd?.();
      };
      const handleError = () => {
        setIsSpeaking(false);
        onEnd?.();
      };

      utterance.addEventListener("start", handleStart);
      utterance.addEventListener("end", handleEnd);
      utterance.addEventListener("error", handleError);

      synthRef.current.speak(utterance);
    },
    [rate, pitch, volume, voice]
  );

  const cancel = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  }, []);

  return {
    isSupported,
    isSpeaking,
    voices,
    speak,
    cancel,
  };
}
