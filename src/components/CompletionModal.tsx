import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { CompletionStyle } from './Styles';

interface CompletionModalProps {
  visible: boolean;
  timerName: string;
  onClose: () => void;
}

export const CompletionModal: React.FC<CompletionModalProps> = ({
  visible,
  timerName,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={CompletionStyle.overlay}>
        <View style={CompletionStyle.modal}>
          <Text style={CompletionStyle.emoji}>🎉</Text>
          <Text style={CompletionStyle.title}>Timer Complete!</Text>
          <Text style={CompletionStyle.message}>
            Congratulations! You've completed "{timerName}"
          </Text>
          <TouchableOpacity style={CompletionStyle.button} onPress={onClose}>
            <Text style={CompletionStyle.buttonText}>Great!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

