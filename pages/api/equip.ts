import { createCanvas, loadImage } from "canvas";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import heroes from "../../data/heroes.json";
import { factionFactionMap } from "../../types/Faction";
import Type from "../../types/Type";

type Data = {
  name: string;
};

const mapTypeToFileName = (type: Type) =>
  ({
    strength: "tank",
    agility: "archer",
    intelligence: "magician",
  }[type]);

function getEquipFrame(ascendLevel: number) {
  if (ascendLevel === 1) return `crude`;
  if (ascendLevel === 2) return `common`;
  if (ascendLevel === 3) return `rare`;
  if (ascendLevel === 4) return `rare-p`;
  if (ascendLevel === 5) return `elite`;
  if (ascendLevel === 6) return `elite-p`;
  if (ascendLevel === 7) return `legendary`;
  if (ascendLevel === 8) return `legendary-p`;
  if (ascendLevel === 9) return `mythic`;
  if (ascendLevel === 10) return `mythic-t1`;
  if (ascendLevel === 11) return `mythic-t2`;
  if (ascendLevel === 12) return `mythic-t3`;
  if (ascendLevel === 13) return `mythic-t4`;

  return `none`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const equipLevel = parseInt(req.query.level as string, 10);
  const equipPart = req.query.part as string;
  const equipType = mapTypeToFileName(req.query.type as Type);
  const equipFaction =
    factionFactionMap[req.query.faction as unknown as keyof typeof factionFactionMap];
  const equipHero = heroes.find(({ id }) => id === parseInt(req.query.hero as string, 10));

  const [equip, frame, faction, hero] = await Promise.all([
    loadImage(path.resolve(`./public/equip/${equipType}_${equipPart}_${equipLevel}.jpg`)).catch(
      () => undefined
    ),
    loadImage(path.resolve(`./public/equip-frame/${getEquipFrame(equipLevel)}.png`)).catch(
      () => undefined
    ),
    loadImage(path.resolve(`./public/factions/${equipFaction}.png`)).catch(() => undefined),
    loadImage(path.resolve(`./public${equipHero?.image}`)).catch(() => undefined),
  ]);

  const width = 192;
  const height = 192;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.beginPath();

    if (equip) ctx.drawImage(equip, 0, 0, 192, 192);
    ctx.clearRect(0, 0, 12, 12);
    ctx.clearRect(180, 180, 12, 12);
    ctx.clearRect(0, 180, 12, 12);
    ctx.clearRect(180, 0, 12, 12);

    if (equipLevel >= 10) {
      ctx.globalAlpha = 0.6;
      ctx.fillStyle = "#000000";
      ctx.fillRect(9, 140, 85, 42);
      ctx.globalAlpha = 1;
      ctx.font = "48px monospace 900";
      ctx.fillStyle = "#F6ED96";

      if (equipLevel === 10) ctx.fillText("T1", 35, 178);
      if (equipLevel === 11) ctx.fillText("T2", 35, 178);
      if (equipLevel === 12) ctx.fillText("T3", 35, 178);
      if (equipLevel === 13) ctx.fillText("T4", 35, 178);
    }

    if (frame) ctx.drawImage(frame, 0, 0, 192, 192);
    if (faction) ctx.drawImage(faction, 1, 1, 54, 54);

    if (hero) {
      ctx.beginPath();
      ctx.arc(30, 30, 26, 0, 2 * Math.PI);
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(hero, 4, 4, 52, 52);
    }
  }

  const buffer = canvas.toBuffer("image/png");

  res.setHeader("Content-Type", "image/png");
  res.setHeader("Cache-Control", "public, max-age=86400, immutable");

  res.status(200);
  res.write(buffer);
  res.end();
}
