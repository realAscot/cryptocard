import path from "path";
import { context } from "esbuild";

const SRC_DIR = path.join(process.cwd(), "src");

const ctx = await context({
  entryPoints: [path.join(SRC_DIR, "main.js")],
  bundle: true,
  format: "esm",
  platform: "browser",
  target: ["es2020"],
  sourcemap: true,

  // WICHTIG: nur outfile ODER outdir
  outfile: path.join(SRC_DIR, "main.bundle.js"),

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

await ctx.watch();

const { host, port } = await ctx.serve({
  servedir: SRC_DIR,
  port: 5173
});

console.log(`Dev-Server: http://${host}:${port}`);
console.log("Hinweis: In src/index.html muss für Dev der Script-Tag auf main.bundle.js zeigen, wenn du Bundle nutzen willst.");
console.log("Standardmäßig kannst du auch direkt main.js als ESM laden (ohne Bundle).");

