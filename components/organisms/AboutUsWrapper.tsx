import Image from "next/image";

import AboutUsImage from "../../public/images/Rectangle 5678.png";

const AboutUsWrapper = () => {
  return (
    <section className="padding-y padding-ctn">
      {" "}
      <div className="flex-c justify-center  py-10">
        <h3 className="max-w-lg text-center sm:text-2xl text-xl">
          At Emilist, we’re connecting every business to the world’s most
          skilled worker, in the simplest way possible.
        </h3>
      </div>
      <div className="flex  gap-10 max-md:first-line max-md:flex-col-reverse padding-x">
        <div className="flex-1">
          <p className="sm:text-lg max-md:text-center">
            Emilist is a global powerhouse, connecting skilled and unskilled
            workers with businesses across an impressive network of
            approximately 160 countries. Since its founding in 2025, the company
            has established itself as a leader in workforce solutions, bridging
            talent with opportunity on an international scale. Headquartered in
            California, USA, Emilist operates with a truly global presence,
            maintaining satellite offices in key cities including New York,
            Lagos, London, Kyiv, Berlin, and Orlando. This strategic footprint
            allows Emilist to offer localized support and services while
            maintaining the agility to respond to global market needs. With a
            diverse portfolio of industries and a commitment to fostering
            economic growth through meaningful employment opportunities, Emilist
            is dedicated to empowering businesses and individuals alike. The
            company’s robust infrastructure and innovative approach make it a
            trusted partner in workforce management, delivering excellence from
            small enterprises to multinational corporations around the world.
          </p>
        </div>
        <div className="flex-1 w-full flex justify-center">
          <div className="">
            <Image src={AboutUsImage} placeholder="blur" alt="banner" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsWrapper;
