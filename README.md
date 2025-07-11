# TimerSync - React Native Timer App

A comprehensive React Native timer application built with TypeScript that allows users to create, manage, and interact with multiple customizable timers.

## Features

### Core Features

- **Add Timer**: Create new timers with name, duration, category, and optional halfway alerts
- **Timer List with Grouping**: Display timers grouped by categories with expandable/collapsible sections
- **Timer Management**: Start, pause, reset, and delete individual timers
- **Progress Visualization**: Visual progress bars showing timer completion percentage
- **Bulk Actions**: Start, pause, and reset all timers within a category
- **Timer History**: Track and view completed timers with completion timestamps
- **User Feedback**: Celebration modal when timers complete

### Enhanced Functionality

- **Customizable Alerts**: Optional halfway alerts (50% completion)
- **Background Notifications**: Timer completion notifications
- **Data Persistence**: Local storage using AsyncStorage
- **Theme Support**: Light and dark mode with theme switcher
- **Export Functionality**: Export timer data as JSON

### Technical Features

- **TypeScript**: Full type safety throughout the application
- **State Management**: React Context with useReducer for complex state
- **Navigation**: React Navigation with bottom tabs
- **Responsive Design**: Clean, modern UI with proper styling
- **Error Handling**: Comprehensive error handling and validation

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── TimerItem.tsx   # Individual timer display
│   ├── CategorySection.tsx # Category grouping component
│   ├── AddTimerModal.tsx # Timer creation modal
│   └── CompletionModal.tsx # Timer completion celebration
├── screens/            # Main app screens
│   ├── HomeScreen.tsx  # Timer list and management
│   └── HistoryScreen.tsx # Completed timer history
├── navigation/         # Navigation setup
│   └── AppNavigator.tsx # Bottom tab navigation
├── context/           # State management
│   └── AppContext.tsx # Global app state and actions
├── types/             # TypeScript type definitions
│   └── index.ts       # All app types and interfaces
├── utils/             # Utility functions
│   ├── storage.ts     # AsyncStorage operations
│   ├── helpers.ts     # Helper functions
│   └── themes.ts      # Theme configurations
└── index.ts           # Main exports
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Install additional required packages:
   ```bash
   npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context react-native-gesture-handler @react-native-async-storage/async-storage react-native-vector-icons @types/react-native-vector-icons
   ```

4. For iOS, install pods:
   ```bash
   cd ios && pod install && cd ..
   ```

## Running the App

### Android
```bash
npm run android
```

### iOS
```bash
npm run ios
```

## Usage

### Creating Timers
1. Tap the "+" button on the home screen
2. Enter timer name, duration (in seconds), and select a category
3. Optionally enable halfway alerts
4. Tap "Create Timer"

### Managing Timers
- **Start/Pause**: Control individual timer states
- **Reset**: Reset timer to original duration
- **Delete**: Remove timers with confirmation
- **Bulk Actions**: Control all timers in a category at once

### Categories
- Timers are automatically grouped by category
- Tap category headers to expand/collapse
- Use bulk actions for category-wide operations

### History
- View completed timers in the History tab
- Clear history with confirmation
- Export timer data for backup

### Themes
- Toggle between light and dark themes using the theme button
- Theme preference is automatically saved

## Key Components

### TimerItem
Displays individual timer with:
- Timer name and remaining time
- Status indicator (running/paused/completed)
- Progress bar visualization
- Control buttons (start/pause/reset/delete)
- Halfway alert indicator

### CategorySection
Groups timers by category with:
- Expandable/collapsible sections
- Timer count and status summary
- Bulk action buttons
- Individual timer items

### AddTimerModal
Comprehensive timer creation with:
- Form validation
- Duration preview
- Category selection with custom options
- Halfway alert toggle

## State Management

The app uses React Context with useReducer for state management:

- **Timers**: Array of timer objects with full state
- **History**: Completed timer records
- **Categories**: Grouped timer data
- **Theme**: Current theme configuration

All data is automatically persisted to AsyncStorage and restored on app launch.

## Styling

The app uses StyleSheet for consistent styling with:
- Modern, clean design
- Proper spacing and typography
- Shadow effects and elevation
- Responsive layouts
- Theme-aware colors

## Future Enhancements

- Push notifications for timer completion
- Timer templates and presets
- Statistics and analytics
- Cloud sync capabilities
- Custom sound alerts
- Widget support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
