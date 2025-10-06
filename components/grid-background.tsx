import React from 'react'

const GridBackground = () => {
  return (
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5_1px,transparent_1px)] bg-[size:50px_50px] animate-grid-flow" />
    </div>
  );
}

export default GridBackground
