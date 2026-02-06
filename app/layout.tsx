import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'Portfolio',
  description: 'Personal portfolio website',
} satisfies Metadata;

export const viewport = {
  width: 'device-width',
  initialScale: 1,
} satisfies Viewport;

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}