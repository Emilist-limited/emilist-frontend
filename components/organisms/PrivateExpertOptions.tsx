"use client";

import Image from "next/image";

import HireExpertModal from "./modal/HireExpertModal";
import PrivateImg from "./../../public/images/privateExpertImg.png";

import { useHirePrivateExpert } from "@/features/services/hooks/useHirePrivateExpert";
import CustomButton from "../atoms/CustomButton";

const PrivateExpertOptions = () => {
  const {
    handleSubmit,
    handleFileChange,
    handleChnage,
    loading,
    hiringDetails,
    selectedImage,
    setIsOpen,
    isOpen,
    onCancel,
    handleDelete,
    handleAddDate,
    handleRemoveDate,
    availability,
    handleInputChange,
  } = useHirePrivateExpert();

  return (
    <section className="padding-ctn pt-16">
      {/* Modal for hiring expert */}
      <HireExpertModal
        handleSubmit={handleSubmit}
        handleFileChange={handleFileChange}
        handleChnage={handleChnage}
        loading={loading}
        hiringDetails={hiringDetails}
        selectedImage={selectedImage}
        isOpen={isOpen}
        onCancel={onCancel}
        handleDelete={handleDelete}
        handleAddDate={handleAddDate}
        handleRemoveDate={handleRemoveDate}
        availability={availability}
        handleInputChange={handleInputChange}
      />
      <div className="flex gap-6 pb-20 max-md:flex-col max-md:items-center">
        <h4 className="text-4xl font-bold  max-sm:text-xl md:hidden">
          Investigator
        </h4>
        <div className="flex-1">
          <Image
            src={PrivateImg}
            alt="private expert"
            width={610}
            height={340}
            placeholder="blur"
            className="object-cover w-[610px] h-[340px] rounded-xl max-sm:w-full max-sm:h-[220px]"
          />
        </div>
        <div className="flex-1 flex flex-col gap-5">
          <h4 className="text-4xl font-bold  max-sm:text-xl max-md:hidden">
            Private Experts
          </h4>
          <p className="max-sm:text-sm  max-md:text-center">
            The success of your project starts with clarity and authentication
            of project elements. Click here to engage the services of EmiList
            investigators to help you navigate the authentication of your
            project resources like work status, land, documents, contracts,
            agreements, qualifications, and certifications
          </p>
          <div className="w-full flex max-md:justify-center">
            <CustomButton type="button" onClick={() => setIsOpen(true)}>
              Register Now
            </CustomButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivateExpertOptions;
