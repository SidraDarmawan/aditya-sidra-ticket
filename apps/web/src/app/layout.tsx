import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google'; // font google
import './globals.css'; // styling
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { cn } from '@/lib/utils'
import { ThemeProvider } from "@/components/theme-provider"

const fontJakarta = Plus_Jakarta_Sans({ // font yg dipakai
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
}>) {
  return (
    <html lang="en">
      <body className={cn('min-h-screen bg-dark-300 font-sans antialiased', fontJakarta.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark">
          <Header />
          {children}
          <Footer />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
