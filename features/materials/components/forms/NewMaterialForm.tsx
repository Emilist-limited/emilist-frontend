"use client";

import { useRef } from "react";

import { useJsApiLoader } from "@react-google-maps/api";

import { useListNewMaterial } from "../../hooks/useListNewMaterial";
import JobFormLayout from "@/features/jobs/components/JobFormLayout";
import CustomButton from "@/components/atoms/CustomButton";
import MaterialFormOne from "./MaterialFormOne";
import MaterialFormTwo from "./MaterialFormTwo";

const NewMaterialForm = () => {
  const {
    submitting,
    materialInfo,
    handleChange,
    selectedCategory,
    onSelectFile,
    handleImageDelete,
    handleSubmit,
    selectedImages,
    setSelectedImages,
    setMaterialsInfo,
  } = useListNewMaterial();

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
        setMaterialsInfo((prev) => ({
          ...prev,
          location: selectedPlace.formatted_address || "",
        }));
      }
    }
  };

  return (
    <JobFormLayout
      title="List New Material"
      isLoaded={isLoaded}
      handleSubmit={handleSubmit}
    >
      <MaterialFormOne
        materialInfo={materialInfo}
        handleChange={handleChange}
        selectedCategory={selectedCategory}
      />
      <MaterialFormTwo
        materialInfo={materialInfo}
        handleChange={handleChange}
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
        onSelectFile={onSelectFile}
        handleImageDelete={handleImageDelete}
        autocompleteRef={autocompleteRef}
        handlePlacesChanged={handlePlacesChanged}
      />
      <div className="flex mt-6 justify-center col-span-2 ">
        <CustomButton type="submit" loading={submitting}>
          Proceed
        </CustomButton>
      </div>
    </JobFormLayout>
  );
};

export default NewMaterialForm;
