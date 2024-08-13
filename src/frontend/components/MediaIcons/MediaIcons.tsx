import { Link } from "react-router-dom";
import { colorConstants } from "../../constants/ColorsConstants";

type MediaIconsType = {
    link: string;
    svgIcon: React.ReactNode;
};

const MediaIcons = ({link, svgIcon}: MediaIconsType) => {
  return <div className={`${colorConstants.secondaryBackgroundColor} w-max h-max p-4 rounded-full opacity-70 ${colorConstants.primaryBorderColor} border-2 backdrop-blur-sm hover:scale-125 duration-500`}>
    <Link to={link}>
      {svgIcon}
    </Link>
  </div>
}

export default MediaIcons;
