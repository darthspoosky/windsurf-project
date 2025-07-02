import React from 'react';
import { View, Text } from 'react-native';

// Mock data for grocery analytics
const mockGroceryData = {
  week: {
    totalSpent: 4800,
    itemsPurchased: 32,
    averagePrice: 150,
    categories: [
      { name: 'Fruits & Vegetables', amount: 1850, percentage: 38 },
      { name: 'Dairy Products', amount: 950, percentage: 20 },
      { name: 'Grains & Cereals', amount: 780, percentage: 16 },
      { name: 'Proteins', amount: 720, percentage: 15 },
      { name: 'Others', amount: 500, percentage: 11 },
    ],
    frequentItems: [
      { name: 'Milk', quantity: 7, amount: 490 },
      { name: 'Bananas', quantity: 24, amount: 280 },
      { name: 'Bread', quantity: 3, amount: 240 },
      { name: 'Eggs', quantity: 30, amount: 210 },
    ],
  },
  month: {
    totalSpent: 25600,
    itemsPurchased: 145,
    averagePrice: 176,
    categories: [
      { name: 'Fruits & Vegetables', amount: 9200, percentage: 36 },
      { name: 'Dairy Products', amount: 5600, percentage: 22 },
      { name: 'Grains & Cereals', amount: 3850, percentage: 15 },
      { name: 'Proteins', amount: 4200, percentage: 16 },
      { name: 'Others', amount: 2750, percentage: 11 },
    ],
    frequentItems: [
      { name: 'Milk', quantity: 30, amount: 2100 },
      { name: 'Bread', quantity: 12, amount: 960 },
      { name: 'Eggs', quantity: 120, amount: 840 },
      { name: 'Rice', quantity: 8, amount: 720 },
    ],
  },
  year: {
    totalSpent: 294000,
    itemsPurchased: 1740,
    averagePrice: 169,
    categories: [
      { name: 'Fruits & Vegetables', amount: 105840, percentage: 36 },
      { name: 'Dairy Products', amount: 64680, percentage: 22 },
      { name: 'Grains & Cereals', amount: 44100, percentage: 15 },
      { name: 'Proteins', amount: 47040, percentage: 16 },
      { name: 'Others', amount: 32340, percentage: 11 },
    ],
    frequentItems: [
      { name: 'Milk', quantity: 365, amount: 25550 },
      { name: 'Bread', quantity: 156, amount: 12480 },
      { name: 'Rice', quantity: 104, amount: 9360 },
      { name: 'Eggs', quantity: 1560, amount: 10920 },
    ],
  },
};

// Format currency to INR
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

interface GroceryAnalyticsProps {
  timeframe: 'week' | 'month' | 'year';
}

export const GroceryAnalytics: React.FC<GroceryAnalyticsProps> = ({ timeframe }) => {
  const data = mockGroceryData[timeframe];
  
  return (
    <View>
      {/* Summary Stats */}
      <View className="flex-row justify-between mb-4">
        <View className="p-3 bg-gray-50 rounded-lg flex-1 mr-2">
          <Text className="text-gray-500 text-xs">Total Spent</Text>
          <Text className="text-gray-800 font-bold text-lg">{formatCurrency(data.totalSpent)}</Text>
        </View>
        
        <View className="p-3 bg-gray-50 rounded-lg flex-1 mr-2">
          <Text className="text-gray-500 text-xs">Items Purchased</Text>
          <Text className="text-gray-800 font-bold text-lg">{data.itemsPurchased}</Text>
        </View>
        
        <View className="p-3 bg-gray-50 rounded-lg flex-1">
          <Text className="text-gray-500 text-xs">Avg. Item Price</Text>
          <Text className="text-gray-800 font-bold text-lg">{formatCurrency(data.averagePrice)}</Text>
        </View>
      </View>
      
      {/* Category Breakdown */}
      <View className="mb-4">
        <Text className="text-gray-700 font-medium mb-2">Spending by Category</Text>
        
        {data.categories.map((category, index) => (
          <View key={index} className="mb-2 last:mb-0">
            <View className="flex-row justify-between mb-1">
              <Text className="text-gray-700">{category.name}</Text>
              <Text className="text-gray-700 font-medium">{formatCurrency(category.amount)}</Text>
            </View>
            
            <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <View 
                className="h-full bg-green-500 rounded-full" 
                style={{ width: `${category.percentage}%` }} 
              />
            </View>
            
            <Text className="text-gray-500 text-xs text-right mt-1">{category.percentage}%</Text>
          </View>
        ))}
      </View>
      
      {/* Most Frequent Items */}
      <View>
        <Text className="text-gray-700 font-medium mb-2">Most Purchased Items</Text>
        
        {data.frequentItems.map((item, index) => (
          <View key={index} className="flex-row justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
            <View className="flex-1">
              <Text className="text-gray-800">{item.name}</Text>
              <Text className="text-gray-500 text-xs">{item.quantity} units</Text>
            </View>
            <Text className="text-gray-700 font-medium">{formatCurrency(item.amount)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default GroceryAnalytics;
