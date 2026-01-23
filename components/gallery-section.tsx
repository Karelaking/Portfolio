import React from "react";
import { SectionContainer } from "./ui/section-container";
import { GalleryScroll } from "./ui/gallery-scroll";

export function GallerySection() {
  const items = [
    {
      title: "Tyler Durden",
      url: "https://www.instagram.com/p/DSKlTmwklae/media?size=l",
      className: "absolute top-10 left-[20%] rotate-[-5deg]",
    },
    {
      title: "The Narrator",
      url: "https://www.instagram.com/p/DSKlPW4Ej5g/media?size=l",
      className: "absolute top-40 left-[25%] rotate-[-7deg]",
    },
    {
      title: "Iceland",
      url: "https://www.instagram.com/p/DSKlMX_EktB/media?size=l",
      className: "absolute top-5 left-[40%] rotate-[8deg]",
    },
    {
      title: "Japan",
      url: "https://www.instagram.com/p/CyNg9gnO4x6/media?size=l",
      className: "absolute top-32 left-[55%] rotate-[10deg]",
    },
    {
      title: "Norway",
      url: "https://www.instagram.com/p/Ct7DTD7yCLr/media?size=l",
      className: "absolute top-20 right-[35%] rotate-[2deg]",
    },
    {
      title: "Norway",
      url: "https://www.instagram.com/p/Csnczc0O8SL/media?size=l",
      className: "absolute top-20 right-[35%] rotate-[2deg]",
    },
    {
      title: "New Zealand",
      url: "https://www.instagram.com/p/Ct7DF-NypzU/media?size=l",
      className: "absolute top-24 left-[45%] rotate-[-7deg]",
    },
    {
      title: "Canada",
      url: "https://www.instagram.com/p/Cs8R1kEStUu/media?size=l",
      className: "absolute top-8 left-[30%] rotate-[4deg]",
    },
  ];
  return (
    <SectionContainer id="gallery" className="p-0 m-0"> 
      <div className=""> 
        <GalleryScroll items={items} speed="slow"  />
        <GalleryScroll items={items} direction="right" speed="slow"/>
        <GalleryScroll items={items}  speed="slow" className="hidden md:block"/>
      </div>
    </SectionContainer>
  );
}
