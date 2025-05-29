import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ConvexClientProvider from "@/providers/ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
import "@/styles/globals.css";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ThemeProvider } from "@/components/ui/theme/Theme-Provider";
import { Toaster } from "sonner";
import LanguageSwitcher from "@/components/common/language-switcher";
import { I18nProvider } from "@/providers/I18nProvider";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Chat Online",
  description: "A modern chat application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="chat-theme"
        >
          <ClerkProvider>
            <ConvexClientProvider>
              <I18nProvider>
                <TooltipProvider>{children}</TooltipProvider>
                <Toaster richColors />
                <LanguageSwitcher />
              </I18nProvider>
            </ConvexClientProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
