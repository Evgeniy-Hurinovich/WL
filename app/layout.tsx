import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'WestLine Audit Defense | A2 Consulting',
  description:
    'Executive-level one-screen website for defending the WestLine AS-IS audit and framing the next stage of transformation.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
