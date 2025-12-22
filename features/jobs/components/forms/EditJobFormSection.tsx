import { StandaloneSearchBox } from "@react-google-maps/api";

import { JobFilesType, Jobs } from "../../types";
import {
  categories,
  currencyLabel,
  durationOptions,
  services,
} from "@/lib/constants";
import { FormInput } from "@/components/molecules/FormInput";

import FormSelect from "@/components/molecules/FormSelect";
import FormTextarea from "@/components/molecules/FormTextarea";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import JobFileUpload from "../JobFileUpload";
import ExpertLevelSelector from "../ExpertLevelSelector";

interface EditJobFormSection {
  selectedImages: string[] | null;
  setSelectedImages: React.Dispatch<React.SetStateAction<string[]>>;
  onSelectFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageDelete: (index: number) => void;
  autocompleteRef: React.MutableRefObject<google.maps.places.SearchBox | null>;
  handlePlacesChanged: () => void;
  jobInfo: Jobs;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleLevelChange: (levelNumber: string) => void;
  fetchedImages: JobFilesType[] | [];
  onDeleteFetchedJobImage: (imageId: string) => void;
}

const EditJobFormSection = ({
  autocompleteRef,
  handlePlacesChanged,
  fetchedImages,
  selectedImages,
  setSelectedImages,
  onSelectFile,
  handleImageDelete,
  jobInfo,
  handleInputChange,
  onDeleteFetchedJobImage,
  handleLevelChange,
}: EditJobFormSection) => {
  return (
    <div className="col-span-1 flex flex-col gap-4 max-md:col-span-2 mr-4 max-md:mr-0">
      <FormSelect
        label="Select work industry"
        id="category"
        name="category"
        value={jobInfo.category}
        onChange={handleInputChange}
        options={categories}
      />
      <FormSelect
        label="Narrow down to a service"
        id="service"
        name="service"
        value={jobInfo.service}
        onChange={handleInputChange}
        options={services}
      />
      <FormInput
        label="Project title"
        id="title"
        name="title"
        type="text"
        value={jobInfo.title}
        onChange={handleInputChange}
      />
      <FormTextarea
        label="Describe your project as detailed as you can"
        rows={4}
        id="description"
        name="description"
        value={jobInfo.description}
        onChange={handleInputChange}
      />
      <JobFileUpload
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
        onSelectFile={onSelectFile}
        handleImageDelete={handleImageDelete}
        fetchedImages={fetchedImages}
        onDeleteFetchedJobImage={onDeleteFetchedJobImage}
      />
      <div className="w-full">
        <Label htmlFor="number">Project duration</Label>
        <div className="w-full grid grid-cols-3 gap-4">
          <div className="col-span-2 w-full">
            <Input
              id="number"
              type="text"
              name="number"
              value={jobInfo.duration.number}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-1 w-full">
            <Select
              name="projectDurationType"
              id="projectDurationType"
              value={jobInfo?.duration?.period}
              onChange={handleInputChange}
              options={durationOptions}
            />
          </div>
        </div>
        <p className="text-xs text-dark-green">
          Note: 7days equal 1week, 30days equal 1month and 4weeks equal 1month.
        </p>
      </div>
      <FormSelect
        label="Select currency"
        name="currency"
        id="currency"
        value={jobInfo.currency}
        onChange={handleInputChange}
        options={currencyLabel}
      />
      {jobInfo?.type === "biddable" ? (
        <>
          <FormInput
            label="Maximum Price"
            type="text"
            name="maximumPrice"
            id="maximumPrice"
            value={jobInfo.maximumPrice?.toString() || ""}
            onChange={handleInputChange}
          />
          <FormInput
            label="Bid Range"
            type="text"
            name="bidRange"
            id="bidRange"
            value={jobInfo.bidRange?.toString() || ""}
            onChange={handleInputChange}
          />
        </>
      ) : (
        <FormInput
          label="Budget"
          type="text"
          name="budget"
          id="budget"
          value={jobInfo.budget?.toString() || ""}
          onChange={handleInputChange}
        />
      )}
      <div className="w-full">
        <Label htmlFor="location">Location</Label>
        <div className="w-full">
          <StandaloneSearchBox
            onLoad={(ref) => (autocompleteRef.current = ref)}
            onPlacesChanged={handlePlacesChanged}
          >
            <Input
              id="location"
              type="text"
              placeholder="Search for a location"
              name="location"
              value={jobInfo?.location}
              onChange={handleInputChange}
            />
          </StandaloneSearchBox>
          <p className="text-xs text-dark-green">
            Please enter a valid address from the suggestions.
          </p>
        </div>
      </div>
      <ExpertLevelSelector
        selectedLevel={jobInfo?.expertLevel}
        onLevelChange={handleLevelChange}
      />
    </div>
  );
};

export default EditJobFormSection;
