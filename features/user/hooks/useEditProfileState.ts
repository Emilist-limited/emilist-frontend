import { useState } from "react";
import { useToast } from "@/lib/hooks/useToast";
import { ProfileDetail } from "../types";
import { formatInputTextNumber } from "@/lib/helpers/formatNumbers";

export const useEditProfileState = () => {
  const { showToast } = useToast();

  const [load, setLoad] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState<string>("");

  const [profileDetails, setProfileDetails] = useState<ProfileDetail>({
    fullName: "",
    number1: "",
    bio: "",
    location: "",
    language: "",
    number2: "",
    whatsAppNo: "",
    gender: "",
    email: "",
  });

  const [editingField, setEditingField] = useState<boolean>(false);

  const handleEdit = () => {
    setEditingField(true);
  };

  function handleChangeFile(event: any) {
    const file = event.target.files[0];
    const validExtensions = ["image/jpeg", "image/jpg", "image/png"];
    const maxSizeInMB = 2 * 1024 * 1024;
    if (file) {
      if (file.size > maxSizeInMB) {
        showToast({
          message: `File ${file.name} exceeds the 2MB size limit.`,
          type: "error",
          duration: 8000,
        });
        return;
      }
      if (!validExtensions.includes(file.type)) {
        showToast({
          message: `Unsupported file type for ${file.name}. Only jpg, jpeg, and png are allowed.`,
          type: "error",
          duration: 8000,
        });
        return;
      }
      setShowSave(true);
      setProfileImage(file);
      setCurrentImage(URL.createObjectURL(file));
    }
  }

  const handleCancel = () => {
    setEditingField(false);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    const isNameNumber =
      name === "number1" || name === "number2" || name === "whatsAppNo";
    setProfileDetails((prev) => ({
      ...prev,
      [name]: isNameNumber ? formatInputTextNumber(value) : value,
    }));
  };

  return {
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
  };
};
