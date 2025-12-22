import { useAddMaterialToCart } from "@/features/cart/hooks/useAddMaterialToCart";
import { useGetOtherMaterialsFromSeller } from "../hooks/useGetOtherMaterialsFromSeller";
import { useSaveMaterials } from "../hooks/useSaveMaterial";
import { useUnsaveMaterial } from "../hooks/useUnSaveMaterial";
import { Material, User } from "@/types";

import WhiteBgLoader from "@/components/atoms/WhiteBgLoader";
import SimilarMaterialSkeleton from "@/components/molecules/skeletonLoaders/SimilarMaterialSkeleton";
import MaterialViewCard from "@/components/molecules/cards/MaterialViewCard";
import NoMoreMessage from "@/components/atoms/NoMoreMessage";
import { useCompareMaterial } from "../hooks/useCompareMaterial";

interface OtherSupplierProductsProps {
  supplierInfo: User;
}

const OtherSupplierProducts = ({
  supplierInfo,
}: OtherSupplierProductsProps) => {
  const { isLiking, handleSaveMaterial } = useSaveMaterials();
  const { addMaterialToCart, cartLoading } = useAddMaterialToCart();
  const { isUnliking, handleUnsaveMaterial } = useUnsaveMaterial();
  const { compareMaterial, isComparing } = useCompareMaterial();
  const {
    loading,
    data,
    getAllOtherMaterialsByUser,
    handleHorizontalScroll,
    containerRef,
    hasMore,
  } = useGetOtherMaterialsFromSeller(supplierInfo?._id);

  const handleLike = (id: string) => {
    handleSaveMaterial(id, () => {
      getAllOtherMaterialsByUser();
    });
  };

  const handleUnlike = (id: string) => {
    handleUnsaveMaterial(id, () => {
      getAllOtherMaterialsByUser();
    });
  };

  const handleCompare = (id: string) => {
    compareMaterial(id, () => {
      getAllOtherMaterialsByUser();
    });
  };

  const loadBg = isLiking || isUnliking || cartLoading || isComparing;

  return (
    <section className="w-full py-8 overflow-x-hidden">
      {loadBg && <WhiteBgLoader />}
      <h5 className="sm:text-3xl text-lg font-bold py-6">
        Other products from {supplierInfo?.fullName || supplierInfo?.userName}
      </h5>
      <div
        ref={containerRef}
        onScroll={handleHorizontalScroll}
        className="flex sm:gap-4 gap-2 overflow-x-auto py-4 hide-scrollbar"
      >
        {data?.length > 0 ? (
          <>
            {data?.map((material: Material, index) => (
              <div
                key={index}
                className="sm:w-[800px] sm:min-w-[800px] max-sm:w-[280px] w-full min-w-[250px]"
              >
                <MaterialViewCard
                  material={material}
                  addMaterialToCart={addMaterialToCart}
                  handleSaveMaterial={handleLike}
                  handleUnsaveMaterial={handleUnlike}
                  handleCompare={handleCompare}
                />
              </div>
            ))}
            {loading && <SimilarMaterialSkeleton />}
            {!hasMore && data?.length > 10 && (
              <div className=" flex items-center justify-center pr-5">
                <NoMoreMessage message="No more materials" />
              </div>
            )}
          </>
        ) : (
          <NoMoreMessage
            message={`No other material from 
        ${supplierInfo?.fullName || supplierInfo?.userName}`}
          />
        )}
      </div>
    </section>
  );
};

export default OtherSupplierProducts;
