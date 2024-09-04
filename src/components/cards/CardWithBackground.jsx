import React from 'react';

const CardWithBackground = (props) => {
    return (
        <>
            <div class="relative mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow">
                <div>
                    <img src={props.image} class="w-full object-cover" alt="" />
                </div>
                <div class="absolute inset-0 z-10 bg-gradient-to-t from-black"></div>
                <div class="absolute inset-x-0 bottom-0 z-20 p-4">
                    {/* <p class="mb-1 text-sm text-white text-opacity-80">Andrea Felsted • <time>18 Nov 2022</time></p> */}
                    <h3 class="text-xl font-medium text-white">
                        {props.title}
                    </h3>
                    <p class="mt-1 text-white text-opacity-80">
                        {props.description}
                    </p>
                </div>
            </div>
        </>
    );
};

export default CardWithBackground;
