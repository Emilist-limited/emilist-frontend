import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

import { AuthContext } from "@/lib/context/AuthState";
import { useToast } from "@/lib/hooks/useToast";
import { axiosInstance } from "@/lib/api/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { ROUTES } from "@/lib/constants/routes";
import { useEditProfileState } from "./useEditProfileState";

export const useEditProfile = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const { currentUser } = useContext(AuthContext);

  const {
    load,
    setLoad,
    loading,
    setLoading,
    showSave,
    setShowSave,
    profileImage,
    currentImage,
    setCurrentImage,
    profileDetails,
    setProfileDetails,
    editingField,
    setEditingField,
    handleEdit,
    handleChangeFile,
    handleCancel,
    handleChange,
  } = useEditProfileState();

  const getUser = async () => {
    try {
      const { data } = await axiosInstance.get(`/auth/current-user`);
      setProfileDetails(data?.data);
      setCurrentImage(data?.data?.profileImage && data?.data?.profileImage);
    } catch (error) {
      console.log("error fetching user data", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    getUser();
  }, [currentUser._id]);

  const handleUpdate = async () => {
    if (!currentUser) {
      router.push(ROUTES?.LOGIN);
      return;
    }

    setLoading(true);
    const {
      fullName,
      number1,
      bio,
      location,
      language,
      number2,
      whatsAppNo,
      gender,
    } = profileDetails;

    try {
      const formData = new FormData();

      if (fullName) formData.append("fullName", fullName);
      if (number1) formData.append("number1", number1);
      if (bio) formData.append("bio", bio);
      if (location) formData.append("location", location);
      if (language) formData.append("language", language);
      if (number2) formData.append("number2", number2);
      if (whatsAppNo) formData.append("whatsAppNo", whatsAppNo);
      if (gender) formData.append("gender", gender);

      if (profileImage) formData.append("image", profileImage);

      await axiosInstance.patch(`/auth/update-profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      showToast({
        message: "Profile detail updated successfully",
        type: "success",
        duration: 8000,
      });

      setEditingField(false);
      setShowSave(false);
      getUser();
    } catch (error: any) {
      console.error(error);
      promiseErrorFunction(error, showToast);
    } finally {
      setLoading(false);
    }
  };

  return {
    profileDetails,
    handleUpdate,
    handleCancel,
    handleEdit,
    editingField,
    loading,
    load,
    profileImage,
    handleChangeFile,
    currentImage,
    handleChange,
    showSave,
  };
};
