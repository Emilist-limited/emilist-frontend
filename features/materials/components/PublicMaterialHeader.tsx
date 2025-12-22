import CompareButton from "@/components/atoms/CompareButton";
import FavoriteButton from "@/components/atoms/FavouriteButton";
import ShareButton from "@/components/atoms/ShareButton";
import React from "react";
import { Material } from "../types";

interface PublicMaterialHeaderProps {
  materialId: string;
  handleOpen: () => void;
  handleCompare: (businessId: string) => void;
  handleLike: (businessId: string) => void;
  handleUnlike: (businessId: string) => void;
  materialInfo: Material;
}

const PublicMaterialHeader = ({
  materialId,
  handleCompare,
  handleLike,
  handleOpen,
  handleUnlike,
  materialInfo,
}: PublicMaterialHeaderProps) => {
  return (
    <div className="flex-c sm:gap-8 gap-5 justify-end pb-5">
      <FavoriteButton
        liked={materialInfo?.liked}
        onSave={() => handleLike(materialId)}
        onUnsave={() => handleUnlike(materialId)}
        show={false}
      />
      <CompareButton
        compare={() => handleCompare(materialId)}
        isCompare={materialInfo?.isCompared}
        show={false}
      />
      <ShareButton handleOpen={handleOpen} type="business" show={false} />
    </div>
  );
};

export default PublicMaterialHeader;
