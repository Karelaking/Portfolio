import type { NextConfig } from "next";
import lingoCompiler from "lingo.dev/compiler";

const withLingo = lingoCompiler.next({
  sourceRoot: "app",
  lingoDir: "lingo",
  sourceLocale: "en",
  targetLocales: ["fr", "es"],
  rsc: true,
  useDirective: false,
  debug: true,
  models:"lingo.dev"
});


const nextConfig: NextConfig = {
  experimental: {
  },
};

export default withLingo(nextConfig);
