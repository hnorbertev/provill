import sharp from "sharp";
import { mkdir } from "node:fs/promises";

await mkdir("public/images", { recursive: true });
for (const name of ["hero", "bolt", "szolg", "kapcs"]) {
  for (const width of [640, 1280, 1920]) {
    await sharp(`assets/${name}.jpg`)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(`public/images/${name}-${width}.webp`);
  }
}
console.log("A helyi képek optimalizálása elkészült.");
