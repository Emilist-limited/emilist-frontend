import { NewProductType } from "../types";

export const materialFormErrorCheck = (material: NewProductType) => {
  const commonFieldsInvalid =
    !material.category ||
    !material.subCategory ||
    !material.currency ||
    !material.description ||
    !material.name ||
    !material.location ||
    !material.storeName ||
    !material.price ||
    !material.availableQuantity ||
    !material.brand;
  return commonFieldsInvalid;
};
