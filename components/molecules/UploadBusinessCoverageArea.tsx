import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import Label from "../atoms/Label";

import { countriesAndStates } from "@/lib/constants";
import { coverageCountry } from "@/types";
import CustomButton from "../atoms/CustomButton";

interface UploadBusinessCoverageAreaProps {
  coverageArea: string[];
  setCoverageArea: React.Dispatch<React.SetStateAction<string[]>>;
}

const UploadBusinessCoverageArea = ({
  coverageArea,
  setCoverageArea,
}: UploadBusinessCoverageAreaProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<coverageCountry>({
    label: "",
    value: "",
    country: "",
    states: [],
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCountryClick = (option: any) => {
    setSelectedCountry(option);
    setIsOpen(false);
  };

  const handleStateClick = (state: string) => {
    if (coverageArea.includes(state)) {
      setCoverageArea(
        coverageArea.filter((selectedState) => selectedState !== state)
      );
    } else {
      setCoverageArea((prev) => [...prev, state]);
    }
  };

  const isStateSelected = (state: string) => {
    return coverageArea.includes(state);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("leaflet").then((L) => {
        // Your Leaflet-related code here...
        if (!mapRef.current) {
          const map = L.map("leafletMap").setView([0, 0], 2);
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap contributors",
          }).addTo(map);

          mapRef.current = map;
        }

        const handleMapClick = async (e: {
          latlng: { lat: any; lng: any };
        }) => {
          const { lat, lng } = e.latlng;

          try {
            // Use OpenCage Geocoding API to reverse geocode coordinates
            const response = await axios.get(
              `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=3d905f0e05a1485ea79ebba94f74cfa3`
            );

            const placeName =
              response.data.results[0]?.formatted || "Unknown Place";

            // Update state with the name of the place
            setCoverageArea((prev) => [...prev, placeName]);
          } catch (error) {
            console.error("Error fetching location information:", error);
          }
        };

        mapRef.current.on("click", handleMapClick);

        return () => {
          if (mapRef.current) {
            mapRef.current.off("click", handleMapClick);
          }
        };
      });
    }
  }, []);

  const filteredCountries = countriesAndStates.filter((data) =>
    data.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <div className="grid grid-cols-4 w-full gap-6 ">
        <div className="col-span-4">
          <div
            id="leafletMap"
            className="w-full"
            style={{ height: "400px" }}
          ></div>
          <p className="bg-[#DDFBE9] px-10 py-3 text-sm rounded-full max-sm:text-xs my-6 min-w-80 w-fit">
            <span className="font-bold text-base">Coverage:</span>{" "}
            {coverageArea.join(", ")}
          </p>
          {coverageArea?.length > 0 && (
            <CustomButton onClick={() => setCoverageArea([])}>
              Reset Location
            </CustomButton>
          )}
        </div>
        <div className="col-span-4 border-t-1 border-[#B8B9B8] w-full pt-4">
          <p className="py-2 font-medium max-sm:text-sm">Select manually</p>
          <div className="md:w-1/2 w-full">
            <div className="input__container ">
              <Label htmlFor="coverageCountry">Country</Label>
              <div className="relative w-full">
                <button
                  onClick={toggleDropdown}
                  type="button"
                  className="min-w-full w-full max-w-full rounded-lg min-h-10 px-2 bg-[#ececec]  focus:outline-none focus-within:border-primary-green focus-within:border-1 flex-c-b z-0"
                >
                  <p>{selectedCountry?.country || "Select a country"}</p>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {isOpen && (
                  <div className="absolute right-0 w-full mt-1 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg">
                    <div className="p-2">
                      <input
                        style={{ fontSize: "14px" }}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                        className="w-full px-2 py-2 border rounded-md focus:outline-none  focus:border-primary-green bg-white"
                      />
                    </div>
                    <div className="max-h-36 overflow-y-auto">
                      <ul role="list" className="py-1 w-full">
                        {filteredCountries?.length > 0 ? (
                          filteredCountries?.map((country, index) => (
                            <li key={index} className="w-full">
                              <button
                                onClick={() => handleCountryClick(country)}
                                className="block px-2 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                              >
                                {country.country}
                              </button>
                            </li>
                          ))
                        ) : (
                          <li className="px-4 py-2 text-sm text-gray-500">
                            No results found
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 w-full mt-8 gap-4 max-h-96 overflow-y-auto py-5">
            {selectedCountry &&
              selectedCountry?.states?.map((state: any, index: number) => (
                <div
                  className="col-span-1 max-lg:col-span-2 max-md:col-span-1 max-sm:col-span-2 flex justify-between items-center shadow-md px-4 py-4 rounded-[10px]"
                  key={index}
                  onClick={() => handleStateClick(state)}
                >
                  <p className="">{state}</p>
                  <div className="flex gap-4">
                    <Image
                      src={
                        isStateSelected(state)
                          ? "/icons/checkbox-filled.svg"
                          : "/icons/checkbox.svg"
                      }
                      alt="arrow-left"
                      width={25}
                      height={25}
                      className="object-contain  cursor-pointer"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadBusinessCoverageArea;
