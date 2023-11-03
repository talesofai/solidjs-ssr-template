import type { UserConfig } from 'unocss';
import { defineConfig, presetAttributify, presetUno } from 'unocss';

const config: UserConfig = defineConfig({
  presets: [presetAttributify(), presetUno()],
});

export default config;
