import React from 'react';

const Logo = (props) => {
    return (
      <>
        <h1 className="text-white capitalize font-SofadiOne">
          {props.partOne}
          <span className="mx-1 capitalize">{props.partTwo}</span>
        </h1>
      </>
    );
};

export default Logo;
