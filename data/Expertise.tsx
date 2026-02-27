import { ExpertiseItem } from "@/types";
import { IconSparkles, IconLayoutGrid, IconCode, IconStack } from "@tabler/icons-react";
import { ReactElement } from "react";

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