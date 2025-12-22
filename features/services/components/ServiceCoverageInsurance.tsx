import ServiceCoverage from "./ServiceCoverage";
import UserInsuranceInfo from "./UserInsuranceInfo";

const ServiceCoverageInsurance = ({ serviceInfo }: { serviceInfo: any }) => {
  return (
    <div className="lg:col-span-3 col-span-12 flex flex-col gap-6">
      <ServiceCoverage coverageArea={serviceInfo?.business?.coverageArea} />
      <UserInsuranceInfo insurances={serviceInfo?.business?.insurance} />
    </div>
  );
};

export default ServiceCoverageInsurance;
