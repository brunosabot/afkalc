import { createCanvas, loadImage } from "canvas";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";

type Data = {
  name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const [hero, fact, frame] = await Promise.all([
    loadImage(path.resolve(`./public/${req.query.heroImage}`)).catch(() => undefined),
    loadImage(path.resolve(`./public/factions/${req.query.faction}.png`)).catch(() => undefined),
    loadImage(path.resolve(`./public/heroes-frame/none.png`)).catch(() => undefined),
  ]);

  const width = 192;
  const height = 192;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.beginPath();

    if (hero) ctx.drawImage(hero, 21, 21, 150, 150);

    ctx.clearRect(162, 147, 50, 50);
    ctx.clearRect(147, 162, 50, 50);

    if (frame) ctx.drawImage(frame, 12, 12, 168, 168);
    if (fact) ctx.drawImage(fact, 20, 21, 42, 42);
  }

  const buffer = canvas.toBuffer("image/png");

  res.setHeader("Content-Type", "image/png");
  res.setHeader("Cache-Control", "public, max-age=864000, immutable");

  res.status(200);
  res.write(buffer);
  res.end();
}
