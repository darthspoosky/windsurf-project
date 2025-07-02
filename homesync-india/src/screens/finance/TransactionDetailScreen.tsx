import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Alert 
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { Transaction } from '../../services/api/types';

type TransactionDetailRouteProp = RouteProp<RootStackParamList, 'TransactionDetail'>;
type TransactionDetailNavigationProp = StackNavigationProp<RootStackParamList, 'TransactionDetail'>;

// Mock data for transactions (same as in FinanceOverviewScreen)
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
];

const TransactionDetailScreen = () => {
  const route = useRoute<TransactionDetailRouteProp>();
  const navigation = useNavigation<TransactionDetailNavigationProp>();
  const { transactionId } = route.params;
  
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, we would fetch transaction details from an API
    // For now, we'll use mock data
    const transactionData = mockTransactions.find(t => t.id === transactionId) || null;
    
    setTransaction(transactionData);
    setLoading(false);
    
    // Set up the navigation options
    if (transactionData) {
      navigation.setOptions({
        headerTitle: transactionData.type === 'income' ? 'Income Details' : 'Expense Details',
      });
    }
  }, [transactionId, navigation]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
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

  const handleDelete = () => {
    Alert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this transaction? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            // In a real app, we would call the API to delete the transaction
            // For now, we'll just navigate back
            navigation.goBack();
          }
        }
      ]
    );
  };

  const handleEdit = () => {
    if (transaction) {
      navigation.navigate('EditTransaction', { transactionId: transaction.id });
    }
  };
  
  const handleAddReceipt = () => {
    Alert.alert(
      'Add Receipt',
      'In a real app, this would open the camera or file picker to add a receipt image.',
      [{ text: 'OK' }]
    );
  };
  
  const handleExport = () => {
    Alert.alert(
      'Export Transaction',
      'In a real app, this would export the transaction details as PDF or share via messaging apps.',
      [{ text: 'OK' }]
    );
  };

  if (loading || !transaction) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView contentContainerClassName="p-4 pb-8">
        {/* Transaction Header */}
        <View className={`p-6 rounded-lg mb-6 ${transaction.type === 'income' ? 'bg-green-600' : 'bg-red-600'}`}>
          <View className="items-center">
            <View className="h-16 w-16 rounded-full bg-white items-center justify-center mb-3">
              <Ionicons 
                name={getCategoryIcon(transaction.category)} 
                size={28} 
                color={transaction.type === 'income' ? '#16a34a' : '#dc2626'} 
              />
            </View>
            <Text className="text-white text-2xl font-bold">
              {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
            </Text>
            <Text className="text-white opacity-90 mt-1">{transaction.category}</Text>
          </View>
        </View>
        
        {/* Transaction Details */}
        <Card className="mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">Transaction Details</Text>
          
          <View className="mb-4">
            <Text className="text-gray-500 text-sm">Date</Text>
            <Text className="text-gray-800 text-lg">{formatDate(transaction.date)}</Text>
          </View>
          
          <View className="mb-4">
            <Text className="text-gray-500 text-sm">Account</Text>
            <Text className="text-gray-800 text-lg">{transaction.account}</Text>
          </View>
          
          <View className="mb-4">
            <Text className="text-gray-500 text-sm">Description</Text>
            <Text className="text-gray-800 text-lg">{transaction.description || 'No description'}</Text>
          </View>
          
          <View className="mb-4">
            <Text className="text-gray-500 text-sm">Category</Text>
            <Text className="text-gray-800 text-lg">{transaction.category}</Text>
          </View>
          
          <View>
            <Text className="text-gray-500 text-sm">Transaction ID</Text>
            <Text className="text-gray-800 text-lg">{transaction.id}</Text>
          </View>
        </Card>
        
        {/* Transaction Timeline */}
        <Card className="mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">Timeline</Text>
          
          <View className="flex-row mb-3">
            <View className="items-center mr-3">
              <View className="h-8 w-8 rounded-full bg-green-100 items-center justify-center">
                <Ionicons name="checkmark-outline" size={18} color="#16a34a" />
              </View>
              <View className="flex-1 w-0.5 bg-gray-200 my-1"></View>
            </View>
            
            <View className="flex-1">
              <Text className="font-medium text-gray-800">Transaction Created</Text>
              <Text className="text-gray-500 text-sm">
                {formatDate(transaction.createdAt)} at {formatTime(transaction.createdAt)}
              </Text>
            </View>
          </View>
          
          {transaction.createdAt !== transaction.updatedAt && (
            <View className="flex-row">
              <View className="items-center mr-3">
                <View className="h-8 w-8 rounded-full bg-blue-100 items-center justify-center">
                  <Ionicons name="create-outline" size={18} color="#2563eb" />
                </View>
              </View>
              
              <View className="flex-1">
                <Text className="font-medium text-gray-800">Transaction Updated</Text>
                <Text className="text-gray-500 text-sm">
                  {formatDate(transaction.updatedAt)} at {formatTime(transaction.updatedAt)}
                </Text>
              </View>
            </View>
          )}
        </Card>
        
        {/* Attached Receipts */}
        <Card className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-gray-800">Receipts</Text>
            <Button 
              variant="outline" 
              size="sm"
              onPress={handleAddReceipt}
            >
              <View className="flex-row items-center">
                <Ionicons name="camera-outline" size={16} color="#6366f1" />
                <Text className="text-primary ml-1">Add Receipt</Text>
              </View>
            </Button>
          </View>
          
          <View className="items-center py-6 border border-dashed border-gray-300 rounded-lg">
            <Ionicons name="receipt-outline" size={32} color="#9ca3af" />
            <Text className="text-gray-500 mt-2">No receipts attached</Text>
          </View>
        </Card>
        
        {/* Action Buttons */}
        <View className="flex-row mb-4 space-x-4">
          <Button 
            variant="outline"
            className="flex-1"
            onPress={handleEdit}
          >
            <View className="flex-row items-center justify-center">
              <Ionicons name="create-outline" size={18} color="#6366f1" />
              <Text className="text-primary ml-1">Edit</Text>
            </View>
          </Button>
          
          <Button 
            variant="outline"
            className="flex-1"
            onPress={handleExport}
          >
            <View className="flex-row items-center justify-center">
              <Ionicons name="share-outline" size={18} color="#6366f1" />
              <Text className="text-primary ml-1">Export</Text>
            </View>
          </Button>
        </View>
        
        <Button 
          variant="destructive"
          onPress={handleDelete}
        >
          <View className="flex-row items-center justify-center">
            <Ionicons name="trash-outline" size={18} color="#fff" />
            <Text className="text-white ml-1">Delete Transaction</Text>
          </View>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TransactionDetailScreen;
