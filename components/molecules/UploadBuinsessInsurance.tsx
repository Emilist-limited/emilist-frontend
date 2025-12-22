import { Insurance } from "@/features/services/types";
import { FormInput } from "./FormInput";
import { insuranceOptions } from "@/lib/constants";
import { useDeleteBusinessItem } from "@/features/services/hooks/useDeleteBusinessItem";

import FormSelect from "./FormSelect";
import FormTextarea from "./FormTextarea";
import AddMoreButton from "../atoms/AddMoreButton";
import WhiteBgLoader from "../atoms/WhiteBgLoader";

interface UploadBuinsessInsuranceProps {
  insurance: Insurance[];
  serviceId?: string;
  setInsurance: React.Dispatch<React.SetStateAction<Insurance[]>>;
}

const UploadBuinsessInsurance = ({
  insurance,
  setInsurance,
  serviceId,
}: UploadBuinsessInsuranceProps) => {
  const { isPending, handleDeleteBusinessItem } = useDeleteBusinessItem(
    serviceId || ""
  );

  const addMoreInsurance = () => {
    setInsurance([
      ...insurance,
      {
        issuingOrganisation: "",
        coverage: "",
        description: "",
      },
    ]);
  };

  const handleChange = (
    index: number,
    field: keyof Insurance,
    value: string | boolean
  ) => {
    setInsurance((insurance) => {
      return insurance.map((insur, i) => {
        if (i === index) {
          return {
            ...insur,
            [field]: value,
          };
        }
        return insur;
      });
    });
  };

  const deleteInsurance = (index: number, insuranceId?: string) => {
    setInsurance((prevInsurance) =>
      prevInsurance.filter((_, i) => i !== index)
    );
    if (insuranceId) {
      handleDeleteBusinessItem(insuranceId, "insurance");
    }
  };
  return (
    <div className="w-full">
      {isPending && <WhiteBgLoader />}
      {insurance.map((insure, index) => (
        <div className="pt-6" key={index}>
          {index !== 0 && (
            <div className="flex justify-end">
              <button
                className="text-red-500 font-medium text-sm hover:text-red-700 transition-all duration-300"
                onClick={() => deleteInsurance(index, insure?._id)}
              >
                Remove Insurance
              </button>
            </div>
          )}
          <div className="grid grid-cols-4 gap-6 w-full" key={index}>
            <div className=" col-span-2 max-lg:col-span-4 max-md:col-span-2 max-sm:col-span-4">
              <FormInput
                id={`issuingOrganisation-${index}`}
                name={`issuingOrganisation-${index}`}
                label=" Inssuing organisation"
                value={insure.issuingOrganisation}
                onChange={(e) =>
                  handleChange(index, "issuingOrganisation", e.target.value)
                }
                type="text"
              />
            </div>
            <div className=" col-span-2 max-lg:col-span-4 max-md:col-span-2 max-sm:col-span-4">
              <FormSelect
                id={`coverage-${index}`}
                name={`coverage-${index}`}
                label="Type of coverage"
                value={insure.coverage}
                onChange={(e) =>
                  handleChange(index, "coverage", e.target.value)
                }
                options={insuranceOptions}
              />
            </div>
            <div className="col-span-4 w-full">
              <FormTextarea
                label=" Short description of what is covered"
                id="description"
                name="description"
                rows={4}
                value={insure.description}
                onChange={(e) =>
                  handleChange(index, "description", e.target.value)
                }
              />
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-end w-full">
        <AddMoreButton onClick={addMoreInsurance} />
      </div>
    </div>
  );
};

export default UploadBuinsessInsurance;
