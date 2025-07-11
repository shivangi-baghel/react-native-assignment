import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Category } from '../types';
import { useApp } from '../context/AppContext';
import { TimerItem } from './TimerItem';
import { CategoryStyle } from './Styles';

interface CategorySectionProps {
  category: Category;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ category }) => {
  const { toggleCategory, startTimer, pauseTimer, resetTimer } = useApp();

  const handleToggleCategory = () => {
    toggleCategory(category.name);
  };

  const handleStartAll = () => {
    Alert.alert(
      'Start All Timers',
      `Start all timers in "${category.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Start All',
          onPress: () => {
            category.timers.forEach(timer => {
              if (timer.status !== 'running' && timer.status !== 'completed') {
                startTimer(timer.id);
              }
            });
          },
        },
      ]
    );
  };

  const handlePauseAll = () => {
    Alert.alert(
      'Pause All Timers',
      `Pause all timers in "${category.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Pause All',
          onPress: () => {
            category.timers.forEach(timer => {
              if (timer.status === 'running') {
                pauseTimer(timer.id);
              }
            });
          },
        },
      ]
    );
  };

  const handleResetAll = () => {
    Alert.alert(
      'Reset All Timers',
      `Reset all timers in "${category.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset All',
          onPress: () => {
            category.timers.forEach(timer => {
              resetTimer(timer.id);
            });
          },
        },
      ]
    );
  };

  const runningCount = category.timers.filter(t => t.status === 'running').length;
  const completedCount = category.timers.filter(t => t.status === 'completed').length;
  const pausedCount = category.timers.filter(t => t.status === 'paused').length;

  return (
    <View style={CategoryStyle.container}>
      <TouchableOpacity style={CategoryStyle.header} onPress={handleToggleCategory}>
        <View style={CategoryStyle.headerLeft}>
          <Text style={CategoryStyle.categoryName}>{category.name}</Text>
          <View style={CategoryStyle.statsContainer}>
            <Text style={CategoryStyle.statsText}>
              {category.timers.length} timer{category.timers.length !== 1 ? 's' : ''}
            </Text>
            {runningCount > 0 && (
              <Text style={CategoryStyle.runningText}> • {runningCount} running</Text>
            )}
            {pausedCount > 0 && (
              <Text style={CategoryStyle.pausedText}> • {pausedCount} paused</Text>
            )}
            {completedCount > 0 && (
              <Text style={CategoryStyle.completedText}> • {completedCount} completed</Text>
            )}
          </View>
        </View>
        <Text style={CategoryStyle.expandIcon}>
          {category.isExpanded ? '▼' : '▶'}
        </Text>
      </TouchableOpacity>

      {category.isExpanded && (
        <>
          {category.timers.length > 1 && (
            <View style={CategoryStyle.bulkActions}>
              <TouchableOpacity style={[CategoryStyle.bulkButton, CategoryStyle.startAllButton]} onPress={handleStartAll}>
                <Text style={CategoryStyle.bulkButtonText}>Start All</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[CategoryStyle.bulkButton, CategoryStyle.pauseAllButton]} onPress={handlePauseAll}>
                <Text style={CategoryStyle.bulkButtonText}>Pause All</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[CategoryStyle.bulkButton, CategoryStyle.resetAllButton]} onPress={handleResetAll}>
                <Text style={CategoryStyle.bulkButtonText}>Reset All</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={CategoryStyle.timersContainer}>
            {category.timers.map(timer => (
              <TimerItem key={timer.id} timer={timer} />
            ))}
          </View>
        </>
      )}
    </View>
  );
};

