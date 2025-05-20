import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LanguageSwitcher from "@/components/common/language-switcher";
import { cookies } from "next/headers";
import { i18n } from "@/configs/i18n-config";
import ConvexClientProvider from "@/providers/ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Chat Online",
  description: "A modern chat application",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Lấy ngôn ngữ từ cookie
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || i18n.defaultLocale;

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <ClerkProvider>
          <ConvexClientProvider>
            <div className="fixed top-4 right-4">
              <LanguageSwitcher />
            </div>
            {children}
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
