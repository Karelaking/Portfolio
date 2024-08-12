import PageHeading from "../../components/Headings/PageHeading";
import { colorConstants } from "../../constants/ColorsConstants";
import { screenSizeConstants } from "../../constants/SizeConstants";
import { aboutPageConstants } from "../../constants/StringConstants";

const RightAbout = () =>  {
  return <div className={`${screenSizeConstants.subScreenSize} flex-col`}>
    <PageHeading firstTitle={aboutPageConstants.titleFirst} lastTitle={aboutPageConstants.titleSecond}/>

    <div className={`${colorConstants.primatyTextColor} font-comfortaa lg:text-xl my-4 font-bold`}>{aboutPageConstants.aboutText}</div>
  </div>;
}

export default RightAbout
