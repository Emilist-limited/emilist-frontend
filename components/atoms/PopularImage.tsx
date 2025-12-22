import Image from "next/image";

interface PopularImageProps {
  imageUrl?: string;
  title: string;
}

const PopularImage: React.FC<PopularImageProps> = ({ imageUrl, title }) => {
  return (
    <div className="w-96 max-md:w-72 h-64 max-md:h-52 overflow-hidden rounded-lg flex items-center justify-center shadow">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={title}
          width={380}
          height={276}
          className="object-cover w-full h-full group-hover:scale-110 transition-all duration-300 ease-out"
        />
      ) : (
        <Image
          src="/images/Logo.svg"
          alt={title}
          width={130}
          height={30}
          className="object-contain w-auto h-auto group-hover:scale-110 transition-all duration-300 ease-out"
        />
      )}
    </div>
  );
};

export default PopularImage;
