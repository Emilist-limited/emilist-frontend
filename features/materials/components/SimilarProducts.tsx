import { useGetSimilarMaterials } from "../hooks/useGetSimilarMaterials";
import { useSaveMaterials } from "../hooks/useSaveMaterial";
import { useAddMaterialToCart } from "@/features/cart/hooks/useAddMaterialToCart";
import { useUnsaveMaterial } from "../hooks/useUnSaveMaterial";
import { Material } from "@/types";

import WhiteBgLoader from "@/components/atoms/WhiteBgLoader";
import MaterialViewCard from "@/components/molecules/cards/MaterialViewCard";
import SimilarMaterialSkeleton from "@/components/molecules/skeletonLoaders/SimilarMaterialSkeleton";
import NoMoreMessage from "@/components/atoms/NoMoreMessage";
import { useCompareMaterial } from "../hooks/useCompareMaterial";

const SimilarProducts = ({ materialId }: { materialId: string }) => {
  const { isLiking, handleSaveMaterial } = useSaveMaterials();
  const { addMaterialToCart, cartLoading } = useAddMaterialToCart();
  const { isUnliking, handleUnsaveMaterial } = useUnsaveMaterial();
  const { compareMaterial, isComparing } = useCompareMaterial();
  const {
    loading,
    data,
    getAllSimilarMaterials,
    handleHorizontalScroll,
    containerRef,
    hasMore,
  } = useGetSimilarMaterials(materialId);

  const handleLike = (id: string) => {
    handleSaveMaterial(id, () => {
      getAllSimilarMaterials();
    });
  };

  const handleUnlike = (id: string) => {
    handleUnsaveMaterial(id, () => {
      getAllSimilarMaterials();
    });
  };

  const handleCompare = (id: string) => {
    compareMaterial(id, () => {
      getAllSimilarMaterials();
    });
  };

  const loadBg = isLiking || isUnliking || cartLoading || isComparing;
  return (
    <section className="w-full py-8">
      {loadBg && <WhiteBgLoader />}
      <h5 className="sm:text-3xl text-lg font-bold py-6">Similar Materials</h5>
      <div
        ref={containerRef}
        onScroll={handleHorizontalScroll}
        className="flex sm:gap-4 gap-2 overflow-x-auto py-4 hide-scrollbar"
      >
        {data?.length > 0 ? (
          <>
            {data?.map((material: Material) => (
              <div
                key={material?._id}
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
          <NoMoreMessage message="No similar materials" />
        )}
      </div>
    </section>
  );
};

export default SimilarProducts;
