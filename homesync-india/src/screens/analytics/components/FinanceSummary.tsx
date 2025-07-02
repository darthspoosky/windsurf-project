import React from 'react';
import { View, Text } from 'react-native';

// Mock data for finance summary
const mockFinanceData = {
  week: {
    income: 28500,
    expenses: 15200,
    categories: [
      { name: 'Groceries', amount: 4800, percentage: 32 },
      { name: 'Utilities', amount: 3200, percentage: 21 },
      { name: 'Staff', amount: 2500, percentage: 16 },
      { name: 'Transport', amount: 2100, percentage: 14 },
      { name: 'Others', amount: 2600, percentage: 17 },
    ],
  },
  month: {
    income: 125000,
    expenses: 84500,
    categories: [
      { name: 'Groceries', amount: 25600, percentage: 30 },
      { name: 'Utilities', amount: 18900, percentage: 22 },
      { name: 'Staff', amount: 14500, percentage: 17 },
      { name: 'Transport', amount: 10800, percentage: 13 },
      { name: 'Others', amount: 14700, percentage: 18 },
    ],
  },
  year: {
    income: 1540000,
    expenses: 980000,
    categories: [
      { name: 'Groceries', amount: 294000, percentage: 30 },
      { name: 'Utilities', amount: 215600, percentage: 22 },
      { name: 'Staff', amount: 166600, percentage: 17 },
      { name: 'Transport', amount: 127400, percentage: 13 },
      { name: 'Others', amount: 176400, percentage: 18 },
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

interface FinanceSummaryProps {
  timeframe: 'week' | 'month' | 'year';
}

export const FinanceSummary: React.FC<FinanceSummaryProps> = ({ timeframe }) => {
  const data = mockFinanceData[timeframe];
  const savings = data.income - data.expenses;
  const savingsPercentage = Math.round((savings / data.income) * 100);
  
  const getBarColor = (percentage: number): string => {
    if (percentage > 25) return 'bg-red-500';
    if (percentage > 15) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  return (
    <View>
      {/* Income vs Expenses */}
      <View className="flex-row justify-between mb-4">
        <View className="p-3 bg-blue-50 rounded-lg flex-1 mr-2">
          <Text className="text-blue-800 text-xs">Income</Text>
          <Text className="text-blue-900 font-bold text-lg">{formatCurrency(data.income)}</Text>
        </View>
        
        <View className="p-3 bg-red-50 rounded-lg flex-1 mr-2">
          <Text className="text-red-800 text-xs">Expenses</Text>
          <Text className="text-red-900 font-bold text-lg">{formatCurrency(data.expenses)}</Text>
        </View>
        
        <View className="p-3 bg-green-50 rounded-lg flex-1">
          <Text className="text-green-800 text-xs">Savings</Text>
          <Text className="text-green-900 font-bold text-lg">{formatCurrency(savings)}</Text>
        </View>
      </View>
      
      {/* Savings Bar */}
      <View className="mb-4">
        <View className="flex-row justify-between mb-1">
          <Text className="text-gray-500 text-xs">Savings Rate</Text>
          <Text className="text-gray-700 font-medium text-xs">{savingsPercentage}%</Text>
        </View>
        
        <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <View 
            className="h-full bg-green-500 rounded-full" 
            style={{ width: `${savingsPercentage}%` }} 
          />
        </View>
      </View>
      
      {/* Expense Categories */}
      <Text className="text-gray-700 font-medium mb-2">Top Expense Categories</Text>
      
      {data.categories.map((category, index) => (
        <View key={index} className="mb-3 last:mb-0">
          <View className="flex-row justify-between mb-1">
            <Text className="text-gray-700">{category.name}</Text>
            <Text className="text-gray-700 font-medium">{formatCurrency(category.amount)}</Text>
          </View>
          
          <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <View 
              className={`h-full ${getBarColor(category.percentage)} rounded-full`} 
              style={{ width: `${category.percentage}%` }} 
            />
          </View>
          
          <Text className="text-gray-500 text-xs text-right mt-1">{category.percentage}%</Text>
        </View>
      ))}
    </View>
  );
};

export default FinanceSummary;
