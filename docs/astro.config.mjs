import { resolve } from "node:path";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";

const tokensPath = resolve(
  import.meta.dirname,
  "../styles/tokens.scss",
).replace(/\\/g, "/");

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
          // Inject token variables into every SCSS unit, EXCEPT tokens.scss
          // itself - prepending its own path there causes a Sass module loop.
          additionalData: (source, id) =>
            id.replace(/\\/g, "/").endsWith("/styles/tokens.scss")
              ? source
              : `@use "${tokensPath}" as *;\n${source}`,
          api: "modern-compiler",
        },
      },
    },
    ssr: {
      external: [],
    },
  },
});
