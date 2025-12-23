import fs from "fs";
import path from "path";

const DIST = path.join(process.cwd(), "dist");

if (fs.existsSync(DIST)) {
  fs.rmSync(DIST, { recursive: true, force: true });
  console.log("OK: dist/ entfernt.");
} else {
  console.log("OK: dist/ existiert nicht.");
}
