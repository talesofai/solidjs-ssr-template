import { hydrate } from "solid-js/web";
import App from "./app";
import { SSRProvider, getInjectedSSRContext } from "./ssr-context";

hydrate(() => {
  const ctx = getInjectedSSRContext();
  return (
    <SSRProvider value={ctx}>
      <App />
    </SSRProvider>
  );
}, document.getElementById("root")!);
