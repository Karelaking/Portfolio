'use client';

import { JSX } from "react";
import Heading from "../heading";
import { useFixtureInput } from "react-cosmos/client";

export default function HeadingFixure(): JSX.Element {
  const [title] = useFixtureInput<string>("title", "About");
  const [discription] = useFixtureInput<string[]>("discription", [
    "Crafting Digital Experiences",
    "That Make an Impact",
  ]);
  return <Heading title={title} discription={discription} />;
}
