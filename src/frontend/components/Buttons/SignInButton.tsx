import React from 'react';
import { colorConstants } from '../../constants/ColorsConstants';

const SignInButton: React.FC = () => {
    return (
        <div
            className={`${colorConstants.primatyTextColor} capitalize font-lalezar border-2 px-4 cursor-pointer hover:bg-orange-400  hover:text-white rounded-xl py-1 border-orange-400`}
        >
            Sign In
        </div>
    );
};

export default SignInButton;
