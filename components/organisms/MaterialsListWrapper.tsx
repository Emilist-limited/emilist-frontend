"use client";

import { useGetMaterials } from "@/features/materials/hooks/useGetMaterials";
import { FilterMaterialWrapperProps, MaterialListProps } from "@/types";

import FeatureLinksWrapper from "./FeatureLinksWrapper";
import FeatureContentHeader from "./FeatureContentHeader";
import FilterPanel from "./FilterPanel";
import MaterialList from "./MaterialList";
import FilterMaterialWrapper from "./FilterMaterialWrapper";
import PageLoader from "../atoms/PageLoader";

const MaterialsListWrapper = () => {
  const {
    loading,
    allMaterials,
    search,
    handleChange,
    handlePageChange,
    totalPages,
    currentPage,
    handleMinChange,
    handleMaxChange,
    rating,
    setRating,
    minValue,
    maxValue,
    noOfReviews,
    setNoOfReviews,
    totalProducts,
    currency,
    setCurrency,
    refetchAllMaterials,
  } = useGetMaterials();

  const filterProps: FilterMaterialWrapperProps = {
    minValue,
    maxValue,
    handleMinChange,
    handleMaxChange,
    rating,
    setRating,
    noOfReviews,
    setNoOfReviews,
    currency,
    setCurrency,
    getAllMaterials: refetchAllMaterials,
  };

  const listProps: MaterialListProps = {
    allMaterials,
    totalProducts,
    currentPage,
    totalPages,
    handlePageChange,
    refetchAllMaterials,
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await refetchAllMaterials();
  };

  return (
    <div className="sm:pt-10 padding-ctn overflow-x-hidden">
      <FeatureLinksWrapper />
      <FeatureContentHeader
        search={search}
        handleSearchChange={handleChange}
        handleSearchSubmit={handleSubmit}
        title="Explore Material"
        description="Amet minim mollit non deserunt ullamco est sit aliqua dolor do
        amet sint. Velit officia consequat duis enimt."
      />
      {loading ? (
        <PageLoader />
      ) : (
        <div className="grid grid-cols-10 pt-10 no-scroll overflow-x-hidden">
          <FilterPanel>
            <FilterMaterialWrapper {...filterProps} />
          </FilterPanel>
          <MaterialList {...listProps} />
        </div>
      )}
    </div>
  );
};

export default MaterialsListWrapper;
