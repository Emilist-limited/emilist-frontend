import { ChangeEvent, useState } from "react";

import { NewProductType } from "../types";
import { formatInputTextNumberWithCommas } from "@/lib/helpers/formatInputTextNumberWithCommas";
import { formatInputTextNumber } from "@/lib/helpers/formatNumbers";
import { buildingMaterials } from "../constants";

export const useListNewMaterialState = () => {
  const [submitting, setSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [materialInfo, setMaterialsInfo] = useState<NewProductType>({
    name: "",
    brand: "",
    description: "",
    availableQuantity: "",
    price: "",
    storeName: "",
    location: "",
    currency: "NGN",
    category: "",
    subCategory: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMaterialsInfo((prev: any) => ({
      ...prev,
      [name]:
        name === "price"
          ? formatInputTextNumberWithCommas(value)
          : name === "availableQuantity"
          ? formatInputTextNumber(value)
          : value,
    }));
  };

  const selectedCategory = buildingMaterials.find(
    (material) => material.value === materialInfo.category
  );

  return {
    submitting,
    setSubmitting,
    isFetching,
    setIsFetching,
    materialInfo,
    handleChange,
    setMaterialsInfo,
    selectedCategory,
  };
};
