"use client";

import { useRef } from "react";

import { useJsApiLoader } from "@react-google-maps/api";

import { useCreatePlannedJob } from "../../hooks/useCreatePlannedJob";

import JobFormLayout from "../JobFormLayout";
import JobFormSection from "./JobFormSection";
import MilestoneFormWrapper from "./MilestoneFormWrapper";
import PlannedJobFrequencyForm from "./PlannedJobFrequencyForm";
import CustomButton from "@/components/atoms/CustomButton";

const PlannedMaintenanceForm = () => {
  const {
    onSelectFile,
    handleImageDelete,
    handleChange,
    milestonesData,
    plannedJob,
    plannedMaintenance,
    handleSubmitPostJob,
    loading,
    selectedImages,
    setSelectedImages,
    updateMilestonesData,
    location,
    setLocation,
    isUserValid,
    onBlurVerify,
    handleLevelChange,
    addReminder,
    removeReminder,
    nextPage,
    setNextPage,
    handleReminderDatesChange,
    handleChangePlannedJob,
    reminderDates,
  } = useCreatePlannedJob();

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
      title="Planned Maintenance"
      handleSubmit={handleSubmitPostJob}
      isLoaded={isLoaded}
      nextPage={nextPage}
      setNextPage={setNextPage}
    >
      {nextPage === 1 && (
        <>
          <JobFormSection
            postJobDetails={plannedMaintenance}
            handleChange={handleChange}
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
            onSelectFile={onSelectFile}
            handleImageDelete={handleImageDelete}
            location={location}
            setLocation={setLocation}
            autocompleteRef={autocompleteRef}
            handlePlacesChanged={handlePlacesChanged}
            handleLevelChange={handleLevelChange}
            isDirectJob
            isUserValid={isUserValid}
            onBlurVerify={onBlurVerify}
          />

          <div className="col-span-1 flex flex-col gap-4 max-md:col-span-2 mr-4 max-md:mr-0">
            <MilestoneFormWrapper
              createDirectContractJob={plannedMaintenance}
              milestonesData={milestonesData}
              updateMilestonesData={updateMilestonesData}
              handleChange={handleChange}
            />
          </div>
          <div className="flex mt-6 justify-center col-span-2 ">
            <CustomButton type="button" onClick={() => setNextPage(2)}>
              Next
            </CustomButton>
          </div>
        </>
      )}
      {nextPage === 2 && (
        <>
          <PlannedJobFrequencyForm
            plannedJob={plannedJob}
            handleChangePlannedJob={handleChangePlannedJob}
            removeReminder={removeReminder}
            addReminder={addReminder}
            handleReminderDatesChange={handleReminderDatesChange}
            reminderDates={reminderDates}
          />
          <div className="flex mt-6 justify-center col-span-2 ">
            <CustomButton type="submit" loading={loading}>
              Proceed
            </CustomButton>
          </div>
        </>
      )}
    </JobFormLayout>
  );
};

export default PlannedMaintenanceForm;
