import {
  generateHydrationScript,
  getAssets,
  renderToString,
} from "solid-js/web";
import App from "./app";

export function render() {
  const html = renderToString(() => <App />);
  const scripts = generateHydrationScript();
  return {
    html,
    scripts,
    assets: getAssets(),
  };
}
