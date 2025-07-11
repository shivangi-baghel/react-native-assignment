import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F2F2F7',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: '#FFFFFF',
      borderBottomWidth: 1,
      borderBottomColor: '#E5E5EA',
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
      color: '#000000',
    },
    clearButton: {
      padding: 8,
    },
    clearButtonText: {
      fontSize: 16,
      color: '#FF3B30',
      fontWeight: '500',
    },
    listContainer: {
      padding: 16,
    },
    historyItem: {
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    historyHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    timerName: {
      fontSize: 18,
      fontWeight: '600',
      color: '#000000',
      flex: 1,
    },
    category: {
      fontSize: 14,
      color: '#007AFF',
      fontWeight: '500',
      backgroundColor: '#E3F2FD',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    historyDetails: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    duration: {
      fontSize: 14,
      color: '#8E8E93',
      fontWeight: '500',
    },
    completedAt: {
      fontSize: 12,
      color: '#8E8E93',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 32,
    },
    emptyTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: '#000000',
      marginBottom: 8,
    },
    emptySubtitle: {
      fontSize: 16,
      color: '#8E8E93',
      textAlign: 'center',
    },
  });