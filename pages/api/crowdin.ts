import type { NextApiRequest, NextApiResponse } from "next";

interface InputData {
  event: string;
  project: string;
  file: string;
  file_id: string;
  language: string;
  user: string;
}

function getFileUrl(project: string, file_id: string, language: string) {
  const lang = language.replace("-", "").toLowerCase();

  return `<https://crowdin.com/translate/${project}/${file_id}/en-${lang}>`;
}

function getProjectUrl(project: string) {
  return `<https://crowdin.com/project/${project}>`;
}

async function sendWebhook(message: string) {
  return fetch(`https://discord.com/api/webhooks/${process.env.CROWDIN_WEBHOOK}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "Crowdin",
      avatar_url: "https://pbs.twimg.com/profile_images/1123967384891613184/Ug8TZcdB.png",
      content: message,
    }),
  });
}

async function handleRequest(query: InputData) {
  const { event, file, file_id: fileId, user, language, project }: InputData = query;
  const fileUrl = getFileUrl(project, fileId, language);
  const projectUrl = getProjectUrl(project);

  switch (event) {
    case "file.translated":
      await sendWebhook(
        `:white_check_mark: **${file}** is now fully translated to \`${language}\` ${fileUrl}`
      );
      break;
    case "file.approved":
      await sendWebhook(
        `:ballot_box_with_check: The \`${language}\` translation for **${file}** is now fully approved. ${fileUrl}`
      );
      break;
    case "file.added":
      await sendWebhook(`:new: **${file}** file has been added to the project ${fileUrl}`);
      break;
    case "file.updated":
      await sendWebhook(`:up: **${file}** file has been updated in the project ${fileUrl}`);
      break;
    case "project.translated":
      await sendWebhook(
        `:confetti_ball: All strings have been translated to \`${language}\`! ${projectUrl}`
      );
      break;
    case "project.approved":
      await sendWebhook(`:tada: All \`${language}\` strings have been approved! ${projectUrl}`);
      break;
    case "translation.updated":
      await sendWebhook(
        `:up: The translation for a \`${language}\` string in **${file}** has been updated by **${user}** ${fileUrl}`
      );
      break;
    case "suggestion.added":
      await sendWebhook(
        `:pencil: **${user}** has added a new \`${language}\` suggestion to a string in **${file}**  ${fileUrl}`
      );
      break;
    case "suggestion.updated":
      await sendWebhook(
        `:small_blue_diamond: **${user}** has updated a \`${language}\` suggestion to a string in **${file}**  ${fileUrl}`
      );
      break;
    case "suggestion.deleted":
      await sendWebhook(
        `:wastebasket: **${user}** has deleted a \`${language}\` suggestion to a string in **${file}**  ${fileUrl}`
      );
      break;
    case "suggestion.approved":
      await sendWebhook(
        `:thumbsup: **${user}** has approved a \`${language}\` suggestion to a string in **${file}**  ${fileUrl}`
      );
      break;
    case "suggestion.disapproved":
      await sendWebhook(
        `:thumbsdown: **${user}** has unapproved a \`${language}\` suggestion to a string in **${file}**  ${fileUrl}`
      );
      break;
    case "string.added":
      await sendWebhook(`:new: **${user}** has added a new string to the project  ${projectUrl}`);
      break;
    case "string.deleted":
      await sendWebhook(
        `:wastebasket: **${user}** has deleted a string from the project  ${projectUrl}`
      );
      break;
    case "string.updated":
      await sendWebhook(`:up: **${user}** has updated a string in the project  ${projectUrl}`);
      break;
    default:
      break;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;
  const { events } = body;

  if (method === "POST") {
    await Promise.all((events as unknown as InputData[]).map((event) => handleRequest(event)));
    return res.status(200).json({ status: "ok" });
  }
  return res.status(200).json({ status: "ko" });
}
