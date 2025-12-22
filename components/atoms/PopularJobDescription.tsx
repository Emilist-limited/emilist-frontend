const PopularJobDescription: React.FC<{ description: string }> = ({
  description,
}) => <p className="truncate">{description}</p>;

export default PopularJobDescription;
