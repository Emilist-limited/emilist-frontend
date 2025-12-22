"use client";

import { useSearchParams } from "next/navigation";

import { FilterMaterialWrapperProps, MaterialListProps } from "@/types";
import { useGetMaterials } from "@/features/materials/hooks/useGetMaterials";

import FeatureContentHeader from "./FeatureContentHeader";
import PageLoader from "../atoms/PageLoader";
import FilterPanel from "./FilterPanel";
import FilterMaterialWrapper from "./FilterMaterialWrapper";
import MaterialList from "./MaterialList";

const MaterialCatalog = () => {
  const searchParams = useSearchParams();

  const material = searchParams.get("q") || "";
  const locationQuery = searchParams.get("location") || "";

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
  } = useGetMaterials(material, locationQuery);

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
    <div className="sm:pt-10 padding-ctn">
      {" "}
      <FeatureContentHeader
        search={search}
        handleSearchChange={handleChange}
        handleSearchSubmit={handleSubmit}
        title={
          material
            ? material
            : locationQuery
            ? locationQuery
            : "Explore Material"
        }
        description="Amet minim mollit non deserunt ullamco est sit aliqua dolor do
  amet sint. Velit officia consequat duis enimt."
      />
      {loading ? (
        <PageLoader />
      ) : (
        <div className="grid grid-cols-10 pt-10 no-scroll">
          <FilterPanel>
            <FilterMaterialWrapper {...filterProps} />
          </FilterPanel>
          <MaterialList {...listProps} />
        </div>
      )}
    </div>
  );
};

export default MaterialCatalog;
