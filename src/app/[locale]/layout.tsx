import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n";
import { displayFont, bodyFont, uiFont, cjkFont } from "@/app/fonts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/ui/BackToTop";
import "../globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

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
  const t = await getTranslations({ locale: locale as Locale, namespace: "common" });
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
            {t('skipToContent')}
          </a>
          <Navbar />
          <main id="main-content" className="flex-1 pt-[var(--navbar-h)]">
            {children}
          </main>
          <Footer />
          <BackToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
