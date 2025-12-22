"use client";

import Image from "next/image";

import { motion } from "framer-motion";

import ImageOne from "../../public/images/heroSectionImages/Vector 262.png";
import ImageTwo from "../../public/images/heroSectionImages/Vector 262 (1).png";
import ImageThree from "../../public/images/heroSectionImages/Vector 263.png";
import ImageFour from "../../public/images/heroSectionImages/Vector 263 (1).png";
import ImageFive from "../../public/images/heroSectionImages/Vector 264.png";
import ImageSix from "../../public/images/heroSectionImages/Vector 264 (1).png";
import HeroSectionSearchForm from "../molecules/forms/HeroSectionSearchForm";

import { subheadingVariants, wordVariants } from "@/anim";

const HeroSection = () => {
  const headingText = "Discover Your Project Dream Team Here.".split(" ");

  return (
    <section className="py-8">
      <div className="w-full padding-ctn">
        <div className="flex justify-between max-lg:flex-col md:gap-10 gap-6 md:border-1 md:p-6 border-gray-300 rounded-2xl">
          <div className="flex lg:flex-col max-lg:justify-between max-lg:gap-2">
            <div className="">
              <Image
                src={ImageOne}
                placeholder="blur"
                alt="hero images"
                className=""
              />
            </div>
            <div className="">
              <Image
                src={ImageThree}
                placeholder="blur"
                alt="hero images"
                className=""
              />
            </div>
            <div className="">
              <Image
                src={ImageFive}
                placeholder="blur"
                alt="hero images"
                className=""
              />
            </div>
          </div>
          <div className="flex-1 w-full flex justify-center">
            <div className="max-w-lg space-y-7 flex flex-col  justify-center">
              <motion.h1
                initial="hidden"
                animate="visible"
                className="md:text-5xl text-3xl font-bold text-center leading-normal"
              >
                {" "}
                {headingText.map((word, index) => (
                  <motion.span
                    key={index}
                    className="inline-block mr-2"
                    variants={wordVariants}
                    custom={index}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>
              <motion.p
                variants={subheadingVariants}
                initial="hidden"
                animate="visible"
                className="text-center"
              >
                This platform connects homeowners, contractors, businesses, and
                customers with skilled artisans, handymen, and project experts
                for renovations, custom-builds, and repairs.
              </motion.p>
              <div className="w-full flex justify-center pt-5">
                <HeroSectionSearchForm />
              </div>
            </div>
          </div>
          <div className="flex lg:flex-col max-lg:justify-between max-lg:gap-2">
            <div className="">
              <Image
                src={ImageTwo}
                placeholder="blur"
                alt="hero images"
                className=""
              />
            </div>
            <div className="">
              <Image
                src={ImageFour}
                placeholder="blur"
                alt="hero images"
                className=""
              />
            </div>
            <div className="">
              <Image
                src={ImageSix}
                placeholder="blur"
                alt="hero images"
                className=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
