import React from 'react';
import { screenSizeConstants } from '../../constants/SizeConstants';
import LeftHome from './LeftHome';
import RightHome from './RightHome';

const Home: React.FC = () => {
    return (
        <section className={`${screenSizeConstants.mainScreenSize}`}>
            <LeftHome />
            <RightHome />
        </section>
    );
};

export default Home;
