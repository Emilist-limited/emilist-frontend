import { useRouter } from "next/navigation";

import { AuthContext } from "@/lib/context/AuthState";
import { useListNewMaterialState } from "./useListNewMaterialState";
import { useImageUpload } from "@/features/jobs/hooks/useImageUpload";
import { useLocation } from "@/lib/hooks/useLocation";
import { useToast } from "@/lib/hooks/useToast";
import { FormEventHandler, useContext } from "react";
import { handleLoginError } from "@/lib/helpers/handleLoginError";
import { materialFormErrorCheck } from "../helpers/validate";
import { handleInputFieldError } from "@/lib/helpers/handleInputFieldError";
import { removeCommas } from "@/lib/helpers/removeCommas";
import { axiosInstance } from "@/lib/api/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { ROUTES } from "@/lib/constants/routes";

export const useListNewMaterial = () => {
  const router = useRouter();

  const { showToast } = useToast();
  const { currentUser } = useContext(AuthContext);
  const { validateLocation } = useLocation();
  const {
    submitting,
    setSubmitting,
    materialInfo,
    handleChange,
    setMaterialsInfo,
    selectedCategory,
  } = useListNewMaterialState();
  const {
    selectedImages,
    selectedImageFiles,
    onSelectFile,
    handleImageDelete,
    setSelectedImageFiles,
    setSelectedImages,
  } = useImageUpload();

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
    } = materialInfo;

    if (!currentUser) {
      return handleLoginError(showToast);
    } else if (materialFormErrorCheck(materialInfo)) {
      handleInputFieldError(showToast);
      return;
    } else if (!(await validateLocation(location))) {
      return showToast({
        message: "Please select a valid location.",
        type: "error",
        duration: 8000,
      });
    } else if (selectedImages.length === 0 || selectedImageFiles.length === 0) {
      return showToast({
        message: "Please select an image",
        type: "error",
        duration: 8000,
      });
    }
    setSubmitting(true);
    try {
      const materialPayload = {
        name,
        category,
        subCategory,
        brand,
        description,
        availableQuantity,
        price: removeCommas(price.toString()),
        storeName,
        location,
        currency,
      };

      const formData = new FormData();
      Object.entries(materialPayload).forEach(([key, value]) => {
        formData.append(key, value);
      });

      selectedImageFiles.forEach((file) => formData.append("files", file));
      await axiosInstance.post(`/material/create-product`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      showToast({
        message: "Material posted successfully!",
        type: "success",
        duration: 8000,
      });

      setMaterialsInfo({
        name: "",
        brand: "",
        description: "",
        availableQuantity: "",
        price: "",
        storeName: "",
        location: "",
        category: "",
        subCategory: "",
        currency: "",
      });
      router.push(ROUTES?.DASHOBOARD_MY_MATERIALS);
      setSelectedImageFiles([]);
      setSelectedImages([]);
    } catch (error: any) {
      console.log("error listing new material", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setSubmitting(false);
    }
  };

  return {
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
  };
};
