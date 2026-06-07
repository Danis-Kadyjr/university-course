import dotenv from "dotenv";
import fetch from "node-fetch";
import { createReadStream } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { createServer } from "node:http";

dotenv.config();

const port = process.env.PORT || 3000;
const distDir = join(process.cwd(), "dist");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".json": "application/json; charset=utf-8",
};

function clean(value) {
  return String(value || "")
    .trim()
    .slice(0, 1200);
}

function sendJson(response, statusCode, data) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "X-Content-Type-Options": "nosniff",
  });
  response.end(JSON.stringify(data));
}

function validateLead(lead) {
  if (lead.name.length < 2) {
    return "Введите имя минимум из 2 символов.";
  }

  if (!lead.contact) {
    return "Оставьте контакт для связи.";
  }

  if (lead.message.length < 10) {
    return "Опишите задачу чуть подробнее.";
  }

  return "";
}

async function readBody(request) {
  const chunks = [];

  for await (const chunk of request) {
    chunks.push(chunk);
  }

  const rawBody = Buffer.concat(chunks).toString("utf-8");
  return rawBody ? JSON.parse(rawBody) : {};
}

async function sendTelegram(lead) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return false;
  }

  const text = [
    "Новая заявка с сайта",
    `Имя: ${lead.name}`,
    `Контакт: ${lead.contact}`,
    `Сообщение: ${lead.message}`,
  ].join("\n");

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          disable_web_page_preview: true,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Telegram responded with status ${response.status}`);
    }

    return true;
  } catch (error) {
    console.warn("Telegram send failed:", error.message);
    return false;
  }
}

async function sendGoogleSheet(lead) {
  const url = process.env.GOOGLE_SCRIPT_URL;

  if (!url) {
    return false;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });

    if (!response.ok) {
      throw new Error(`Google Sheets responded with status ${response.status}`);
    }

    return true;
  } catch (error) {
    console.warn("Google Sheets send failed:", error.message);
    return false;
  }
}

async function handleLead(request, response) {
  if (request.method !== "POST") {
    response.writeHead(405, { Allow: "POST" });
    response.end("Method Not Allowed");
    return;
  }

  try {
    const body = await readBody(request);
    const lead = {
      name: clean(body.name),
      contact: clean(body.contact),
      message: clean(body.message),
      createdAt: new Date().toISOString(),
    };
    const error = validateLead(lead);

    if (error) {
      sendJson(response, 400, { message: error });
      return;
    }

    const sentToTelegram = await sendTelegram(lead);
    const sentToGoogleSheet = await sendGoogleSheet(lead);

    if (!sentToTelegram && !sentToGoogleSheet) {
      console.warn("Lead accepted locally: no delivery channel configured.");
      sendJson(response, 200, {
        message:
          "Заявка принята локально. Настройте Telegram или Google Sheets для отправки.",
      });
      return;
    }

    sendJson(response, 200, { message: "Заявка отправлена." });
  } catch (error) {
    sendJson(response, 502, {
      message: error.message || "Не удалось отправить заявку.",
    });
  }
}

async function serveStatic(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const safePath = normalize(url.pathname).replace(/^(\.\.[/\\])+/, "");
  const requestedPath = safePath === "/" ? "/index.html" : safePath;
  let filePath = join(distDir, requestedPath);

  try {
    const fileStat = await stat(filePath);

    if (fileStat.isDirectory()) {
      filePath = join(filePath, "index.html");
    }
  } catch {
    filePath = join(distDir, "index.html");
  }

  const extension = extname(filePath);
  response.writeHead(200, {
    "Content-Type": mimeTypes[extension] || "application/octet-stream",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  });

  createReadStream(filePath).pipe(response);
}

createServer(async (request, response) => {
  if (request.url?.startsWith("/api/lead")) {
    await handleLead(request, response);
    return;
  }

  await serveStatic(request, response);
}).listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
