import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { Bill } from '../../services/api/types';

type BillsListNavigationProp = StackNavigationProp<RootStackParamList, 'BillsList'>;

// Mock data for bills
const mockBillsData: Bill[] = [
  {
    id: '1',
    title: 'Electricity Bill',
    amount: 1250,
    dueDate: '2025-07-15',
    category: 'Utilities',
    status: 'unpaid',
    recurringType: 'monthly',
    notes: 'BSES Rajdhani Power Limited',
    createdAt: '2025-06-30',
    updatedAt: '2025-06-30',
  },
  {
    id: '2',
    title: 'Water Bill',
    amount: 800,
    dueDate: '2025-07-20',
    category: 'Utilities',
    status: 'unpaid',
    recurringType: 'monthly',
    notes: 'Delhi Jal Board',
    createdAt: '2025-06-30',
    updatedAt: '2025-06-30',
  },
  {
    id: '3',
    title: 'Internet Bill',
    amount: 1499,
    dueDate: '2025-07-10',
    category: 'Utilities',
    status: 'paid',
    recurringType: 'monthly',
    notes: 'Airtel Fiber',
    createdAt: '2025-06-30',
    updatedAt: '2025-07-01',
  },
  {
    id: '4',
    title: 'DTH Subscription',
    amount: 600,
    dueDate: '2025-07-05',
    category: 'Entertainment',
    status: 'overdue',
    recurringType: 'monthly',
    notes: 'Tata Play',
    createdAt: '2025-06-25',
    updatedAt: '2025-06-25',
  },
  {
    id: '5',
    title: 'Home Insurance',
    amount: 12000,
    dueDate: '2025-08-15',
    category: 'Insurance',
    status: 'unpaid',
    recurringType: 'yearly',
    notes: 'HDFC ERGO',
    createdAt: '2025-06-20',
    updatedAt: '2025-06-20',
  },
];

const BillsListScreen = () => {
  const navigation = useNavigation<BillsListNavigationProp>();
  const [bills, setBills] = useState<Bill[]>(mockBillsData);
  const [filter, setFilter] = useState<'all' | 'paid' | 'unpaid' | 'overdue'>('all');
  
  const filteredBills = bills.filter(bill => {
    if (filter === 'all') return true;
    return bill.status === filter;
  });
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'unpaid': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const renderBillItem = ({ item }: { item: Bill }) => {
    const isOverdue = item.status === 'overdue';
    const isPaid = item.status === 'paid';
    
    return (
      <Card className="mb-4">
        <TouchableOpacity
          onPress={() => navigation.navigate('BillDetails', { billId: item.id })}
        >
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-1">
              <Text className="font-bold text-lg text-gray-800">{item.title}</Text>
              <Text className="text-gray-600">{item.category}</Text>
            </View>
            
            <View className={`px-3 py-1 rounded-full ${getStatusColor(item.status)}`}>
              <Text className={`font-medium text-sm ${getStatusColor(item.status)}`}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </Text>
            </View>
          </View>
          
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-gray-500 text-sm">Due Date</Text>
              <Text className={`${isOverdue ? 'text-red-600 font-medium' : 'text-gray-800'}`}>
                {formatDate(item.dueDate)}
              </Text>
            </View>
            
            <View>
              <Text className="text-gray-500 text-sm text-right">Amount</Text>
              <Text className="text-primary font-bold text-lg">₹{item.amount}</Text>
            </View>
          </View>
          
          {!isPaid && (
            <View className="mt-4 flex-row">
              <Button
                variant="primary"
                size="sm"
                className="flex-1 mr-2"
                onPress={(e) => {
                  e.stopPropagation();
                  // Handle payment
                  const updatedBills = bills.map(bill => 
                    bill.id === item.id ? {...bill, status: 'paid', updatedAt: new Date().toISOString()} : bill
                  );
                  setBills(updatedBills);
                }}
              >
                Pay Now
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onPress={(e) => {
                  e.stopPropagation();
                  navigation.navigate('BillEdit', { billId: item.id });
                }}
              >
                Edit
              </Button>
            </View>
          )}
        </TouchableOpacity>
      </Card>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 p-4">
        <View className="mb-6 flex-row justify-between items-center">
          <Text className="text-2xl font-bold text-gray-800">Bills & Utilities</Text>
          <Button 
            variant="primary" 
            size="sm" 
            onPress={() => navigation.navigate('AddBill')}
          >
            <View className="flex-row items-center">
              <Ionicons name="add" size={18} color="#fff" />
              <Text className="text-white ml-1">Add Bill</Text>
            </View>
          </Button>
        </View>
        
        {/* Filter tabs */}
        <View className="flex-row mb-4">
          <TouchableOpacity 
            className={`mr-2 px-4 py-2 rounded-full ${filter === 'all' ? 'bg-primary' : 'bg-gray-200'}`}
            onPress={() => setFilter('all')}
          >
            <Text className={`font-medium ${filter === 'all' ? 'text-white' : 'text-gray-800'}`}>All</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`mr-2 px-4 py-2 rounded-full ${filter === 'unpaid' ? 'bg-primary' : 'bg-gray-200'}`}
            onPress={() => setFilter('unpaid')}
          >
            <Text className={`font-medium ${filter === 'unpaid' ? 'text-white' : 'text-gray-800'}`}>Unpaid</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`mr-2 px-4 py-2 rounded-full ${filter === 'paid' ? 'bg-primary' : 'bg-gray-200'}`}
            onPress={() => setFilter('paid')}
          >
            <Text className={`font-medium ${filter === 'paid' ? 'text-white' : 'text-gray-800'}`}>Paid</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`px-4 py-2 rounded-full ${filter === 'overdue' ? 'bg-primary' : 'bg-gray-200'}`}
            onPress={() => setFilter('overdue')}
          >
            <Text className={`font-medium ${filter === 'overdue' ? 'text-white' : 'text-gray-800'}`}>Overdue</Text>
          </TouchableOpacity>
        </View>
        
        {/* Bills list */}
        {filteredBills.length > 0 ? (
          <FlatList
            data={filteredBills}
            keyExtractor={(item) => item.id}
            renderItem={renderBillItem}
            showsVerticalScrollIndicator={false}
            contentContainerClassName="pb-4"
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-500 text-lg mb-4">No bills found</Text>
            <Button 
              variant="primary" 
              onPress={() => navigation.navigate('AddBill')}
            >
              Add Your First Bill
            </Button>
          </View>
        )}
        
        {/* Summary footer */}
        <Card className="mt-4">
          <View className="flex-row justify-between items-center">
            <Text className="font-medium text-gray-700">Upcoming dues this month</Text>
            <Text className="font-bold text-lg text-primary">₹{
              bills
                .filter(bill => bill.status !== 'paid' && new Date(bill.dueDate) > new Date())
                .reduce((total, bill) => total + bill.amount, 0)
            }</Text>
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
};

export default BillsListScreen;
