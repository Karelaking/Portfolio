import MediaIcons from "./MediaIcons";
import { mediaIconsPathConstants } from "../../constants/PathConstants";

const MediaBar = () => {
  return <div className="w-full h-max my-16 gap-4 items-center flex">
    {mediaIconsPathConstants.map((mediaIconsPathConstant) =>{
        return <MediaIcons link={mediaIconsPathConstant.path} svgIcon={mediaIconsPathConstant.svg}/>
    })};
  </div>;
}

export default MediaBar
