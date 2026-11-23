import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  // In no-i18n-routing mode there is no middleware setting the locale,
  // so requestLocale is typically undefined. Fall back to the default.
  let locale = await requestLocale
  if (!locale || !routing.locales.includes(locale as 'en' | 'fr')) {
    locale = 'en'
  }
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
