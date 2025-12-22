import CompareText from "@/components/atoms/CompareText";
import CompareMaterialHeader from "./CompareMaterialHeader";
import CompareMaterialActions from "./CompareMaterialActions";

import { Product } from "../types";
import { Capitalize, numberWithCommas } from "@/lib/helpers";

const CompareMaterialCard = ({
  material,
  onRemove,
}: {
  material: Product;
  onRemove: () => void;
}) => {
  return (
    <div className="flex flex-col max-sm:text-sm max-w-[250px] w-[250px] min-w-[250px] overflow-y-hidden">
      <CompareMaterialHeader material={material} />
      <CompareText className="px-2 py-6 border-b">
        {material?.name && Capitalize(material?.name)}
      </CompareText>
      <CompareText className="px-2 py-6 border-b">
        {material?.description}
      </CompareText>
      <CompareText className="px-2 py-6 border-b">
        {material?.averageRating
          ? numberWithCommas(material?.averageRating)
          : 0}
      </CompareText>
      <CompareText className="px-2 py-6 border-b">
        {material?.totalReviews ? numberWithCommas(material?.totalReviews) : 0}
      </CompareText>
      <CompareText className="px-2 py-6 border-b">
        {material?.brand}
      </CompareText>
      <CompareText className="px-2 py-6 border-b">
        {material?.category && Capitalize(material?.category)}
      </CompareText>
      <CompareText className="px-2 py-6 border-b">
        {material?.subCategory && Capitalize(material?.subCategory)}
      </CompareText>
      <CompareText className="px-2 py-6 border-b">
        {material?.availableQuantity &&
          numberWithCommas(material?.availableQuantity)}
      </CompareText>
      <CompareText className="px-2 py-6 border-b">
        {material?.location}
      </CompareText>
      <CompareText className="px-2 py-6 border-b">
        {material?.location}
      </CompareText>
      <CompareText className="px-2 py-6 border-b">
        {material?.storeName}
      </CompareText>
      <CompareMaterialActions material={material} onRemove={onRemove} />
    </div>
  );
};

export default CompareMaterialCard;
