import React from 'react';

const InfoAlert = (props) => {
    return (
        <>
            <div className="rounded-md bg-primary-50 p-4 text-sm text-primary-500">
                <b>Info </b>
                {props.message}
            </div>
        </>
    );
};

export default InfoAlert;
