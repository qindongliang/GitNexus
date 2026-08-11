import { useEffect, useState } from 'react';
import { Monitor, Moon, Sun } from '@/lib/lucide-icons';
import { useTranslation } from 'react-i18next';
import {
  applyThemePreference,
  getThemePreference,
  saveThemePreference,
  type ThemePreference,
} from '../theme';

const THEME_OPTIONS = [
  { value: 'light', icon: Sun },
  { value: 'dark', icon: Moon },
  { value: 'system', icon: Monitor },
] as const;

export const ThemeSwitcher = () => {
  const { t } = useTranslation('header');
  const [preference, setPreference] = useState<ThemePreference>(getThemePreference);

  useEffect(() => {
    if (preference !== 'system') return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const syncWithSystem = () => applyThemePreference('system');
    media.addEventListener('change', syncWithSystem);
    return () => media.removeEventListener('change', syncWithSystem);
  }, [preference]);

  const selectTheme = (next: ThemePreference) => {
    setPreference(next);
    saveThemePreference(next);
  };

  return (
    <div
      className="flex h-9 items-center rounded-md border border-border-subtle bg-surface p-1"
      role="group"
      aria-label={t('theme.label')}
    >
      {THEME_OPTIONS.map(({ value, icon: Icon }) => (
        <button
          key={value}
          type="button"
          onClick={() => selectTheme(value)}
          aria-pressed={preference === value}
          title={t(`theme.${value}`)}
          className={`flex h-7 w-7 items-center justify-center rounded text-text-muted transition-colors hover:bg-hover hover:text-text-primary ${
            preference === value ? 'bg-elevated text-accent shadow-sm' : ''
          }`}
        >
          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      ))}
    </div>
  );
};
