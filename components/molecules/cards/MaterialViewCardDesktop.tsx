import Image from "next/image";

import MaterialCardInfo from "../MaterialCardInfo";
import UserProfileLink from "../UserProfileLink";
import DisplayCardPrice from "@/components/atoms/DisplayCardPrice";
import CustomButton from "@/components/atoms/CustomButton";
import FavoriteButton from "@/components/atoms/FavouriteButton";
import CompareButton from "@/components/atoms/CompareButton";

import { Material } from "@/types";
import { ROUTES } from "@/lib/constants/routes";

interface MaterialCardProps {
  material: Material;
  addMaterialToCart?: (id: string) => void;
  handleSaveMaterial?: (id: string) => void;
  handleUnsaveMaterial?: (id: string) => void;
  handleCompare?: (id: string) => void;
  myMaterials?: boolean;
  autoLike?: boolean;
}

const MaterialViewCardDesktop: React.FC<MaterialCardProps> = ({
  material,
  addMaterialToCart,
  handleSaveMaterial,
  handleUnsaveMaterial,
  handleCompare,
  myMaterials,
  autoLike,
}) => {
  const showCardFooter =
    handleSaveMaterial || handleUnsaveMaterial || handleCompare;
  return (
    <div className="w-full h-full grid md:grid-cols-5 grid-cols-6 gap-3 max-sm:hidden">
      <div className="[@media(min-width:768px)]:col-span-1 [@media(min-width:400px)]:col-span-2  col-span-6 ">
        <Image
          src={material.images[0]?.imageUrl || "/images/Logo.svg"}
          width={140}
          height={100}
          alt="service"
          className={`w-full h-36 rounded-lg  ${
            !material.images[0]?.imageUrl
              ? "object-contain shadow px-2"
              : "object-cover"
          }`}
        />
      </div>
      <div className="[@media(min-width:400px)]:col-span-4 col-span-6 flex justify-between max-md:flex-col md:gap-10 gap-2">
        <div className="flex flex-col gap-2 flex-1">
          <MaterialCardInfo material={material} />
          {!myMaterials && (
            <div className="flex items-center sm:py-2 max-sm:hidden">
              <UserProfileLink user={material.userId} />
            </div>
          )}
        </div>
        <div className="flex items-center md:flex-col md:items-end justify-between">
          <div className="max-sm:hidden">
            <DisplayCardPrice
              currency={material.currency}
              price={material.price}
            />
          </div>

          {addMaterialToCart && (
            <CustomButton
              type="button"
              onClick={() => addMaterialToCart(material._id)}
            >
              Add to Cart
            </CustomButton>
          )}
          {myMaterials && (
            <CustomButton href={ROUTES?.REPORT_INSIGHT}>Insights</CustomButton>
          )}
        </div>
      </div>
      <div className="col-span-1 max-md:hidden" />
      {showCardFooter && (
        <div className="md:col-span-4 col-span-6 border-t border-[#B8B9B8] flex items-center justify-end sm:gap-10 gap-5 py-2">
          {handleSaveMaterial && handleUnsaveMaterial && (
            <FavoriteButton
              liked={autoLike || material.liked}
              onSave={() => handleSaveMaterial(material._id)}
              onUnsave={() => handleUnsaveMaterial(material._id)}
            />
          )}
          {handleCompare && (
            <CompareButton
              compare={() => handleCompare(material._id)}
              isCompare={material?.isCompared}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default MaterialViewCardDesktop;
