import { permanentRedirect } from "next/navigation";

const ExpertiseLegacyRoutePage = (): never => {
	permanentRedirect("/expertise");
};

export default ExpertiseLegacyRoutePage;
