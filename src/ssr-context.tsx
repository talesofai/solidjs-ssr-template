import type { Request } from "express";
import { createContext, useContext } from "solid-js";
import { useAssets } from "solid-js/web";
import { getSSRContextData } from "./ssr-data-fetch";

const SSRContext = createContext<SSRContext | null>(null);

export const SSRProvider = SSRContext.Provider;

export function useSSRContext() {
  return useContext(SSRContext);
}

export function injectSSRContext(request: Request) {
  const ssrContext = getSSRContextData(request);

  useAssets(() => (
    <script>window['ssrInjectData'] = '{JSON.stringify(ssrContext)}'</script>
  ));

  return ssrContext;
}

export function getInjectedSSRContext(): SSRContext | null {
  // @ts-expect-error
  const ssrInjectData = window["ssrInjectData"];
  if (!ssrInjectData) return null;
  if (typeof ssrInjectData !== "string") return null;
  const regexp = /<!--\$-->(\S*)<!--\/-->/;

  const injectStr = ssrInjectData.match(regexp)?.[1];
  if (!injectStr) return null;

  try {
    return JSON.parse(injectStr);
  } catch (e) {
    return null;
  }
}
