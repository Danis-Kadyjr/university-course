function clean(value) {
  return String(value || '').trim().slice(0, 1200);
}

function validateLead(lead) {
  if (lead.name.length < 2) {
    return 'Введите имя минимум из 2 символов.';
  }

  if (!lead.contact) {
    return 'Оставьте контакт для связи.';
  }

  if (lead.message.length < 10) {
    return 'Опишите задачу чуть подробнее.';
  }

  return '';
}

async function sendTelegram(lead) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return false;
  }

  const text = [
    'Новая заявка с сайта',
    `Имя: ${lead.name}`,
    `Контакт: ${lead.contact}`,
    `Сообщение: ${lead.message}`
  ].join('\n');

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: true
    })
  });

  if (!response.ok) {
    throw new Error('Telegram не принял заявку.');
  }

  return true;
}

async function sendGoogleSheet(lead) {
  const url = process.env.GOOGLE_SCRIPT_URL;

  if (!url) {
    return false;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead)
  });

  if (!response.ok) {
    throw new Error('Google Sheets не принял заявку.');
  }

  return true;
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ message: 'Метод не поддерживается.' });
  }

  const lead = {
    name: clean(request.body?.name),
    contact: clean(request.body?.contact),
    message: clean(request.body?.message),
    createdAt: new Date().toISOString()
  };
  const error = validateLead(lead);

  if (error) {
    return response.status(400).json({ message: error });
  }

  try {
    const sentToTelegram = await sendTelegram(lead);
    const sentToGoogleSheet = await sendGoogleSheet(lead);

    if (!sentToTelegram && !sentToGoogleSheet) {
      return response.status(503).json({
        message: 'Канал отправки не настроен. Добавьте переменные окружения в Vercel.'
      });
    }

    return response.status(200).json({ message: 'Заявка отправлена.' });
  } catch (sendError) {
    return response.status(502).json({ message: sendError.message });
  }
}
