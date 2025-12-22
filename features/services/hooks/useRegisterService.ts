import { useRouter } from "next/navigation";

import {
  Certificate,
  Insurance,
  Membership,
  RegisterServicePayload,
} from "../types";
import { useToast } from "@/lib/hooks/useToast";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { axiosInstance } from "@/lib/api/axiosInstance";
import { ROUTES } from "@/lib/constants/routes";
import { removeCommas } from "@/lib/helpers/removeCommas";
import { useServiceState } from "./useServiceState";

export const useRegisterService = () => {
  const { showToast } = useToast();
  const router = useRouter();
  const {
    isSubmitting,
    setIsSubmitting,
    services,
    setServices,
    selectedLanguage,
    setSelectedLanguage,
    profileImage,
    setProfileImage,
    fetchProfileImage,
    setFetchedProfileImage,
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
  } = useServiceState();

  const handleSubmit = async () => {
    if (coverageArea.length < 1) {
      showToast({
        message: "Please select at least one coverage area.",
        type: "error",
        duration: 8000,
      });
      return;
    }
    const {
      firstName,
      lastName,
      phoneNumber,
      city,
      address,
      bio,
      state,
      businessName,
      yearFounded,
      numberOfEmployee,
      businessCity,
      businessAddress,
      businessState,
      startingPrice,
      noticePeriod,
      currency,
      businessDescription,
    } = expertInfo;

    setIsSubmitting(true);
    try {
      const payload: RegisterServicePayload = {
        firstName,
        lastName,
        phoneNumber,
        city,
        address,
        bio,
        state,
        businessName,
        yearFounded,
        numberOfEmployee,
        businessAddress,
        businessCity,
        businessCountry,
        businessState,
        startingPrice: removeCommas(startingPrice),
        noticePeriod,
        currency,
        businessDescription,
        services,
        languages: selectedLanguage,
        profileImage,
        country: selectedCountry,
        businessImages,
        coverageArea,
        certification,
        membership,
        insurance,
      };
      const formData = new FormData();
      formData.append("firstName", payload.firstName);
      formData.append("lastName", payload.lastName);
      formData.append("phoneNumber", payload.phoneNumber);
      formData.append("address", payload.address);
      formData.append("city", payload.city);
      formData.append("state", payload.state);
      formData.append("country", payload.country);
      formData.append("bio", payload.bio);
      formData.append("businessName", payload.businessName);
      formData.append("yearFounded", payload.yearFounded.toString());
      formData.append("numberOfEmployee", payload.numberOfEmployee.toString());
      formData.append("businessAddress", payload.businessAddress);
      formData.append("businessCity", payload.businessCity);
      formData.append("businessState", payload.businessState);
      formData.append("businessCountry", payload.businessCountry);
      formData.append("currency", payload.currency);
      formData.append("startingPrice", payload.startingPrice.toString());
      formData.append("noticePeriod", payload.noticePeriod);
      formData.append("businessDescription", payload.businessDescription);
      payload.services.forEach((service: string, index: number) => {
        formData.append(`services[${index}]`, service);
      });

      payload?.languages?.forEach((language: string, index: number) => {
        formData.append(`languages[${index}]`, language);
      });

      payload?.coverageArea?.forEach((area: string, index: number) => {
        formData.append(`coverageArea[${index}]`, area);
      });

      payload?.certification?.forEach((cert: Certificate, index: number) => {
        if (cert.issuingOrganisation) {
          formData.append(
            `certification[${index}][issuingOrganisation]`,
            cert.issuingOrganisation
          );
        }
        if (cert.verificationNumber) {
          formData.append(
            `certification[${index}][verificationNumber]`,
            cert.verificationNumber
          );
        }
        if (cert.issuingDate) {
          formData.append(
            `certification[${index}][issuingDate]`,
            cert.issuingDate
          );
        }
        if (cert.expiringDate) {
          formData.append(
            `certification[${index}][expiringDate]`,
            cert.expiringDate
          );
        }
        if (cert.isCertificateExpire) {
          formData.append(
            `certification[${index}][isCertificateExpire]`,
            cert.isCertificateExpire.toString()
          );
        }
        if (cert.certificate) {
          formData.append(`certificate`, cert.certificate);
        }
      });

      payload?.membership?.forEach((member: Membership, index: number) => {
        if (member.organisation) {
          formData.append(
            `membership[${index}][organisation]`,
            member.organisation
          );
        }
        if (member.positionHeld) {
          formData.append(
            `membership[${index}][positionHeld]`,
            member.positionHeld
          );
        }
        if (member.startDate) {
          formData.append(`membership[${index}][startDate]`, member.startDate);
        }
        if (member.endDate) {
          formData.append(`membership[${index}][endDate]`, member.endDate);
        }
        if (member.isMembershipExpire) {
          formData.append(
            `membership[${index}][isMembershipExpire]`,
            member.isMembershipExpire.toString()
          );
        }
      });

      payload?.insurance?.forEach((insurance: Insurance, index: number) => {
        if (insurance.issuingOrganisation) {
          formData.append(
            `insurance[${index}][issuingOrganisation]`,
            insurance.issuingOrganisation
          );
        }
        if (insurance.coverage) {
          formData.append(`insurance[${index}][coverage]`, insurance.coverage);
        }
        if (insurance.description) {
          formData.append(
            `insurance[${index}][description]`,
            insurance.description
          );
        }
      });
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      businessImages.forEach((image) => {
        formData.append(`businessImages`, image);
      });

      await axiosInstance.post(`/business/register-business`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      router.push(ROUTES?.CONGRATULATIONS_BUSINESS_REGISTER);
      setExpertInfo({
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
      setCoverageArea([]);
    } catch (error) {
      console.log("error: registsering a business", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    services,
    setServices,
    expertInfo,
    handleChange,
    selectedCountry,
    setSelectedCountry,
    selectedLanguage,
    setSelectedLanguage,
    setProfileImage,
    fetchProfileImage,
    setFetchedProfileImage,
    businessCountry,
    setBusinessCountry,
    businessImages,
    setBusinessImages,
    certification,
    setCertification,
    membership,
    setMembership,
    insurance,
    setInsurance,
    coverageArea,
    setCoverageArea,
    isSubmitting,
    handleSubmit,
    currentScreen,
    nextScreen,
    prevScreen,
  };
};
