import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'WL: AS-IS',
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
