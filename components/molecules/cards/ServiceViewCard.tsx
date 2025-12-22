import Image from "next/image";
import { useContext } from "react";

import { AuthContext } from "@/lib/context/AuthState";
import { numberWithCommas } from "@/lib/helpers";
import { ROUTES } from "@/lib/constants/routes";
import { getCurrencySign } from "@/lib/helpers/getCurrencySign";

import CompareButton from "@/components/atoms/CompareButton";
import CustomButton from "@/components/atoms/CustomButton";
import FavoriteButton from "@/components/atoms/FavouriteButton";
import ServiceCardInfo from "../ServiceCardInfo";

interface ServiceViewCardProps {
  handleLike: (id: string) => void;
  handleUnlike: (id: string) => void;
  compare: (id: string) => void;
  expert: any;
  isShadow?: boolean;
}

const ServiceViewCard = ({
  handleLike,
  handleUnlike,
  expert,
  compare,
  isShadow = true,
}: ServiceViewCardProps) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div
      className={`w-full grid md:grid-cols-5 grid-cols-6 gap-3 py-4 sm:px-6 hover:bg-gray-100 duration-300 ${
        isShadow && "shadow rounded-2xl"
      }`}
    >
      {Array.isArray(expert?.businessImages) &&
      expert?.businessImages[0]?.imageUrl ? (
        <Image
          src={expert?.businessImages[0]?.imageUrl}
          alt={expert?.services[0]}
          width={380}
          height={276}
          className="md:col-span-1 col-span-2 object-cover w-full sm:h-36  h-28 rounded-lg  max-sm:hidden"
        />
      ) : (
        <Image
          src="/images/Logo.svg"
          alt={expert?.services[0]}
          width={130}
          height={30}
          className="md:col-span-1 col-span-2 object-contain w-full sm:h-36  h-28 rounded-lg shadow px-2  max-sm:hidden"
        />
      )}
      <div className="sm:col-span-4 col-span-6 flex justify-between max-md:flex-col md:gap-10 gap-2 max-sm:px-2">
        <ServiceCardInfo expert={expert} />
        <div className="flex flex-col sm:items-end max-sm:items-start justify-between">
          <div className="flex sm:flex-col max-sm:items-center gap-1">
            <p className="sm:text-2xl font-bold text-primary-green">
              {expert?.currency && getCurrencySign(expert?.currency)}
              {expert?.startingPrice
                ? numberWithCommas(expert?.startingPrice)
                : 0}
            </p>
            <p className="sm:text-sm text-xs">Starting price</p>
          </div>

          <CustomButton
            href={
              currentUser?._id === expert?.userId
                ? ROUTES?.DASHBOARD_SERVICE_INFO(expert?._id)
                : ROUTES?.GENERAL_EXPERT_DETAILS(expert?._id)
            }
          >
            View Details
          </CustomButton>
        </div>
      </div>
      <div className="col-span-1 max-md:hidden" />
      <div className="md:col-span-4 col-span-6 border-t-1 border-[#B8B9B8] flex-c justify-end sm:gap-10 gap-5 py-2 max-sm:px-2">
        <FavoriteButton
          liked={expert?.liked}
          onSave={() => handleLike(expert._id)}
          onUnsave={() => handleUnlike(expert._id)}
        />
        <CompareButton
          compare={() => compare(expert._id)}
          isCompare={expert?.isCompared}
        />
      </div>
    </div>
  );
};

export default ServiceViewCard;
