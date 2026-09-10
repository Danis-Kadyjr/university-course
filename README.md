# Лендинг курса по 3D-визуализации

## Запуск

```bash
npm install
npm run dev
```

## Проверка production-сборки

```bash
npm run build
npm run preview
```

## Отправка заявок

Форма отправляет данные в `/api/lead`. На Vercel добавьте переменные окружения:

```bash
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
GOOGLE_SCRIPT_URL=
```

Можно заполнить только Telegram или только Google Sheets. Если не заполнить ни
один канал, форма покажет ошибку о ненастроенной отправке.

## Деплой на Vercel

```bash
npm install -g vercel
vercel
vercel --prod
```

Настройки Vercel:

- Framework Preset: `Vite`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`
- Node.js Version: `18.x` или новее

После деплоя добавьте переменные окружения в `Project Settings -> Environment Variables`:

```bash
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
GOOGLE_SCRIPT_URL=
```

Если заявки нужны только в Telegram, достаточно заполнить `TELEGRAM_BOT_TOKEN`
и `TELEGRAM_CHAT_ID`. После добавления переменных сделайте повторный
production deploy.

## Бесплатный деплой на Cloudflare Workers

Этот вариант подходит для бесплатного адреса `*.workers.dev` или если домен
куплен отдельно, а платить за хостинг не хочется. Обработчик
`functions/api/lead.js` отправляет заявки в Telegram, не раскрывая токен бота
в браузере.

Настройки Git-проекта в Cloudflare Workers:

- Production branch: `main`
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Root directory: оставить пустым

После первого деплоя откройте `Settings -> Variables and Secrets` и добавьте
для Production два зашифрованных секрета:

```bash
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

Затем выполните повторный деплой. Форма использует адрес `/api/lead`, который
Worker направляет в обработчик `functions/api/lead.js`.

Для подключения основного домена откройте `Custom domains`, добавьте домен и
укажите в REG.RU выданные Cloudflare DNS-серверы. HTTPS подключится
автоматически.
