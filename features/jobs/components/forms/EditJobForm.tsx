"use client";

import { useCallback, useRef } from "react";

import { useJsApiLoader } from "@react-google-maps/api";

import { useDeleteJobImage } from "../../hooks/useDeleteJobImage";
import { useEditJob } from "../../hooks/useEditJob";

import EditJobFormSection from "./EditJobFormSection";
import JobFormLayout from "../JobFormLayout";
import WhiteBgLoader from "@/components/atoms/WhiteBgLoader";
import EditMilestoneForm from "./EditMilestoneForm";
import CustomButton from "@/components/atoms/CustomButton";

const EditJobForm = ({ jobId, title }: { jobId: string; title: string }) => {
  const { handleDeleteFetchedJobImage, isLoading } = useDeleteJobImage();
  const {
    jobInfo,
    setJobInfo,
    getJobInfo,
    onSelectFile,
    handleSubmit,
    isFetching,
    percentage,
    loading,
    handleImageDelete,
    setSelectedImages,
    fetchedImages,
    selectedImages,
    handleLevelChange,
    handleInputChange,
    handleMilestoneChange,
    handlePercentageChange,
    handleMilestoneInputChange,
    handleMilestoneNumberChange,
    handleBlur,
  } = useEditJob(jobId);

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
        setJobInfo((prev) => ({
          ...prev,
          location: selectedPlace.formatted_address || "",
        }));
      }
    }
  };

  const onDeleteFetchedJobImage = useCallback(
    (imageId: string) => {
      handleDeleteFetchedJobImage(jobId, imageId, () => {
        getJobInfo();
      });
    },
    [jobId, getJobInfo]
  );

  return (
    <JobFormLayout
      title={title}
      isLoaded={isLoaded}
      loading={isFetching}
      handleSubmit={handleSubmit}
    >
      {isLoading && <WhiteBgLoader />}
      <EditJobFormSection
        jobInfo={jobInfo}
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
        onSelectFile={onSelectFile}
        handleImageDelete={handleImageDelete}
        autocompleteRef={autocompleteRef}
        handlePlacesChanged={handlePlacesChanged}
        handleInputChange={handleInputChange}
        fetchedImages={fetchedImages}
        handleLevelChange={handleLevelChange}
        onDeleteFetchedJobImage={onDeleteFetchedJobImage}
      />
      <div className="col-span-1 flex flex-col gap-4 max-md:col-span-2 mr-4 max-md:mr-0">
        <EditMilestoneForm
          handleMilestoneChange={handleMilestoneChange}
          handleMilestoneInputChange={handleMilestoneInputChange}
          handleMilestoneNumberChange={handleMilestoneNumberChange}
          jobInfo={jobInfo}
          percentage={percentage}
          handlePercentageChange={handlePercentageChange}
          handleBlur={handleBlur}
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

export default EditJobForm;
