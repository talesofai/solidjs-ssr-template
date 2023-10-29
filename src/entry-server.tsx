import UnoResetStyles from "@unocss/reset/sanitize/sanitize.css?inline";
import { Request } from "express";
import {
  generateHydrationScript,
  getAssets,
  renderToString,
  useAssets,
} from "solid-js/web";
import UnoGlobalStyles from "uno.css?inline";
import UnoStyles from "virtual:uno.css?inline";
import App from "./app";
import { SSRProvider, injectSSRContext } from "./ssr-context";

export function render(req: Request) {
  const html = renderToString(() => {
    const ctx = injectSSRContext(req);

    useAssets(() => <style type="text/css">{UnoResetStyles}</style>);
    useAssets(() => <style type="text/css">{UnoGlobalStyles}</style>);
    useAssets(() => <style type="text/css">{UnoStyles}</style>);
    return (
      <SSRProvider value={ctx}>
        <App />
      </SSRProvider>
    );
  });
  const scripts = generateHydrationScript();
  return {
    html,
    scripts,
    assets: getAssets(),
  };
}
