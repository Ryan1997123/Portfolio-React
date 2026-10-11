import { Moon, Sun } from "@phosphor-icons/react";
import { useLanguage } from "../../lib/LanguageContext";
import { useTheme } from "../../lib/ThemeContext";

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === "dark";
  const label = t(isDark ? "switchToLightMode" : "switchToDarkMode");
  const Icon = isDark ? Sun : Moon;

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      data-cursor="pointer"
    >
      <Icon size={16} weight="bold" aria-hidden="true" />
    </button>
  );
}
