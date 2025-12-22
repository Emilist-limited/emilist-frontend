import { PostJobType } from "../../types";
import {
  categories,
  currencyLabel,
  durationOptions,
  services,
} from "@/lib/constants";
import { FormInput } from "@/components/molecules/FormInput";

import FormSelect from "@/components/molecules/FormSelect";
import FormTextarea from "@/components/molecules/FormTextarea";
import JobFileUpload from "../JobFileUpload";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import ProjectTypeSelector from "../ProjectTypeSelector";
import ExpertLevelSelector from "../ExpertLevelSelector";
import UserValid from "@/components/atoms/UserValid";
import LocationInput from "@/components/molecules/LocationInput";

type ProjectType = "regular" | "biddable";

interface JobFormSectionProps {
  postJobDetails: PostJobType;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;

  projectType?: ProjectType;
  handleProjectTypeChange?: (projectType: ProjectType) => void;
  selectedImages: string[] | null;
  setSelectedImages: React.Dispatch<React.SetStateAction<string[]>>;
  onSelectFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageDelete: (index: number) => void;
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  autocompleteRef: React.MutableRefObject<google.maps.places.SearchBox | null>;
  handlePlacesChanged: () => void;
  handleLevelChange: (levelNumber: string) => void;
  isDirectJob?: boolean;
  onBlurVerify?: (invitee: string) => Promise<void>;
  isUserValid: boolean | null;
}

const JobFormSection: React.FC<JobFormSectionProps> = ({
  postJobDetails,
  handleChange,
  projectType,
  handleProjectTypeChange,
  selectedImages,
  setSelectedImages,
  onSelectFile,
  handleImageDelete,
  location,
  setLocation,
  autocompleteRef,
  handlePlacesChanged,
  handleLevelChange,
  isDirectJob,
  onBlurVerify,
  isUserValid,
}) => {
  return (
    <div className="col-span-1 flex flex-col gap-4 max-md:col-span-2 mr-4 max-md:mr-0">
      {isDirectJob && onBlurVerify && (
        <div className="">
          <FormInput
            label="Invite Expert"
            type="text"
            id="invite"
            name="invite"
            value={postJobDetails.invite || ""}
            onChange={handleChange}
            onBlur={() => onBlurVerify(postJobDetails.invite || "")}
          />
          <UserValid
            value={postJobDetails.invite || ""}
            isUserValid={isUserValid || null}
          />
        </div>
      )}
      <FormSelect
        label="Select work industry"
        id="category"
        name="category"
        value={postJobDetails.category}
        onChange={handleChange}
        options={categories}
      />

      <FormSelect
        label="Narrow down to a service"
        id="service"
        name="service"
        value={postJobDetails.service}
        onChange={handleChange}
        options={services}
      />

      <FormInput
        label="Project title"
        id="projectTitle"
        name="projectTitle"
        type="text"
        value={postJobDetails.projectTitle}
        onChange={handleChange}
      />

      <FormTextarea
        label="Describe your project as detailed as you can"
        rows={4}
        id="description"
        name="description"
        value={postJobDetails.description}
        onChange={handleChange}
      />

      <JobFileUpload
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
        onSelectFile={onSelectFile}
        handleImageDelete={handleImageDelete}
      />

      <div className="w-full">
        <Label htmlFor="projectDuration">Project duration</Label>
        <div className="w-full grid grid-cols-3 gap-4">
          <div className="col-span-2 w-full">
            <Input
              id="projectDuration"
              type="text"
              name="projectDuration"
              value={postJobDetails.projectDuration}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-1 w-full">
            <Select
              name="projectDurationType"
              id="projectDurationType"
              value={postJobDetails.projectDurationType}
              onChange={handleChange}
              options={durationOptions}
            />
          </div>
        </div>
        <p className="text-xs text-dark-green">
          Note: 7days equal 1week, 30days equal 1month and 4weeks equal 1month.
        </p>
      </div>

      {projectType && handleProjectTypeChange && (
        <ProjectTypeSelector
          selectedProjectType={projectType}
          onProjectTypeChange={handleProjectTypeChange}
        />
      )}

      <FormSelect
        label="Select currency"
        name="currency"
        id="currency"
        value={postJobDetails.currency}
        onChange={handleChange}
        options={currencyLabel}
      />

      {projectType === "biddable" ? (
        <>
          <FormInput
            label="Maximum Price"
            type="text"
            name="maximumPrice"
            id="maximumPrice"
            value={postJobDetails.maximumPrice}
            onChange={handleChange}
          />
          <FormInput
            label="Bid Range"
            type="text"
            name="bidRange"
            id="bidRange"
            value={postJobDetails.bidRange}
            onChange={handleChange}
          />
        </>
      ) : (
        <FormInput
          label="Budget"
          type="text"
          name="budget"
          id="budget"
          value={postJobDetails.budget}
          onChange={handleChange}
        />
      )}

      <LocationInput
        autocompleteRef={autocompleteRef}
        handlePlacesChanged={handlePlacesChanged}
        handleChange={(e) => setLocation(e.target.value)}
        location={location}
      />
      <ExpertLevelSelector
        selectedLevel={postJobDetails?.expertLevel}
        onLevelChange={handleLevelChange}
      />
    </div>
  );
};

export default JobFormSection;
