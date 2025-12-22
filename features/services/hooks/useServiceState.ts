import React, { useState } from "react";
import {
  Certificate,
  FetchedBusinessImageType,
  Insurance,
  Membership,
} from "../types";
import { RegisterExpertInfoType } from "@/types";
import { formatInputTextNumberWithCommas } from "@/lib/helpers/formatInputTextNumberWithCommas";
import { formatInputTextNumber } from "@/lib/helpers/formatNumbers";

export const useServiceState = () => {
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(1);
  const [services, setServices] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string[]>([]);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [fetchProfileImage, setFetchedProfileImage] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [businessCountry, setBusinessCountry] = useState<string>("");
  const [businessImages, setBusinessImages] = useState<File[]>([]);
  const [fetchedBusinessFile, setFetchedCurrentBusinessFile] = useState<
    FetchedBusinessImageType[]
  >([]);
  const [coverageArea, setCoverageArea] = useState<string[]>([]);
  const [certification, setCertification] = useState<Certificate[]>([
    {
      issuingOrganisation: "",
      verificationNumber: "",
      issuingDate: "",
      expiringDate: "",
      isCertificateExpire: false,
      certificate: null,
    },
  ]);
  const [membership, setMembership] = useState<Membership[]>([
    {
      organisation: "",
      positionHeld: "",
      startDate: "",
      endDate: "",
      isMembershipExpire: false,
    },
  ]);

  const [insurance, setInsurance] = useState<Insurance[]>([
    {
      issuingOrganisation: "",
      coverage: "",
      description: "",
    },
  ]);

  const [expertInfo, setExpertInfo] = useState<RegisterExpertInfoType>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    city: "",
    address: "",
    bio: "",
    state: "",
    businessName: "",
    yearFounded: "",
    numberOfEmployee: "",
    businessAddress: "",
    businessCity: "",
    businessState: "",
    startingPrice: "",
    noticePeriod: "",
    currency: "NGN",
    businessDescription: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setExpertInfo((prev) => ({
      ...prev,
      [name]:
        name === "startingPrice"
          ? formatInputTextNumberWithCommas(value)
          : [
              "numberOfEmployee",
              "noticePeriod",
              "yearFounded",
              "phoneNumber",
            ].includes(name)
          ? formatInputTextNumber(value)
          : value,
    }));
  };

  const nextScreen = () => {
    setCurrentScreen((prev) => prev + 1);
  };

  const prevScreen = () => {
    setCurrentScreen((prev) => prev - 1);
  };

  return {
    isSubmitting,
    setIsSubmitting,
    services,
    setServices,
    selectedLanguage,
    setSelectedLanguage,
    profileImage,
    setProfileImage,
    selectedCountry,
    setSelectedCountry,
    businessCountry,
    setBusinessCountry,
    businessImages,
    setBusinessImages,
    coverageArea,
    setCoverageArea,
    certification,
    setCertification,
    membership,
    setMembership,
    insurance,
    setInsurance,
    expertInfo,
    setExpertInfo,
    handleChange,
    currentScreen,
    nextScreen,
    prevScreen,
    loading,
    setLoading,
    fetchedBusinessFile,
    setFetchedCurrentBusinessFile,
    fetchProfileImage,
    setFetchedProfileImage,
  };
};
