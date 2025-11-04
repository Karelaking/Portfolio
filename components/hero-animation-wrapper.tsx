"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef, useEffect, ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

interface HeroAnimationWrapperProps {
  children: ReactNode;
}

const HeroAnimationWrapper = ({ children }: HeroAnimationWrapperProps): React.JSX.Element => {
  const heroSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroSectionRef.current) return;

    // Select the section element and all animated elements
    const section = heroSectionRef.current.querySelector('section');
    if (!section) return;

    const ctx = gsap.context(() => {
      // Select elements by data attributes
      const nameHeading = section.querySelector('[data-animate="name"]');
      const heading = section.querySelector('[data-animate="heading"]');
      const sub = section.querySelector('[data-animate="sub"]');
      const buttons = section.querySelector('[data-animate="buttons"]');
      const mediaButtons = section.querySelector('[data-animate="media-buttons"]');
      const modelCanvas = section.querySelector('[data-animate="model"]');
      const circle = section.querySelector('[data-animate="circle"]');

      // Initial entrance animation using GSAP
      const entranceElements = [heading, sub, buttons].filter(Boolean);
      entranceElements.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            ease: "power3.out",
            delay: i * 0.2 
          }
        );
      });

      // Left side elements (text content)
      const leftElements = [
        nameHeading,
        heading,
        sub,
        mediaButtons,
        buttons,
      ].filter(Boolean);

      // Right side elements (3D model and circle)
      const rightElements = [
        modelCanvas,
        circle,
      ].filter(Boolean);

      // Animate left elements to the left on scroll
      leftElements.forEach((element, index) => {
        gsap.to(element, {
          x: -300 - (index * 50), // Move left with stagger
          opacity: 0,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1,
            // markers: true, // Uncomment for debugging
          },
        });
      });

      // Animate right elements to the right on scroll
      rightElements.forEach((element, index) => {
        gsap.to(element, {
          x: 300 + (index * 50), // Move right with stagger
          opacity: 0,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1,
            // markers: true, // Uncomment for debugging
          },
        });
      });
    }, heroSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroSectionRef}>
      {children}
    </div>
  );
};

export default HeroAnimationWrapper;
