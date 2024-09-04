import React from 'react';

const SuccessAlert = (props) => {
    return (
        <>
            <div class="rounded-md bg-green-50 p-4 text-sm text-green-500">
                <b>Success </b>
                {props.message}
            </div>
        </>
    );
};

export default SuccessAlert;
