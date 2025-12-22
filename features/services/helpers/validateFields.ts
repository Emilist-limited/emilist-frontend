import { RegisterExpertInfoType, ShowToastFunction } from "@/types";
import {
  Certificate,
  FetchedBusinessImageType,
  Insurance,
  Membership,
} from "../types";

interface validateCertificatesProps {
  items: Certificate[];
  showToast: ShowToastFunction;
}

interface validateMembershipsProps {
  items: Membership[];
  showToast: ShowToastFunction;
}

interface validateInsurancesProps {
  items: Insurance[];
  showToast: ShowToastFunction;
}

interface validateBusinessImageAndDescriptionProps {
  businessDescription: string;
  businessImages: File[];
  fetchedBusinessFile?: FetchedBusinessImageType[];
  showToast: ShowToastFunction;
}

interface validateBusinessInfoProps {
  expertInfo: RegisterExpertInfoType;
  businessCountry: string;
  showToast: ShowToastFunction;
}

interface validateProfileInfoProps {
  expertInfo: RegisterExpertInfoType;
  selectedLanguage: string[];
  selectedCountry: string;
  showToast: ShowToastFunction;
}

export function validateCertificates({
  items,
  showToast,
}: validateCertificatesProps) {
  for (let index = 0; index < items?.length; index++) {
    const certificate = items[index];

    if (
      !certificate.issuingOrganisation &&
      (certificate.verificationNumber ||
        certificate.issuingDate ||
        certificate.expiringDate ||
        certificate.certificate ||
        certificate.isCertificateExpire)
    ) {
      showToast({
        message: `Issuing Organisation is required for certificate ${
          index + 1
        } when other fields are filled.`,
        type: "error",
        duration: 8000,
      });
      return false;
    }

    if (certificate.issuingOrganisation) {
      if (!certificate.issuingDate) {
        showToast({
          message: `Issuing Date is required for certificate ${
            index + 1
          } when Issuing Organisation is provided.`,
          type: "error",
          duration: 8000,
        });
        return false;
      }

      if (!certificate.expiringDate && !certificate.isCertificateExpire) {
        showToast({
          message: `Expiring Date is required or "This certificate doesn't expire" must be checked for certificate ${
            index + 1
          }.`,
          type: "error",
          duration: 8000,
        });
        return false;
      }
    }
  }
  return true;
}

export function validateMemberships({
  items,
  showToast,
}: validateMembershipsProps) {
  for (let index = 0; index < items?.length; index++) {
    const member = items[index];

    if (
      !member.organisation &&
      (member.positionHeld ||
        member.startDate ||
        member.endDate ||
        member.isMembershipExpire)
    ) {
      showToast({
        message: `Organisation is required for membership ${
          index + 1
        } when other fields are filled.`,
        type: "error",
        duration: 8000,
      });
      return false;
    }

    if (member.organisation) {
      if (!member.startDate) {
        showToast({
          message: `State Date is required for membership ${
            index + 1
          } when Organisation is provided.`,
          type: "error",
          duration: 8000,
        });
        return false;
      }
      if (!member.positionHeld) {
        showToast({
          message: `Position held is required for membership ${
            index + 1
          } when Organisation is provided.`,
          type: "error",
          duration: 8000,
        });
        return false;
      }

      if (!member.endDate && !member.isMembershipExpire) {
        showToast({
          message: `End Date is required or "No end date" must be checked for membership ${
            index + 1
          }.`,
          type: "error",
          duration: 8000,
        });
        return false;
      }
    }
  }
  return true;
}

export function validateInsurances({
  items,
  showToast,
}: validateInsurancesProps) {
  for (let index = 0; index < items?.length; index++) {
    const insure = items[index];

    if (
      !insure.issuingOrganisation &&
      (insure.coverage || insure.description)
    ) {
      showToast({
        message: `Issuing Organisation is required for insurace ${
          index + 1
        } when other fields are filled.`,
        type: "error",
        duration: 8000,
      });
      return false;
    }

    if (insure.issuingOrganisation) {
      if (!insure.coverage) {
        showToast({
          message: `Type of coverage is required for insurance ${
            index + 1
          } when Issuing Organisation is provided.`,
          type: "error",
          duration: 8000,
        });
        return false;
      }
    }
  }
  return true;
}

export function validateBusinessImageAndDescription({
  businessDescription,
  businessImages,
  fetchedBusinessFile,
  showToast,
}: validateBusinessImageAndDescriptionProps) {
  if (!businessDescription) {
    showToast({
      message: "Please enter a business description",
      type: "error",
      duration: 8000,
    });
    return false;
  }
  if (
    businessImages?.length === 0 &&
    fetchedBusinessFile?.length === 0 &&
    !fetchedBusinessFile
  ) {
    showToast({
      message: "Please select at least one business image",
      type: "error",
      duration: 8000,
    });
    return false;
  }
  return true;
}

export function validateBusinessInfo({
  expertInfo,
  businessCountry,
  showToast,
}: validateBusinessInfoProps) {
  if (
    !expertInfo.businessName ||
    !expertInfo.yearFounded ||
    !businessCountry ||
    !expertInfo.numberOfEmployee ||
    !expertInfo.businessAddress ||
    !expertInfo.businessCity ||
    !expertInfo.businessState ||
    !expertInfo.startingPrice ||
    !expertInfo.noticePeriod
  ) {
    showToast({
      message: "Please fill all business info.",
      type: "error",
      duration: 8000,
    });
    return false;
  }
  return true;
}

export function validateProfileInfo({
  expertInfo,
  selectedLanguage,
  selectedCountry,
  showToast,
}: validateProfileInfoProps) {
  if (
    !expertInfo.firstName ||
    !expertInfo.lastName ||
    !selectedLanguage ||
    !selectedCountry ||
    !expertInfo.phoneNumber ||
    !expertInfo.city ||
    !expertInfo.state ||
    !expertInfo.address ||
    !expertInfo.bio
  ) {
    showToast({
      message: "Please fill all profile info.",
      type: "error",
      duration: 8000,
    });
    return false;
  }
  return true;
}
