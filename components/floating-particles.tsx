import React from "react";

const FloatingParticles = (): React.JSX.Element => {
  return (
    <>
      <div className="absolute inset-0 pointer-events-none overflow-hidden dark:bg-slate-800">
        {[...Array(500)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 dark:bg-violet-500/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default FloatingParticles;
