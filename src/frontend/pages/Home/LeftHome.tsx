import React from 'react';
import MediaBar from '../../components/MediaIcons/MediaBar';
import { colorConstants } from '../../constants/ColorsConstants';
import { screenSizeConstants } from '../../constants/SizeConstants';
import { homePageConstants } from '../../constants/StringConstants';

const LeftHome: React.FC = () => {
    return (
        <div
            className={`${screenSizeConstants.subScreenSize} font-bold items-center justify-center flex-col min-h-screen order-2 z-40 lg:order-1`}
        >
            <div className="flex bg-transparent">
                <div className="w-max flex flex-col items-center h-full">
                    <div className={`w-5 h-5 rounded-full`} />
                    <div className="w-1 min-h-[27rem] lg:min-h-[20rem] bg-gradient-to-b from-orange-400" />
                </div>
                <div className={`px-4`}>
                    <div
                        className={`${colorConstants.primatyTextColor} font-comfortaa text-md lg:text-xl font-bold`}
                    >
                        {homePageConstants.welcomeText}
                    </div>
                    <h1
                        className={`${colorConstants.primatyTextColor} flex text-4xl font-lalezar uppercase lg:text-7xl`}
                    >
                        {homePageConstants.firstPart}
                        <span
                            className={`${colorConstants.activeTextColor} mx-3`}
                        >
                            {homePageConstants.secondPart}
                        </span>
                    </h1>
                    <div
                        className={`${colorConstants.primatyTextColor} font-comfortaa text-md lg:text-xl font-bold`}
                    >
                        {homePageConstants.welcomeText2}
                    </div>
                    <div
                        className={`${colorConstants.primatyTextColor} font-comfortaa text-md lg:text-xl font-bold`}
                    >
                        {homePageConstants.mainText}
                    </div>
                </div>
            </div>
            <MediaBar />
        </div>
    );
};

export default LeftHome;
