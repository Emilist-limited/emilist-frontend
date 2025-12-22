"use client";

import { Dispatch, SetStateAction } from "react";

import { RegisterExpertInfoType } from "@/types";
import { countries, languages } from "@/lib/constants";

import { FormInput } from "./FormInput";
import Label from "../atoms/Label";
import MultiSelectDropdown from "./MultiSelectDropdown";
import SearchableDropdown from "./SearchableDropdown";
import FormTextarea from "./FormTextarea";

interface RegisterServiceExpertFormProps {
  expertInfo: RegisterExpertInfoType;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  selectedLanguage: string[];
  setSelectedLanguage: Dispatch<SetStateAction<string[]>>;
}

const RegisterServiceExpertForm = ({
  expertInfo,
  handleChange,
  selectedCountry,
  setSelectedCountry,
  selectedLanguage,
  setSelectedLanguage,
}: RegisterServiceExpertFormProps) => {
  return (
    <div className="grid grid-cols-4 gap-6 w-full">
      <div className="input__container ">
        <FormInput
          id="firstName"
          name="firstName"
          label="First Name"
          type="text"
          value={expertInfo?.firstName}
          onChange={handleChange}
        />
      </div>
      <div className="input__container ">
        <FormInput
          id="lastName"
          name="lastName"
          label="Last Name"
          type="text"
          value={expertInfo?.lastName}
          onChange={handleChange}
        />
      </div>
      <div className="input__container ">
        <FormInput
          id="phoneNumber"
          name="phoneNumber"
          label="Phone Number"
          type="text"
          value={expertInfo?.phoneNumber}
          onChange={handleChange}
        />
      </div>
      <div className="input__container space-y-1">
        <Label htmlFor="language">Language</Label>
        <MultiSelectDropdown
          selectedOptions={selectedLanguage}
          setSelectedOptions={setSelectedLanguage}
          options={languages}
          placeholder="Select a language"
          customPlaceholder="Specify"
        />
      </div>
      <div className="input__container space-y-1">
        <Label htmlFor="country">Country</Label>
        <SearchableDropdown
          selectedOption={selectedCountry}
          setSelectedOption={setSelectedCountry}
          options={countries}
        />
      </div>
      <div className="input__container ">
        <FormInput
          id="state"
          name="state"
          label="State"
          type="text"
          value={expertInfo?.state}
          onChange={handleChange}
        />
      </div>
      <div className="input__container ">
        <FormInput
          id="city"
          name="city"
          label="City"
          type="text"
          value={expertInfo?.city}
          onChange={handleChange}
        />
      </div>
      <div className="input__container ">
        <FormInput
          id="address"
          name="address"
          label="Address"
          type="text"
          value={expertInfo?.address}
          onChange={handleChange}
        />
      </div>
      <div className="w-full col-span-4">
        <FormTextarea
          id="bio"
          name="bio"
          label="Bio"
          rows={4}
          value={expertInfo?.bio}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default RegisterServiceExpertForm;
