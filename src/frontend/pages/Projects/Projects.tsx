import { screenSizeConstants } from "../../constants/SizeConstants";
import LeftProjects from "./LeftProjects";
import RightProjects from "./RightProjects";

const Projects = () => {
  return <section className={`${screenSizeConstants.mainScreenSize}`}>
    <LeftProjects/>
    <RightProjects/>
  </section>;
}

export default Projects
