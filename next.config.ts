import type { NextConfig } from "next";
import lingoCompiler from "lingo.dev/compiler";

const withLingo = lingoCompiler.next({
  sourceRoot: "app",
  lingoDir: "lingo",
  sourceLocale: "en",
  targetLocales: ["fr", "es", "ko-KR", "hi-IN"],
  rsc: true,
  useDirective: false,
  debug: true,
  models: "lingo.dev",
});

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: false,
  },
  output: 'standalone',
};

export default withLingo(nextConfig);
