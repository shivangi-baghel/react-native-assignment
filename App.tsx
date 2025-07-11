/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { AppProvider, useApp } from './src/context/AppContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { CompletionModal } from './src/components/CompletionModal';

function AppContent() {
  const { state } = useApp();
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [completedTimerName, setCompletedTimerName] = useState('');
  const [shownCompletionIds, setShownCompletionIds] = useState<Set<string>>(new Set());
  const isDarkMode = useColorScheme() === 'dark';

  // Check for newly completed timers that haven't shown alerts yet
  useEffect(() => {
    const newlyCompletedTimers = state.timers.filter(timer => 
      timer.status === 'completed' && !shownCompletionIds.has(timer.id)
    );

    if (newlyCompletedTimers.length > 0) {
      // Show alert for the most recently completed timer
      const latestCompleted = newlyCompletedTimers[newlyCompletedTimers.length - 1];
      setCompletedTimerName(latestCompleted.name);
      setShowCompletionModal(true);
      
      // Mark this timer as shown
      setShownCompletionIds(prev => new Set([...prev, latestCompleted.id]));
    }
  }, [state.timers, shownCompletionIds]);

  // Clean up shown completion IDs when timers are removed
  useEffect(() => {
    const currentTimerIds = new Set(state.timers.map(timer => timer.id));
    setShownCompletionIds(prev => {
      const newSet = new Set<string>();
      prev.forEach(id => {
        if (currentTimerIds.has(id)) {
          newSet.add(id);
        }
      });
      return newSet;
    });
  }, [state.timers]);

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
        backgroundColor={state.theme.colors.background}   
      />
      <AppNavigator />
      <CompletionModal
        visible={showCompletionModal}
        timerName={completedTimerName}
        onClose={() => setShowCompletionModal(false)}
      />
    </View>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
