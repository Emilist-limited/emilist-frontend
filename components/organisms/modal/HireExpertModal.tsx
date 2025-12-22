"use client";

import Image from "next/image";

import CloseIcon from "@/components/atoms/CloseIcon";
import CustomButton from "@/components/atoms/CustomButton";
import CustomModal from "@/components/atoms/CustomModal";
import FormSelect from "@/components/molecules/FormSelect";
import FormTextarea from "@/components/molecules/FormTextarea";

import { FormInput } from "@/components/molecules/FormInput";
import { expertTypeOptions } from "@/lib/constants/selectOptions";
import { HiringDetails } from "@/types";
import { useToast } from "@/lib/hooks/useToast";
import { formatDate } from "@/lib/helpers/dates";

interface DateTime {
  date: string;
  time: string;
}

interface HireExpertModalProps {
  isOpen: boolean;
  onCancel: () => void;
  handleSubmit: () => void;
  handleFileChange: React.ChangeEventHandler<HTMLInputElement>;
  handleChnage: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >;
  loading: boolean;
  hiringDetails: HiringDetails;
  selectedImage: any;
  handleDelete: () => void;
  handleAddDate: (date: string, time: string) => void;
  handleRemoveDate: (date: string) => void;
  availability: DateTime[];
  handleInputChange: any;
}

const HireExpertModal = ({
  isOpen,
  onCancel,
  handleSubmit,
  handleFileChange,
  handleChnage,
  loading,
  hiringDetails,
  selectedImage,
  handleDelete,
  handleAddDate,
  handleRemoveDate,
  availability,
  handleInputChange,
}: HireExpertModalProps) => {
  const { showToast } = useToast();

  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setMonth(maxDate.getMonth() + 3); // Add 3 months

  return (
    <CustomModal isOpen={isOpen} onClose={onCancel} width="lg">
      <div className="  px-6 max-sm:px-3 pb-10">
        <h2 className="sm:text-xl font-bold  mb-4 capitalize">
          Fill the form below
        </h2>
        <div className="grid grid-cols-2 w-full gap-4">
          <div className="w-full col-span-2">
            <FormInput
              id="fullName"
              name="fullName"
              label="Full name"
              type="text"
              value={hiringDetails.fullName}
              onChange={handleChnage}
            />
          </div>
          <div className="w-full col-span-2">
            <FormInput
              id="phoneNumber"
              name="phoneNumber"
              label="phone number"
              type="text"
              value={hiringDetails.phoneNumber}
              onChange={handleChnage}
            />
          </div>
          <div className="w-full col-span-2">
            <FormInput
              id="email"
              name="email"
              label="email address"
              type="email"
              value={hiringDetails.email}
              onChange={handleChnage}
            />
          </div>
          <div className="w-full col-span-2">
            <FormSelect
              id="privateExpertType"
              name="privateExpertType"
              label="Select type of private expert"
              value={hiringDetails?.privateExpertType}
              onChange={handleChnage}
              placeholder="Select private expert type"
              options={expertTypeOptions}
            />
          </div>
          <div className="w-full col-span-2">
            <FormTextarea
              label="Give details if its a new project that you've not added to Emilist"
              id="jobDetails"
              name="jobDetails"
              rows={6}
              value={hiringDetails?.jobDetails}
              onChange={handleChnage}
            />
          </div>

          {selectedImage ? (
            <div className="w-[100px] h-[100px] relative">
              {selectedImage && (
                <Image
                  src={URL.createObjectURL(selectedImage)}
                  alt="upload"
                  width={30}
                  height={30}
                  className="object-cover w-full h-full"
                />
              )}
              <CloseIcon
                onClick={handleDelete}
                extraStyle="absolute bottom-0 right-0"
              />
            </div>
          ) : (
            <div className="">
              <label htmlFor="file" className=" flex items-center ">
                <Image
                  src="/icons/add.svg"
                  alt="logo"
                  width={130}
                  height={30}
                  className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-6 mr-1"
                />{" "}
                <p className="text-primary-green py-2 font-medium max-sm:text-sm">
                  ADD FILE
                </p>
              </label>
              <input
                style={{ fontSize: "16px" }}
                id="file"
                type="file"
                onChange={handleFileChange}
                name="file"
                className="invisible h-0 w-0"
              />
            </div>
          )}

          <div className="w-full col-span-2">
            <FormInput
              id="location"
              name="location"
              label="location"
              type="text"
              value={hiringDetails.location}
              onChange={handleChnage}
            />
          </div>
          <div className="w-full col-span-2">
            <h2 className="font-semibold mb-4 text-[#5e625f]">
              Select Your Availability
            </h2>

            {availability.map((entry, index) => (
              <div key={index} className="flex-c flex-wrap gap-2 mb-4 py-2">
                <input
                  style={{ fontSize: "14px" }}
                  type="date"
                  value={entry.date}
                  className="border rounded px-2 h-8 bg-gray-500 text-gray-100 focus:outline-none focus:border-primary-green"
                  onChange={(e) => handleInputChange(e, "date", index)}
                  min={formatDate(today)}
                  max={formatDate(maxDate)}
                />
                <input
                  style={{ fontSize: "14px" }}
                  type="time"
                  value={entry.time}
                  className="border rounded px-2 h-8 bg-gray-500 text-gray-100 focus:outline-none focus:border-primary-green"
                  onChange={(e) => handleInputChange(e, "time", index)}
                />
                <button
                  className="bg-[#ff9933] text-white px-2 h-8 rounded"
                  onClick={() => handleRemoveDate(entry.date)}
                >
                  Remove
                </button>
              </div>
            ))}

            {availability?.length < 3 && (
              <div className="flex-c gap-4 max-sm:flex-col">
                <div className="flex-1 w-full">
                  <label className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
                    Date:
                  </label>
                  <input
                    style={{ fontSize: "16px" }}
                    type="date"
                    className="expert-dark-reg-input"
                    onChange={(e) => {
                      const date = e.target.value;
                      if (!date) return;
                      const today = new Date();
                      const selectedDate = new Date(date);

                      if (selectedDate < today) {
                        showToast({
                          message: "You cannot select a past date.",
                          type: "error",
                        });
                      } else if (selectedDate > maxDate) {
                        showToast({
                          message:
                            "You can only select dates within the next 3 months.",
                          type: "error",
                        });
                      } else {
                        handleAddDate(date, "");
                      }
                    }}
                  />
                </div>
                <div className="flex-1 w-full">
                  <label className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
                    Time:
                  </label>
                  <input
                    style={{ fontSize: "16px" }}
                    type="time"
                    className="expert-dark-reg-input"
                    onChange={(e) => {
                      const time = e.target.value;
                      if (!time) return;
                      if (availability?.length > 0) {
                        const lastDate = availability[availability?.length - 1];
                        handleAddDate(lastDate.date, time);
                      }
                    }}
                  />
                </div>
              </div>
            )}

            <div className="mt-4">
              <h3 className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
                Your Availability:
              </h3>
              <ul className="list-disc list-inside">
                {availability.map((entry, index) => (
                  <li key={index}>
                    {entry.date} at {entry.time || "No time selected"}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mt-4">
          <CustomButton
            type="button"
            onClick={handleSubmit}
            className="w-40"
            loading={loading}
          >
            Send
          </CustomButton>
        </div>
      </div>
    </CustomModal>
  );
};

export default HireExpertModal;
