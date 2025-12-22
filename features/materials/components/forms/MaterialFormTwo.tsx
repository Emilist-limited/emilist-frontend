import { currencyLabel } from "@/lib/constants";
import { FormInput } from "@/components/molecules/FormInput";
import { NewProductType } from "../../types";
import { JobFilesType } from "@/features/jobs/types";

import JobFileUpload from "@/features/jobs/components/JobFileUpload";
import FormSelect from "@/components/molecules/FormSelect";
import Label from "@/components/atoms/Label";
import LocationInput from "@/components/molecules/LocationInput";

interface MaterialFormTwoProps {
  materialInfo: NewProductType;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  selectedImages: string[] | null;
  setSelectedImages: React.Dispatch<React.SetStateAction<string[]>>;
  onSelectFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageDelete: (index: number) => void;
  autocompleteRef: React.MutableRefObject<google.maps.places.SearchBox | null>;
  fetchedImages?: JobFilesType[] | [];
  handlePlacesChanged: () => void;
  onDeleteFetchedProductImage?: (imageId: string) => void;
}

const MaterialFormTwo = ({
  materialInfo,
  fetchedImages,
  handleChange,
  selectedImages,
  setSelectedImages,
  onSelectFile,
  handleImageDelete,
  autocompleteRef,
  handlePlacesChanged,
  onDeleteFetchedProductImage,
}: MaterialFormTwoProps) => {
  return (
    <div className="col-span-1 flex flex-col gap-4 max-md:col-span-2 mr-4 max-md:mr-0">
      <div className="space-y-2">
        <Label htmlFor="productImage"> Product image</Label>
        <JobFileUpload
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
          onSelectFile={onSelectFile}
          handleImageDelete={handleImageDelete}
          fetchedImages={fetchedImages}
          onDeleteFetchedJobImage={onDeleteFetchedProductImage}
          isMaterial={true}
        />
      </div>
      <FormSelect
        label="Select currency"
        name="currency"
        id="currency"
        value={materialInfo.currency}
        onChange={handleChange}
        options={currencyLabel}
      />
      <FormInput
        label="Price"
        type="text"
        name="price"
        id="price"
        value={materialInfo.price}
        onChange={handleChange}
      />
      <FormInput
        label="Supplier/store name"
        type="text"
        name="storeName"
        id="storeName"
        value={materialInfo.storeName}
        onChange={handleChange}
      />
      <LocationInput
        autocompleteRef={autocompleteRef}
        handlePlacesChanged={handlePlacesChanged}
        handleChange={handleChange}
        location={materialInfo.location}
      />
    </div>
  );
};

export default MaterialFormTwo;
