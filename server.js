// ts-check

import compression from "compression";
import express from "express";
import fs from "fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import serveStatic from "serve-static";
import * as vite from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isTest = process.env.VITEST;

export async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === "production",
  hmrPort,
) {
  const resolve = (p) => path.resolve(__dirname, p);

  const app = express();

  /**
   * @type {import('vite').ViteDevServer}
   */
  let viteServer;
  if (!isProd) {
    viteServer = await vite.createServer({
      root,
      logLevel: isTest ? "error" : "info",
      server: {
        middlewareMode: true,
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100,
        },
        hmr: {
          port: hmrPort,
        },
      },
      appType: "custom",
    });

    app.use(viteServer.middlewares);
  } else {
    app.use(compression());
    app.use(
      serveStatic(resolve("dist/client"), {
        index: false,
      }),
    );
  }

  app.use("*", async (req, res) => {
    try {
      const url = req.originalUrl;

      /**
       * @type {string}
       */
      let template;
      /**
       * @type {import('./src/entry-server').render}
       */
      let render;
      if (!isProd) {
        // always read fresh template in dev
        template = fs.readFileSync(resolve("index.html"), "utf-8");
        template = await viteServer.transformIndexHtml(url, template);
        render = (await viteServer.ssrLoadModule("/src/entry-server.tsx"))
          .render;
      } else {
        const indexProd = isProd
          ? fs.readFileSync(resolve("dist/client/index.html"), "utf-8")
          : "";
        template = indexProd;
        render = (await import("./dist/server/entry-server.js")).render;
      }

      const renderResult = render(req);

      const html = template
        .replace(`<!--app-html-->`, renderResult.html)
        .replace(`<!--app-assets-->`, renderResult.assets)
        .replace(`<!--app-scripts-->`, renderResult.scripts);

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      !isProd && viteServer.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  return { app, vite };
}

if (!isTest) {
  createServer().then(({ app }) =>
    app.listen(3000, () => {
      console.log("http://localhost:3000");
    }),
  );
}
