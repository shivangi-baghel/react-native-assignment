import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Timer } from '../types';
import { useApp } from '../context/AppContext';
import { helpers } from '../utils/helpers';
import { TimerItemStyle } from './Styles';

interface TimerItemProps {
  timer: Timer;
}

export const TimerItem: React.FC<TimerItemProps> = ({ timer }) => {
  const { startTimer, pauseTimer, resetTimer, deleteTimer,state } = useApp();
  const handleStart = () => {
    startTimer(timer.id);
  };

  const handlePause = () => {
    pauseTimer(timer.id);
  };

  const handleReset = () => {
    resetTimer(timer.id);
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Timer',
      `Are you sure you want to delete "${timer.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteTimer(timer.id) },
      ]
    );
  };

  const progress = helpers.calculateProgress(timer);
  const formattedTime = helpers.formatTime(timer.remainingTime);

  const getStatusColor = () => {
    switch (timer.status) {
      case 'running':
        return '#34C759';
      case 'paused':
        return '#FF9500';
      case 'completed':
        return '#007AFF';
      default:
        return '#8E8E93';
    }
  };

  const getStatusText = () => {
    switch (timer.status) {
      case 'running':
        return 'Running';
      case 'paused':
        return 'Paused';
      case 'completed':
        return 'Completed';
      default:
        return 'Ready';
    }
  };

  return (
    <View style={TimerItemStyle.container}>
      <View style={TimerItemStyle.header}>
        <View style={TimerItemStyle.timerInfo}>
          <Text style={TimerItemStyle.timerName}>{timer.name}</Text>
          <Text style={TimerItemStyle.timerTime}>{formattedTime}</Text>
        </View>
        <View style={TimerItemStyle.statusContainer}>
          <View style={[TimerItemStyle.statusDot, { backgroundColor: getStatusColor() }]} />
          <Text style={TimerItemStyle.statusText}>{getStatusText()}</Text>
        </View>
      </View>

      <View style={TimerItemStyle.progressContainer}>
        <View style={[TimerItemStyle.progressBar,{backgroundColor:`${state.theme.colors.progressBackground}`}]}>
          <View
            style={[
              TimerItemStyle.progressFill,
              { width: `${progress}%`,backgroundColor:`${state.theme.colors.progress}`},
            ]}
          />
        </View>
        <Text style={TimerItemStyle.progressText}>{Math.round(progress)}%</Text>
      </View>

      {timer.hasHalfwayAlert && timer.halfwayAlertTriggered && (
        <View style={TimerItemStyle.alertContainer}>
          <Text style={TimerItemStyle.alertText}>⚠️ Halfway alert triggered!</Text>
        </View>
      )}

      <View style={TimerItemStyle.controls}>
        {timer.status === 'running' ? (
          <TouchableOpacity style={[TimerItemStyle.button, TimerItemStyle.pauseButton]} onPress={handlePause}>
            <Text style={TimerItemStyle.buttonText}>Pause</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[TimerItemStyle.button, TimerItemStyle.startButton]} onPress={handleStart}>
            <Text style={TimerItemStyle.buttonText}>Start</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={[TimerItemStyle.button, TimerItemStyle.resetButton]} onPress={handleReset}>
          <Text style={TimerItemStyle.buttonText}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[TimerItemStyle.button, TimerItemStyle.deleteButton]} onPress={handleDelete}>
          <Text style={TimerItemStyle.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
 