import React from 'react';
import { screenSizeConstants } from '../../constants/SizeConstants';
import LeftAbout from './LeftAbout';
import RightAbout from './RightAbout';

const About: React.FC = () => {
    return (
        <section className={`${screenSizeConstants.mainScreenSize}`}>
            <LeftAbout />
            <RightAbout />
        </section>
    );
};

export default About;
