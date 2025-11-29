import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { forename, surname } from '@/data/values';
import { routing } from '@/i18n/routing';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { Inter, Jost } from "next/font/google";
import { ReactNode } from 'react';
import { getLangDir } from 'rtl-detect';
import { Providers } from "../providers";
import "./../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jost = Jost({ subsets: ["latin"], variable: "--font-jost" });

type Props = {
  children: ReactNode;
  params: { locale: string; };
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata() {
  const t = await getTranslations('Values');
  const name = t('name', { f: forename, s: surname });
  return {
    title: {
      default: name,
      template: `%s | ${[...name.split(" ")].map(n => n[0]).join('')}`,
    },
    description: name,
  };
}

export default async function RootLayout({ children, params: { locale } }: Props) {
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} dir={getLangDir(locale)}>
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
