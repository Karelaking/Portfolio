import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Packs items into a 2-column grid without leaving empty cell holes.
 * Pulls future portrait items forward to pair with orphan portrait items.
 */
export function packGridItems2Column<T>(
	items: T[],
	getOrientation: (item: T) => "landscape" | "portrait"
): T[] {
	const result: T[] = [];
	const used = new Set<number>();

	for (let i = 0; i < items.length; i++) {
		if (used.has(i)) continue;

		const current = items[i];
		const orientation = getOrientation(current);
		used.add(i);
		result.push(current);

		// If current item is portrait (takes 1 slot), pair with the next available portrait item
		if (orientation === "portrait") {
			for (let j = i + 1; j < items.length; j++) {
				if (!used.has(j) && getOrientation(items[j]) === "portrait") {
					used.add(j);
					result.push(items[j]);
					break;
				}
			}
		}
	}

	return result;
}
