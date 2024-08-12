import PageHeading from "../../components/Headings/PageHeading";
import { colorConstants } from "../../constants/ColorsConstants";
import { screenSizeConstants } from "../../constants/SizeConstants";
import { skillsPageConstants } from "../../constants/StringConstants";

const LeftSkills = () => {
  return <div className={`${screenSizeConstants.subScreenSize} flex-col`}>
    <PageHeading firstTitle={skillsPageConstants.titleFirst} lastTitle={skillsPageConstants.titleSecond}/>

    <div className={`${colorConstants.primatyTextColor} font-bold font-comfortaa lg:text-xl lg:my-4`}>
        {skillsPageConstants.skillsText}
    </div>
  </div>;
}

export default LeftSkills;
