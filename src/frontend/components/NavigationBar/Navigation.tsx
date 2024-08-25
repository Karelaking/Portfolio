import React from 'react';
import SignInButton from '../Buttons/SignInButton';
import Logo from '../Logo/Logo';

const navigationBarCssStyle = `w-full h-max bg-transpirent backdrop-blur-sm top-0 justify-between gap-24 items-center flex start-0 z-50 fixed px-6 lg:px-12 py-2`;

const Navigation: React.FC = () => {
    return (
        <nav className={`${navigationBarCssStyle}`}>
            <Logo />
            <div className={`flex`}>
                <SignInButton />
            </div>
        </nav>
    );
};

export default Navigation;
