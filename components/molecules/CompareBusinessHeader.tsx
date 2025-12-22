import CompareImage from "../atoms/CompareImage";
import CompareText from "../atoms/CompareText";
import CustomCompareButton from "../atoms/CustomCompareButton";

import { Capitalize, numberWithCommas } from "@/lib/helpers";
import { getCurrencySign } from "@/lib/helpers/getCurrencySign";

const CompareBusinessHeader = ({
  expert,
  onContactClick,
}: {
  expert: any;
  onContactClick: (userId: string) => void;
}) => (
  <div className="w-full h-[330px] border-b px-2 py-6">
    <h5 className="text-lg font-bold mb-2 truncate">
      {expert?.firstName && Capitalize(expert?.firstName)}{" "}
      {expert?.lastName && Capitalize(expert?.lastName)}
    </h5>
    {Array.isArray(expert?.businessImages) &&
    expert?.businessImages[0]?.imageUrl ? (
      <CompareImage
        src={expert?.businessImages[0]?.imageUrl}
        alt={expert?.businessName}
        width={380}
        height={276}
        className="min-w-full h-[170px]"
      />
    ) : (
      <CompareImage
        src="/images/Logo.svg"
        alt={expert?.businessName}
        width={130}
        height={30}
        className="object-contain min-w-full h-[170px] border"
      />
    )}
    <div>
      <div className="flex justify-between gap-1 pt-2">
        <CompareText className="whitespace-nowrap pb-2 text-base max-sm:text-xs">
          Starting price
        </CompareText>
        <CustomCompareButton onClick={() => onContactClick(expert?.userId)}>
          Contact
        </CustomCompareButton>
      </div>
      <h3 className="text-lg font-bold text-primary-green">
        {expert?.currency && getCurrencySign(expert?.currency)}
        {expert?.startingPrice ? numberWithCommas(expert?.startingPrice) : 0}
      </h3>
    </div>
  </div>
);
export default CompareBusinessHeader;
