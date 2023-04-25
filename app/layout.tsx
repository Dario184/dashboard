import './globals.css';
import Nav from './nav';
import AnalyticsWrapper from './analytics';
import { Suspense } from 'react';

// pages/_app.js
import { Inter } from 'next/font/google'

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Next.js 13 + PlanetScale + NextAuth + Tailwind CSS',
  description:
    'A user admin dashboard configured with Next.js, PlanetScale, NextAuth, Tailwind CSS, TypeScript, ESLint, and Prettier.'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className={inter.className}>
        <Suspense fallback="...">
          {/* @ts-expect-error Server Component */}
          <Nav />
        </Suspense>
        {children}
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
