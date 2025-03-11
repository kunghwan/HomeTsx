import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
export default defineConfig({
  plugins: [tailwindcss(), vanillaExtractPlugin()],
});
