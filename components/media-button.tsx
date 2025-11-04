"use client";

import React, { useRef } from 'react'
import { Button } from './ui/button';
import { LucideProps } from 'lucide-react';
import { gsap } from 'gsap';

export interface MediaButtonProps {
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  color?: string;
  handleClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const MediaButton = ({ icon: Icon, color, handleClick }: MediaButtonProps): React.JSX.Element => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = () => {
    gsap.to(buttonRef.current, {
      scale: 1.15,
      rotate: 5,
      duration: 0.3,
      ease: "back.out(1.7)",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      scale: 1,
      rotate: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
      <Button 
        ref={buttonRef}
        variant="ghost" 
        size="icon" 
        className={`rounded-full p-5 transition-colors duration-300 border-2 border-transparent ${color || 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Icon className="w-10 h-10" />
      </Button>
  );
}

export default MediaButton