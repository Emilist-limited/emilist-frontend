import { Membership } from "@/features/services/types";
import { membershipOptions } from "@/lib/constants";
import { ShowToastFunction } from "@/types";

import { FormInput } from "./FormInput";
import { formatDateForInput } from "@/lib/helpers/dates";
import { useDeleteBusinessItem } from "@/features/services/hooks/useDeleteBusinessItem";

import FormSelect from "./FormSelect";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import CheckboxInput from "./CheckboxInput";
import AddMoreButton from "../atoms/AddMoreButton";
import WhiteBgLoader from "../atoms/WhiteBgLoader";

interface UploadBusinessMembershipProps {
  showToast: ShowToastFunction;
  membership: Membership[];
  serviceId?: string;
  setMembership: React.Dispatch<React.SetStateAction<Membership[]>>;
}

const UploadBusinessMembership = ({
  membership,
  serviceId,
  setMembership,
}: UploadBusinessMembershipProps) => {
  const { isPending, handleDeleteBusinessItem } = useDeleteBusinessItem(
    serviceId || ""
  );

  const addMoreMembership = () => {
    setMembership([
      ...membership,
      {
        organisation: "",
        positionHeld: "",
        startDate: "",
        endDate: "",
        isMembershipExpire: false,
      },
    ]);
  };

  const handleMembershipChange = (
    index: number,
    field: keyof Membership,
    value: string | boolean
  ) => {
    setMembership((prevMembership) => {
      return prevMembership.map((memb, i) => {
        if (i === index) {
          return {
            ...memb,
            [field]: value,
            ...(field === "isMembershipExpire" && value === true
              ? { endDate: "" }
              : {}),
          };
        }
        return memb;
      });
    });
  };

  const deleteMembership = (index: number, membershipId?: string) => {
    setMembership((prevMembership) =>
      prevMembership.filter((_, i) => i !== index)
    );
    if (membershipId) {
      handleDeleteBusinessItem(membershipId, "membership");
    }
  };

  return (
    <div className="space-y-2 pt-6">
      {isPending && <WhiteBgLoader />}
      <h6 className="font-medium">Add Membership</h6>
      <div className="grid grid-cols-4 gap-10 w-full">
        {membership.map((membership, index) => (
          <div key={index} className="col-span-4 w-full">
            {index !== 0 && (
              <div className="flex justify-end">
                <button
                  className="text-red-500 font-medium text-sm hover:text-red-700 transition-all duration-300"
                  onClick={() => deleteMembership(index, membership?._id)}
                >
                  Remove membership
                </button>
              </div>
            )}
            <div className="grid grid-cols-4 gap-6 w-full">
              <div className="w-full col-span-2 max-lg:col-span-4">
                <FormInput
                  label="Organisation"
                  name={`organisation-${index}`}
                  id={`organisation-${index}`}
                  type="text"
                  value={membership.organisation}
                  onChange={(e) =>
                    handleMembershipChange(
                      index,
                      "organisation",
                      e.target.value
                    )
                  }
                />
              </div>
              <div className="w-full col-span-2 max-lg:col-span-4">
                <FormSelect
                  label="Position Held"
                  name={`positionHeld-${index}`}
                  id={`positionHeld-${index}`}
                  value={membership.positionHeld}
                  onChange={(e) =>
                    handleMembershipChange(
                      index,
                      "positionHeld",
                      e.target.value
                    )
                  }
                  options={membershipOptions}
                />
              </div>
              <div className="w-full col-span-2 max-lg:col-span-4">
                <FormInput
                  label="State Date"
                  name={`startDate-${index}`}
                  id={`startDate-${index}`}
                  type="date"
                  value={
                    membership.startDate &&
                    formatDateForInput(membership.startDate)
                  }
                  onChange={(e) =>
                    handleMembershipChange(index, "startDate", e.target.value)
                  }
                />
              </div>
              <div className="w-full col-span-2  max-lg:col-span-4   ">
                <Label htmlFor={`endDate-${index}`}>End Date</Label>
                <div className="w-full">
                  {membership.isMembershipExpire ? (
                    <div
                      className={`expert-dark-reg ${
                        membership.isMembershipExpire && "opacity-45"
                      }`}
                    />
                  ) : (
                    <Input
                      type="date"
                      name={`endDate-${index}`}
                      id={`endDate-${index}`}
                      value={
                        membership.endDate &&
                        formatDateForInput(membership.endDate)
                      }
                      onChange={(e) =>
                        handleMembershipChange(index, "endDate", e.target.value)
                      }
                    />
                  )}
                </div>
                <CheckboxInput
                  id={`isMembershipExpire-${index}`}
                  name={`isMembershipExpire-${index}`}
                  value={membership.isMembershipExpire}
                  onChange={(e) =>
                    handleMembershipChange(
                      index,
                      "isMembershipExpire",
                      e.target.checked
                    )
                  }
                  label="No end date"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end w-full">
        <AddMoreButton onClick={addMoreMembership} />
      </div>
    </div>
  );
};

export default UploadBusinessMembership;
