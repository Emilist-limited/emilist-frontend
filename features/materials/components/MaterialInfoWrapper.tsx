"use client";

import { useCallback } from "react";

import { useGetMaterialInfo } from "../hooks/useGetMaterialInfo";
import { useAddMaterialDiscount } from "../hooks/useAddMaterialDiscount";
import { useDeleteMaterial } from "../hooks/useDeleteMaterial";

import PageLoader from "@/components/atoms/PageLoader";
import LightGreenLayout from "@/components/templates/LightGreenLayout";
import UserMaterialHeader from "./UserMaterialHeader";
import UserMaterialInfo from "./UserMaterialInfo";
import UserMaterialImages from "./UserMaterialImages";
import UserMaterialReviews from "./UserMaterialReviews";

const MaterialInfoWrapper = ({ materialId }: { materialId: string }) => {
  const { handleDeleteMaterial, isDeleteLoading } =
    useDeleteMaterial(materialId);
  const { loading, getMaterialInfo, materialInfo } =
    useGetMaterialInfo(materialId);
  const {
    isOpen,
    setIsOpen,
    isLoading,
    discountPrice,
    handleChangeDiscountPrice,
    addDiscountPrice,
  } = useAddMaterialDiscount();

  const originalPrice = materialInfo?.product?.price || 0;

  const handleAddDiscountPrice = useCallback(() => {
    addDiscountPrice(materialId, originalPrice, () => {
      getMaterialInfo();
    });
  }, [addDiscountPrice, getMaterialInfo, materialId]);

  return (
    <LightGreenLayout>
      {loading ? (
        <PageLoader />
      ) : (
        <div className="grid grid-cols-12 gap-6 my-6">
          <div className="col-span-9 max-lg:col-span-12 w-full bg-white h-fit">
            <UserMaterialHeader
              isLoading={isLoading}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              discountPrice={discountPrice}
              handleChangeDiscountPrice={handleChangeDiscountPrice}
              handleDeleteMaterial={handleDeleteMaterial}
              handleAddDiscountPrice={handleAddDiscountPrice}
              productName={materialInfo?.product?.name || ""}
              materialId={materialId}
              isDeleting={isDeleteLoading}
            />
            <UserMaterialInfo materialInfo={materialInfo} />
            <UserMaterialImages
              productImages={materialInfo?.product?.images || null}
            />
          </div>
          <UserMaterialReviews
            rating={materialInfo?.averageRating || 0}
            materialId={materialId}
          />
        </div>
      )}
    </LightGreenLayout>
  );
};

export default MaterialInfoWrapper;
