import React from 'react';

const ErrorAlert = (props) => {
    return (
        <>
            <div class="rounded-md bg-red-50 p-4 text-sm text-red-500">
                <b>Error </b>
                {props.message}
            </div>
        </>
    );
};

export default ErrorAlert;
