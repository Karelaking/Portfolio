import MediaIcons from "./MediaIcons";
import { mediaIconsPathConstants } from "../../constants/PathConstants";

const MediaBar = () => {
  return <div className="w-full h-max lg:my-16 my-8 lg:gap-4 gap-3 items-center flex">
    {mediaIconsPathConstants.map((mediaIconsPathConstant) =>{
        return <MediaIcons link={mediaIconsPathConstant.path} svgIcon={mediaIconsPathConstant.svg}/>
    })}
  </div>;
}

export default MediaBar
