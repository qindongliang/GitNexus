export type ThemePreference = 'light' | 'dark' | 'system';

const THEME_STORAGE_KEY = 'gitnexus-theme';
const THEME_PREFERENCES = new Set<ThemePreference>(['light', 'dark', 'system']);

export const getThemePreference = (): ThemePreference => {
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  return THEME_PREFERENCES.has(stored as ThemePreference)
    ? (stored as ThemePreference)
    : 'light';
};

export const applyThemePreference = (preference: ThemePreference): void => {
  const resolved =
    preference === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : preference;

  document.documentElement.dataset.theme = resolved;
  document.documentElement.style.colorScheme = resolved;
};

export const saveThemePreference = (preference: ThemePreference): void => {
  window.localStorage.setItem(THEME_STORAGE_KEY, preference);
  applyThemePreference(preference);
};

export const initializeTheme = (): void => {
  applyThemePreference(getThemePreference());
};
