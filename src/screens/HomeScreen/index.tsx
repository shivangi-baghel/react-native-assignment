import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useApp } from '../../context/AppContext';
import { CategorySection } from '../../components/CategorySection';
import { AddTimerModal } from '../../components/AddTimerModal';
import { TimerFilterModal } from '../../components/TimerFilterModal';

import { styles } from './styles';
import Colors from '../../utils/config/colors';

export const HomeScreen: React.FC = () => {
  const { state, toggleTheme, exportData } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleExport = () => {
    if (!hasCompletedTimers) {
      Alert.alert('No Data to Export', 'Complete some timers first to export data.');
      return;
    }
    
    const data = exportData();
    console.log('exported Data :', data);
    
    const timerCount = state.history.length;
    Alert.alert(
      'Export Data', 
      `Successfully prepared ${timerCount} completed timer${timerCount !== 1 ? 's' : ''} for export.`
    );
  };

  // Check if there are completed timers to export
  const hasCompletedTimers = state.history && state.history.length > 0;


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
              color={state.theme.isDark ? Colors.sun : Colors.moon} 
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={() => setShowFilterModal(true)}>
            <Icon name="search" size={24} color={Colors.search} />
          </TouchableOpacity>
          {hasCompletedTimers && (
            <TouchableOpacity style={styles.headerButton} onPress={handleExport}>
                <Icon name="file-download" size={24} color={Colors.download} />
            </TouchableOpacity>
          )}
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

