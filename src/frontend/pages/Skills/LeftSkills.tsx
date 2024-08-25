import React from 'react';
import PageHeading from '../../components/Headings/PageHeading';
import { colorConstants } from '../../constants/ColorsConstants';
import { screenSizeConstants } from '../../constants/SizeConstants';
import { skillsPageConstants } from '../../constants/StringConstants';

const LeftSkills: React.FC = () => {
    return (
        <div className={`${screenSizeConstants.subScreenSize} flex-col`}>
            <div
                className={`flex lg:mx-8 items-center flex-col lg:px-4 py-12 lg:bg-gray-500 lg:bg-opacity-10 rounded-xl backdrop-blur-md`}
            >
                <PageHeading
                    firstTitle={skillsPageConstants.titleFirst}
                    lastTitle={skillsPageConstants.titleSecond}
                />

                <div className={`${screenSizeConstants.pageTextContentSize}`}>
                    {skillsPageConstants.skillsText}
                </div>
            </div>
        </div>
    );
};

export default LeftSkills;
