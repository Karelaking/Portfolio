import { screenSizeConstants } from "../../constants/SizeConstants";
import LeftAbout from "./LeftAbout";
import RightAbout from "./RightAbout";

const About = () => {
  return <section className={`${screenSizeConstants.mainScreenSize}`}>
    <LeftAbout/>
    <RightAbout/>
  </section>;
}

export default About
