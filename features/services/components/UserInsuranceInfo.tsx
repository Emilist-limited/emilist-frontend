import InsuranceValue from "./InsuranceValue";
import NoMoreMessage from "@/components/atoms/NoMoreMessage";

import { Insurance } from "../types";

const UserInsuranceInfo = ({ insurances }: { insurances: Insurance[] }) => {
  return (
    <div className="bg-white rounded-lg py-6 sm:px-10 px-4 space-y-4">
      <h5 className="font-semibold max-sm:text-sm">Insurance</h5>
      <div className="flex flex-col gap-6">
        {insurances?.length > 0 ? (
          <>
            {insurances?.map((insurance: Insurance, index: number) => (
              <div className="space-y-4" key={index}>
                <InsuranceValue
                  title="Issuing Org:"
                  value={insurance?.issuingOrganisation || "N/A"}
                />
                <InsuranceValue
                  title="Type of cover:"
                  value={insurance?.coverage || "N/A"}
                />
                <InsuranceValue
                  title="Description:"
                  value={insurance?.description || "N/A"}
                />
              </div>
            ))}
          </>
        ) : (
          <NoMoreMessage message="No insurance provided" />
        )}
      </div>
    </div>
  );
};

export default UserInsuranceInfo;
