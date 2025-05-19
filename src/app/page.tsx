import { getDictionary } from "@/lib/i18n";
import { cookies } from "next/headers";
import { i18n } from "@/configs/i18n-config";
import type { Locale } from "@/configs/i18n-config";
import HomeContent from "@/components/home/home-content";

export default async function Home() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || i18n.defaultLocale;
  const dict = await getDictionary(locale as Locale, "home");

  return <HomeContent dict={dict} />;
}
