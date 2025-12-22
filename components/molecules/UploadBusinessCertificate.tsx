import Image from "next/image";

import { FormInput } from "./FormInput";
import { Certificate } from "@/features/services/types";
import { ShowToastFunction } from "@/types";
import { useDeleteBusinessItem } from "@/features/services/hooks/useDeleteBusinessItem";

import CloseIcon from "../atoms/CloseIcon";
import CustomButton from "../atoms/CustomButton";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import AddMoreButton from "../atoms/AddMoreButton";
import CheckboxInput from "./CheckboxInput";
import WhiteBgLoader from "../atoms/WhiteBgLoader";

interface UploadBusinessCertificateProps {
  serviceId?: string;
  showToast: ShowToastFunction;
  certification: Certificate[];
  setCertification: React.Dispatch<React.SetStateAction<Certificate[]>>;
}

const UploadBusinessCertificate = ({
  setCertification,
  certification,
  showToast,
  serviceId,
}: UploadBusinessCertificateProps) => {
  const { isPending, handleDeleteBusinessItem } = useDeleteBusinessItem(
    serviceId || ""
  );

  const addMoreCertificate = () => {
    setCertification([
      ...certification,
      {
        issuingOrganisation: "",
        verificationNumber: "",
        issuingDate: "",
        expiringDate: "",
        isCertificateExpire: false,
        certificate: null,
      },
    ]);
  };

  const handleCertificateChange = (
    index: number,
    field: keyof Certificate,
    value: string | boolean
  ) => {
    setCertification((prevCertificate) =>
      prevCertificate.map((cert, i) =>
        i === index
          ? {
              ...cert,
              [field]: value,
              ...(field === "isCertificateExpire" && value === true
                ? { expiringDate: "" }
                : {}),
            }
          : cert
      )
    );
  };

  const handleFileChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const validExtensions = ["image/jpeg", "image/jpg", "image/png"];
      const maxSizeInMB = 2 * 1024 * 1024;

      if (file.size > maxSizeInMB) {
        showToast({
          message: "File exceeds the 2MB size limit.",
          type: "error",
          duration: 8000,
        });
        return;
      }

      if (!validExtensions.includes(file.type)) {
        showToast({
          message:
            "Unsupported file type. Only jpg, jpeg, and png are allowed.",
          type: "error",
          duration: 8000,
        });
        return;
      }

      setCertification((prevCertificate) =>
        prevCertificate.map((cert, i) =>
          i === index ? { ...cert, certificate: file } : cert
        )
      );
    }
  };

  const deleteCertificateImage = (index: number, certificateId?: string) => {
    setCertification((prevCertifications) =>
      prevCertifications.map((cert, i) =>
        i === index
          ? { ...cert, certificate: null, fetchedCertificate: "" }
          : cert
      )
    );
    if (certificateId) {
      handleDeleteBusinessItem(certificateId, "certificateImage");
    }
  };

  const deleteCertificate = (index: number, certificateId?: string) => {
    setCertification((prevCertifications) =>
      prevCertifications.filter((_, i) => i !== index)
    );
    if (certificateId) {
      handleDeleteBusinessItem(certificateId, "certificate");
    }
  };

  console.log("certification", certification);
  return (
    <div className="space-y-2">
      {isPending && <WhiteBgLoader />}
      <h6 className="font-medium">Add Certificate</h6>
      <div className="grid grid-cols-4 gap-10 w-full">
        {certification?.map((certificate: Certificate, index: number) => (
          <div key={index} className="col-span-4 w-full">
            {index !== 0 && (
              <div className="flex justify-end">
                <button
                  className="text-red-500 font-medium text-sm hover:text-red-700 transition-all duration-300"
                  onClick={() => deleteCertificate(index, certificate?._id)}
                >
                  Remove certificate
                </button>
              </div>
            )}
            <div className="grid grid-cols-4 gap-6 w-full">
              <div className="col-span-2 max-lg:col-span-4 max-md:col-span-3 max-sm:col-span-4 w-full">
                <div className="w-full shadow-lg flex-c flex-col justify-center  py-5 rounded-lg">
                  <div className="w-[216px] h-[210px] bg-[#ECECEC] rounded flex-c justify-center">
                    {certificate?.fetchedCertificate ? (
                      <div className="w-full h-full relative">
                        <Image
                          src={certificate?.fetchedCertificate}
                          alt="upload"
                          width={300}
                          height={300}
                          className="object-cover w-full h-full "
                        />
                        <CloseIcon
                          onClick={() =>
                            deleteCertificateImage(index, certificate?._id)
                          }
                          extraStyle="absolute bottom-0 right-0"
                        />
                      </div>
                    ) : certificate?.certificate ? (
                      <div className="w-full h-full relative">
                        <Image
                          src={URL.createObjectURL(certificate?.certificate)}
                          alt="upload"
                          width={30}
                          height={30}
                          className="object-cover w-full h-full "
                        />
                        <CloseIcon
                          onClick={() => deleteCertificateImage(index)}
                          extraStyle="absolute bottom-0 right-0"
                        />
                      </div>
                    ) : (
                      <>
                        <span className="text-gray-500">No Image</span>
                        <input
                          style={{ fontSize: "16px" }}
                          type="file"
                          id={`certificate-${index}`}
                          accept="image/jpeg,image/jpg,image/png"
                          onChange={(e) => handleFileChange(index, e)}
                          className="invisible h-0 w-0"
                        />
                      </>
                    )}
                  </div>
                  <label htmlFor={`certificate-${index}`} className="mt-2">
                    <CustomButton asChild>Upload</CustomButton>
                  </label>
                </div>
                <div className="flex mt-6 justify-center max-lg:hidden  ">
                  <button className="custom-btn">Request Verification</button>
                </div>
              </div>
              <div className="col-span-2  max-lg:col-span-4  flex flex-col gap-5">
                <FormInput
                  name={`issuingOrganisation-${index}`}
                  id={`issuingOrganisation-${index}`}
                  label="Issuing Organisation"
                  value={certificate.issuingOrganisation}
                  onChange={(e) =>
                    handleCertificateChange(
                      index,
                      "issuingOrganisation",
                      e.target.value
                    )
                  }
                  type="text"
                />
                <FormInput
                  name={`verificationNumber-${index}`}
                  id={`verificationNumber-${index}`}
                  label="Verification Number"
                  value={certificate.verificationNumber}
                  onChange={(e) =>
                    handleCertificateChange(
                      index,
                      "verificationNumber",
                      e.target.value
                    )
                  }
                  type="text"
                />
                <FormInput
                  name={`issuingDate-${index}`}
                  id={`issuingDate-${index}`}
                  label="Issuing Date"
                  value={certificate.issuingDate}
                  onChange={(e) =>
                    handleCertificateChange(
                      index,
                      "issuingDate",
                      e.target.value
                    )
                  }
                  type="date"
                />
                <div className="w-full space-y-1">
                  <Label htmlFor={`expiringDate-${index}`}>Expiring Date</Label>
                  {certificate.isCertificateExpire ? (
                    <div
                      className={`expert-dark-reg ${
                        certificate.isCertificateExpire && "opacity-75"
                      }`}
                    />
                  ) : (
                    <Input
                      name={`expiringDate-${index}`}
                      id={`expiringDate-${index}`}
                      type="date"
                      value={certificate.expiringDate}
                      onChange={(e) =>
                        handleCertificateChange(
                          index,
                          "expiringDate",
                          e.target.value
                        )
                      }
                    />
                  )}
                  <CheckboxInput
                    id={`isCertificateExpire-${index}`}
                    name={`isCertificateExpire-${index}`}
                    value={certificate.isCertificateExpire}
                    onChange={(e) =>
                      handleCertificateChange(
                        index,
                        "isCertificateExpire",
                        e.target.checked
                      )
                    }
                    label="This certificate doesn't expire"
                  />
                </div>
              </div>
              <div className="flex justify-center lg:hidden col-span-4">
                <button className="custom-btn">Request Verification</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end w-full">
        <AddMoreButton onClick={addMoreCertificate} />
      </div>
    </div>
  );
};

export default UploadBusinessCertificate;
