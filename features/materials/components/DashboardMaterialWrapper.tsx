"use client";

import { useContext } from "react";

import { CompareMaterialContext } from "@/lib/context/CompareMaterialState";
import { JobSkeleton } from "@/components/molecules/skeletonLoaders/JobSkeleton";
import { Material } from "@/types";
import { ROUTES } from "@/lib/constants/routes";
import { useGetMaterials } from "../hooks/useGetMaterials";
import { useSaveMaterials } from "../hooks/useSaveMaterial";
import { useAddMaterialToCart } from "@/features/cart/hooks/useAddMaterialToCart";
import { useUnsaveMaterial } from "../hooks/useUnSaveMaterial";
import { useCompareMaterial } from "../hooks/useCompareMaterial";

import CompareSearch from "@/components/molecules/CompareSearch";
import NoMoreMessage from "@/components/atoms/NoMoreMessage";
import WhiteBgLoader from "@/components/atoms/WhiteBgLoader";
import CustomPagination from "@/components/molecules/CustomPagination";
import MaterialViewCard from "@/components/molecules/cards/MaterialViewCard";
import DashboardToggleSearchNavWrapper from "@/components/organisms/DashboardToggleSearchNavWrapper";

const DashboardMaterialWrapper = () => {
  const { compareMaterials } = useContext(CompareMaterialContext);

  const { handleSaveMaterial, isLiking } = useSaveMaterials();
  const { addMaterialToCart, cartLoading } = useAddMaterialToCart();
  const { handleUnsaveMaterial, isUnliking } = useUnsaveMaterial();
  const { compareMaterial, isComparing } = useCompareMaterial();

  const {
    allMaterials,
    search,
    handleChange,
    handlePageChange,
    totalPages,
    currentPage,
    totalProducts,
    refetchAllMaterials,
    isFetching,
    setIsFetching,
  } = useGetMaterials();

  const handleLike = (id: string) => {
    handleSaveMaterial(id, () => {
      refetchAllMaterials();
    });
  };

  const handleUnlike = (id: string) => {
    handleUnsaveMaterial(id, () => {
      refetchAllMaterials();
    });
  };

  const handleCompare = (id: string) => {
    compareMaterial(id, () => {
      refetchAllMaterials();
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFetching(true);
    await refetchAllMaterials();
  };

  const isLoading = cartLoading || isLiking || isUnliking || isComparing;

  return (
    <div className="col-span-7 max-lg:col-span-10 w-full">
      {isLoading && <WhiteBgLoader />}
      <DashboardToggleSearchNavWrapper
        link={ROUTES?.LIST_NEW_MATERIAL}
        linkTitle="Post New Material"
        description="Search for materials, view all available material listings, save materials for quick access later, and compare materials you're interested in."
        search={search}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <div className="flex flex-col overflow-y-auto gap-4 hide-scrollbar max-w-full overflow-x-hidden pb-6 bg-white rounded-b-lg px-1">
        {compareMaterials?.length > 0 && (
          <CompareSearch title="Materials" link={ROUTES?.COMPARE_MATERIALS} />
        )}
        {isFetching ? (
          <JobSkeleton className="w-full h-56 min-h-56" />
        ) : (
          <>
            {allMaterials?.length < 1 ? (
              <div className="p-6">
                {search ? (
                  <NoMoreMessage message="No result found, try searching for something else" />
                ) : (
                  <NoMoreMessage message="No material listed" />
                )}
              </div>
            ) : (
              <>
                {allMaterials?.map((material: Material) => (
                  <MaterialViewCard
                    key={material._id}
                    material={material}
                    addMaterialToCart={addMaterialToCart}
                    handleSaveMaterial={handleLike}
                    handleUnsaveMaterial={handleUnlike}
                    handleCompare={handleCompare}
                    isShadow={false}
                  />
                ))}
                {totalProducts > 10 && (
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
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardMaterialWrapper;
