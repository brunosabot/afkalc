import { createCanvas, loadImage } from "canvas";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";

type Data = {
  name: string;
};

function getEngraveImageName(engrave: number | undefined) {
  if (engrave === undefined) return `/heroes-star/0.png`;

  let engraveNumber = 0;
  if (engrave >= 80) {
    engraveNumber = 80;
  } else if (engrave >= 60) {
    engraveNumber = 60;
  } else if (engrave >= 30) {
    engraveNumber = 30;
  }

  return `/heroes-star/${engraveNumber}.png`;
}

function getHeroFrame(ascendLevel: number) {
  if (ascendLevel === 1) return `elite`;
  if (ascendLevel === 2) return `elite-p`;
  if (ascendLevel === 3) return `legendary`;
  if (ascendLevel === 4) return `legendary-p`;
  if (ascendLevel === 5) return `mythic`;
  if (ascendLevel === 6) return `mythic-p`;
  if (ascendLevel > 6) return `ascend`;

  return `none`;
}

function getSiImageName(siLevel: number) {
  if (siLevel === 50) return "50";
  if (siLevel >= 40) return "40";
  if (siLevel >= 30) return "30";
  if (siLevel >= 20) return "20";
  if (siLevel >= 10) return "10";
  if (siLevel >= 0) return "0";

  return "x";
}

function getFiImageName(siLevel: number) {
  if (siLevel === 36) return "36";
  if (siLevel >= 9) return "9";
  if (siLevel >= 3) return "3";

  return "x";
}

function getFiCrownImageName(siLevel: number) {
  if (siLevel === 36) return "crown";

  return "x";
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const engraveLevel = parseInt(req.query.engrave as string, 10);
  const ascendLevel = parseInt(req.query.ascend as string, 10);
  const siLevel = parseInt(req.query.si as string, 10);
  const fiLevel = parseInt(req.query.fi as string, 10);

  const engraveImage = getEngraveImageName(engraveLevel);

  const [hero, fact, engrave, frame, si, fi, crown] = await Promise.all([
    loadImage(path.resolve(`./public/${req.query.heroImage}`)).catch(() => undefined),
    loadImage(path.resolve(`./public/factions/${req.query.faction}.png`)).catch(() => undefined),
    loadImage(path.resolve(`./public/${engraveImage}`)).catch(() => undefined),
    loadImage(path.resolve(`./public/heroes-frame/${getHeroFrame(ascendLevel)}.png`)).catch(
      () => undefined
    ),
    loadImage(path.resolve(`./public/heroes-signature/${getSiImageName(siLevel)}.png`)).catch(
      () => undefined
    ),
    loadImage(path.resolve(`./public/heroes-furniture/${getFiImageName(fiLevel)}.png`)).catch(
      () => undefined
    ),
    loadImage(path.resolve(`./public/heroes-furniture/${getFiCrownImageName(fiLevel)}.png`)).catch(
      () => undefined
    ),
  ]);

  const width = 192;
  const height = 192;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.beginPath();

    if (hero) ctx.drawImage(hero, 21, 21, 150, 150);

    const stars = ascendLevel - 7;

    if (stars > 0) {
      ctx.globalAlpha = 0.6;
      ctx.fillStyle = "#000000";
      ctx.fillRect(21, 134, 150, 42);
      ctx.globalAlpha = 1;

      for (let i = 0; i < stars; i += 1) {
        const x = 10 + 84 - stars * 11.5 + i * 23 - 6;

        if (engrave) ctx.drawImage(engrave, x, 137, 29, 29);
      }
    }

    ctx.clearRect(162, 147, 50, 50);
    ctx.clearRect(147, 162, 50, 50);

    if (frame) ctx.drawImage(frame, 12, 12, 168, 168);
    if (fact) ctx.drawImage(fact, 20, 21, 42, 42);
    if (fi) ctx.drawImage(fi, 19, 72, 42.5, 32.3);
    if (si) ctx.drawImage(si, 1.5, 4.5, 79.9, 90.1);
    if (crown) ctx.drawImage(crown, 24, 4, 35.7, 22.1);
  }

  const buffer = canvas.toBuffer("image/png");

  res.setHeader("Content-Type", "image/png");
  res.setHeader("Cache-Control", "public, max-age=86400, immutable");

  res.status(200);
  res.write(buffer);
  res.end();
}
