"use client";

import Link from "next/link";
import { useContext } from "react";

import CompareHeading from "@/components/atoms/CompareHeading";
import CompareText from "@/components/atoms/CompareText";
import CompareMaterialTableHeader from "./CompareMaterialTableHeader";
import CompareMaterialCard from "./CompareMaterialCard";
import PageLoader from "@/components/atoms/PageLoader";

import { useCompareMaterial } from "../hooks/useCompareMaterial";
import { CompareMaterialContext } from "@/lib/context/CompareMaterialState";
import { Product } from "../types";
import { ROUTES } from "@/lib/constants/routes";

const CompareMaterialWrapper = () => {
  const { compareMaterial } = useCompareMaterial();
  const { compareLoading, compareMaterials } = useContext(
    CompareMaterialContext
  );

  return (
    <div className="pt-10 padding-ctn">
      <CompareHeading title="Compare Material" />
      {compareLoading ? (
        <PageLoader />
      ) : (
        <div className="relative flex my-10">
          {compareMaterials?.length > 0 ? (
            <>
              <CompareMaterialTableHeader />
              <div className="sm:w-52 w-28" />
              <div className="flex-1 w-full flex overflow-x-auto">
                {compareMaterials?.map((material: Product) => (
                  <CompareMaterialCard
                    key={material?._id}
                    material={material}
                    onRemove={() => compareMaterial(material?._id)}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="flex-c text-lg">
              <CompareText>
                No material added to compare list.{" "}
                <Link
                  href={ROUTES?.DASHBOARD_MATERIAL}
                  className="text-primary-green"
                >
                  Click here
                </Link>{" "}
                to see all materials.
              </CompareText>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CompareMaterialWrapper;
