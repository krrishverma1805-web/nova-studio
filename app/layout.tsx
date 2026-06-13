import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ThemeRegistry from '@/components/ThemeRegistry';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nova Studio — Digital Agency',
  description:
    'We design and build stunning digital experiences. Web design, front-end development, and branding that sets your business apart.',
  keywords: ['digital agency', 'web design', 'branding', 'front-end development'],
  openGraph: {
    title: 'Nova Studio — Digital Agency',
    description:
      'We design and build stunning digital experiences. Web design, front-end development, and branding.',
    type: 'website',
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>
        <ThemeRegistry>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
