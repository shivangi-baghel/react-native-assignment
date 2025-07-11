import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useApp } from '../../context/AppContext';
import { CategorySection } from '../../components/CategorySection';
import { AddTimerModal } from '../../components/AddTimerModal';
import { TimerFilterModal } from '../../components/TimerFilterModal';
import { helpers } from '../../utils/helpers';
import { addSampleData } from '../../utils/sampleData';
import { styles } from './styles';

export const HomeScreen: React.FC = () => {
  const { state, toggleTheme, exportData, addTimer } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleExport = () => {
    const data = exportData();
    console.log('exported Data :', data)
    Alert.alert('Export Data', 'Data prepared for export');
  };

  // const handleAddSampleData = () => {
  //   Alert.alert(
  //     'Add Sample Data',
  //     'This will add sample timers for testing. Continue?',
  //     [
  //       { text: 'Cancel', style: 'cancel' },
  //       {
  //         text: 'Add Sample Data',
  //         onPress: () => {
  //           addSampleData(addTimer);
  //           Alert.alert('Success', 'Sample data added!');
  //         },
  //       },
  //     ]
  //   );
  // };

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
        {/* {selectedCategory === 'All' && state.timers.length === 0 && (
          <TouchableOpacity style={styles.sampleButton} onPress={handleAddSampleData}>
            <Text style={styles.sampleButtonText}>Add Sample Data</Text>
          </TouchableOpacity>
        )} */}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>TimerSync</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton} onPress={toggleTheme}>
            <Text style={styles.headerButtonText}>{state.theme.isDark ? '☀️' : '🌙'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={() => setShowFilterModal(true)}>
            <Text style={styles.headerButtonText}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={handleExport}>
            <Text style={styles.headerButtonText}>📤</Text>
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
        <Text style={styles.fabText}>+</Text>
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

