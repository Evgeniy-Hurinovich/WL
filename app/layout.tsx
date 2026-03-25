import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'WestLine — защита результатов аудита | A2 Consulting',
  description:
    'Одностраничная executive-презентация для защиты результатов AS-IS аудита WestLine и формулирования следующего этапа трансформации.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
