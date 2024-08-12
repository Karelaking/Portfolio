import PageHeading from "../../components/Headings/PageHeading";
import { colorConstants } from "../../constants/ColorsConstants";
import { screenSizeConstants } from "../../constants/SizeConstants";
import { experiencePageConstants } from "../../constants/StringConstants";

const LeftExperience = () => {
  return (
    <div
      className={`${screenSizeConstants.subScreenSize} flex-col justify-center items-center`}
    >
      <PageHeading
        firstTitle={experiencePageConstants.titleFirst}
        lastTitle={experiencePageConstants.titleSecond}
      />
      <div
        className={`${screenSizeConstants.pageTextContentSize}`}
      >
        {experiencePageConstants.experienceText}
      </div>
    </div>
  );
};

export default LeftExperience;
