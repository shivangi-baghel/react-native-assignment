import { Timer, Category } from '../types';

export const helpers = {
  // Time formatting
  formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  },

  // Generate unique ID
  generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },

  // Calculate progress percentage
  calculateProgress(timer: Timer): number {
    if (timer.duration === 0) return 0;
    return ((timer.duration - timer.remainingTime) / timer.duration) * 100;
  },

  // Group timers by category
  groupTimersByCategory(timers: Timer[]): Category[] {
    const categoryMap = new Map<string, Timer[]>();

    timers.forEach(timer => {
      if (!categoryMap.has(timer.category)) {
        categoryMap.set(timer.category, []);
      }
      categoryMap.get(timer.category)!.push(timer);
    });

    return Array.from(categoryMap.entries()).map(([name, timers]) => ({
      name,
      timers,
      isExpanded: true,
    }));
  },

  // Format date for history
  formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  },

  // To validate timer input
  validateTimer(name: string, duration: number, category: string): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!name.trim()) {
      errors.push('Timer name is required');
    }

    if (duration <= 0) {
      errors.push('Duration must be greater than 0');
    }

    if (!category.trim()) {
      errors.push('Category is required');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  },
}; 