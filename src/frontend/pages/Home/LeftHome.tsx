import { colorConstants } from "../../constants/ColorsConstants";
import { screenSizeConstants } from "../../constants/SizeConstants";
import { homePageConstants } from "../../constants/StringConstants";

const LeftHome = () => {
  return (
    <div
      className={`${screenSizeConstants.subScreenSize} flex-col font-bold items-center justify-center`}
    >
      <div className={`${colorConstants.activeBorderColor} border-l-4 px-4`}>
        <div
          className={`${colorConstants.primatyTextColor} font-comfortaa text-md lg:text-xl`}
        >
          {homePageConstants.welcomeText}
        </div>
        <div
          className={`${colorConstants.primatyTextColor} flex text-4xl font-lalezar uppercase lg:text-7xl`}
        >
          {homePageConstants.firstPart}
          <div className={`${colorConstants.activeTextColor} mx-3`}>
            {homePageConstants.secondPart}
          </div>
        </div>
        <div
          className={`${colorConstants.primatyTextColor} font-comfortaa text-md lg:text-xl fon`}
        >
          {homePageConstants.welcomeText2}
        </div>
        <div
          className={`${colorConstants.primatyTextColor} font-comfortaa text-md lg:text-xl`}
        >
          {homePageConstants.mainText}
        </div>
      </div>
    </div>
  );
};

export default LeftHome;
