import { Request } from "express";
import {
  generateHydrationScript,
  getAssets,
  renderToString,
} from "solid-js/web";
import App from "./app";
import { SSRProvider, injectSSRContext } from "./ssr-context";

export function render(req: Request) {
  const html = renderToString(() => {
    const ctx = injectSSRContext(req);
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
