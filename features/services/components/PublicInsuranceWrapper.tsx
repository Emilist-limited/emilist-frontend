import NoMoreMessage from "@/components/atoms/NoMoreMessage";
import InsuranceInfo from "../../../components/molecules/InsuranceInfo";

import { Insurance } from "../types";

const PublicInsuranceWrapper = ({
  insurances,
}: {
  insurances: Insurance[];
}) => {
  return (
    <div className="pt-10">
      <h3 className="text-xl font-semibold mb-6">Insurance</h3>
      <div className="flex flex-col gap-6">
        {insurances?.length > 0 ? (
          <>
            {insurances?.map((insurance: Insurance, index: number) => (
              <InsuranceInfo
                key={index}
                issuingOrg={insurance?.issuingOrganisation || "N/A"}
                coverType={insurance?.coverage || "N/A"}
                description={insurance?.description || "N/A"}
              />
            ))}{" "}
          </>
        ) : (
          <NoMoreMessage message="No insurance provided" />
        )}
      </div>
    </div>
  );
};

export default PublicInsuranceWrapper;
