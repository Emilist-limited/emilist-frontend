import {
  useState,
  useEffect,
  useRef,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import { useRouter } from "next/navigation";

import { ROUTES } from "@/lib/constants/routes";
import { SearchCategory, VoiceState } from "@/types";

interface VoiceSearchProps {
  onSearchComplete?: (category: SearchCategory, query: string) => void;
  selectedCategory: SearchCategory | null;
  setSelectedCategory: (category: SearchCategory | null) => void;
  setError: Dispatch<SetStateAction<string>>;
  voiceState: VoiceState;
  setVoiceState: Dispatch<SetStateAction<VoiceState>>;
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  setTranscript: Dispatch<SetStateAction<string>>;
}

const VoiceSearch = ({
  onSearchComplete,
  selectedCategory,
  setSelectedCategory,
  setError,
  setVoiceState,
  setIsActive,
  voiceState,
  isActive,
  setTranscript,
}: VoiceSearchProps) => {
  const router = useRouter();

  // State management
  const [currentStep, setCurrentStep] = useState<"category" | "query">(
    "category"
  );
  const [micPermission, setMicPermission] = useState<PermissionState | null>(
    null
  );

  // Refs
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check microphone permission
  const checkMicPermission = useCallback(async (): Promise<boolean> => {
    try {
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError("Microphone access is not supported in your browser");
        return false;
      }

      // Check current permission state
      const permission = await navigator.permissions.query({
        name: "microphone" as PermissionName,
      });
      setMicPermission(permission.state);

      if (permission.state === "granted") {
        return true;
      } else if (permission.state === "denied") {
        setError(
          "Microphone permission is denied. Please enable it in your browser settings."
        );
        return false;
      } else {
        // Permission is 'prompt' - request access
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
          // Stop the stream immediately as we only needed permission
          stream.getTracks().forEach((track) => track.stop());
          setMicPermission("granted");
          return true;
        } catch (err) {
          console.error("Microphone permission denied:", err);
          setError("Microphone permission is required for voice search");
          setMicPermission("denied");
          return false;
        }
      }
    } catch (err) {
      console.error("Error checking microphone permission:", err);
      setError("Unable to check microphone permission");
      return false;
    }
  }, [setError]);

  // Initialize speech services
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if speech recognition is supported
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        setError("Voice recognition is not supported in your browser");
        return;
      }

      // Initialize Speech Recognition
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";

      // Initialize Speech Synthesis
      if (!window.speechSynthesis) {
        setError("Speech synthesis is not supported in your browser");
        return;
      }

      synthRef.current = window.speechSynthesis;

      // Mobile-specific initialization
      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        // Preload voices on mobile devices
        const loadVoices = () => {
          const voices = synthRef.current!.getVoices();
          console.log("Available voices:", voices.length);
        };

        if (synthRef.current!.getVoices().length === 0) {
          synthRef.current!.addEventListener("voiceschanged", loadVoices);
        } else {
          loadVoices();
        }
      }
    }
  }, [setError]);

  // Clear timeouts
  const clearTimeouts = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = null;
    }
  }, []);

  // Text-to-speech function
  const speak = useCallback(
    (text: string, onEnd?: () => void) => {
      if (!synthRef.current) {
        console.warn("Speech synthesis not available");
        onEnd?.();
        return;
      }

      // Cancel any ongoing speech
      synthRef.current.cancel();

      setVoiceState("speaking");

      // Wait a bit for cancel to complete
      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 1;

        // Set language explicitly
        utterance.lang = "en-US";

        let hasEnded = false;

        const handleEnd = () => {
          if (hasEnded) return;
          hasEnded = true;
          setVoiceState("idle");
          onEnd?.();
        };

        utterance.onend = handleEnd;
        utterance.onerror = (error) => {
          console.error("Speech synthesis error:", error);
          handleEnd();
        };

        // Fallback timeout for mobile devices (especially iOS)
        const fallbackTimeout = setTimeout(() => {
          if (!hasEnded) {
            console.warn("Speech synthesis timeout - forcing end");
            handleEnd();
          }
        }, Math.max(text.length * 100, 3000)); // Estimate based on text length, minimum 3 seconds

        utterance.onend = () => {
          clearTimeout(fallbackTimeout);
          handleEnd();
        };

        utterance.onerror = (error) => {
          console.error("Speech synthesis error:", error);
          clearTimeout(fallbackTimeout);
          handleEnd();
        };

        try {
          synthRef.current!.speak(utterance);

          // Additional mobile-specific handling
          if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
            // On mobile, sometimes we need to resume the context
            if (synthRef.current!.paused) {
              synthRef.current!.resume();
            }
          }
        } catch (error) {
          console.error("Error starting speech synthesis:", error);
          clearTimeout(fallbackTimeout);
          handleEnd();
        }
      }, 100);
    },
    [setVoiceState]
  );

  // Start listening function
  const startListening = useCallback(() => {
    if (!recognitionRef.current || voiceState === "speaking") return;

    setVoiceState("listening");
    setTranscript("");
    clearTimeouts();

    // Set 60-second timeout for user silence
    timeoutRef.current = setTimeout(() => {
      stopListening();
      speak(
        "I'm going offline since you didn't say anything. Please try again when you're ready.",
        () => {
          setIsActive(false);
          setCurrentStep("category");
          setSelectedCategory(null);
        }
      );
    }, 60000);

    recognitionRef.current.start();
  }, [
    voiceState,
    speak,
    clearTimeouts,
    setVoiceState,
    setTranscript,
    setIsActive,
    setCurrentStep,
    setSelectedCategory,
  ]);

  // Stop listening function
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setVoiceState("idle");
    clearTimeouts();
  }, [clearTimeouts, setVoiceState]);

  // Process speech result
  const processSpeechResult = useCallback(
    (text: string) => {
      const lowerText = text.toLowerCase().trim();

      if (currentStep === "category") {
        // Check for category keywords
        let detectedCategory: SearchCategory | null = null;

        if (lowerText.includes("job")) {
          detectedCategory = "jobs";
        } else if (lowerText.includes("expert")) {
          detectedCategory = "experts";
        } else if (lowerText.includes("material")) {
          detectedCategory = "materials";
        }

        if (detectedCategory) {
          setSelectedCategory(detectedCategory);
          setCurrentStep("query");

          const questions = {
            jobs: "What type of job are you looking for?",
            experts: "What kind of expert are you searching for?",
            materials: "What type of material do you need?",
          };

          speak(questions[detectedCategory], () => {
            startListening();
          });
        } else {
          // User didn't mention a valid category
          speak(
            "I don't understand. Would you like to search for jobs, experts, or materials?",
            () => {
              startListening();
            }
          );
        }
      } else if (currentStep === "query" && selectedCategory) {
        // Process the search query
        if (lowerText.length > 0) {
          setVoiceState("processing");
          speak("Searching...", () => {
            // Navigate to the appropriate page with search params
            const searchParams = new URLSearchParams({ q: lowerText });
            const route =
              selectedCategory === "jobs"
                ? ROUTES.FIND_JOB
                : selectedCategory === "experts"
                ? ROUTES.SEARCH_SERVICE
                : ROUTES.SEARCH_MATERIAL;
            router.push(`${route}?${searchParams.toString()}`);

            // Call callback if provided
            onSearchComplete?.(selectedCategory, lowerText);

            // Reset state
            setIsActive(false);
            setCurrentStep("category");
            setSelectedCategory(null);
            setTranscript("");
          });
        } else {
          speak(
            "I didn't catch that. Could you please repeat what you're looking for?",
            () => {
              startListening();
            }
          );
        }
      }
    },
    [
      currentStep,
      selectedCategory,
      speak,
      startListening,
      router,
      onSearchComplete,
      setSelectedCategory,
      setCurrentStep,
      setVoiceState,
      setIsActive,
      setTranscript,
    ]
  );

  // Setup speech recognition handlers
  useEffect(() => {
    if (!recognitionRef.current) return;

    const recognition = recognitionRef.current;

    recognition.onresult = (event) => {
      let finalTranscript = "";
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      setTranscript(finalTranscript + interimTranscript);

      // If we have final results, process them after 5 second delay
      if (finalTranscript.trim()) {
        clearTimeouts();
        silenceTimeoutRef.current = setTimeout(() => {
          stopListening();
          processSpeechResult(finalTranscript);
        }, 5000);
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setVoiceState("idle");
      clearTimeouts();

      if (event.error === "not-allowed") {
        setError(
          "Microphone permission is denied. Please enable it in your browser settings."
        );
        setMicPermission("denied");
      }
    };

    recognition.onend = () => {
      if (voiceState === "listening") {
        setVoiceState("idle");
      }
    };

    return () => {
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
    };
  }, [
    voiceState,
    processSpeechResult,
    stopListening,
    clearTimeouts,
    setVoiceState,
    setError,
  ]);

  // Handle mic click
  const handleMicClick = async () => {
    // First check if speech services are available
    if (!recognitionRef.current || !synthRef.current) {
      setError(
        "Voice recognition or speech synthesis is not supported in your browser"
      );
      return;
    }

    if (isActive) {
      // Stop current session
      stopListening();
      synthRef.current.cancel();
      setIsActive(false);
      setCurrentStep("category");
      setSelectedCategory(null);
      setTranscript("");
    } else {
      // Check microphone permission before starting
      const hasPermission = await checkMicPermission();

      if (!hasPermission) {
        return; // Error is already set in checkMicPermission
      }

      // Mobile-specific: Ensure speech synthesis is ready
      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        // Wait for voices to be loaded on mobile
        if (synthRef.current!.getVoices().length === 0) {
          await new Promise<void>((resolve) => {
            const checkVoices = () => {
              if (synthRef.current!.getVoices().length > 0) {
                resolve();
              } else {
                setTimeout(checkVoices, 100);
              }
            };
            checkVoices();
          });
        }
      }

      // Start new session only after permission is granted and voices are ready
      setIsActive(true);
      speak(
        "What would you like to search for today? Jobs, experts, or materials?",
        () => {
          startListening();
        }
      );
    }
  };

  // Listen for permission changes
  useEffect(() => {
    const handlePermissionChange = async () => {
      if (navigator.permissions) {
        try {
          const permission = await navigator.permissions.query({
            name: "microphone" as PermissionName,
          });
          setMicPermission(permission.state);

          permission.addEventListener("change", () => {
            setMicPermission(permission.state);
            if (permission.state === "denied" && isActive) {
              // Stop voice search if permission is revoked
              stopListening();
              synthRef.current?.cancel();
              setIsActive(false);
              setCurrentStep("category");
              setSelectedCategory(null);
              setTranscript("");
              setError("Microphone permission was revoked");
            }
          });
        } catch (err) {
          console.error("Error setting up permission listener:", err);
        }
      }
    };

    handlePermissionChange();
  }, [
    isActive,
    stopListening,
    setIsActive,
    setCurrentStep,
    setSelectedCategory,
    setTranscript,
    setError,
  ]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimeouts();
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [clearTimeouts]);

  return (
    <button
      onClick={handleMicClick}
      className={`relative w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 text-white hover:opacity-80 ${
        isActive ? "bg-red-500" : "bg-dark-green"
      }`}
      title={isActive ? "Stop voice search" : "Start voice search"}
      disabled={voiceState !== "idle"}
    >
      {/* Mic Icon */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 1C10.34 1 9 2.34 9 4V12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12V4C15 2.34 13.66 1 12 1Z"
          fill="currentColor"
        />
        <path
          d="M19 10V12C19 16.42 15.42 20 11 20H13C17.42 20 21 16.42 21 12V10H19Z"
          fill="currentColor"
        />
        <path
          d="M5 10V12C5 16.42 8.58 20 13 20H11C6.58 20 3 16.42 3 12V10H5Z"
          fill="currentColor"
        />
        <path d="M11 22H13V24H11V22Z" fill="currentColor" />
      </svg>

      {/* Sound Wave Animation */}
      {voiceState === "listening" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="sound-wave">
            <div className="wave wave1"></div>
            <div className="wave wave2"></div>
            <div className="wave wave3"></div>
          </div>
        </div>
      )}
    </button>
  );
};

export default VoiceSearch;
