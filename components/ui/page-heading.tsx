import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

const PageHeading = ({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <h2
      ref={ref}
      className="font-mea-culpa text-6xl tracking-widest text-neutral-900 md:text-8xl lg:text-9xl dark:text-white"
    >
      <motion.span
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
        className="inline-block first-letter:font-extrabold leading-4 md:leading-16"
      >
        {children}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
          className="mx-auto mt-4 h-1 w-24 origin-center rounded-full bg-linear-to-r from-green-500 to-emerald-400"
        />
      </motion.span>
    </h2>
  );
};

export default PageHeading;
