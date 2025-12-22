"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useContext, useState } from "react";

import { AuthContext } from "@/lib/context/AuthState";
import { useGetMaterialInfo } from "../hooks/useGetMaterialInfo";
import { useUnsaveMaterial } from "../hooks/useUnSaveMaterial";
import { useSaveMaterials } from "../hooks/useSaveMaterial";
import { useAddMaterialToCart } from "@/features/cart/hooks/useAddMaterialToCart";
import { useCompareMaterial } from "../hooks/useCompareMaterial";
import { CompareMaterialContext } from "@/lib/context/CompareMaterialState";
import { useGetMaterialReviews } from "../hooks/useGetMaterialReviews";
import { ROUTES } from "@/lib/constants/routes";

import CompareSearch from "@/components/molecules/CompareSearch";
import PageLoader from "@/components/atoms/PageLoader";
import PublicMaterialHeader from "./PublicMaterialHeader";
import ShareLink from "@/components/molecules/ShareLink";
import WhiteBgLoader from "@/components/atoms/WhiteBgLoader";
import PublicMaterialMainContent from "./PublicMaterialMainContent";
import PublicMaterialDetails from "./PublicMaterialDetails";
import ReviewSliderLoader from "@/components/molecules/skeletonLoaders/ReviewSliderLoader";
import PublicExpertReviewSlider from "@/components/organisms/PublicExpertReviewSlider";

const OtherSupplierProducts = dynamic(() => import("./OtherSupplierProducts"));
const SimilarProducts = dynamic(() => import("./SimilarProducts"));

const PublicMaterialInfoWrapper = ({ materialId }: { materialId: string }) => {
  const { userLoading, currentUser } = useContext(AuthContext);
  const userId = currentUser?._id;

  const [openShareModal, setOpenShareModal] = useState<boolean>(false);

  const { compareLoading, compareMaterials } = useContext(
    CompareMaterialContext
  );

  const { compareMaterial, isComparing } = useCompareMaterial();
  const { isLiking, handleSaveMaterial } = useSaveMaterials();
  const { addMaterialToCart, cartLoading } = useAddMaterialToCart();
  const { isUnliking, handleUnsaveMaterial } = useUnsaveMaterial();
  const { data, isLoadin } = useGetMaterialReviews(materialId, "mostRecent");
  const { loading, getMaterialInfo, materialInfo } = useGetMaterialInfo(
    materialId,
    userId
  );

  const handleLike = (id: string) => {
    handleSaveMaterial(id, () => {
      getMaterialInfo();
    });
  };

  const handleUnlike = (id: string) => {
    handleUnsaveMaterial(id, () => {
      getMaterialInfo();
    });
  };

  const handleCompare = (id: string) => {
    compareMaterial(id, () => {
      getMaterialInfo();
    });
  };

  const handleOpen = () => {
    setOpenShareModal(true);
  };

  const loadBg =
    isLiking || isUnliking || compareLoading || isComparing || cartLoading;

  return (
    <div className="sm:pt-10 padding-ctn overflow-x-hidden">
      {loadBg && <WhiteBgLoader />}
      {userLoading || loading ? (
        <PageLoader height="h-[60vh]" />
      ) : (
        <>
          {compareMaterials?.length > 0 && (
            <CompareSearch title="material" link={ROUTES?.COMPARE_MATERIALS} />
          )}
          <PublicMaterialHeader
            materialId={materialId}
            handleLike={handleLike}
            handleUnlike={handleUnlike}
            handleCompare={handleCompare}
            handleOpen={handleOpen}
            materialInfo={materialInfo}
          />
          <PublicMaterialMainContent
            materialInfo={materialInfo}
            addMaterialToCart={() => addMaterialToCart(materialId)}
            userId={userId}
          />
          <PublicMaterialDetails productInfo={materialInfo.product} />
          <section className="border-b-1 border-gray-400 pb-8">
            <div className="flex-c-b gap-2">
              <h6 className="sm:text-2xl text-lg font-semibold">
                What people loved about this product
              </h6>
              {data?.length > 0 && (
                <Link
                  href={ROUTES?.ALL_REVIEWS_FOR_MATERIAL(materialId)}
                  className="text-primary-green sm:text-sm text-xs hover:text-green-600 duration-300 transition-all"
                >
                  See all reviews
                </Link>
              )}
            </div>

            {isLoadin ? (
              <ReviewSliderLoader />
            ) : (
              <PublicExpertReviewSlider
                reviews={data}
                noReviewMsg="No review for this product"
              />
            )}
          </section>
          <OtherSupplierProducts supplierInfo={materialInfo?.product?.userId} />
          <SimilarProducts materialId={materialId} />
          <ShareLink
            handleCancel={() => setOpenShareModal(false)}
            isModalOpen={openShareModal}
            link={`https://emilist.com/material/info/${materialId}`}
            title="Share business"
            textToCopy="Check out this business on Emilist"
            id={materialId}
          />
        </>
      )}
    </div>
  );
};

export default PublicMaterialInfoWrapper;
