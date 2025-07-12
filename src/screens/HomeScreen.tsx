import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useApp } from '../context/AppContext';
import { CategorySection } from '../components/CategorySection';
import { AddTimerModal } from '../components/AddTimerModal';
import { TimerFilterModal } from '../components/TimerFilterModal';


export const HomeScreen: React.FC = () => {
  const { state, toggleTheme, exportData } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleExport = () => {
    const data = exportData();
    console.log('exported Data :', data)
    Alert.alert('Export Data', 'Data prepared for export');
  };



  const searchByCategory = (category: string) => {
    setSelectedCategory(category);
  };

  // Filter categories based on selected category
  const filteredCategories = React.useMemo(() => {
    if (selectedCategory === 'All') {
      return state.categories;
    }
    
    return state.categories.filter(category => 
      category.name === selectedCategory
    );
  }, [state.categories, selectedCategory]);

  const renderCategory = ({ item }: { item: any }) => (
    <CategorySection category={item} />
  );

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>
        {selectedCategory === 'All' ? 'No Timers Yet' : `No Timers in ${selectedCategory}`}
      </Text>
      <Text style={styles.emptySubtitle}>
        {selectedCategory === 'All' 
          ? 'Create your first timer to get started!' 
          : `Create a timer in the ${selectedCategory} category to get started!`
        }
      </Text>
      <View style={styles.emptyButtons}>
        <TouchableOpacity style={styles.emptyButton} onPress={() => setShowAddModal(true)}>
          <Text style={styles.emptyButtonText}>Add Timer</Text>
        </TouchableOpacity>
       
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>TimerSync</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton} onPress={toggleTheme}>
            <Icon 
              name={state.theme.isDark ? 'light-mode' : 'dark-mode'} 
              size={24} 
              color={state.theme.isDark ? '#FFD700' : '#8E8E93'} 
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={() => setShowFilterModal(true)}>
            <Icon name="search" size={24} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={handleExport}>
            <Icon name="file-download" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </View>

      {selectedCategory !== 'All' && (
        <View style={styles.filterIndicator}>
          <Text style={styles.filterText}>
            Filtered by: <Text style={styles.filterCategory}>{selectedCategory}</Text>
          </Text>
          <TouchableOpacity onPress={() => searchByCategory('All')}>
            <Text style={styles.clearFilterText}>Clear</Text>
          </TouchableOpacity>
        </View>
      )}

      {filteredCategories.length > 0 ? (
        <FlatList
          data={filteredCategories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.name}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <EmptyState />
      )}

      <TouchableOpacity style={styles.fab} onPress={() => setShowAddModal(true)}>
        <Icon name="add" size={32} color="#FFFFFF" />
      </TouchableOpacity>

      <AddTimerModal visible={showAddModal} onClose={() => setShowAddModal(false)} />
      
      <TimerFilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onFilterChange={searchByCategory}
        currentFilter={selectedCategory}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
    fontSize: 24,
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