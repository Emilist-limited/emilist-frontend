"use client";

import { Material } from "@/types";
import { ROUTES } from "@/lib/constants/routes";
import { useGetUserMaterials } from "../hooks/useGetUserMaterials";

import CustomButton from "@/components/atoms/CustomButton";
import PageLoader from "@/components/atoms/PageLoader";
import NoMoreMessage from "@/components/atoms/NoMoreMessage";
import CustomPagination from "@/components/molecules/CustomPagination";
import MaterialViewCard from "@/components/molecules/cards/MaterialViewCard";

const UserListedMaterialWrapper = () => {
  const {
    handlePageChange,
    isLoading,
    totalPages,
    currentPage,
    userMaterials,
    totalCount,
  } = useGetUserMaterials();

  return (
    <div className="padding-ctn py-28">
      <div className="flex items-center justify-between gap-6 flex-wrap my-4">
        <h1 className="sm:text-3xl font-bold text-xl">Listed Materials</h1>
        <CustomButton href={ROUTES?.LIST_NEW_MATERIAL}>
          List New Material
        </CustomButton>
      </div>
      {isLoading ? (
        <PageLoader />
      ) : (
        <div className="grid grid-cols-3 gap-10">
          <section className="col-span-2 max-md:col-span-3 space-y-6">
            {userMaterials?.length < 1 ? (
              <NoMoreMessage message={"You do not have any material listed"} />
            ) : (
              <>
                <div className="grid grid-cols-4 sm:gap-5 gap-2">
                  {userMaterials?.map((material: Material) => (
                    <MaterialViewCard
                      key={material._id}
                      material={material}
                      myMaterials
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

export default UserListedMaterialWrapper;
