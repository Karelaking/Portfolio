import React from 'react';

const DividerWithText = (props) => {
    return (
        <>
            <div class="my-8 flex items-center gap-4 before:h-px before:flex-1 before:bg-gray-300  before:content-[''] after:h-px after:flex-1 after:bg-gray-300  after:content-['']">
                {props.text ?? 'More'}
            </div>
        </>
    );
};

export default DividerWithText;
