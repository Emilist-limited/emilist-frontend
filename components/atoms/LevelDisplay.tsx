import { getLevelValue } from "@/lib/helpers/getLevelValue";

interface LevelDisplayProps {
  level?: string;
}

const LevelDisplay = ({ level }: LevelDisplayProps) => {
  return (
    <p className="text-[#5E625F] pr-2 border-r-1 border-[#5E625F] max-sm:text-xs">
      LEVEL {level ? getLevelValue(level) : "N/A"}
    </p>
  );
};

export default LevelDisplay;
