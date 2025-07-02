import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { Transaction } from '../../services/api/types';

type FinanceNavigationProp = StackNavigationProp<RootStackParamList, 'FinanceOverview'>;

// Mock data for transactions
const mockTransactions: Transaction[] = [
  {
    id: '1',
    amount: 25000,
    type: 'income',
    category: 'Salary',
    date: '2025-07-01',
    description: 'Monthly salary deposit',
    account: 'HDFC Savings',
    createdAt: '2025-07-01',
    updatedAt: '2025-07-01',
  },
  {
    id: '2',
    amount: 8000,
    type: 'expense',
    category: 'Rent',
    date: '2025-07-02',
    description: 'Monthly house rent payment',
    account: 'HDFC Savings',
    createdAt: '2025-07-02',
    updatedAt: '2025-07-02',
  },
  {
    id: '3',
    amount: 1250,
    type: 'expense',
    category: 'Utilities',
    date: '2025-07-01',
    description: 'Electricity bill',
    account: 'HDFC Savings',
    createdAt: '2025-07-01',
    updatedAt: '2025-07-01',
  },
  {
    id: '4',
    amount: 3000,
    type: 'expense',
    category: 'Groceries',
    date: '2025-06-28',
    description: 'Weekly grocery shopping',
    account: 'ICICI Account',
    createdAt: '2025-06-28',
    updatedAt: '2025-06-28',
  },
  {
    id: '5',
    amount: 5000,
    type: 'expense',
    category: 'Staff',
    date: '2025-06-30',
    description: 'Maid salary',
    account: 'Cash',
    createdAt: '2025-06-30',
    updatedAt: '2025-06-30',
  },
  {
    id: '6',
    amount: 12000,
    type: 'expense',
    category: 'Staff',
    date: '2025-06-30',
    description: 'Driver salary',
    account: 'HDFC Savings',
    createdAt: '2025-06-30',
    updatedAt: '2025-06-30',
  },
  {
    id: '7',
    amount: 2500,
    type: 'expense',
    category: 'Entertainment',
    date: '2025-06-25',
    description: 'Movie night',
    account: 'HDFC Savings',
    createdAt: '2025-06-25',
    updatedAt: '2025-06-25',
  },
  {
    id: '8',
    amount: 15000,
    type: 'income',
    category: 'Interest',
    date: '2025-06-15',
    description: 'Fixed Deposit interest',
    account: 'SBI Account',
    createdAt: '2025-06-15',
    updatedAt: '2025-06-15',
  },
];

const FinanceOverviewScreen = () => {
  const navigation = useNavigation<FinanceNavigationProp>();
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('month');
  
  // Calculate income, expenses, and balance
  const currentDate = new Date();
  let startDate: Date;
  
  switch (timeframe) {
    case 'week':
      startDate = new Date();
      startDate.setDate(currentDate.getDate() - 7);
      break;
    case 'year':
      startDate = new Date();
      startDate.setFullYear(currentDate.getFullYear() - 1);
      break;
    case 'month':
    default:
      startDate = new Date();
      startDate.setMonth(currentDate.getMonth() - 1);
  }
  
  const filteredTransactions = transactions.filter(
    t => new Date(t.date) >= startDate && new Date(t.date) <= currentDate
  );
  
  const totalIncome = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpenses = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const balance = totalIncome - totalExpenses;
  
  // Group expenses by category for the chart
  const expensesByCategory: Record<string, number> = {};
  filteredTransactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      if (!expensesByCategory[t.category]) {
        expensesByCategory[t.category] = 0;
      }
      expensesByCategory[t.category] += t.amount;
    });
  
  const categories = Object.keys(expensesByCategory).sort(
    (a, b) => expensesByCategory[b] - expensesByCategory[a]
  );
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric',
      month: 'short'
    });
  };
  
  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };
  
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'groceries': return 'cart-outline';
      case 'utilities': return 'flash-outline';
      case 'rent': return 'home-outline';
      case 'staff': return 'people-outline';
      case 'entertainment': return 'film-outline';
      case 'salary': return 'cash-outline';
      case 'interest': return 'trending-up-outline';
      default: return 'wallet-outline';
    }
  };
  
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'groceries': return 'bg-green-100';
      case 'utilities': return 'bg-yellow-100';
      case 'rent': return 'bg-blue-100';
      case 'staff': return 'bg-purple-100';
      case 'entertainment': return 'bg-pink-100';
      case 'salary': return 'bg-cyan-100';
      case 'interest': return 'bg-teal-100';
      default: return 'bg-gray-100';
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView contentContainerClassName="pb-8">
        <View className="p-4">
          <View className="mb-4 flex-row justify-between items-center">
            <Text className="text-2xl font-bold text-gray-800">Finance</Text>
            <Button 
              variant="primary" 
              size="sm" 
              onPress={() => navigation.navigate('AddTransaction')}
            >
              <View className="flex-row items-center">
                <Ionicons name="add" size={18} color="#fff" />
                <Text className="text-white ml-1">Add Transaction</Text>
              </View>
            </Button>
          </View>
          
          {/* Timeframe selector */}
          <View className="flex-row mb-4 bg-white rounded-lg">
            <TouchableOpacity 
              className={`flex-1 py-2 items-center ${timeframe === 'week' ? 'bg-primary rounded-lg' : ''}`}
              onPress={() => setTimeframe('week')}
            >
              <Text className={timeframe === 'week' ? 'text-white font-medium' : 'text-gray-600'}>
                Week
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className={`flex-1 py-2 items-center ${timeframe === 'month' ? 'bg-primary rounded-lg' : ''}`}
              onPress={() => setTimeframe('month')}
            >
              <Text className={timeframe === 'month' ? 'text-white font-medium' : 'text-gray-600'}>
                Month
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className={`flex-1 py-2 items-center ${timeframe === 'year' ? 'bg-primary rounded-lg' : ''}`}
              onPress={() => setTimeframe('year')}
            >
              <Text className={timeframe === 'year' ? 'text-white font-medium' : 'text-gray-600'}>
                Year
              </Text>
            </TouchableOpacity>
          </View>
          
          {/* Financial summary */}
          <Card className="mb-6">
            <View className="mb-4">
              <Text className="text-gray-500 text-sm">Current Balance</Text>
              <Text className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(balance)}
              </Text>
            </View>
            
            <View className="flex-row">
              <View className="flex-1 border-r border-gray-200 pr-4">
                <Text className="text-gray-500 text-sm">Income</Text>
                <Text className="text-green-600 font-bold text-lg">{formatCurrency(totalIncome)}</Text>
              </View>
              
              <View className="flex-1 pl-4">
                <Text className="text-gray-500 text-sm">Expenses</Text>
                <Text className="text-red-600 font-bold text-lg">{formatCurrency(totalExpenses)}</Text>
              </View>
            </View>
          </Card>
          
          {/* Expense breakdown by category */}
          <Text className="text-lg font-bold text-gray-800 mb-2">Expenses by Category</Text>
          <Card className="mb-6">
            {categories.length > 0 ? (
              <>
                {categories.map(category => {
                  const amount = expensesByCategory[category];
                  const percentage = Math.round((amount / totalExpenses) * 100);
                  
                  return (
                    <View key={category} className="mb-3 last:mb-0">
                      <View className="flex-row justify-between items-center mb-1">
                        <View className="flex-row items-center">
                          <View className={`h-8 w-8 rounded-full ${getCategoryColor(category)} items-center justify-center mr-2`}>
                            <Ionicons name={getCategoryIcon(category)} size={16} color="#6366f1" />
                          </View>
                          <Text className="font-medium text-gray-800">{category}</Text>
                        </View>
                        <Text className="font-medium text-gray-800">{formatCurrency(amount)}</Text>
                      </View>
                      
                      <View className="h-2 bg-gray-200 rounded-full w-full">
                        <View 
                          className="h-2 bg-primary rounded-full" 
                          style={{ width: `${percentage}%` }} 
                        />
                      </View>
                      
                      <Text className="text-right text-xs text-gray-500 mt-1">{percentage}%</Text>
                    </View>
                  );
                })}
              </>
            ) : (
              <Text className="text-center text-gray-500 py-4">No expense data available</Text>
            )}
          </Card>
          
          {/* Recent Transactions */}
          <View className="mb-2 flex-row justify-between items-center">
            <Text className="text-lg font-bold text-gray-800">Recent Transactions</Text>
            <TouchableOpacity onPress={() => navigation.navigate('TransactionHistory')}>
              <Text className="text-primary">View All</Text>
            </TouchableOpacity>
          </View>
          
          <Card>
            {filteredTransactions.slice(0, 5).map((transaction) => (
              <TouchableOpacity
                key={transaction.id}
                onPress={() => navigation.navigate('TransactionDetail', { transactionId: transaction.id })}
                className="mb-3 last:mb-0"
              >
                <View className="flex-row items-center">
                  <View className={`h-10 w-10 rounded-full ${getCategoryColor(transaction.category)} items-center justify-center mr-3`}>
                    <Ionicons name={getCategoryIcon(transaction.category)} size={20} color="#6366f1" />
                  </View>
                  
                  <View className="flex-1">
                    <Text className="font-medium text-gray-800">{transaction.category}</Text>
                    <Text className="text-gray-500 text-sm">{formatDate(transaction.date)} • {transaction.account}</Text>
                  </View>
                  
                  <Text className={`font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
            
            <Button
              variant="outline"
              size="sm"
              className="mt-3"
              onPress={() => navigation.navigate('AddTransaction')}
            >
              <View className="flex-row items-center">
                <Ionicons name="add-circle-outline" size={18} color="#6366f1" />
                <Text className="text-primary ml-1">Add Transaction</Text>
              </View>
            </Button>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FinanceOverviewScreen;
