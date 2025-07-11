import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useApp } from '../../context/AppContext';
import { helpers } from '../../utils/helpers';
import { styles } from './styles';

export const HistoryScreen: React.FC = () => {
  const { state, clearHistory } = useApp();

  const handleClearHistory = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear all history?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: clearHistory },
      ]
    );
  };

  const renderHistoryItem = ({ item }: { item: any }) => (
    <View style={styles.historyItem}>
      <View style={styles.historyHeader}>
        <Text style={styles.timerName}>{item.timerName}</Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>
      <View style={styles.historyDetails}>
        <Text style={styles.duration}>
          Duration: {helpers.formatTime(item.duration)}
        </Text>
        <Text style={styles.completedAt}>
          {helpers.formatDate(item.completedAt)}
        </Text>
      </View>
    </View>
  );

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>No History Yet</Text>
      <Text style={styles.emptySubtitle}>
        Complete some timers to see them here!
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Timer History</Text>
        {state.history.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={handleClearHistory}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      {state.history.length > 0 ? (
        <FlatList
          data={state.history}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <EmptyState />
      )}
    </View>
  );
};

 