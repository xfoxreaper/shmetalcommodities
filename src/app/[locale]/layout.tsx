import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n";
import { displayFont, bodyFont, uiFont, cjkFont } from "@/app/fonts";
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
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
