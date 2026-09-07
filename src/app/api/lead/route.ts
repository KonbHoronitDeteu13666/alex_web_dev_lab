import { NextResponse } from "next/server";

type Lead = {
  name?: string;
  contact?: string;
  budget?: string;
  message?: string;
  company?: string; // honeypot
};

export async function POST(req: Request) {
  let lead: Lead;
  try {
    lead = await req.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  // Бота, заполнившего скрытое поле, тихо принимаем и никуда не шлём.
  if (lead.company) return NextResponse.json({ ok: true });

  const name = lead.name?.trim();
  const contact = lead.contact?.trim();

  if (!name || !contact) {
    return NextResponse.json({ error: "Заполните имя и контакт" }, { status: 400 });
  }

  const text = [
    "Новая заявка с сайта",
    `Имя: ${name}`,
    `Контакт: ${contact}`,
    `Бюджет: ${lead.budget ?? "не указан"}`,
    `Задача: ${lead.message?.trim() || "не указана"}`,
  ].join("\n");

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    // Пока бот не подключён — заявка видна в логах сервера.
    console.log(text);
    return NextResponse.json({ ok: true });
  }

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });

  if (!res.ok) {
    console.error("Telegram error", await res.text());
    return NextResponse.json(
      { error: "Не получилось отправить. Напишите в Telegram или на почту." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
