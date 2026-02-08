import type { Metadata } from 'next';
import { Inter, Space_Grotesk, Geist_Mono } from 'next/font/google';
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { AnalyticsProvider } from '@/components/AnalyticsProvider';
import { siteConfig } from '@/data/config';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

const siteUrl = 'https://sammy-cayo-portfolio-alpha.vercel.app';

export const metadata: Metadata = {
  title: {
    default: 'Sammy Cayo | Data Scientist & AI/ML Engineer',
    template: '%s | Sammy Cayo',
  },
  description: siteConfig.subheadline,
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'Sammy Cayo | Data Scientist & AI/ML Engineer',
    description: siteConfig.subheadline,
    url: siteUrl,
    siteName: 'Sammy Cayo Portfolio',
    images: [{ url: siteConfig.avatarUrl, width: 400, height: 400, alt: siteConfig.name }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Sammy Cayo | Data Scientist & AI/ML Engineer',
    description: siteConfig.subheadline,
    images: [siteConfig.avatarUrl],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable} font-sans antialiased`}>
        <AnalyticsProvider />
        <Analytics />
        <SpeedInsights />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
