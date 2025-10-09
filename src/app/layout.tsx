import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ThemeProvider from '@/components/layout/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Single Stair NC - Advocating for Better Housing Design',
  description: 'Join the movement for single-stair housing in North Carolina. Learn about the benefits of efficient, safe, and affordable housing design.',
  keywords: 'single stair, housing, North Carolina, advocacy, architecture, policy',
  authors: [{ name: 'Single Stair NC' }],
  openGraph: {
    title: 'Single Stair NC',
    description: 'Advocating for better housing design in North Carolina',
    url: 'https://singlestair-nc.org',
    siteName: 'Single Stair NC',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Single Stair NC',
    description: 'Advocating for better housing design in North Carolina',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-black`}>
        <ThemeProvider>
          <Header />
          <main className="pt-16 lg:pt-20">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
