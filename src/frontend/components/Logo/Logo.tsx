import { Link } from 'react-router-dom';
import { logoConstants } from '../../constants/StringConstants';
import { colorConstants } from '../../constants/ColorsConstants';
import React from 'react';

const outerLogoCssStyle = `${colorConstants.primatyTextColor} font-lalezar p-0 m-0 uppercase flex justify-center lg:text-3xl text-xl`;
const innerLogoCssStyle = `${colorConstants.activeTextColor} ${colorConstants.activeBorderColor} border-b-2 lg:mx-2 p-0 m-0 flex justify-center`;

const Logo: React.FC = () => {
    return (
        <Link className={`flex`} to="/" key="/">
            <div className={`${outerLogoCssStyle}`}>
                {logoConstants.firstPart}
                <div className={`${innerLogoCssStyle}`}>
                    {logoConstants.lastPart}
                </div>
            </div>
        </Link>
    );
};

export default Logo;
