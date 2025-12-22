import { convertDateFormat } from "@/lib/helpers";

interface BusinessOwnerInfoProps {
  createdAt?: Date;
  state?: string;
  country?: string;
  languages?: string[];
  noticePeriod?: number;
}

const BusinessOwnerInfo = ({
  createdAt,
  state,
  country,
  languages,
  noticePeriod,
}: BusinessOwnerInfoProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-4xl">
    <div>
      <h4 className="text-lg font-semibold mb-2">Member Since</h4>
      <p className="text-[#303632] max-sm:text-sm">
        {createdAt ? convertDateFormat(createdAt) : "N/A"}
      </p>
    </div>
    <div>
      <h4 className="text-lg font-semibold mb-2">Location</h4>
      <p className="text-[#303632] max-sm:text-sm">
        {state && country ? `${state}, ${country}` : "Location not specified"}
      </p>
    </div>
    <div>
      <h4 className="text-lg font-semibold mb-2">Languages</h4>
      <p className="text-[#303632] max-sm:text-sm">
        {languages?.length ? languages.join(", ") : "Not specified"}
      </p>
    </div>
    <div>
      <h4 className="text-lg font-semibold mb-2">Notice Period</h4>
      <p className="text-[#303632] max-sm:text-sm">
        {noticePeriod ? `${noticePeriod} days` : "N/A"}
      </p>
    </div>
  </div>
);

export default BusinessOwnerInfo;
