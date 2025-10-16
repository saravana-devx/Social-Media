import React from "react";
import { motion } from "framer-motion";
import mobileView from "@/assets/LandingPage/images/app-placeholder2.jpg";
import laptopView from "@/assets/LandingPage/images/mac-placeholder.jpg";

const WebsiteView: React.FC = () => {
  return (
    <div className="w-full select-none mx-auto flex flex-col items-center gap-4 md:flex-row md:justify-center md:gap-6">
      <motion.div
        className="cursor-pointer relative mt-20"
        initial={{
          opacity: 0,
          y: 50, // smaller vertical offset
          scale: 0.75,
          borderTopLeftRadius: "12.86px",
          borderTopRightRadius: "12.86px",
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
          borderTopLeftRadius: "16.77px",
          borderTopRightRadius: "16.77px",
        }}
        whileHover={{
          scale: 1.3, // more subtle hover
        }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
          type: "spring",
          stiffness: 120,
        }}
        viewport={{ once: true }}
      >
        <img
          src={mobileView}
          alt="Mobile View"
          className="mx-auto transition-transform duration-500 ease-in-out"
          style={{
            height: "480px",
            width : "auto",
            // maxWidth: "483px",
            borderTopLeftRadius: "inherit",
            borderTopRightRadius: "inherit",
          }}
        />
      </motion.div>

      <motion.div
        className="cursor-pointer relative md:mt-40 mt-10"
        initial={{
          opacity: 0,
          y: 50,
          scale: 0.75,
          borderTopLeftRadius: "12.86px",
          borderTopRightRadius: "12.86px",
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
          borderTopLeftRadius: "16.77px",
          borderTopRightRadius: "16.77px",
        }}
        whileHover={{
          scale: 1.3,
        }}
        transition={{
          duration: 1,
          ease: "easeOut",
          type: "spring",
          stiffness: 120,
        }}
        viewport={{ once: true }}
      >
        <img
          src={laptopView}
          alt="Laptop View"
          className="mx-auto transition-transform duration-500 ease-in-out"
          style={{
            width: "590px",
            maxWidth: "860px",
            height: "auto",
            borderTopLeftRadius: "inherit",
            borderTopRightRadius: "inherit",
          }}
        />
      </motion.div>
    </div>
  );
};

export default WebsiteView;
