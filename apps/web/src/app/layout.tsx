import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google'; // font google
import './globals.css'; // styling
import { Navbar } from '@/components/Navbar';
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
      <Navbar />
      <body
        className={cn(
          "min-h-screen bg-white font-sans antialiased", // GANTI BACKGROUND
          fontJakarta.variable
        )}
      >
        {/* GANTI TEMA */}
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
      <Footer />
    </html>
  );
}
