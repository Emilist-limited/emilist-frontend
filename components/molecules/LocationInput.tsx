"use client";

import { StandaloneSearchBox } from "@react-google-maps/api";

import Label from "../atoms/Label";
import Input from "../atoms/Input";

interface LocationInputProps {
  autocompleteRef: React.MutableRefObject<google.maps.places.SearchBox | null>;
  handlePlacesChanged: () => void;
  location: string;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

const LocationInput = ({
  autocompleteRef,
  handlePlacesChanged,
  location,
  handleChange,
}: LocationInputProps) => {
  return (
    <div className="w-full">
      <Label htmlFor="location">Location</Label>
      <div className="w-full">
        <StandaloneSearchBox
          onLoad={(ref) => (autocompleteRef.current = ref)}
          onPlacesChanged={handlePlacesChanged}
        >
          <Input
            id="location"
            type="text"
            placeholder="Search for a location"
            name="location"
            value={location}
            onChange={handleChange}
          />
        </StandaloneSearchBox>
        <p className="text-xs text-dark-green">
          Please enter a valid address from the suggestions.
        </p>
      </div>
    </div>
  );
};

export default LocationInput;
