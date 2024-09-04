import React from 'react';

const WarningAlert = (props) => {
    return (
        <>
            <div class="rounded-md bg-yellow-50 p-4 text-sm text-yellow-500">
                <b>Warning </b>
                {props.message}
            </div>
        </>
    );
};

export default WarningAlert;
