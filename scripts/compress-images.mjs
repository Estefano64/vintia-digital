import sharp from "sharp";
import {
  readdirSync,
  statSync,
  mkdirSync,
  copyFileSync,
  existsSync,
} from "node:fs";
import { join, basename } from "node:path";

// Target display width (~2x for retina). Source files are 2-10x oversized.
function targetWidth(name) {
  if (name.includes("285-x-252")) return 640;
  if (name.includes("480-x-670")) return 960;
  if (name === "contactanos.webp") return 1200;
  return null;
}

const files = [
  "public/contactanos.webp",
  ...readdirSync("public/servicesimg/expandidos").map((f) =>
    join("public/servicesimg/expandidos", f)
  ),
].filter((f) => /\.webp$/i.test(f));

const backupDir = "scripts/.image-backup";
if (!existsSync(backupDir)) mkdirSync(backupDir, { recursive: true });

let before = 0;
let after = 0;

for (const f of files) {
  const name = basename(f);
  const w = targetWidth(name);
  if (!w) {
    console.log(`SKIP ${name} (no target width)`);
    continue;
  }

  const sizeBefore = statSync(f).size;
  before += sizeBefore;

  // Backup original (untracked files have no git history)
  copyFileSync(f, join(backupDir, name));

  // Re-encode: downscale only, quality 80, decode from the backup copy
  const buf = await sharp(join(backupDir, name))
    .resize({ width: w, withoutEnlargement: true })
    .webp({ quality: 80, effort: 5 })
    .toBuffer();

  await sharp(buf).toFile(f);

  const sizeAfter = statSync(f).size;
  after += sizeAfter;

  console.log(
    `${name.padEnd(50)} ${Math.round(sizeBefore / 1024)} KB -> ${Math.round(
      sizeAfter / 1024
    )} KB`
  );
}

console.log("\n" + "=".repeat(60));
console.log(
  `TOTAL: ${(before / 1024 / 1024).toFixed(2)} MB -> ${(
    after /
    1024 /
    1024
  ).toFixed(2)} MB  (saved ${(((before - after) / before) * 100).toFixed(1)}%)`
);
console.log(`Backups in ${backupDir}/`);
