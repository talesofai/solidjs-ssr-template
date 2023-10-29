import "@unocss/reset/sanitize/sanitize.css";
import { hydrate, render } from "solid-js/web";
import "uno.css";
import "virtual:uno.css";
import App from "./app";
import { SSRProvider, getInjectedSSRContext } from "./ssr-context";

const renderFn = import.meta.env.VITE_SSR ? hydrate : render;

renderFn(() => {
  const ctx = getInjectedSSRContext();

  return (
    <SSRProvider value={ctx}>
      <App />
    </SSRProvider>
  );
}, document.getElementById("root")!);
