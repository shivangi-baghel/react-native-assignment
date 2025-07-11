export interface Timer {
  id: string;
  name: string;
  duration: number; // in seconds
  remainingTime: number; // in seconds
  category: string;
  status: 'running' | 'paused' | 'completed';
  hasHalfwayAlert: boolean;
  halfwayAlertTriggered: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface Category {
  name: string;
  timers: Timer[];
  isExpanded: boolean;
}

export interface TimerHistory {
  id: string;
  timerName: string;
  category: string;
  duration: number;
  completedAt: number;
}

export interface Theme {
  isDark: boolean;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
    progress: string;
    progressBackground: string;
  };
}

export interface AppState {
  timers: Timer[];
  history: TimerHistory[];
  categories: Category[];
  theme: Theme;
} 
export interface AddTimerModalProps {
  visible: boolean;
  onClose: () => void;
}