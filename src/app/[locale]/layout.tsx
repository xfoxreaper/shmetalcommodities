import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n";
import { displayFont, bodyFont, uiFont, cjkFont } from "@/app/fonts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | SH Metal Commodities",
    default: "SH Metal Commodities",
  },
  description: "Global non-ferrous metal trading — Copper, Aluminium, Zinc.",
};

type Locale = (typeof routing.locales)[number];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();
  const isRtl = locale === "ar";
  const isCjk = locale === "zh";

  return (
    <html
      lang={locale}
      dir={isRtl ? "rtl" : "ltr"}
      className={[
        displayFont.variable,
        bodyFont.variable,
        uiFont.variable,
        isCjk ? cjkFont.variable : "",
        "h-full antialiased",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:start-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-gold focus:text-navy focus:font-ui focus:text-sm focus:uppercase focus:tracking-widest"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main-content" className="flex-1" style={{ paddingTop: '88px' }}>
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
