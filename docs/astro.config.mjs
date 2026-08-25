import { resolve } from "node:path";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";

const componentsDir = resolve(import.meta.dirname, "../components");

export default defineConfig({
  integrations: [react(), mdx()],
  vite: {
    resolve: {
      alias: {
        "@": resolve(import.meta.dirname, ".."),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "${resolve(import.meta.dirname, "../styles/tokens.scss").replace(/\\/g, "/")}" as *;\n`,
          api: "modern-compiler",
        },
      },
    },
    ssr: {
      external: [],
    },
  },
});
