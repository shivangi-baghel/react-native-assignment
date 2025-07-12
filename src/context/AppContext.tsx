import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Timer, TimerHistory, Category, Theme, AppState } from '../types';
import { storageUtils } from '../utils/storage';
import { helpers } from '../utils/helpers';
import { getTheme } from '../utils/themes';

type AppAction =
  | { type: 'ADD_TIMER'; payload: Timer }
  | { type: 'UPDATE_TIMER'; payload: Timer }
  | { type: 'DELETE_TIMER'; payload: string }
  | { type: 'START_TIMER'; payload: string }
  | { type: 'PAUSE_TIMER'; payload: string }
  | { type: 'RESET_TIMER'; payload: string }
  | { type: 'COMPLETE_TIMER'; payload: string }
  | { type: 'TICK_TIMER'; payload: string }
  | { type: 'ADD_HISTORY'; payload: TimerHistory }
  | { type: 'CLEAR_HISTORY' }
  | { type: 'TOGGLE_CATEGORY'; payload: string }
  | { type: 'SET_THEME'; payload: boolean }
  | {
      type: 'LOAD_DATA';
      payload: { timers: Timer[]; history: TimerHistory[]; isDark: boolean };
    };

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  addTimer: (
    name: string,
    duration: number,
    category: string,
    hasHalfwayAlert: boolean,
  ) => void;
  startTimer: (id: string) => void;
  pauseTimer: (id: string) => void;
  resetTimer: (id: string) => void;
  deleteTimer: (id: string) => void;
  toggleCategory: (categoryName: string) => void;
  toggleTheme: () => void;
  clearHistory: () => void;
  exportData: () => string;
}

const initialState: AppState = {
  timers: [],
  history: [],
  categories: [],
  theme: getTheme(false),
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_TIMER': {
      const newTimers = [...state.timers, action.payload];
      const newCategories = helpers.groupTimersByCategory(newTimers);
      return {
        ...state,
        timers: newTimers,
        categories: newCategories,
      };
    }

    case 'UPDATE_TIMER': {
      const newTimers = state.timers.map(timer =>
        timer.id === action.payload.id ? action.payload : timer,
      );
      const newCategories = helpers.groupTimersByCategory(newTimers);
      return {
        ...state,
        timers: newTimers,
        categories: newCategories,
      };
    }

    case 'DELETE_TIMER': {
      const newTimers = state.timers.filter(
        timer => timer.id !== action.payload,
      );
      const newCategories = helpers.groupTimersByCategory(newTimers);
      return {
        ...state,
        timers: newTimers,
        categories: newCategories,
      };
    }

    case 'START_TIMER': {
      const newTimers = state.timers.map(timer =>
        timer.id === action.payload
          ? { ...timer, status: 'running' as const, updatedAt: Date.now() }
          : timer,
      );
      const newCategories = helpers.groupTimersByCategory(newTimers);
      return {
        ...state,
        timers: newTimers,
        categories: newCategories,
      };
    }

    case 'PAUSE_TIMER': {
      const newTimers = state.timers.map(timer =>
        timer.id === action.payload
          ? { ...timer, status: 'paused' as const, updatedAt: Date.now() }
          : timer,
      );
      const newCategories = helpers.groupTimersByCategory(newTimers);
      return {
        ...state,
        timers: newTimers,
        categories: newCategories,
      };
    }

    case 'RESET_TIMER': {
      const newTimers = state.timers.map(timer =>
        timer.id === action.payload
          ? {
              ...timer,
              remainingTime: timer.duration,
              status: 'paused' as const,
              halfwayAlertTriggered: false,
              updatedAt: Date.now(),
            }
          : timer,
      );
      const newCategories = helpers.groupTimersByCategory(newTimers);
      return {
        ...state,
        timers: newTimers,
        categories: newCategories,
      };
    }

    case 'COMPLETE_TIMER': {
      const timer = state.timers.find(t => t.id === action.payload);
      if (!timer) return state;

      const newTimers = state.timers.map(t =>
        t.id === action.payload
          ? {
              ...t,
              status: 'completed' as const,
              remainingTime: 0,
              updatedAt: Date.now(),
            }
          : t,
      );

      const newHistory: TimerHistory = {
        id: helpers.generateId(),
        timerName: timer.name,
        category: timer.category,
        duration: timer.duration,
        completedAt: Date.now(),
      };

      const newCategories = helpers.groupTimersByCategory(newTimers);
      return {
        ...state,
        timers: newTimers,
        history: [newHistory, ...state.history],
        categories: newCategories,
      };
    }

    case 'TICK_TIMER': {
      const newTimers = state.timers.map(timer => {
        if (timer.id === action.payload && timer.status === 'running') {
          const newRemainingTime = Math.max(0, timer.remainingTime - 1);
          const shouldTriggerHalfwayAlert =
            timer.hasHalfwayAlert &&
            !timer.halfwayAlertTriggered &&
            newRemainingTime <= timer.duration / 2;

          return {
            ...timer,
            remainingTime: newRemainingTime,
            halfwayAlertTriggered:
              shouldTriggerHalfwayAlert || timer.halfwayAlertTriggered,
            updatedAt: Date.now(),
          };
        }
        return timer;
      });

      const newCategories = helpers.groupTimersByCategory(newTimers);
      return {
        ...state,
        timers: newTimers,
        categories: newCategories,
      };
    }

    case 'ADD_HISTORY': {
      return {
        ...state,
        history: [action.payload, ...state.history],
      };
    }

    case 'CLEAR_HISTORY': {
      return {
        ...state,
        history: [],
      };
    }

    case 'TOGGLE_CATEGORY': {
      const newCategories = state.categories.map(category =>
        category.name === action.payload
          ? { ...category, isExpanded: !category.isExpanded }
          : category,
      );
      return {
        ...state,
        categories: newCategories,
      };
    }

    case 'SET_THEME': {
      return {
        ...state,
        theme: getTheme(action.payload),
      };
    }

    case 'LOAD_DATA': {
      const newCategories = helpers.groupTimersByCategory(
        action.payload.timers,
      );
      return {
        ...state,
        timers: action.payload.timers,
        history: action.payload.history,
        categories: newCategories,
        theme: getTheme(action.payload.isDark),
      };
    }

    default:
      return state;
  }
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load data on app start
  useEffect(() => {
    const loadData = async () => {
      const [timers, history, isDark] = await Promise.all([
        storageUtils.loadTimers(),
        storageUtils.loadHistory(),
        storageUtils.loadTheme(),
      ]);

      dispatch({
        type: 'LOAD_DATA',
        payload: { timers, history, isDark },
      });
    };

    loadData();
  }, []);

  // Save data when it changes
  useEffect(() => {
    storageUtils.saveTimers(state.timers);
  }, [state.timers]);

  useEffect(() => {
    storageUtils.saveHistory(state.history);
  }, [state.history]);

  useEffect(() => {
    storageUtils.saveTheme(state.theme.isDark);
  }, [state.theme.isDark]);

  // Timer tick effect
  useEffect(() => {
    const interval = setInterval(() => {
      state.timers.forEach(timer => {
        if (timer.status === 'running' && timer.remainingTime > 0) {
          dispatch({ type: 'TICK_TIMER', payload: timer.id });

          // Check if timer completed
          if (timer.remainingTime <= 1) {
            dispatch({ type: 'COMPLETE_TIMER', payload: timer.id });
          }
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.timers]);

  const addTimer = (
    name: string,
    duration: number,
    category: string,
    hasHalfwayAlert: boolean,
  ) => {
    const newTimer: Timer = {
      id: helpers.generateId(),
      name,
      duration,
      remainingTime: duration,
      category,
      status: 'paused',
      hasHalfwayAlert,
      halfwayAlertTriggered: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    dispatch({ type: 'ADD_TIMER', payload: newTimer });
  };

  const startTimer = (id: string) => {
    dispatch({ type: 'START_TIMER', payload: id });
  };

  const pauseTimer = (id: string) => {
    dispatch({ type: 'PAUSE_TIMER', payload: id });
  };

  const resetTimer = (id: string) => {
    dispatch({ type: 'RESET_TIMER', payload: id });
  };

  const deleteTimer = (id: string) => {
    dispatch({ type: 'DELETE_TIMER', payload: id });
  };

  const toggleCategory = (categoryName: string) => {
    dispatch({ type: 'TOGGLE_CATEGORY', payload: categoryName });
  };

  const toggleTheme = () => {
    dispatch({ type: 'SET_THEME', payload: !state.theme.isDark });
  };

  const clearHistory = () => {
    dispatch({ type: 'CLEAR_HISTORY' });
  };

  const exportData = (): string => {
    return JSON.stringify(
      {
        timers: state.timers,
        history: state.history,
        exportDate: new Date().toISOString(),
      },
      null,
      2,
    );
  };

  const value: AppContextType = {
    state,
    dispatch,
    addTimer,
    startTimer,
    pauseTimer,
    resetTimer,
    deleteTimer,
    toggleCategory,
    toggleTheme,
    clearHistory,
    exportData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
