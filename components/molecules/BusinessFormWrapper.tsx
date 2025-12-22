"use client";

import { FormInput } from "./FormInput";
import Label from "../atoms/Label";
import SearchableDropdown from "./SearchableDropdown";
import FormSelect from "./FormSelect";
import GuideDescription from "../atoms/GuideDescription";
import Input from "../atoms/Input";

import { RegisterExpertInfoType } from "@/types";
import { countries, currencyLabel } from "@/lib/constants";

interface BusinessFormWrapperProps {
  expertInfo: RegisterExpertInfoType;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  businessCountry: string;
  setBusinessCountry: (country: string) => void;
}

const BusinessFormWrapper = ({
  expertInfo,
  handleChange,
  businessCountry,
  setBusinessCountry,
}: BusinessFormWrapperProps) => {
  return (
    <div className="flex flex-col gap-6 col-span-3 max-lg:col-span-5 max-md:col-span-3 max-sm:col-span-5">
      <FormInput
        id="businessName"
        name="businessName"
        label="Business Name"
        type="text"
        value={expertInfo?.businessName}
        onChange={handleChange}
      />
      <FormInput
        id="yearFounded"
        name="yearFounded"
        label="Year Founded"
        type="text"
        value={expertInfo?.yearFounded}
        onChange={handleChange}
      />
      <FormInput
        id="numberOfEmployee"
        name="numberOfEmployee"
        label="No Of Employees"
        type="text"
        value={expertInfo?.numberOfEmployee}
        onChange={handleChange}
      />
      <FormInput
        id="businessAddress"
        name="businessAddress"
        label="Business Address"
        type="text"
        value={expertInfo?.businessAddress}
        onChange={handleChange}
      />
      <FormInput
        id="businessCity"
        name="businessCity"
        label="Business City"
        type="text"
        value={expertInfo?.businessCity}
        onChange={handleChange}
      />
      <FormInput
        id="businessState"
        name="businessState"
        label="Business State"
        type="text"
        value={expertInfo?.businessState}
        onChange={handleChange}
      />
      <div className="w-full space-y-1">
        <Label htmlFor="country">Business Country</Label>
        <SearchableDropdown
          selectedOption={businessCountry}
          setSelectedOption={setBusinessCountry}
          options={countries}
        />
      </div>
      <FormSelect
        id="currency"
        name="currency"
        label="Currency"
        value={expertInfo?.currency}
        onChange={handleChange}
        options={currencyLabel}
      />
      <FormInput
        id="startingPrice"
        name="startingPrice"
        label="Start Price"
        type="text"
        value={expertInfo?.startingPrice}
        onChange={handleChange}
      />
      <div className="space-y-1 w-full">
        <Label htmlFor="noticePeriod">Notice Period</Label>
        <GuideDescription>Notice period is in days</GuideDescription>
        <Input
          id="noticePeriod"
          name="noticePeriod"
          type="text"
          value={expertInfo?.noticePeriod}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default BusinessFormWrapper;
