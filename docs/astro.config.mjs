import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import { resolve } from "node:path";

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
      external: ["nextjs-components"],
    },
  },
});
