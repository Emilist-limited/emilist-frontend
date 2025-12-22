import { buildingMaterials } from "../../constants";
import { FormInput } from "@/components/molecules/FormInput";
import { NewProductType } from "../../types";

import FormSelect from "@/components/molecules/FormSelect";
import FormTextarea from "@/components/molecules/FormTextarea";

type SubCategoryType =
  | {
      id: number;
      label: string;
      value: string;
      subCategory: {
        label: string;
        value: string;
      }[];
    }
  | undefined;

interface MaterialFormOneProps {
  materialInfo: NewProductType;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  selectedCategory: SubCategoryType;
}

const MaterialFormOne = ({
  materialInfo,
  handleChange,
  selectedCategory,
}: MaterialFormOneProps) => {
  return (
    <div className="col-span-1 flex flex-col gap-4 max-md:col-span-2 mr-4 max-md:mr-0">
      <FormInput
        label="Product name"
        id="name"
        name="name"
        type="text"
        value={materialInfo.name}
        onChange={handleChange}
      />
      <FormSelect
        label="Category"
        id="category"
        name="category"
        value={materialInfo.category}
        onChange={handleChange}
        options={buildingMaterials}
      />
      <FormSelect
        label="Sub category"
        id="subCategory"
        name="subCategory"
        value={materialInfo.subCategory}
        onChange={handleChange}
        options={selectedCategory?.subCategory || []}
        placeholder={
          !selectedCategory
            ? "Select a category first"
            : "Select a sub category"
        }
      />
      <FormInput
        label="Brand"
        id="brand"
        name="brand"
        type="text"
        value={materialInfo.brand}
        onChange={handleChange}
      />
      <FormTextarea
        label="Description"
        rows={4}
        id="description"
        name="description"
        value={materialInfo.description}
        onChange={handleChange}
      />
      <FormInput
        label="Quantity Available"
        id="availableQuantity"
        name="availableQuantity"
        type="text"
        value={materialInfo.availableQuantity}
        onChange={handleChange}
      />
    </div>
  );
};

export default MaterialFormOne;
