import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

import { AuthContext } from "@/lib/context/AuthState";
import { ROUTES } from "@/lib/constants/routes";
import { Capitalize } from "@/lib/helpers";
import { Material } from "@/types";

import Rating from "../Rating";
import CustomButton from "@/components/atoms/CustomButton";
import DisplayCardPrice from "@/components/atoms/DisplayCardPrice";
import FavoriteButton from "@/components/atoms/FavouriteButton";

interface MaterialCardProps {
  material: Material;
  addMaterialToCart?: (id: string) => void;
  handleSaveMaterial?: (id: string) => void;
  handleUnsaveMaterial?: (id: string) => void;
  autoLike?: boolean;
}

const MaterialViewCardMobile = ({
  material,
  addMaterialToCart,
  handleSaveMaterial,
  handleUnsaveMaterial,
  autoLike,
}: MaterialCardProps) => {
  const { currentUser } = useContext(AuthContext);
  const isMaterialOwner =
    currentUser?._id === material?.userId?._id ||
    currentUser?._id === material?.userId;

  const materialDetailsLink = isMaterialOwner
    ? ROUTES?.USER_MATERIAL_DETAILS(material._id)
    : ROUTES?.GENERAL_MATERIAL_DETAILS(material._id);

  const showLikeIcon = handleSaveMaterial && handleUnsaveMaterial;

  return (
    <div className="w-full sm:hidden">
      <div className="w-full h-36 relative">
        <Image
          src={material.images[0]?.imageUrl || "/images/Logo.svg"}
          width={140}
          height={100}
          alt="service"
          className={`w-full h-full rounded-lg  ${
            !material.images[0]?.imageUrl
              ? "object-contain shadow px-2"
              : "object-cover"
          }`}
        />
        {showLikeIcon && (
          <div className="absolute w-8 h-8 rounded-full bg-white right-2 top-2 flex items-center justify-center">
            <FavoriteButton
              liked={autoLike || material.liked}
              onSave={() => handleSaveMaterial(material._id)}
              onUnsave={() => handleUnsaveMaterial(material._id)}
              show={false}
            />
          </div>
        )}
      </div>
      <div className="p-2">
        <Link href={materialDetailsLink} className="space-y-1 group">
          <h6 className="font-bold group-hover:text-primary-green transition-all duration-300 whitespace-nowrap truncate">
            {Capitalize(material.name)}
          </h6>
          <DisplayCardPrice
            currency={material.currency}
            price={material.price}
          />
          <div className="flex items-center gap-1 max-sm:text-sm">
            <Rating rating={4} />
            <span className="sm:text-sm text-xs">(51)</span>
          </div>
        </Link>
        {addMaterialToCart && (
          <>
            {isMaterialOwner ? (
              <CustomButton type="button" href={ROUTES?.REPORT_INSIGHT}>
                Insight
              </CustomButton>
            ) : (
              <CustomButton
                type="button"
                onClick={() => addMaterialToCart(material._id)}
              >
                Add to Cart
              </CustomButton>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MaterialViewCardMobile;
