import React from 'react';
import PageHeading from '../../components/Headings/PageHeading';
import { colorConstants } from '../../constants/ColorsConstants';
import { screenSizeConstants } from '../../constants/SizeConstants';
import { projectsPageConstants } from '../../constants/StringConstants';

const RightProjects: React.FC = () => {
    return (
        <div className={`${screenSizeConstants.subScreenSize} flex-col`}>
            <div
                className={`flex lg:mx-8 items-center flex-col lg:px-4 py-12 lg:bg-gray-500 lg:bg-opacity-10 rounded-xl backdrop-blur-md`}
            >
                <PageHeading
                    firstTitle={projectsPageConstants.titleFirst}
                    lastTitle={projectsPageConstants.titleSecond}
                />
                <div className={`${screenSizeConstants.pageTextContentSize}`}>
                    {projectsPageConstants.projectsText}
                </div>
            </div>
        </div>
    );
};

export default RightProjects;
