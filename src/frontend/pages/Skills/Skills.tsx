import React from 'react';
import { screenSizeConstants } from '../../constants/SizeConstants';
import LeftSkills from './LeftSkills';
import RightSkills from './RightSkills';

const Skills: React.FC = () => {
    return (
        <section className={`${screenSizeConstants.mainScreenSize}`}>
            <LeftSkills />
            <RightSkills />
        </section>
    );
};

export default Skills;
