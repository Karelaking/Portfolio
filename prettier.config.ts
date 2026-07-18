import type { Config } from "prettier";

const config: Config = {
	trailingComma: "none",
	plugins: ["prettier-plugin-tailwindcss"],
	tailwindConfig: "./tailwind.config.js",
	tailwindFunctions: ["clsx", "cn", "twMerge"],
	tailwindAttributes: ["className"],
};

export default config;
