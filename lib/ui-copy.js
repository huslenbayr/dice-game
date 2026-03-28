import { normalizeLanguage } from "@/lib/i18n";
import { UI_LOCALES } from "@/lib/translations/ui-locales";

export function getUiCopy(language) {
  return UI_LOCALES[normalizeLanguage(language)] || UI_LOCALES.en;
}
