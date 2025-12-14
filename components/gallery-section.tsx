import React from "react";
import { DraggableCardBody, DraggableCardContainer } from "./ui/draggable-card";
import Image from "next/image";


export function GallerySection() {
  const items = [
    {
      title: "Tyler Durden",
      image:
        "https://www.instagram.com/p/DSKlTmwklae/media?size=l",
      className: "absolute top-10 left-[20%] rotate-[-5deg]",
    },
    {
      title: "The Narrator",
      image:
        "https://www.instagram.com/p/DSKlPW4Ej5g/media?size=l",
      className: "absolute top-40 left-[25%] rotate-[-7deg]",
    },
    {
      title: "Iceland",
      image:
        "https://www.instagram.com/p/DSKlMX_EktB/media?size=l",
      className: "absolute top-5 left-[40%] rotate-[8deg]",
    },
    {
      title: "Japan",
      image:
        "https://www.instagram.com/p/CyNg9gnO4x6/media?size=l",
      className: "absolute top-32 left-[55%] rotate-[10deg]",
    },
    {
      title: "Norway",
      image:
        "https://www.instagram.com/p/Ct7DTD7yCLr/media?size=l",
      className: "absolute top-20 right-[35%] rotate-[2deg]",
    },  {
      title: "Norway",
      image:
        "https://www.instagram.com/p/Csnczc0O8SL/media?size=l",
      className: "absolute top-20 right-[35%] rotate-[2deg]",
    },
    {
      title: "New Zealand",
      image:
        "https://www.instagram.com/p/Ct7DF-NypzU/media?size=l",
      className: "absolute top-24 left-[45%] rotate-[-7deg]",
    },
    {
      title: "Canada",
      image:
        "https://www.instagram.com/p/Cs8R1kEStUu/media?size=l",
      className: "absolute top-8 left-[30%] rotate-[4deg]",
    },
  ];
  return (
    <DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-clip bg-gray-100">
      <p className="absolute top-1/2 mx-auto max-w-sm -translate-y-3/4 text-center text-2xl font-black text-neutral-400 md:text-4xl dark:text-neutral-800">
        If its your first day at Fight Club, you have to fight.
      </p>
{items.map((item, index) => (
        <DraggableCardBody key={index} className={item.className}>
          <Image
            src={item.image}
            alt={item.title}
      className="pointer-events-none relative z-10 h-80 w-80 object-cover"
      fill
          />
          <h3 className="mt-4 text-center text-2xl font-bold text-neutral-700 dark:text-neutral-300">
            {item.title}
          </h3>
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  );
}
