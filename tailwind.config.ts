const config = {
	content: [
		"./app/**/*.{ts,tsx,js,jsx}",
		"./components/**/*.{ts,tsx,js,jsx}",
		"./pages/**/*.{ts,tsx,js,jsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				'instrument-sans': ["var(--font-instrument-sans)", "sans-serif"],
				'geist-sans': ["var(--font-geist-sans)", "sans-serif"],
			},
		},
		plugins: [],
	},

};

export default config;