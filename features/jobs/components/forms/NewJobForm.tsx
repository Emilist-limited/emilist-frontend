"use client";

import { useRef } from "react";

import { useJsApiLoader } from "@react-google-maps/api";

import { useListNewJob } from "../../hooks/useListNewJob";

import MilestoneFormWrapper from "./MilestoneFormWrapper";
import CustomButton from "@/components/atoms/CustomButton";
import JobFormSection from "./JobFormSection";
import JobFormLayout from "../JobFormLayout";

const NewJobForm = () => {
  const {
    onSelectFile,
    handleImageDelete,
    handleChange,
    milestonesData,
    postJobDetails,
    handleSubmitPostJob,
    loading,
    selectedImages,
    setSelectedImages,
    updateMilestonesData,
    location,
    setLocation,
    projectType,
    handleLevelChange,
    handleProjectTypeChange,
  } = useListNewJob();

  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const autocompleteRef: any = useRef(null);

  if (!googleMapsApiKey) {
    throw new Error("Google Maps API key is not defined.");
  }

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleMapsApiKey,
    libraries: ["places"],
  });

  const handlePlacesChanged = () => {
    // Access the Autocomplete instance using refs
    const autocomplete = autocompleteRef.current;

    if (autocomplete) {
      const places = autocomplete.getPlaces();
      if (places && places?.length > 0) {
        const selectedPlace = places[0];
        setLocation(selectedPlace.formatted_address || "");
      }
    }
  };

  return (
    <JobFormLayout
      title="List New Job"
      handleSubmit={handleSubmitPostJob}
      isLoaded={isLoaded}
    >
      <JobFormSection
        postJobDetails={postJobDetails}
        handleChange={handleChange}
        projectType={projectType}
        handleProjectTypeChange={handleProjectTypeChange}
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
        onSelectFile={onSelectFile}
        handleImageDelete={handleImageDelete}
        location={location}
        setLocation={setLocation}
        autocompleteRef={autocompleteRef}
        handlePlacesChanged={handlePlacesChanged}
        handleLevelChange={handleLevelChange}
        isUserValid={null}
      />
      <div className="col-span-1 flex flex-col gap-4 max-md:col-span-2 mr-4 max-md:mr-0">
        <MilestoneFormWrapper
          createDirectContractJob={postJobDetails}
          milestonesData={milestonesData}
          updateMilestonesData={updateMilestonesData}
          handleChange={handleChange}
        />
      </div>
      <div className="flex mt-6 justify-center col-span-2 ">
        <CustomButton type="submit" loading={loading}>
          Proceed
        </CustomButton>
      </div>
    </JobFormLayout>
  );
};

export default NewJobForm;
