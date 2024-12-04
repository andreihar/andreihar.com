import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';
import { Inter, Jost } from "next/font/google";
import { Providers } from "./providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jost = Jost({ subsets: ["latin"], variable: "--font-jost" });

export async function generateMetadata() {
  const t = await getTranslations({ namespace: 'Values' });
  const name = t('name', { f: t('f'), s: t('s') });
  return {
    title: {
      default: name,
      template: `%s | ${[...name.split(" ")].map(n => n[0]).join('')}`,
    },
    description: name,
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} ${jost.variable} font-inter`}>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Navbar />
            {children}
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
