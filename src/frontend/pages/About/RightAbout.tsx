import React from 'react';
import PageHeading from '../../components/Headings/PageHeading';
import { screenSizeConstants } from '../../constants/SizeConstants';
import { aboutPageConstants } from '../../constants/StringConstants';

const RightAbout: React.FC = () => {
    return (
        <div
            className={`${screenSizeConstants.subScreenSize} flex-col order-1 lg:order-2`}
        >
            <div
                className={`flex lg:mx-8 items-center flex-col lg:px-4 py-12 lg:bg-gray-500 lg:bg-opacity-10 rounded-xl backdrop-blur-md`}
            >
                <PageHeading
                    firstTitle={aboutPageConstants.titleFirst}
                    lastTitle={aboutPageConstants.titleSecond}
                />

                <div className={`${screenSizeConstants.pageTextContentSize}`}>
                    {aboutPageConstants.aboutText}
                </div>
            </div>
        </div>
    );
};

export default RightAbout;
