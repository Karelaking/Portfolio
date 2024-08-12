import PageHeading from "../../components/Headings/PageHeading";
import { colorConstants } from "../../constants/ColorsConstants";
import { screenSizeConstants } from "../../constants/SizeConstants";
import { experiencePageConstants } from "../../constants/StringConstants";

const LeftExperience = () => {
  return <div className={`${screenSizeConstants.subScreenSize} flex-col`}>
    <PageHeading firstTitle={experiencePageConstants.titleFirst} lastTitle={experiencePageConstants.titleSecond}/>
    <div className={`${colorConstants.primatyTextColor} font-comfortaa font-bold lg:text-xl lg:mx-4 my-4`}>
        {experiencePageConstants.experienceText}
    </div>
  </div>;
}

export default LeftExperience;
