import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Ionicons as IoniconsType } from '@expo/vector-icons';
import Card from '../../components/ui/Card';
import { FinanceSummary } from './components/FinanceSummary';
import { UtilityUsage } from './components/UtilityUsage';
import { StaffAttendance } from './components/StaffAttendance';
import { GroceryAnalytics } from './components/GroceryAnalytics';

// Get screen width for responsive layouts
const screenWidth = Dimensions.get('window').width;

const AnalyticsScreen = () => {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('month');
  
  const timeframes = [
    { value: 'week', label: 'Weekly' },
    { value: 'month', label: 'Monthly' },
    { value: 'year', label: 'Yearly' },
  ];
  
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView contentContainerClassName="p-4 pb-8">
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-800">Household Analytics</Text>
          <Text className="text-gray-500 mt-1">
            Insights and trends for your home management
          </Text>
        </View>
        
        {/* Timeframe selection */}
        <View className="flex-row mb-6 bg-gray-200 rounded-lg p-1">
          {timeframes.map((tf) => (
            <TouchableOpacity
              key={tf.value}
              className={`flex-1 py-2 rounded-md ${timeframe === tf.value ? 'bg-white shadow' : ''}`}
              onPress={() => setTimeframe(tf.value as 'week' | 'month' | 'year')}
            >
              <Text 
                className={`text-center font-medium ${
                  timeframe === tf.value ? 'text-primary' : 'text-gray-600'
                }`}
              >
                {tf.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Summary Cards */}
        <View className="flex-row flex-wrap mb-4">
          <SummaryCard 
            title="Total Expenses" 
            value="₹42,500" 
            change="+5.2%" 
            isPositive={false}
            icon="wallet-outline" 
            color="bg-blue-100" 
          />
          <SummaryCard 
            title="Staff Hours" 
            value="87 hrs" 
            change="-2.1%" 
            isPositive={true}
            icon="time-outline" 
            color="bg-purple-100" 
          />
          <SummaryCard 
            title="Utility Usage" 
            value="₹3,850" 
            change="+1.7%" 
            isPositive={false}
            icon="flash-outline" 
            color="bg-yellow-100" 
          />
          <SummaryCard 
            title="Grocery Spend" 
            value="₹9,200" 
            change="-3.5%" 
            isPositive={true}
            icon="cart-outline" 
            color="bg-green-100" 
          />
        </View>
        
        {/* Financial Analytics */}
        <Card className="mb-6">
          <View className="mb-2 flex-row justify-between items-center">
            <Text className="text-lg font-bold text-gray-800">Financial Summary</Text>
            <TouchableOpacity>
              <Text className="text-primary">Details</Text>
            </TouchableOpacity>
          </View>
          
          <FinanceSummary timeframe={timeframe} />
        </Card>
        
        {/* Utility Usage */}
        <Card className="mb-6">
          <View className="mb-2 flex-row justify-between items-center">
            <Text className="text-lg font-bold text-gray-800">Utility Usage</Text>
            <TouchableOpacity>
              <Text className="text-primary">Details</Text>
            </TouchableOpacity>
          </View>
          
          <UtilityUsage timeframe={timeframe} />
        </Card>
        
        {/* Staff Attendance */}
        <Card className="mb-6">
          <View className="mb-2 flex-row justify-between items-center">
            <Text className="text-lg font-bold text-gray-800">Staff Attendance</Text>
            <TouchableOpacity>
              <Text className="text-primary">Details</Text>
            </TouchableOpacity>
          </View>
          
          <StaffAttendance timeframe={timeframe} />
        </Card>
        
        {/* Grocery Analytics */}
        <Card className="mb-6">
          <View className="mb-2 flex-row justify-between items-center">
            <Text className="text-lg font-bold text-gray-800">Grocery Insights</Text>
            <TouchableOpacity>
              <Text className="text-primary">Details</Text>
            </TouchableOpacity>
          </View>
          
          <GroceryAnalytics timeframe={timeframe} />
        </Card>
        
        {/* AI Insights */}
        <Card>
          <View className="flex-row items-center mb-4">
            <View className="h-10 w-10 rounded-full bg-primary items-center justify-center mr-3">
              <Ionicons name="bulb-outline" size={20} color="#fff" />
            </View>
            <Text className="text-lg font-bold text-gray-800">AI Insights</Text>
          </View>
          
          <View className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <Text className="text-gray-700">
              Your electricity usage has increased by 15% compared to last month. Consider checking for appliances that might be consuming more power than usual.
            </Text>
          </View>
          
          <View className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <Text className="text-gray-700">
              You've saved ₹2,500 on grocery expenses this month by purchasing more items during sales periods.
            </Text>
          </View>
          
          <View className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <Text className="text-gray-700">
              Based on your vehicle maintenance history, your car is due for servicing in the next 2 weeks. Consider scheduling an appointment soon.
            </Text>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

// Summary card component
interface SummaryCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

const SummaryCard = ({ title, value, change, isPositive, icon, color }: SummaryCardProps) => {
  return (
    <Card className={`mb-4 mr-4 w-[${(screenWidth - 32) / 2 - 8}px]`}>
      <View className="flex-row justify-between items-start">
        <View className={`h-10 w-10 rounded-full ${color} items-center justify-center`}>
          <Ionicons name={icon} size={20} color="#6366f1" />
        </View>
        
        <View className="flex-row items-center">
          <Ionicons 
            name={isPositive ? 'trending-down-outline' : 'trending-up-outline'} 
            size={16} 
            color={isPositive ? '#10b981' : '#ef4444'} 
          />
          <Text 
            className={`text-xs ml-1 ${
              isPositive ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {change}
          </Text>
        </View>
      </View>
      
      <Text className="text-gray-600 text-sm mt-2">{title}</Text>
      <Text className="text-xl font-bold text-gray-800 mt-1">{value}</Text>
    </Card>
  );
};

export default AnalyticsScreen;
