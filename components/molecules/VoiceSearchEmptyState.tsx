import { SearchCategory, VoiceState } from "@/types";

interface VoiceSearchEmptyStateProps {
  isActive: boolean;
  voiceState: VoiceState;
  error: string;
  selectedCategory: SearchCategory | null;
  transcript: string;
}

const VoiceSearchEmptyState = ({
  error,
  isActive,
  voiceState,
  selectedCategory,
  transcript,
}: VoiceSearchEmptyStateProps) => {
  return (
    <>
      {" "}
      {error ? (
        <div className="w-full bg-red-50 rounded-lg shadow-lg p-3 min-w-48 text-center border-1 border-red-400 text-red-400">
          <div className="text-sm font-medium mb-1">Error!</div>
          <p className="text-xs">{error}</p>
        </div>
      ) : (
        <>
          {" "}
          {isActive && voiceState !== "idle" && (
            <div className="w-full bg-nuetral-light rounded-lg shadow-lg p-3 min-w-48 text-center border-1 border-light-green">
              <div className="text-sm font-medium mb-1">
                {voiceState === "listening" && "🎤 Listening..."}
                {voiceState === "speaking" && "🔊 Speaking..."}
                {voiceState === "processing" && "⚙️ Processing..."}
              </div>
              {selectedCategory && (
                <div className="text-xs text-dark-green mt-1">
                  Search category: {selectedCategory}
                </div>
              )}
              {transcript && <div className="text-xs mt-1">"{transcript}"</div>}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default VoiceSearchEmptyState;
