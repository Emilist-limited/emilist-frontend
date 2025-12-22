interface MaterialMetaDataProps {
  title: string;
  value: string | number;
}

const MaterialMetaData = ({ title, value }: MaterialMetaDataProps) => {
  return (
    <div className="flex-c gap-2">
      <p className="max-sm:text-sm font-semibold text-gray-900">{title}:</p>
      <p className="max-sm:text-sm">{value}</p>
    </div>
  );
};

export default MaterialMetaData;
