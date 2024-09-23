import React from 'react';
import Profile from '../../assets/images/profile.jpg';
import { ArrowDownIcon } from '@heroicons/react/16/solid';


export const Home = () => {
    return (
        <>
            <div className="flex h-screen flex-col items-center bg-blue-50">
                <img
                    src={Profile}
                    alt=""
                    className="w-full h-1/2 mb-12 rounded-full shadow-inner shadow-white"
                />
                {/* media icons */}
                <div className="flex flex-col items-center">
                    <p className="text-center my-5 capitalize">scroll down</p>
                    <ArrowDownIcon className="size-7 animate-bounce my-4 cursor-pointer" />
                </div>
            </div>
        </>
    );
};
