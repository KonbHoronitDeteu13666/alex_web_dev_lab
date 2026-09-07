# Сайт-визитка: разработка сайтов под ключ

Next.js 16 (App Router) + TypeScript + Tailwind CSS 4.

## Запуск

```bash
npm run dev
```

Открыть http://localhost:3000

## Где что править

| Что | Файл |
|---|---|
| Имя, контакты, услуги, цены, кейсы, FAQ | `src/lib/content.ts` |
| Цвета и шрифт | `src/app/globals.css` |
| Порядок секций | `src/app/page.tsx` |
| Приём заявок | `src/app/api/lead/route.ts` |

Весь текст сайта собран в `src/lib/content.ts` — менять его можно, не трогая компоненты.

## Заявки

Форма шлёт POST на `/api/lead`. Если заданы `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID`
(см. `.env.example`), заявка приходит в Telegram; иначе пишется в лог сервера.

## Сборка

```bash
npm run build
```
