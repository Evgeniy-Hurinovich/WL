# WestLine Audit Defense App

Premium executive-level one-screen сайт-презентация для защиты результатов AS-IS аудита WestLine.

## Stack

- Next.js (App Router)
- React
- TypeScript
- Framer Motion
- Pure CSS (без Tailwind — легче адаптировать под Vercel и бренд-политику)

## Что внутри

- 7 полноэкранных горизонтальных сцен
- переходы колесом мыши, стрелками клавиатуры и кликом по rail navigation
- detail drawer для live drilldown во время очной защиты
- data-driven content model в `lib/audit-content.ts`
- reusable components в `components/*`

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run start
```

## Deploy to Vercel

1. Создать Git repository и загрузить содержимое этой папки.
2. Import Project в Vercel.
3. Framework Preset: Next.js.
4. Build command: `next build`.
5. Output: default.

## Где менять контент

Основной narrative и карточки живут в:

- `lib/audit-content.ts`

Там можно быстро заменить:

- executive messaging
- process cards
- root causes
- business risks
- TO-BE direction
- next step roadmap

## Важно

Эта версия построена на базе загруженных интервью и `MASTER_PROMPT.md`.
Файл `AS-IS ОТЧЕТ О БИЗНЕС-ПРОЦЕССАХ - v4.docx` в текущем пакете отсутствовал, поэтому я оставил структуру, которая уже готова к более точному наполнению после загрузки финального отчета.
