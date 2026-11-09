import type { Metadata } from 'next';
import { Space_Grotesk, Hanken_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { siteConfig } from '@/config/site';

const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
});

const body = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
});

const themeScript = `try{var t=localStorage.getItem('theme');document.documentElement.classList.add(t==='light'?'light':'dark')}catch(e){document.documentElement.classList.add('dark')}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: `%s — ${siteConfig.name}` },
  alternates: {
    types: { 'application/rss+xml': [{ url: '/blog/rss.xml', title: 'Blog — Cheikh Diouf' }] },
  },
  description: siteConfig.description,
  keywords: [
    'portfolio',
    'développeur',
    'full stack',
    'Go',
    'TypeScript',
    'Rust',
    'Java',
    'React',
    'Next.js',
    'Angular',
    'Sénégal',
    'Dakar',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    creator: '@DerouMax',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
