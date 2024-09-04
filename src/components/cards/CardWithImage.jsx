import React from 'react';

const CardWithImage = (props) => {
    return (
        <>
            <div class="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow">
                <img
                    src={props.image}
                    class="aspect-video w-full object-cover"
                    alt=""
                />
                <div class="p-4">
                    {/* <p class="mb-1 text-sm text-primary-500">
                        Andrea Felsted • <time>18 Nov 2022</time>
                    </p> */}
                    <h3 class="text-xl font-medium text-gray-900">
                        {props.title}
                    </h3>
                    <p class="mt-1 text-gray-500">{props.description}</p>
                    <div class="mt-4 flex gap-2">
                        <span class="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                            {' '}
                            Design{' '}
                        </span>
                        <span class="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600">
                            {' '}
                            Product{' '}
                        </span>
                        <span class="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-600">
                            {' '}
                            Develop{' '}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardWithImage;
