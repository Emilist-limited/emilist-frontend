import Label from "@/components/atoms/Label";
import Image from "next/image";

type ProjectType = "regular" | "biddable";

interface ProjectTypeSelectorProps {
  selectedProjectType: ProjectType;
  onProjectTypeChange: (projectType: ProjectType) => void;
}

const ProjectTypeSelector: React.FC<ProjectTypeSelectorProps> = ({
  selectedProjectType,
  onProjectTypeChange,
}) => {
  const projectTypes: { value: ProjectType; label: string }[] = [
    { value: "regular", label: "Regular" },
    { value: "biddable", label: "Biddable" },
  ];

  return (
    <div className="w-full my-3 space-y-1">
      <Label htmlFor="projectType">Project type</Label>
      <div className="w-full flex flex-col gap-3">
        {projectTypes.map((type) => (
          <div
            key={type.value}
            className={`flex items-center cursor-pointer ${
              selectedProjectType === type.value ? "text-primary-green" : ""
            }`}
            onClick={() => onProjectTypeChange(type.value)}
          >
            <Image
              src={
                selectedProjectType === type.value
                  ? "/icons/circle-color.svg"
                  : "/icons/circle.svg"
              }
              alt="menu"
              width={25}
              height={25}
              className="object-contain w-6 h-6"
            />
            <label htmlFor={type.label} className="ml-3 cursor-pointer">
              {type.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectTypeSelector;
