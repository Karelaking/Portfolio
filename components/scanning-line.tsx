import React from "react";

const ScanningLine = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent animate-scan" />
    </div>
  );
};

export default ScanningLine;
