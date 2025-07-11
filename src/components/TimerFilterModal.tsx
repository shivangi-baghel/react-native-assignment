import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { TimerFilterStyle } from './Styles';

interface TimerFilterModalProps {
  visible: boolean;
  onClose: () => void;
  onFilterChange: (selectedCategory: string) => void;
  currentFilter: string;
}

export const TimerFilterModal: React.FC<TimerFilterModalProps> = ({
  visible,
  onClose,
  onFilterChange,
  currentFilter,
}) => {
  const { state } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  // Get unique categories from timers
  const categories = React.useMemo(() => {
    const uniqueCategories = new Set(state.timers.map(timer => timer.category));
    return Array.from(uniqueCategories).sort();
  }, [state.timers]);

  // Filter categories based on search query
  const filteredCategories = React.useMemo(() => {
    if (!searchQuery.trim()) return categories;
    return categories.filter(category =>
      category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [categories, searchQuery]);

  const handleCategorySelect = (category: string) => {
    onFilterChange(category);
    onClose();
  };

  const handleClearFilter = () => {
    onFilterChange('All');
    onClose();
  };

  const renderCategoryItem = ({ item }: { item: string }) => {
    const isSelected = currentFilter === item;
    const timerCount = state.timers.filter(timer => timer.category === item).length;

    return (
      <TouchableOpacity
        style={[TimerFilterStyle.categoryItem, isSelected && TimerFilterStyle.selectedCategoryItem]}
        onPress={() => handleCategorySelect(item)}
      >
        <View style={TimerFilterStyle.categoryInfo}>
          <Text style={[TimerFilterStyle.categoryName, isSelected && TimerFilterStyle.selectedCategoryText]}>
            {item}
          </Text>
          <Text style={[TimerFilterStyle.timerCount, isSelected && TimerFilterStyle.selectedCategoryText]}>
            {timerCount} timer{timerCount !== 1 ? 's' : ''}
          </Text>
        </View>
        {isSelected && (
          <Text style={TimerFilterStyle.checkmark}>✓</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={TimerFilterStyle.container}>
        <View style={TimerFilterStyle.header}>
          <Text style={TimerFilterStyle.title}>Filter by Category</Text>
          <TouchableOpacity onPress={onClose} style={TimerFilterStyle.closeButton}>
            <Text style={TimerFilterStyle.closeButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <View style={TimerFilterStyle.searchContainer}>
          <TextInput
            style={TimerFilterStyle.searchInput}
            placeholder="Search categories..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#8E8E93"
          />
        </View>

        <FlatList
          data={filteredCategories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={TimerFilterStyle.listContainer}
          ListHeaderComponent={
            <TouchableOpacity
              style={[TimerFilterStyle.categoryItem, currentFilter === 'All' && TimerFilterStyle.selectedCategoryItem]}
              onPress={handleClearFilter}
            >
              <View style={TimerFilterStyle.categoryInfo}>
                <Text style={[TimerFilterStyle.categoryName, currentFilter === 'All' && TimerFilterStyle.selectedCategoryText]}>
                  All Categories
                </Text>
                <Text style={[TimerFilterStyle.timerCount, currentFilter === 'All' && TimerFilterStyle.selectedCategoryText]}>
                  {state.timers.length} timer{state.timers.length !== 1 ? 's' : ''}
                </Text>
              </View>
              {currentFilter === 'All' && (
                <Text style={TimerFilterStyle.checkmark}>✓</Text>
              )}
            </TouchableOpacity>
          }
          ListEmptyComponent={
            <View style={TimerFilterStyle.emptyContainer}>
              <Text style={TimerFilterStyle.emptyText}>No categories found</Text>
            </View>
          }
        />
      </View>
    </Modal>
  );
};

