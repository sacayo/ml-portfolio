import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from "@vercel/analytics/next";
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { AnalyticsProvider } from '@/components/AnalyticsProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sammy Cayo | ML Portfolio',
  description: 'Machine Learning Engineer Portfolio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <AnalyticsProvider />
        <Analytics />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
