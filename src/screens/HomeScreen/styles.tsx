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
    headerActions: {
      flexDirection: 'row',
    },
    headerButton: {
      padding: 8,
      marginLeft: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    filterIndicator: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: '#E3F2FD',
      borderBottomWidth: 1,
      borderBottomColor: '#BBDEFB',
    },
    filterText: {
      fontSize: 14,
      color: '#1976D2',
    },
    filterCategory: {
      fontWeight: '600',
    },
    clearFilterText: {
      fontSize: 14,
      color: '#1976D2',
      fontWeight: '500',
    },
    listContainer: {
      paddingBottom: 100,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 32,
    },
    emptyTitle: {
      fontSize: 40,
      fontWeight: '700',
      color: '#000000',
      marginBottom: 8,
    },
    emptySubtitle: {
      fontSize: 16,
      color: '#8E8E93',
      textAlign: 'center',
      marginBottom: 32,
    },
    emptyButtons: {
      flexDirection: 'row',
      gap: 12,
    },
    emptyButton: {
      backgroundColor: '#007AFF',
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 8,
    },
    emptyButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    sampleButton: {
      backgroundColor: '#34C759',
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 8,
    },
    sampleButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    fab: {
      position: 'absolute',
      bottom: 24,
      right: 24,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: '#007AFF',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },

  }); 