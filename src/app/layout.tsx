// Root layout — intentionally minimal.
// The [locale]/layout.tsx provides <html> and <body> with locale/dir attributes.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
