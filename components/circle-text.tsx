import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { JSX } from "react";

interface CircleTextProps {
  text: string;
  isBold?: boolean;
  textColor?: string;
  height?: string;
}

export const CircleText = ({
  text,
  isBold = false,
  textColor = "",
  height = "-top-2",
}: CircleTextProps): JSX.Element => {
  return (
    <span className={cn("relative text-[#fcac4c]", isBold && "font-bold", textColor)}>
      {text}
      <svg
        viewBox="0 0 286 73"
        fill="none"
        className={`absolute -left-2 -right-2 ${height} bottom-0 translate-y-1/5 stroke-2 dark:stroke-white`}
      >
        <motion.path
          className="stroke-neutral-800 dark:stroke-neutral-200"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{
            duration: 1.25,
            ease: "easeInOut",
          }}
          d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
          strokeWidth="3"
        />
      </svg>
    </span>
  );
};