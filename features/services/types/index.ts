export interface DateTime {
  date: string;
  time: string;
}

export interface Certificate {
  issuingOrganisation: string;
  verificationNumber: string;
  issuingDate: string;
  expiringDate: string;
  isCertificateExpire: boolean;
  certificate: File | null;
  fetchedCertificate?: string;
  _id?: string;
}

export interface Membership {
  organisation: string;
  positionHeld: string;
  startDate: string;
  endDate: string;
  isMembershipExpire: boolean;
  _id?: string;
}

export interface Insurance {
  issuingOrganisation: string;
  coverage: string;
  description: string;
  _id?: string;
}

export interface ServiceProps {
  businessName: string;
  _id: string;
}

export type RegisterServicePayload = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  city: string;
  address: string;
  bio: string;
  state: string;
  businessName: string;
  yearFounded: string;
  numberOfEmployee: string;
  businessAddress: string;
  businessCity: string;
  businessState: string;
  startingPrice: string;
  noticePeriod: string;
  currency: string;
  businessDescription: string;
  services: string[];
  languages: string[];
  profileImage: File | null;
  country: string;
  businessCountry: string;
  businessImages: File[];
  coverageArea: string[];
  certification: Certificate[];
  membership: Membership[];
  insurance: Insurance[];
};

export interface FetchedBusinessImageType {
  imageUrl: string;
  _id: string;
}

export interface BusinessProfileProps {
  handleOpenModal: () => void;
  isBusinessOwnerCurrentUser?: boolean;
  serviceInfo: {
    profileImage: string;
    firstName?: string;
    lastName?: string;
    userId: { level?: string; _id: string };
    averageRating?: number;
    totalReviews?: number;
    createdAt: Date;
    state?: string;
    country?: string;
    languages?: string[];
    noticePeriod?: number;
    bio?: string;
    totalJobs?: number;
    successfulJobs?: number;
    unsuccessfulJobs?: number;
    successRate?: number;
    insurance: Insurance[];
    certification: Certificate[];
    membership: Membership[];
  };
}
