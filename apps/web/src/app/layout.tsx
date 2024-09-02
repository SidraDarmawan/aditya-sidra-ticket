import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const fontJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: 'aditya-sidra',
  description: 'aditya-sidra-ticketing',
};

export default function RootLayout({
  children,
}: Readonly <{
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={fontJakarta.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
