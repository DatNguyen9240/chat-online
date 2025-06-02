import type { Locale } from '../configs/i18n-config';

export const getDictionary = async (locale: Locale, page: string) => {
  const dictionary = await import(`../i18n/locales/${locale}/${page}.json`);
  return dictionary.default;
};
