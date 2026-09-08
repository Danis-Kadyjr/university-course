const jsonHeaders = {
  "Content-Type": "application/json; charset=utf-8",
  "X-Content-Type-Options": "nosniff",
};

function json(status, data) {
  return new Response(JSON.stringify(data), {
    status,
    headers: jsonHeaders,
  });
}

function clean(value) {
  return String(value || "")
    .trim()
    .slice(0, 1200);
}

export async function onRequest({ request, env }) {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: { Allow: "POST" },
    });
  }

  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    return json(503, {
      message: "Отправка заявок временно не настроена.",
    });
  }

  try {
    const rawBody = await request.text();

    if (rawBody.length > 10_000) {
      return json(413, { message: "Слишком большой запрос." });
    }

    const body = rawBody ? JSON.parse(rawBody) : {};
    const lead = {
      name: clean(body.name),
      contact: clean(body.contact),
      message: clean(body.message),
    };

    if (lead.name.length < 2) {
      return json(400, { message: "Введите имя минимум из 2 символов." });
    }

    if (!lead.contact) {
      return json(400, { message: "Оставьте контакт для связи." });
    }

    const telegramText = [
      "Новая заявка с сайта",
      `Имя: ${lead.name}`,
      `Контакт: ${lead.contact}`,
      `Сообщение: ${lead.message}`,
    ].join("\n");

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: env.TELEGRAM_CHAT_ID,
          text: telegramText,
          disable_web_page_preview: true,
        }),
      },
    );

    if (!telegramResponse.ok) {
      console.error("Telegram rejected lead:", telegramResponse.status);
      return json(502, {
        message: "Не удалось отправить заявку. Попробуйте ещё раз.",
      });
    }

    return json(200, { message: "Заявка отправлена." });
  } catch (error) {
    console.error("Lead processing failed:", error);
    return json(400, { message: "Не удалось обработать заявку." });
  }
}
