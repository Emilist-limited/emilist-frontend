import { useState } from "react";

export const useLocation = () => {
  const [location, setLocation] = useState<string>("");

  const validateLocation = async (enteredLocation: string) => {
    const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!googleMapsApiKey) {
      throw new Error("Google Maps API key is not defined.");
    }
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        enteredLocation
      )}&key=${googleMapsApiKey}`
    );
    const data = await response.json();
    return data.status === "OK";
  };

  return { location, setLocation, validateLocation };
};
