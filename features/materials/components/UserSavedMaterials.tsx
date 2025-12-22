"use client";

import PageLoader from "@/components/atoms/PageLoader";
import WhiteBgLoader from "@/components/atoms/WhiteBgLoader";
import NoMoreMessage from "@/components/atoms/NoMoreMessage";
import MaterialViewCard from "@/components/molecules/cards/MaterialViewCard";
import CustomPagination from "@/components/molecules/CustomPagination";
import CompareSearch from "@/components/molecules/CompareSearch";

import { Material } from "@/types";
import { useSaveMaterials } from "../hooks/useSaveMaterial";
import { useUnsaveMaterial } from "../hooks/useUnSaveMaterial";
import { useAddMaterialToCart } from "@/features/cart/hooks/useAddMaterialToCart";
import { useCompareMaterial } from "../hooks/useCompareMaterial";
import { useGetUserSavedMaterials } from "../hooks/useGetUserSavedMaterials";
import { useContext } from "react";
import { CompareMaterialContext } from "@/lib/context/CompareMaterialState";
import { ROUTES } from "@/lib/constants/routes";

const UserSavedMaterials = () => {
  const { compareMaterials } = useContext(CompareMaterialContext);
  const { handleSaveMaterial, isLiking } = useSaveMaterials();
  const { handleUnsaveMaterial, isUnliking } = useUnsaveMaterial();
  const { addMaterialToCart, cartLoading } = useAddMaterialToCart();
  const { compareMaterial, isComparing } = useCompareMaterial();
  const {
    saveLoading,
    allUserSavedMaterials,
    totalCount,
    handlePageChange,
    currentPage,
    totalPages,
    getAllUserSavedMaterials,
  } = useGetUserSavedMaterials();

  const handleLike = (id: string) => {
    handleSaveMaterial(id, () => {
      getAllUserSavedMaterials();
    });
  };

  const handleUnlike = (id: string) => {
    handleUnsaveMaterial(id, () => {
      getAllUserSavedMaterials();
    });
  };

  const handleCompare = (id: string) => {
    compareMaterial(id, () => {
      getAllUserSavedMaterials();
    });
  };

  const isLoading = cartLoading || isLiking || isUnliking || isComparing;

  return (
    <div className="padding-ctn py-28">
      {isLoading && <WhiteBgLoader />}
      <div className="flex items-center justify-between gap-6 flex-wrap my-4">
        <h1 className="sm:text-3xl font-bold text-xl">Saved Materials</h1>
      </div>
      {saveLoading ? (
        <PageLoader />
      ) : (
        <div className="grid grid-cols-3 gap-10">
          <section className="col-span-2 max-md:col-span-3 space-y-6">
            {compareMaterials?.length > 0 && (
              <CompareSearch
                title="Materials"
                link={ROUTES?.COMPARE_MATERIALS}
              />
            )}
            {allUserSavedMaterials?.length < 1 ? (
              <NoMoreMessage message={"You do not have any material listed"} />
            ) : (
              <>
                <div className="grid grid-cols-4 sm:gap-5 gap-2">
                  {allUserSavedMaterials?.map((material: Material) => (
                    <MaterialViewCard
                      key={material._id}
                      material={material}
                      handleCompare={handleCompare}
                      handleSaveMaterial={handleLike}
                      handleUnsaveMaterial={handleUnlike}
                      addMaterialToCart={addMaterialToCart}
                      autoLike
                    />
                  ))}
                </div>
                {totalCount > 10 && (
                  <div className="md:w-2/3 w-full pt-2">
                    <CustomPagination
                      handlePageChange={handlePageChange}
                      currentPage={currentPage}
                      totalPages={totalPages}
                    />
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default UserSavedMaterials;
