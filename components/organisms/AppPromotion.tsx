import { FC } from "react";

import { motion } from "framer-motion";

import { subheadingVariants } from "@/anim";

import AppStoreLinks from "../molecules/AppStoreLinks";
import AppImage from "../atoms/AppImage";

const AppPromotion: FC = () => (
  <motion.div
    variants={subheadingVariants}
    initial="hidden"
    animate="visible"
    className="flex flex-col gap-2 items-center"
  >
    <AppImage
      src="/images/phone.png"
      alt="App Preview"
      width={354}
      height={372}
      priority
    />
    <h6 className="sm:text-lg text-center">GET THE APP</h6>
    <AppStoreLinks />
  </motion.div>
);

export default AppPromotion;
