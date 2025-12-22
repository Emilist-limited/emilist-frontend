import Image from "next/image";

import Banner from "../../public/images/Frame 27482.png";

const AboutUsBanner = () => {
  return (
    <section className="pt-4">
      <Image src={Banner} placeholder="blur" alt="banner" className="w-full" />
    </section>
  );
};

export default AboutUsBanner;
