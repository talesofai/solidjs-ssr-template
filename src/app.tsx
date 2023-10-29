import UnoResetStyles from "@unocss/reset/sanitize/sanitize.css?inline";
import { useAssets } from "solid-js/web";
import UnoGlobalStyles from "uno.css?inline";
import UnoStyles from "virtual:uno.css?inline";
import { useSSRContext } from "./ssr-context";

function App() {
  useAssets(() => <style type="text/css">{UnoResetStyles}</style>);
  useAssets(() => <style type="text/css">{UnoGlobalStyles}</style>);
  useAssets(() => <style type="text/css">{UnoStyles}</style>);

  const ssrContext = useSSRContext();

  return (
    <div class="w-screen h-screen">
      <div class="h-full text-center flex select-none all:transition-400">
        <div class="ma">
          <div class="text-5xl fw100 animate-bounce-alt animate-count-infinite animate-duration-1s">
            UnoCSS SSR {ssrContext?.url}
          </div>
          <div class="op30 text-lg fw300 m1">
            The instant on-demand Atomic CSS engine.
          </div>
          <div class="m2 flex justify-center text-2xl op30 hover:op80">
            <a
              class="i-carbon-logo-github text-inherit"
              href="https://github.com/unocss/unocss"
              target="_blank"
            />
          </div>
        </div>
      </div>
      <div class="absolute bottom-5 right-0 left-0 text-center op30 fw300">
        on-demand · instant · fully customizable
      </div>
    </div>
  );
}

export default App;
