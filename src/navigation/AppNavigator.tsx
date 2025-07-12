import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../utils/config/colors';
import { useApp } from '../context/AppContext';

const Tab = createBottomTabNavigator();

export const AppNavigator: React.FC = () => {
  const { state } = useApp();
  const isDark = state.theme.isDark;

  // Theme-aware colors
  const tabBarActiveColor = isDark
    ? Colors.tabBarActiveTintColor_dark
    : Colors.tabBarActiveTintColor;
  const tabBarInactiveColor = isDark
    ? Colors.tabBarInactiveTintColor_dark
    : Colors.tabBarInactiveTintColor;
  const tabBarBackgroundColor = isDark
    ? Colors.tabBarStyle_dark.backgroundColor
    : Colors.tabBarStyle.backgroundColor;
  const tabBarBorderColor = isDark
    ? Colors.tabBarStyle_dark.borderTopColor
    : Colors.tabBarStyle.borderTopColor;

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: tabBarActiveColor,
          tabBarInactiveTintColor: tabBarInactiveColor,
          tabBarStyle: {
            backgroundColor: tabBarBackgroundColor,
            borderTopWidth: 1,
            borderTopColor: tabBarBorderColor,
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
            elevation: 8,
            shadowColor: isDark ? '#000' : '#000',
            shadowOffset: {
              width: 0,
              height: -2,
            },
            shadowOpacity: isDark ? 0.3 : 0.1,
            shadowRadius: 3,
          },
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="timer" size={size} color={color} />
            ),
            tabBarLabel: 'Timers',
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '500',
            },
          }}
        />
        <Tab.Screen
          name="History"
          component={HistoryScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="history" size={size} color={color} />
            ),
            tabBarLabel: 'History',
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '500',
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
