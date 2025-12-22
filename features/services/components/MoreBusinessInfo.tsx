import IconInfo from "@/components/molecules/IconInfo";

import { Capitalize, numberWithCommas } from "@/lib/helpers";
import { getCurrencySign } from "@/lib/helpers/getCurrencySign";

const MoreBusinessInfo = ({ serviceInfo }: { serviceInfo: any }) => {
  return (
    <div className="w-full border-b-1 border-[#B8B9B8] px-10 max-sm:px-4 py-6">
      <div className="flex items-center sm:gap-20 gap-10 flex-wrap">
        <IconInfo
          imgUrl="/icons/calendar.svg"
          alt="layer-icon"
          value={serviceInfo?.business?.yearFounded || "N/A"}
          title="Year founded"
        />
        <IconInfo
          imgUrl="/icons/dollar-circle.svg"
          alt="layer-icon"
          value={`${
            serviceInfo?.business?.currency &&
            getCurrencySign(serviceInfo?.business?.currency)
          }${
            serviceInfo?.business?.startingPrice &&
            numberWithCommas(serviceInfo?.business?.startingPrice)
          }`}
          title="Starting price"
        />
        <IconInfo
          imgUrl="/icons/calendar.svg"
          alt="layer-icon"
          value={serviceInfo?.business?.noticePeriod || "N/A"}
          title="Notice period"
        />
        <IconInfo
          imgUrl="/icons/location.svg"
          alt="layer-icon"
          value={
            `${
              serviceInfo?.business?.businessState &&
              Capitalize(serviceInfo?.business?.businessState)
            } ${
              serviceInfo?.business?.businessCountry &&
              Capitalize(serviceInfo?.business?.businessCountry)
            }` || "N/A"
          }
          title="Location"
        />
        <IconInfo
          imgUrl="/icons/user.svg"
          alt="layer-icon"
          value={serviceInfo?.business?.numberOfEmployee || "N/A"}
          title="No of employee"
        />
      </div>
    </div>
  );
};

export default MoreBusinessInfo;
