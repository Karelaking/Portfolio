import React from 'react';

const Title = (props) => {
  return (
    <div className="text-8xl lg:text-9xl text-black text-center lg:flex justify-center lg:gap-8 items-center w-full font-Staatliches font-medium">
      {props.first}
      <div className="">{props.second}</div>
    </div>
  );
};

export default Title;
