import React from 'react';

const PageHeading = (props) => {
    return (
        <>
            <h1 className='capitalize flex text-4xl my-12 font-bold'>
                {props.partOne}
                <spam className='mx-2 capitalize'>{props.partTwo}</spam>
            </h1>
        </>
    );
};

export default PageHeading;
