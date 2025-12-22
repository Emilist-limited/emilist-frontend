import { FormEventHandler, useContext, useEffect } from "react";

import { AuthContext } from "@/lib/context/AuthState";
import { useListNewMaterialState } from "./useListNewMaterialState";
import { useToast } from "@/lib/hooks/useToast";
import { useLocation } from "@/lib/hooks/useLocation";
import { useImageUpload } from "@/features/jobs/hooks/useImageUpload";
import { axiosInstance } from "@/lib/api/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { handleLoginError } from "@/lib/helpers/handleLoginError";
import { materialFormErrorCheck } from "../helpers/validate";
import { handleInputFieldError } from "@/lib/helpers/handleInputFieldError";
import { removeCommas } from "@/lib/helpers/removeCommas";
import { goBack } from "@/lib/helpers/goBack";

export const useEditMaterialInfo = (materialId: string) => {
  const { showToast } = useToast();
  const { validateLocation } = useLocation();
  const { currentUser } = useContext(AuthContext);

  const {
    submitting,
    isFetching,
    setIsFetching,
    setSubmitting,
    materialInfo: editMaterialInfo,
    handleChange,
    setMaterialsInfo: setEditMaterialInfo,
    selectedCategory,
  } = useListNewMaterialState();

  const {
    selectedImages,
    selectedImageFiles,
    onSelectFile,
    handleImageDelete,
    setSelectedImages,
    fetchedImages,
    setFetchedImages,
  } = useImageUpload();

  const getMaterialInfo = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/material/fetch-product/${materialId}`
      );
      setEditMaterialInfo(data?.data?.product);
      setFetchedImages(data?.data?.product?.images);
    } catch (error: any) {
      console.log("error getting material info", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getMaterialInfo();
  }, [materialId]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const {
      name,
      brand,
      description,
      availableQuantity,
      price,
      storeName,
      location,
      currency,
      category,
      subCategory,
    } = editMaterialInfo;

    if (!currentUser) {
      return handleLoginError(showToast);
    } else if (materialFormErrorCheck(editMaterialInfo)) {
      return handleInputFieldError(showToast);
    } else if (!(await validateLocation(location))) {
      return showToast({
        message: "Please select a valid location.",
        type: "error",
        duration: 8000,
      });
    } else if (selectedImageFiles?.length === 0 && fetchedImages.length < 1) {
      return showToast({
        message: "Please select an image",
        type: "error",
        duration: 8000,
      });
    }

    setSubmitting(true);
    try {
      const editInfoPayload = {
        name,
        brand,
        description,
        availableQuantity,
        price: removeCommas(price.toString()),
        storeName,
        location,
        subCategory,
        category,
        currency,
      };
      const formData = new FormData();
      Object.entries(editInfoPayload).forEach(([key, value]) => {
        formData.append(key, value);
      });

      selectedImageFiles.forEach((file) => formData.append("files", file));
      await axiosInstance.patch(
        `/material/update-product/${materialId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      showToast({
        message: "Material edited successfully!",
        type: "success",
        duration: 8000,
      });
      goBack();
    } catch (error: any) {
      console.log("error editing material", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setSubmitting(false);
    }
  };

  return {
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
  };
};
