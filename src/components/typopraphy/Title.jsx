import React from 'react';

const Title = (props) => {
  return (
    <div className="text-7xl">
      {props.first}
      <div className=''>{props.second}</div>
    </div>
  );
};

export default Title;
