import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  ScrollView,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { helpers } from '../utils/helpers';
import { AddTimerModalProps } from '../types';
import { PRESET_CATEGORIES } from '../utils/json_data';
import { AddTimerStyle } from './Styles';


export const AddTimerModal: React.FC<AddTimerModalProps> = ({ visible, onClose }) => {
  const { addTimer } = useApp();
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');
  // const [customCategory, setCustomCategory] = useState('');
  const [hasHalfwayAlert, setHasHalfwayAlert] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleCreateTimer = () => {
    const durationInSeconds = parseInt(duration, 10);
    // const selectedCategory = category === 'Custom' ? customCategory : category;
    
    const validation = helpers.validateTimer(name, durationInSeconds, category);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    addTimer(name, durationInSeconds, category, hasHalfwayAlert);
    handleClose();
  };
  const emptyState = ()=>{
    setName('');
    setDuration('');
    setCategory('');
    // setCustomCategory('');
    setHasHalfwayAlert(false);
    setErrors([]);
  }
  const handleClose = () => {
    emptyState();
    onClose();
  };

  const handleDurationChange = (text: string) => {
    // Only allow numbers
    const numericValue = text.replace(/[^0-9]/g, '');
    setDuration(numericValue);
  };

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const getDurationPreview = () => {
    const durationInSeconds = parseInt(duration, 10);
    if (isNaN(durationInSeconds) || durationInSeconds <= 0) {
      return '';
    }
    return formatDuration(durationInSeconds);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <View style={AddTimerStyle.container}>
        <View style={AddTimerStyle.header}>
          <Text style={AddTimerStyle.title}>Add New Timer</Text>
          <TouchableOpacity onPress={handleClose} style={AddTimerStyle.closeButton}>
            <Text style={AddTimerStyle.closeButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={AddTimerStyle.content} showsVerticalScrollIndicator={false}>
          {errors.length > 0 && (
            <View style={AddTimerStyle.errorContainer}>
              {errors.map((error, index) => (
                <Text key={index} style={AddTimerStyle.errorText}>
                  * {error}
                </Text>
              ))}
            </View>
          )}

          <View style={AddTimerStyle.inputGroup}>
            <Text style={AddTimerStyle.label}>Timer Name</Text>
            <TextInput
              style={AddTimerStyle.input}
              value={name}
              onChangeText={setName}
              placeholder="e.g., Morning Workout"
              placeholderTextColor="#8E8E93"
            />
          </View>

          <View style={AddTimerStyle.inputGroup}>
            <Text style={AddTimerStyle.label}>Duration (seconds)</Text>
            <TextInput
              style={AddTimerStyle.input}
              value={duration}
              onChangeText={handleDurationChange}
              placeholder="e.g., 1800 for 30 minutes"
              placeholderTextColor="#8E8E93"
              keyboardType="numeric"
            />
            {getDurationPreview() && (
              <Text style={AddTimerStyle.durationPreview}>{getDurationPreview()}</Text>
            )}
          </View>

          <View style={AddTimerStyle.inputGroup}>
            <Text style={AddTimerStyle.label}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={AddTimerStyle.categoryScroll}>
              {PRESET_CATEGORIES.map((cate) => (
                <TouchableOpacity
                  key={cate}
                  style={[
                    AddTimerStyle.categoryChip,
                    category === cate && AddTimerStyle.categoryChipSelected,
                  ]}
                  onPress={() => setCategory(cate)}
                >
                  <Text
                    style={[
                      AddTimerStyle.categoryChipText,
                      category === cate && AddTimerStyle.categoryChipTextSelected,
                    ]}
                  >
                    {cate}
                  </Text>
                </TouchableOpacity>
              ))}
         
            </ScrollView>

           
          </View>

          <View style={AddTimerStyle.inputGroup}>
            <TouchableOpacity
              style={AddTimerStyle.checkboxContainer}
              onPress={() => setHasHalfwayAlert(!hasHalfwayAlert)}
            >
              <View style={[AddTimerStyle.checkbox, hasHalfwayAlert && AddTimerStyle.checkboxChecked]}>
                {hasHalfwayAlert && <Text style={AddTimerStyle.checkmark}>✓</Text>}
              </View>
              <Text style={AddTimerStyle.checkboxLabel}>Halfway Alert</Text>
            </TouchableOpacity>
            <Text style={AddTimerStyle.checkboxDescription}>
              Get notified when the timer reaches 50% completion
            </Text>
          </View>
        </ScrollView>

        <View style={AddTimerStyle.footer}>
          <TouchableOpacity style={AddTimerStyle.submitButton} onPress={handleCreateTimer}>
            <Text style={AddTimerStyle.submitButtonText}>Create Timer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
 