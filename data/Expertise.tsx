import {
	IconCode,
	IconLayoutGrid,
	IconSparkles,
	IconStack,
} from "@tabler/icons-react";
import type { ReactElement } from "react";
import type { ExpertiseItem } from "@/types";

export const getExpertiseIcon = (icon: ExpertiseItem["icon"]): ReactElement => {
	switch (icon) {
		case "strategy":
			return <IconSparkles size={22} />;
		case "system":
			return <IconLayoutGrid size={22} />;
		case "frontend":
			return <IconCode size={22} />;
		case "direction":
			return <IconStack size={22} />;
		default:
			return <IconSparkles size={22} />;
	}
};
