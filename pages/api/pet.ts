import { createCanvas, loadImage } from "canvas";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";

type Data = {
  name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const queryLevel = parseInt(req.query.level as string, 10);
  const isBasic = req.query.elevation === "elite" && queryLevel < 18;
  const elevation = req.query.elevation as string;

  const [frame, pet] = await Promise.all([
    loadImage(path.resolve(`./public/pets-frame/frame-${elevation}.png`)).catch(() => undefined),
    loadImage(
      path.resolve(`./public/pets/pet_${req.query.id}${isBasic ? "_basic" : ""}.png`)
    ).catch(() => undefined),
  ]);

  const width = 176;
  const height = 176;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.beginPath();

    ctx.fillStyle = req.query.elevation === "elite" ? "#3b2052" : "#232549";
    ctx.fillRect(0, 0, 176, 176);

    if (pet) ctx.drawImage(pet, 0, 0, 176, (176 * 125) / 93);

    ctx.clearRect(0, 0, 14, 19);
    ctx.clearRect(0, 0, 19, 14);

    ctx.clearRect(162, 157, 50, 50);
    ctx.clearRect(157, 162, 50, 50);

    if (frame) ctx.drawImage(frame, 0, 0, 176, 176);
  }

  const buffer = canvas.toBuffer("image/png");

  res.setHeader("Content-Type", "image/png");
  res.setHeader("Cache-Control", "public, max-age=864000, immutable");

  res.status(200);
  res.write(buffer);
  res.end();
}
