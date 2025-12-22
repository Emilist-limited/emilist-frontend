"use client";

import { useRef } from "react";

import { useJsApiLoader } from "@react-google-maps/api";

import { useEditMaterialInfo } from "../../hooks/useEditMaterialInfo";
import { useDeleteProductImage } from "../../hooks/useDeleteProductImage";

import JobFormLayout from "@/features/jobs/components/JobFormLayout";
import MaterialFormOne from "./MaterialFormOne";
import CustomButton from "@/components/atoms/CustomButton";
import MaterialFormTwo from "./MaterialFormTwo";
import WhiteBgLoader from "@/components/atoms/WhiteBgLoader";

const EditMaterialInfoForm = ({ materialId }: { materialId: string }) => {
  const { handleDeleteFetchedProductImage, isLoading } =
    useDeleteProductImage();
  const {
    handleSubmit,
    setEditMaterialInfo,
    editMaterialInfo,
    fetchedImages,
    onSelectFile,
    selectedImages,
    setSelectedImages,
    handleImageDelete,
    submitting,
    isFetching,
    handleChange,
    selectedCategory,
    getMaterialInfo,
  } = useEditMaterialInfo(materialId);

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
        setEditMaterialInfo((prev) => ({
          ...prev,
          location: selectedPlace.formatted_address || "",
        }));
      }
    }
  };

  const onDeleteFetchedProductImage = (imageId: string) => {
    handleDeleteFetchedProductImage(materialId, imageId, () => {
      getMaterialInfo();
    });
  };

  return (
    <JobFormLayout
      title="Edit Material Info"
      isLoaded={isLoaded}
      loading={isFetching}
      handleSubmit={handleSubmit}
    >
      {isLoading && <WhiteBgLoader />}
      <MaterialFormOne
        materialInfo={editMaterialInfo}
        handleChange={handleChange}
        selectedCategory={selectedCategory}
      />
      <MaterialFormTwo
        materialInfo={editMaterialInfo}
        handleChange={handleChange}
        fetchedImages={fetchedImages}
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
        onSelectFile={onSelectFile}
        handleImageDelete={handleImageDelete}
        autocompleteRef={autocompleteRef}
        handlePlacesChanged={handlePlacesChanged}
        onDeleteFetchedProductImage={onDeleteFetchedProductImage}
      />
      <div className="flex mt-6 justify-center col-span-2 ">
        <CustomButton type="submit" loading={submitting}>
          Proceed
        </CustomButton>
      </div>
    </JobFormLayout>
  );
};

export default EditMaterialInfoForm;
