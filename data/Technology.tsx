import { IconHexagon } from "@tabler/icons-react";
import React from "react";

const NestJsLogo = (): React.ReactElement => {
  return (
    <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24">
      <defs>
        <linearGradient
          id="nestjs-gradient"
          x1="0%"
          x2="100%"
          y1="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#e11d48" />
          <stop offset="100%" stopColor="#9f1239" />
        </linearGradient>
      </defs>
      <path
        d="M12 2L4 6.6v10.8L12 22l8-4.6V6.6L12 2z"
        fill="url(#nestjs-gradient)"
      />
      <path
        d="M8.2 16.8V7.2h2l3.6 5.4V7.2h2v9.6h-2l-3.6-5.3v5.3h-2z"
        fill="white"
      />
    </svg>
  );
};

const ReactJsLogo = (): React.ReactElement => {
  return (
    <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" fill="#61dafb" r="1.9" />
      <ellipse
        cx="12"
        cy="12"
        rx="9"
        ry="3.8"
        stroke="#61dafb"
        strokeWidth="1.6"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="9"
        ry="3.8"
        stroke="#61dafb"
        strokeWidth="1.6"
        transform="rotate(60 12 12)"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="9"
        ry="3.8"
        stroke="#61dafb"
        strokeWidth="1.6"
        transform="rotate(120 12 12)"
      />
    </svg>
  );
};

const TailwindCssLogo = (): React.ReactElement => {
  return (
    <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24">
      <path
        d="M7 9.4c.9-2.2 2.3-3.3 4.4-3.3 3.2 0 3.6 2.4 5.2 2.4 1 0 1.8-.4 2.5-1.4-.9 2.2-2.3 3.3-4.4 3.3-3.2 0-3.6-2.4-5.2-2.4-1 0-1.8.4-2.5 1.4zm-2 4.2c.9-2.2 2.3-3.3 4.4-3.3 3.2 0 3.6 2.4 5.2 2.4 1 0 1.8-.4 2.5-1.4-.9 2.2-2.3 3.3-4.4 3.3-3.2 0-3.6-2.4-5.2-2.4-1 0-1.8.4-2.5 1.4z"
        fill="#38bdf8"
      />
    </svg>
  );
};

export const getTechnologyLogo = (logoKey: string): React.ReactElement => {
  switch (logoKey.toLowerCase()) {
    case "nestjs":
      return <NestJsLogo />;
    case "react":
    case "reactjs":
      return <ReactJsLogo />;
    case "tailwind":
    case "tailwindcss":
      return <TailwindCssLogo />;
    default:
      return <IconHexagon size={20} />;
  }
};
