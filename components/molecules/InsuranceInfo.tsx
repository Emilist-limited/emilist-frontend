import LabelValue from "../atoms/LabelValue";

interface InsuranceInfoProps {
  issuingOrg: string;
  coverType: string;
  description: string;
}

const InsuranceInfo = ({
  issuingOrg,
  coverType,
  description,
}: InsuranceInfoProps) => (
  <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
    <div className="lg:col-span-3 space-y-4">
      <LabelValue label="Issuing Org" value={issuingOrg} />
      <LabelValue label="Type of Cover" value={coverType} />
      <p className="text-[#303632] max-sm:text-sm">{description}</p>
    </div>
  </div>
);

export default InsuranceInfo;
