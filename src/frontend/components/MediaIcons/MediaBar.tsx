import MediaIcons from './MediaIcons';
import { mediaIconsPathConstants } from '../../constants/PathConstants';
import React from 'react';

const MediaBar: React.FC = () => {
    return (
        <div className="w-full lg:pl-8 lg:pr-16 h-max lg:my-10 my-8 justify-between items-center px-4 flex">
            {mediaIconsPathConstants.map((mediaIconsPathConstant) => {
                return (
                    <MediaIcons
                        link={mediaIconsPathConstant.path}
                        svgIcon={mediaIconsPathConstant.svg}
                        key={mediaIconsPathConstant.key}
                    />
                );
            })}
        </div>
    );
};

export default MediaBar;
