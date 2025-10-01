import type { NextConfig } from "next";
import lingoCompiler from "lingo.dev/compiler";

const withLingo = lingoCompiler.next({
  sourceRoot: "app",
  lingoDir: "lingo",
  sourceLocale: "en",
  targetLocales: ["fr"],
  rsc: true,
  useDirective: true,
  debug: true,
});


const nextConfig: NextConfig = {
  /* config options here */
};

export default withLingo(nextConfig);
