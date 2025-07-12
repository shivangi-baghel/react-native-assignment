import { Theme } from '../types';
import Colors from './config/colors';

export const lightTheme: Theme = {
  isDark: false,
  colors: {
   primary: Colors.primary,
    secondary: Colors.secondary,
    background: Colors.background,
    text: Colors.text,
    textSecondary: Colors.textSecondary,
    border: Colors.border,
    success: Colors.success,
    warning: Colors.warning,
    error: Colors.error,
    progress: Colors.progress,
    progressBackground: Colors.progressBackground,
  },
};

export const darkTheme: Theme = {
  isDark: true,
  colors: {
    primary: Colors.primary_dark,
    secondary: Colors.secondary_dark,
    background: Colors.background_dark,
    text: Colors.text_dark,
    textSecondary: Colors.textSecondary,
    border: Colors.border_dark,
    success: Colors.success_dark,
    warning: Colors.warning_dark,
    error: Colors.error_dark,
    progress: Colors.progress_dark,
    progressBackground: Colors.progressBackground_dark,
  },
};

export const getTheme = (isDark: boolean): Theme => {
  return isDark ? darkTheme : lightTheme;
}; 