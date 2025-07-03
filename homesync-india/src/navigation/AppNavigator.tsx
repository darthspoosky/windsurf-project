import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator, Text, TouchableOpacity, Alert } from 'react-native';

// Screens
import HomeScreen from '../screens/HomeScreen';
import AdminScreen from '../screens/AdminScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ChatScreen from '../screens/ChatScreen';

// Services
import { authService } from '../services/auth/AuthService';

// Define our navigation parameter types
export type RootStackParamList = {
  // Auth Screens
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  
  // Main App Screens
  Home: undefined;
  Admin: undefined;
  Chat: undefined;
  AISettings: undefined;
  
  // Staff Management
  Staff: undefined;
  StaffDetail: { staffId: string };
  StaffDetails: { staffId: string }; // Alias for StaffDetail
  StaffList: undefined;
  AddStaff: undefined;
  EditStaff: { staffId: string };
  StaffAttendance: { staffId: string };
  
  // Bills Management
  Bills: undefined;
  BillDetails: { billId: string };
  AddBill: undefined;
  BillEdit: { billId: string };
  
  // Grocery Management
  Grocery: undefined;
  GroceryList: undefined;
  GroceryCategories: undefined;
  GroceryItemDetail: { itemId: string };
  AddGroceryItem: undefined;
  EditGroceryItem: { itemId: string };
  
  // Calendar
  Calendar: undefined;
  EventDetail: { eventId: string };
  AddEvent: { date?: string };
  EditEvent: { eventId: string };
  
  // Vehicle Management
  Vehicle: undefined;
  VehicleDetail: { vehicleId: string };
  VehicleDetails: { vehicleId: string }; // Alias for VehicleDetail
  AddVehicle: undefined;
  EditVehicle: { vehicleId: string };
  AddServiceRecord: { vehicleId: string };
  
  // Finance Management
  FinanceOverview: undefined;
  TransactionDetail: { transactionId: string };
  TransactionHistory: undefined;
  AddTransaction: undefined;
  EditTransaction: { transactionId: string };
  
  // Family Management
  FamilyList: undefined;
  FamilyMemberDetails: { memberId: string };
  AddFamilyMember: undefined;
  EditFamilyMember: { memberId: string };
  AddFamilyDocument: { memberId: string };
  AddHealthRecord: { memberId: string };
  
  // Document Vault
  DocumentList: undefined;
  DocumentDetail: { documentId: string };
  AddDocument: undefined;
  EditDocument: { documentId: string };
  ShareDocument: { documentId: string };
  
  // Analytics
  Analytics: undefined;
  
  // Health Module
  HealthDashboard: undefined;
  MedicalRecord: { recordId: string };
  AddMedicalRecord: { memberId: string };
  
  Settings: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

// Auth Navigator component
export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      {/* ForgotPassword screen will be added later */}
    </Stack.Navigator>
  );
};

// Import all screens
import HealthDashboardScreen from '../screens/health/HealthDashboardScreen';
import MedicalRecordScreen from '../screens/health/MedicalRecordScreen';

// Create placeholder screens for missing modules
const createPlaceholderScreen = (name: string) => {
  return () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>{name} Screen</Text>
      <Text style={{ fontSize: 16, marginBottom: 15, textAlign: 'center' }}>
        This is a placeholder for the {name} module.
      </Text>
      <TouchableOpacity 
        onPress={() => Alert.alert('Info', `${name} module will be implemented soon.`)}
        style={{ padding: 15, backgroundColor: '#6366f1', borderRadius: 8 }}
      >
        <Text style={{ color: 'white' }}>Learn More</Text>
      </TouchableOpacity>
    </View>
  );
};

// Create placeholder screens for now
const StaffScreen = createPlaceholderScreen('Staff');
const BillsScreen = createPlaceholderScreen('Bills');
const GroceryScreen = createPlaceholderScreen('Grocery');
const CalendarScreen = createPlaceholderScreen('Calendar');
const VehicleScreen = createPlaceholderScreen('Vehicle');
const FinanceOverviewScreen = createPlaceholderScreen('Finance');
const FamilyListScreen = createPlaceholderScreen('Family');
const DocumentListScreen = createPlaceholderScreen('Documents');
const AnalyticsScreen = createPlaceholderScreen('Analytics');
const ForgotPasswordScreen = createPlaceholderScreen('Forgot Password');
const SettingsScreen = createPlaceholderScreen('Settings');

// Main App Navigator component
export const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6366f1', // primary color
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          title: 'HomeSync India',
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="Admin" 
        component={AdminScreen} 
        options={{
          title: 'Admin Dashboard',
        }}
      />
      <Stack.Screen name="Chat" component={ChatScreen} />
      
      {/* Staff Management Screens */}
      <Stack.Screen name="Staff" component={StaffScreen} options={{ title: 'Staff Management' }} />
      
      {/* Bills Management Screens */}
      <Stack.Screen name="Bills" component={BillsScreen} options={{ title: 'Bills' }} />
      
      {/* Grocery Management Screens */}
      <Stack.Screen name="Grocery" component={GroceryScreen} options={{ title: 'Grocery' }} />
      
      {/* Calendar Management Screens */}
      <Stack.Screen name="Calendar" component={CalendarScreen} options={{ title: 'Calendar' }} />
      
      {/* Vehicle Management Screens */}
      <Stack.Screen name="Vehicle" component={VehicleScreen} options={{ title: 'Vehicle' }} />
      
      {/* Finance Management Screens */}
      <Stack.Screen 
        name="FinanceOverview" 
        component={FinanceOverviewScreen} 
        options={{ title: 'Finance' }} 
      />
      
      {/* Family Management Screens */}
      <Stack.Screen 
        name="FamilyList" 
        component={FamilyListScreen} 
        options={{ title: 'Family' }} 
      />
      
      {/* Document Management Screens */}
      <Stack.Screen 
        name="DocumentList" 
        component={DocumentListScreen} 
        options={{ title: 'Documents' }} 
      />
      
      {/* Analytics Screens */}
      <Stack.Screen 
        name="Analytics" 
        component={AnalyticsScreen} 
        options={{ title: 'Analytics' }} 
      />
      
      {/* Auth Module Screens */}
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ title: 'Login', headerShown: false }} 
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen} 
        options={{ title: 'Register' }} 
      />
      <Stack.Screen 
        name="ForgotPassword" 
        component={ForgotPasswordScreen} 
        options={{ title: 'Forgot Password' }} 
      />
      
      {/* Settings Screen */}
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ title: 'Settings' }} 
      />
      
      {/* Health Module Screens */}
      <Stack.Screen 
        name="HealthDashboard" 
        component={HealthDashboardScreen} 
        options={{
          title: 'Health Dashboard'
        }}
      />
      <Stack.Screen 
        name="MedicalRecord" 
        component={MedicalRecordScreen} 
        options={{
          title: 'Medical Record'
        }}
      />
    </Stack.Navigator>
  );
};

export const AppNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated
    const checkAuth = async () => {
      try {
        const authenticated = await authService.isAuthenticated();
        setIsAuthenticated(authenticated);
      } catch (error) {
        console.error('Authentication check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    // Show a loading spinner while checking authentication
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
