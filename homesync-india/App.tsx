import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { Provider as PaperProvider, MD3DarkTheme, MD3LightTheme, adaptNavigationTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';

// Import gesture handler at the top of your file
import 'react-native-gesture-handler';

// Define your custom theme
const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6366f1', // indigo color
    secondary: '#8b5cf6', // violet color
    tertiary: '#f472b6', // pink color
    // You can add more custom colors here
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <AppNavigator />
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </PaperProvider>
  );
}
