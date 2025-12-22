import { useState } from "react";

import { DateTime } from "../types";
import { HiringDetails } from "@/types";
import { useToast } from "@/lib/hooks/useToast";
import { axiosInstance } from "@/lib/api/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";

export const useHirePrivateExpert = () => {
  const { showToast } = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [availability, setAvailability] = useState<DateTime[]>([]);

  const [hiringDetails, setHiringDetails] = useState<HiringDetails>({
    fullName: "",
    phoneNumber: "",
    email: "",
    privateExpertType: "",
    jobDetails: "",
    location: "",
  });

  const handleAddDate = (date: string, time: string) => {
    if (availability?.length >= 3) {
      showToast({
        message: "You can only select up to 3 dates.",
        type: "error",
      });
      return;
    }

    if (availability.find((entry) => entry.date === date)) {
      showToast({
        message: "This date is already selected.",
        type: "error",
      });
      return;
    }

    setAvailability((prev) => [...prev, { date, time }]);
  };

  const handleRemoveDate = (date: string) => {
    setAvailability((prev) => prev.filter((entry) => entry.date !== date));
  };

  const handleDelete = () => {
    setSelectedImage(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "date" | "time",
    index: number
  ) => {
    const newValue = e.target.value;
    setAvailability((prev) =>
      prev.map((entry, i) =>
        i === index ? { ...entry, [field]: newValue } : entry
      )
    );
  };

  const handleChnage = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setHiringDetails((details) => ({
      ...details,
      [name]: value,
    }));
  };

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const onCancel = () => {
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    const {
      fullName,
      phoneNumber,
      email,
      privateExpertType,
      jobDetails,
      location,
    } = hiringDetails;
    setLoading(true);
    try {
      const formData = new FormData();

      formData.append("fullName", fullName);
      formData.append("phoneNumber", phoneNumber);
      formData.append("email", email);
      formData.append("typeOfExpert", privateExpertType);
      formData.append("details", jobDetails);
      formData.append("location", location);

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      availability?.forEach((entry, index) => {
        formData.append(`availability[${index}][time]`, entry?.time);
        formData.append(`availability[${index}][date]`, entry?.date);
      });

      await axiosInstance.post(`/expert/create-private-expert`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsOpen(false);
      showToast({
        message: "Successfully sent",
        type: "success",
      });
      setHiringDetails({
        fullName: "",
        phoneNumber: "",
        email: "",
        privateExpertType: "",
        jobDetails: "",
        location: "",
      });
      setAvailability([]);
      setSelectedImage(null);
    } catch (error: any) {
      console.log("error hiring private expert", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSubmit,
    handleFileChange,
    handleChnage,
    loading,
    hiringDetails,
    selectedImage,
    setIsOpen,
    isOpen,
    onCancel,
    handleDelete,
    handleAddDate,
    handleRemoveDate,
    availability,
    handleInputChange,
  };
};
