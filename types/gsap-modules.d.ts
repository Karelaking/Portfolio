declare module "gsap" {
	export interface GSAPUtils {
		toArray<T = HTMLElement>(targets: any, scope?: Element | string): T[];
		interpolate<T = any>(start: T, end: T, progress: number): T;
	}

	export interface GSAP {
		registerPlugin(...args: any[]): void;
		to(target: any, vars: any): any;
		fromTo(target: any, fromVars: any, toVars: any): any;
		set(target: any, vars: any): any;
		utils: GSAPUtils;
	}

	const gsap: GSAP;
	export default gsap;
}

declare module "gsap/ScrollTrigger" {
	export const ScrollTrigger: {
		create(vars: any): any;
		refresh(): void;
		getAll(): any[];
		registerPlugin(...args: any[]): void;
	};
}

declare module "@gsap/react" {
	export const useGSAP: any;
}
