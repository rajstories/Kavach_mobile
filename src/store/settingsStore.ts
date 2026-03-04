import { create } from 'zustand';
import { getItem, setItem } from '../utils/storage';

interface SettingsState {
  darkMode: boolean;
  notificationsEnabled: boolean;
  biometricsEnabled: boolean;
  language: 'english' | 'hindi';
  refreshIntervalMs: number;

  setDarkMode: (value: boolean) => void;
  setNotificationsEnabled: (value: boolean) => void;
  setBiometricsEnabled: (value: boolean) => void;
  setLanguage: (lang: 'english' | 'hindi') => void;
  setRefreshInterval: (ms: number) => void;
  hydrate: () => Promise<void>;
}

const STORAGE_KEY = 'settings';

export const useSettingsStore = create<SettingsState>((set, get) => ({
  darkMode: false,
  notificationsEnabled: true,
  biometricsEnabled: false,
  language: 'english',
  refreshIntervalMs: 30_000,

  setDarkMode: (value) => {
    set({ darkMode: value });
    persist(get());
  },
  setNotificationsEnabled: (value) => {
    set({ notificationsEnabled: value });
    persist(get());
  },
  setBiometricsEnabled: (value) => {
    set({ biometricsEnabled: value });
    persist(get());
  },
  setLanguage: (lang) => {
    set({ language: lang });
    persist(get());
  },
  setRefreshInterval: (ms) => {
    set({ refreshIntervalMs: ms });
    persist(get());
  },

  hydrate: async () => {
    const saved = await getItem<Partial<SettingsState>>(STORAGE_KEY);
    if (saved) {
      set({
        darkMode: saved.darkMode ?? false,
        notificationsEnabled: saved.notificationsEnabled ?? true,
        biometricsEnabled: saved.biometricsEnabled ?? false,
        language: saved.language ?? 'english',
        refreshIntervalMs: saved.refreshIntervalMs ?? 30_000,
      });
    }
  },
}));

function persist(state: SettingsState) {
  setItem(STORAGE_KEY, {
    darkMode: state.darkMode,
    notificationsEnabled: state.notificationsEnabled,
    biometricsEnabled: state.biometricsEnabled,
    language: state.language,
    refreshIntervalMs: state.refreshIntervalMs,
  });
}
