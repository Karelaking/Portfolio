import React, { forwardRef } from 'react'

const Circle = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} className="absolute top-10 right-10 w-40 h-40 border-4 border-indigo-200 rounded-full animate-ping-slow"></div>
  );
});

Circle.displayName = "Circle";

export default Circle;
