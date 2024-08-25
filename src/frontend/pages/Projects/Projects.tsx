import React from 'react';
import { screenSizeConstants } from '../../constants/SizeConstants';
import LeftProjects from './LeftProjects';
import RightProjects from './RightProjects';

const Projects: React.FC = () => {
    return (
        <section className={`${screenSizeConstants.mainScreenSize}`}>
            <LeftProjects />
            <RightProjects />
        </section>
    );
};

export default Projects;
