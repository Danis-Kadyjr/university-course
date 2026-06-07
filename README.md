# Лендинг курса по 3D-визуализации

React + Vite сайт по макету из скриншота. В проекте есть адаптивная верстка,
форма заявки, serverless endpoint для отправки лидов и базовые заголовки
безопасности для Vercel.

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
- Build Command: `npm run build`
- Output Directory: `dist`
- Node.js Version: `18.x` или новее

После деплоя добавьте переменные окружения и сделайте повторный production deploy.

## Деплой на Railway

Проект также готов к Railway. Для Railway добавлен `server.js`, который раздает
собранный React-сайт из `dist` и принимает заявки на `/api/lead`.

1. Загрузите проект в GitHub.
2. Откройте [Railway Dashboard](https://railway.com/dashboard).
3. Нажмите `New Project`.
4. Выберите `Deploy from GitHub repo`.
5. Выберите репозиторий с проектом.
6. В `Variables` добавьте:

```bash
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
GOOGLE_SCRIPT_URL=
```

Для Telegram достаточно заполнить только `TELEGRAM_BOT_TOKEN` и
`TELEGRAM_CHAT_ID`.

Railway возьмет команды из `railway.json`:

```bash
npm run build
node server.js
```

Сервер слушает порт из `process.env.PORT`, который Railway выдает автоматически.
