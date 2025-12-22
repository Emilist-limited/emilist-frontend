import Link from "next/link";
import { useContext } from "react";

import PopularImage from "@/components/atoms/PopularImage";
import PopularPriceDisplay from "@/components/atoms/PopularPriceDisplay";
import PopularTitleName from "@/components/atoms/PopularTitleName";

import { MaterialCardProps } from "@/types";
import { ROUTES } from "@/lib/constants/routes";
import { AuthContext } from "@/lib/context/AuthState";

const MaterialCard = ({ material, onClick }: MaterialCardProps) => {
  const { currentUser } = useContext(AuthContext);
  const isMaterialOwner =
    currentUser?._id === material?.userId?._id ||
    currentUser?._id === material?.userId;

  const materialDetailsRoute = isMaterialOwner
    ? ROUTES?.USER_MATERIAL_DETAILS(material?._id)
    : ROUTES?.GENERAL_MATERIAL_DETAILS(material?._id);

  return (
    <Link
      href={materialDetailsRoute}
      className="flex flex-col gap-2 group"
      onClick={onClick}
    >
      <PopularImage
        imageUrl={material?.images?.[0]?.imageUrl}
        title={material?.name || "material"}
      />
      <PopularTitleName name={material.name || "Unknown material"} />
      <PopularPriceDisplay
        currency={material.currency}
        startingPrice={material.price}
        priceCaption="Price"
        isDiscounted={material?.isDiscounted}
        discountedPrice={material?.discountedPrice}
      />
    </Link>
  );
};

export default MaterialCard;
