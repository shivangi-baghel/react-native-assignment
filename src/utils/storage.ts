import AsyncStorage from '@react-native-async-storage/async-storage';
import { Timer, TimerHistory } from '../types';

const STORAGE_KEYS = {
  TIMERS: 'timers',
  HISTORY: 'history',
  THEME: 'theme',
} as const;

export const storageUtils = {
  // Timer operations
  async saveTimers(timers: Timer[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.TIMERS, JSON.stringify(timers));
    } catch (error) {
      console.error('Error saving timers:', error);
    }
  },

  async loadTimers(): Promise<Timer[]> {
    try {
      const timersJson = await AsyncStorage.getItem(STORAGE_KEYS.TIMERS);
      return timersJson ? JSON.parse(timersJson) : [];
    } catch (error) {
      console.error('Error loading timers:', error);
      return [];
    }
  },

  // History operations
  async saveHistory(history: TimerHistory[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
    } catch (error) {
      console.error('Error saving history:', error);
    }
  },

  async loadHistory(): Promise<TimerHistory[]> {
    try {
      const historyJson = await AsyncStorage.getItem(STORAGE_KEYS.HISTORY);
      return historyJson ? JSON.parse(historyJson) : [];
    } catch (error) {
      console.error('Error loading history:', error);
      return [];
    }
  },

  // Theme operations
  async saveTheme(isDark: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify(isDark));
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  },

  async loadTheme(): Promise<boolean> {
    try {
      const themeJson = await AsyncStorage.getItem(STORAGE_KEYS.THEME);
      return themeJson ? JSON.parse(themeJson) : false;
    } catch (error) {
      console.error('Error loading theme:', error);
      return false;
    }
  },

  // Clear all data
  async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.TIMERS,
        STORAGE_KEYS.HISTORY,
        STORAGE_KEYS.THEME,
      ]);
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  },
}; 