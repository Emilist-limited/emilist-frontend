import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useServiceState } from "./useServiceState";
import { axiosInstance } from "@/lib/api/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useToast } from "@/lib/hooks/useToast";
import { removeCommas } from "@/lib/helpers/removeCommas";
import {
  Certificate,
  Insurance,
  Membership,
  RegisterServicePayload,
} from "../types";
import { formatDateForInput } from "@/lib/helpers/dates";
import { ROUTES } from "@/lib/constants/routes";
import { useGetServiceInfo } from "./useGetServiceInfo";

export const useEditService = (serviceId: string) => {
  const { showToast } = useToast();

  const {
    loading,
    serviceInfo: data,
    isError,
    error,
    refetchServiceInfo: getServiceInfo,
  } = useGetServiceInfo(serviceId);

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
    fetchedBusinessFile,
    setFetchedCurrentBusinessFile,
    fetchProfileImage,
    setFetchedProfileImage,
  } = useServiceState();

  useEffect(() => {
    if (data) {
      const fetchedCertificates = data.business.certification?.map(
        (item: Certificate) => ({
          issuingOrganisation: item.issuingOrganisation || "",
          verificationNumber: item.verificationNumber || "",
          issuingDate: formatDateForInput(item.issuingDate) || "",
          expiringDate: formatDateForInput(item.expiringDate) || "",
          isCertificateExpire: item.isCertificateExpire || false,
          certificate: null,
          fetchedCertificate: item.certificate || undefined,
          _id: item._id || "",
        })
      );

      setCertification(fetchedCertificates);
      setExpertInfo(data.business);
      setBusinessCountry(data.business.businessCountry);
      setFetchedCurrentBusinessFile(data.business.businessImages);
      setServices(data.business.services);
      setSelectedCountry(data.business.country);
      setSelectedLanguage(data.business.languages);
      setMembership(data.business.membership);
      setInsurance(data.business.insurance);
      setCoverageArea(data.business.coverageArea);
      setFetchedProfileImage(data.business.profileImage);
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      console.log("error getting service info", error);
      promiseErrorFunction(error, showToast);
    }
  }, [isError, error]);

  const handleEditBusiness = async () => {
    if (coverageArea?.length < 1) {
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
    const price = removeCommas(startingPrice);
    setIsSubmitting(true);
    try {
      const payload: RegisterServicePayload = {
        services,
        firstName,
        lastName,
        phoneNumber,
        bio,
        state,
        city,
        address,
        country: selectedCountry,
        languages: selectedLanguage,
        profileImage,
        businessCountry,
        businessName,
        yearFounded,
        numberOfEmployee,
        businessAddress,
        businessCity,
        businessState,
        startingPrice: price,
        noticePeriod,
        currency,
        businessImages,
        businessDescription,
        certification,
        membership,
        insurance,
        coverageArea,
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
      // formData.append("currency", payload.currency);
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
        if (cert._id) {
          formData.append(`certification[${index}][id]`, cert._id);
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
        if (member._id) {
          formData.append(`membership[${index}][id]`, member._id);
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
        if (insurance._id) {
          formData.append(`insurance[${index}][id]`, insurance._id);
        }
      });
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      businessImages.forEach((image) => {
        formData.append(`businessImages`, image);
      });

      await axiosInstance.patch(
        `/business/update-business/${serviceId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      showToast({
        message: "Edit successful",
        type: "success",
        duration: 8000,
      });
      router.push(ROUTES.DASHBOARD_SERVICE_INFO(serviceId));
    } catch (error) {
      console.log("error editing business", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleEditBusiness,
    currentScreen,
    nextScreen,
    prevScreen,
    isSubmitting,
    loading,
    services,
    setServices,
    businessCountry,
    setBusinessCountry,
    membership,
    insurance,
    setInsurance,
    coverageArea,
    setCoverageArea,
    expertInfo,
    handleChange,
    selectedCountry,
    setSelectedCountry,
    selectedLanguage,
    setSelectedLanguage,
    setProfileImage,
    fetchProfileImage,
    setFetchedProfileImage,
    businessImages,
    setBusinessImages,
    fetchedBusinessFile,
    getServiceInfo,
    certification,
    setCertification,
    setMembership,
  };
};
