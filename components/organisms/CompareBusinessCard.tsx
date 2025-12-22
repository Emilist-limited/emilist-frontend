import { Capitalize, numberWithCommas } from "@/lib/helpers";

import CompareText from "../atoms/CompareText";
import CompareBusinessHeader from "../molecules/CompareBusinessHeader";
import CompareBusinessActions from "../molecules/CompareBusinessActions";
import CompareServicesList from "../molecules/CompareServicesList";
import CompareLanguagesList from "../molecules/CompareLanguagesList";

const CompareBusinessCard = ({
  expert,
  onContactClick,
  onRemove,
}: {
  expert: any;
  onContactClick: (userId: string) => void;
  onRemove: (id: string) => void;
}) => (
  <div className="flex flex-col max-sm:text-sm max-w-[250px] w-[250px] min-w-[250px] overflow-y-hidden">
    <CompareBusinessHeader expert={expert} onContactClick={onContactClick} />
    <CompareText className="px-2 py-6 border-b">Level 5</CompareText>
    <CompareText className="px-2 py-6 h-[200px] overflow-y-auto border-b">
      {expert?.bio}
    </CompareText>
    <CompareText className="px-2 py-6 border-b">
      {expert?.averageRating ? numberWithCommas(expert?.averageRating) : 0}
    </CompareText>
    <CompareText className="px-2 py-6 border-b">
      {expert?.totalReviews ? numberWithCommas(expert?.totalReviews) : 0}
    </CompareText>
    <CompareServicesList services={expert?.services} />
    <CompareText className="px-2 py-6 border-b">
      {expert?.completedJobs ? numberWithCommas(expert?.completedJobs) : 0}
    </CompareText>
    <CompareText className="px-2 py-6 border-b">
      {expert?.noticePeriod && numberWithCommas(expert?.noticePeriod)} days
    </CompareText>
    <CompareText className="px-2 py-6 border-b">
      {expert?.businessState && Capitalize(expert?.businessState)},{" "}
      {expert?.businessCountry && Capitalize(expert?.businessCountry)}
    </CompareText>
    <CompareLanguagesList languages={expert?.languages} />
    <CompareBusinessActions expertId={expert?._id} onRemove={onRemove} />
  </div>
);

export default CompareBusinessCard;
