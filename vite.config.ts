import autoprefixer from "autoprefixer";
import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    UnoCSS(),
    solid({
      ssr: true,
    }),
  ],
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },
});
