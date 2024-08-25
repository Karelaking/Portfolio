import React from 'react';
import PageHeading from '../../components/Headings/PageHeading';
import { colorConstants } from '../../constants/ColorsConstants';
import { screenSizeConstants } from '../../constants/SizeConstants';
import { experiencePageConstants } from '../../constants/StringConstants';

const LeftExperience: React.FC = () => {
    return (
        <div
            className={`${screenSizeConstants.subScreenSize} flex-col justify-center items-center`}
        >
            <div
                className={`flex lg:mx-8 items-center flex-col lg:px-4 py-12 lg:bg-gray-500 lg:bg-opacity-10 rounded-xl backdrop-blur-md`}
            >
                <PageHeading
                    firstTitle={experiencePageConstants.titleFirst}
                    lastTitle={experiencePageConstants.titleSecond}
                />
                <div className={`${screenSizeConstants.pageTextContentSize}`}>
                    {experiencePageConstants.experienceText}
                </div>
            </div>
        </div>
    );
};

export default LeftExperience;
