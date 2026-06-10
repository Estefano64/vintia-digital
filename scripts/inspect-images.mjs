import sharp from "sharp";
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const targets = [
  "public/contactanos.webp",
  ...readdirSync("public/servicesimg/expandidos").map((f) =>
    join("public/servicesimg/expandidos", f)
  ),
];

for (const f of targets) {
  try {
    const meta = await sharp(f).metadata();
    const kb = Math.round(statSync(f).size / 1024);
    console.log(
      `${f.split(/[\\/]/).pop().padEnd(50)} ${String(meta.width)}x${meta.height}  ${kb} KB`
    );
  } catch (e) {
    console.log(`${f} -> ERROR ${e.message}`);
  }
}
