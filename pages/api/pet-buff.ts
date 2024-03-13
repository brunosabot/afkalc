import { createCanvas, loadImage } from "canvas";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";

type Data = {
  name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const queryLevel = Math.max(0, parseInt(req.query.level as string, 10));
  const [type, empty, full] = await Promise.all([
    loadImage(path.resolve(`./public/pets-frame/${req.query.type}-buff.png`)).catch(
      () => undefined
    ),
    loadImage(path.resolve(`./public/pets-frame/empty-dot.png`)).catch(() => undefined),
    loadImage(path.resolve(`./public/pets-frame/full-dot.png`)).catch(() => undefined),
  ]);

  const width = 324;
  const height = 207;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.beginPath();

    if (type) ctx.drawImage(type, 0, 0, 324, 186);

    for (let i = 0; i < queryLevel; i += 1) {
      if (full) ctx.drawImage(full, 30 + 44 * i, 165, 42, 42);
    }

    for (let i = 5; i >= queryLevel; i -= 1) {
      if (empty) ctx.drawImage(empty, 30 + 44 * i, 165, 42, 42);
    }
  }

  const buffer = canvas.toBuffer("image/png");

  res.setHeader("Content-Type", "image/png");
  res.setHeader("Cache-Control", "public, max-age=86400, immutable");

  res.status(200);
  res.write(buffer);
  res.end();
}
