import Image from "next/image";

import Label from "@/components/atoms/Label";

import { levels } from "@/lib/constants";

interface ExpertLevelSelectorProps {
  selectedLevel: string;
  onLevelChange: (levelNumber: string) => void;
}

const ExpertLevelSelector: React.FC<ExpertLevelSelectorProps> = ({
  selectedLevel,
  onLevelChange,
}) => {
  return (
    <div className="w-full my-3 space-y-1">
      <Label htmlFor="level">Expert Level</Label>
      <div className="w-fit flex flex-col gap-3">
        {levels.map((level, index) => (
          <div
            key={index}
            className={`flex items-center cursor-pointer ${
              selectedLevel === level.number ? "text-primary-green" : ""
            }`}
            onClick={() => onLevelChange(level.number)}
          >
            <Image
              src={
                selectedLevel === level.number
                  ? "/icons/circle-color.svg"
                  : "/icons/circle.svg"
              }
              alt="menu"
              width={25}
              height={25}
              className="object-contain w-6 h-6"
            />
            <label htmlFor={level.level} className="ml-3 cursor-pointer">
              {level.level}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpertLevelSelector;
