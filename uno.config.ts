import { defineConfig, presetAttributify, presetUno, UserConfig } from "unocss";

const config: UserConfig = defineConfig({
  presets: [presetAttributify(), presetUno()],
});

export default config;
