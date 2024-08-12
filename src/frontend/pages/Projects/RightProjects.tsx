import PageHeading from "../../components/Headings/PageHeading";
import { colorConstants } from "../../constants/ColorsConstants";
import { screenSizeConstants } from "../../constants/SizeConstants";
import { projectsPageConstants } from "../../constants/StringConstants";

const RightProjects = () => {
  return <div className={`${screenSizeConstants.subScreenSize} flex-col`}>
    <PageHeading firstTitle={projectsPageConstants.titleFirst} lastTitle={projectsPageConstants.titleSecond}/>
    <div className={`${colorConstants.primatyTextColor} font-comfortaa font-bold lg:text-xl lg:my-4 lg:px-4`}>
        {projectsPageConstants.projectsText}
    </div>
  </div>;
}

export default RightProjects;
