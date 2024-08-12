import { screenSizeConstants } from "../../constants/SizeConstants";
import LeftExperience from "./LeftExperience";
import RightExperience from "./RightExperience";


const Experience = () => {
  return <section className={`${screenSizeConstants.mainScreenSize} snap-start`}>
    <LeftExperience/>
    <RightExperience/>
  </section>;
}

export default Experience;
