import fs from "fs";
import path from "path";
import { build } from "esbuild";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");
const DIST = path.join(ROOT, "dist");

// Sicherstellen, dass dist existiert
fs.mkdirSync(DIST, { recursive: true });

// 1) JS bundle (inkl. Assets als data: URLs)
const jsResult = await build({
  entryPoints: [path.join(SRC, "main.js")],
  bundle: true,
  format: "iife",
  platform: "browser",
  target: ["es2020"],
  minify: true,
  sourcemap: false,
  write: false,
  outfile: "bundle.js",
  loader: {
    ".png": "dataurl",
    ".jpg": "dataurl",
    ".jpeg": "dataurl",
    ".gif": "dataurl",
    ".webp": "dataurl",
    ".svg": "dataurl",
    ".woff2": "dataurl",
    ".woff": "dataurl",
    ".ttf": "dataurl",
    ".eot": "dataurl",
    ".ico": "dataurl"
  }
});

const jsCode = jsResult.outputFiles[0].text;

// 2) CSS bundle (inkl. url() Assets als data: URLs)
const cssResult = await build({
  entryPoints: [path.join(SRC, "style.css")],
  bundle: true,
  platform: "browser",
  target: ["es2020"],
  minify: true,
  sourcemap: false,
  write: false,
  outfile: "style.css",
  loader: {
    ".png": "dataurl",
    ".jpg": "dataurl",
    ".jpeg": "dataurl",
    ".gif": "dataurl",
    ".webp": "dataurl",
    ".svg": "dataurl",
    ".woff2": "dataurl",
    ".woff": "dataurl",
    ".ttf": "dataurl",
    ".eot": "dataurl",
    ".ico": "dataurl"
  }
});

const cssCode = cssResult.outputFiles[0].text;

// 3) HTML lesen und inline ersetzen
const htmlPath = path.join(SRC, "index.html");
let html = fs.readFileSync(htmlPath, "utf8");

// Ersetzt <link ... data-inline="true" ...> durch <style>...</style>
html = html.replace(
  /<link\s+[^>]*data-inline="true"[^>]*>/i,
  `<style>\n${cssCode}\n</style>`
);

// Ersetzt <script type="module" ... data-inline="true"></script> durch <script>...</script>
html = html.replace(
  /<script\s+[^>]*data-inline="true"[^>]*><\/script>/i,
  `<script>\n${jsCode}\n</script>`
);

// Ausgabe
fs.writeFileSync(path.join(DIST, "cryptocard.html"), html, "utf8");

console.log("OK: dist/cryptocard.html erstellt (Single-File).");

