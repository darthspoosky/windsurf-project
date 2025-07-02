import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { Bill } from '../../services/api/types';

type BillDetailRouteProp = RouteProp<RootStackParamList, 'BillDetails'>;
type BillDetailNavigationProp = StackNavigationProp<RootStackParamList, 'BillDetails'>;

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

// Mock payment history data
const mockPaymentHistory: {[key: string]: Array<{date: string, amount: number, method: string, reference: string}>} = {
  '1': [
    { date: '2025-06-15', amount: 1320, method: 'UPI', reference: 'UPI/123456789' },
    { date: '2025-05-14', amount: 1450, method: 'Credit Card', reference: 'CCPAY/987654321' },
    { date: '2025-04-16', amount: 1280, method: 'Net Banking', reference: 'NEFT/567891234' },
  ],
  '3': [
    { date: '2025-07-01', amount: 1499, method: 'Auto Debit', reference: 'AUTOPAY/123789456' },
    { date: '2025-06-02', amount: 1499, method: 'UPI', reference: 'UPI/456789123' },
    { date: '2025-05-03', amount: 1499, method: 'UPI', reference: 'UPI/789123456' },
  ],
};

const BillDetailScreen = () => {
  const route = useRoute<BillDetailRouteProp>();
  const navigation = useNavigation<BillDetailNavigationProp>();
  const { billId } = route.params;
  
  const [bill, setBill] = useState<Bill | null>(null);
  const [paymentHistory, setPaymentHistory] = useState<Array<{date: string, amount: number, method: string, reference: string}>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, we would fetch bill details from an API
    // For now, we'll use mock data
    const billData = mockBillsData.find(b => b.id === billId) || null;
    const billPayments = mockPaymentHistory[billId] || [];
    
    setBill(billData);
    setPaymentHistory(billPayments);
    setLoading(false);
    
    // Set up the navigation options with the bill title
    if (billData) {
      navigation.setOptions({
        headerTitle: billData.title,
      });
    }
  }, [billId, navigation]);

  const handlePayBill = () => {
    // In a real app, we would handle the payment through a payment gateway
    // For now, we'll just show an alert
    if (!bill) return;
    
    Alert.alert(
      'Confirm Payment',
      `Pay ₹${bill.amount} for ${bill.title}?`,
      [
        { 
          text: 'Cancel', 
          style: 'cancel' 
        },
        { 
          text: 'Pay Now',
          onPress: () => {
            if (bill) {
              // Update bill status
              setBill({
                ...bill,
                status: 'paid',
                updatedAt: new Date().toISOString()
              });
              
              // Add to payment history
              const newPayment = {
                date: new Date().toISOString().split('T')[0],
                amount: bill.amount,
                method: 'UPI',
                reference: `UPI/${Math.floor(Math.random() * 1000000000)}`
              };
              
              setPaymentHistory([newPayment, ...paymentHistory]);
              
              Alert.alert(
                'Payment Successful',
                `Your payment of ₹${bill.amount} for ${bill.title} has been processed successfully.`
              );
            }
          }
        }
      ]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'unpaid': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRecurringLabel = (recurringType: string) => {
    switch (recurringType) {
      case 'monthly': return 'Monthly';
      case 'yearly': return 'Yearly';
      case 'quarterly': return 'Quarterly';
      case 'weekly': return 'Weekly';
      default: return 'One-time';
    }
  };
  
  if (loading || !bill) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text>Loading...</Text>
      </View>
    );
  }

  const isPaid = bill.status === 'paid';
  const isOverdue = bill.status === 'overdue';

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView contentContainerClassName="pb-8">
        {/* Bill Header */}
        <View className={`p-6 ${isPaid ? 'bg-green-500' : isOverdue ? 'bg-red-500' : 'bg-primary'}`}>
          <Text className="text-white text-2xl font-bold">{bill.title}</Text>
          <Text className="text-white opacity-90">{bill.category}</Text>
          
          <View className="flex-row justify-between items-center mt-4">
            <View>
              <Text className="text-white opacity-70">Amount</Text>
              <Text className="text-white text-2xl font-bold">₹{bill.amount}</Text>
            </View>
            
            <View className={`px-4 py-2 rounded-full bg-white`}>
              <Text className={`font-bold ${
                isPaid ? 'text-green-500' : isOverdue ? 'text-red-500' : 'text-primary'
              }`}>
                {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
              </Text>
            </View>
          </View>
        </View>
        
        {/* Bill Details */}
        <View className="px-4 py-6">
          <Card className="mb-6">
            <View className="mb-4 flex-row justify-between">
              <View>
                <Text className="text-gray-500 text-sm">Due Date</Text>
                <Text className={`text-lg ${isOverdue ? 'text-red-600 font-medium' : 'text-gray-800'}`}>
                  {formatDate(bill.dueDate)}
                </Text>
              </View>
              
              <View>
                <Text className="text-gray-500 text-sm">Billing Cycle</Text>
                <Text className="text-gray-800 text-lg">{bill?.recurringType ? getRecurringLabel(bill.recurringType) : 'Not set'}</Text>
              </View>
            </View>
            
            {bill.notes && (
              <View>
                <Text className="text-gray-500 text-sm">Notes</Text>
                <Text className="text-gray-800">{bill.notes}</Text>
              </View>
            )}
          </Card>
          
          {/* Action Buttons */}
          {!isPaid && (
            <Card className="mb-6">
              <View className="flex-row">
                <Button
                  variant="primary"
                  className="flex-1 mr-2"
                  onPress={handlePayBill}
                >
                  <View className="flex-row items-center">
                    <Ionicons name="wallet-outline" size={18} color="#fff" />
                    <Text className="text-white ml-1">Pay Now</Text>
                  </View>
                </Button>
                
                <Button
                  variant="outline"
                  className="flex-1"
                  onPress={() => navigation.navigate('BillEdit', { billId: bill?.id || '' })}
                >
                  <View className="flex-row items-center">
                    <Ionicons name="create-outline" size={18} color="#6366f1" />
                    <Text className="text-primary ml-1">Edit</Text>
                  </View>
                </Button>
              </View>
              
              <TouchableOpacity 
                className="mt-3 flex-row items-center justify-center"
                onPress={() => {
                  // Mark as paid without payment
                  if (bill) {
                    setBill({
                      ...bill,
                      status: 'paid',
                      updatedAt: new Date().toISOString()
                    });
                  }
                }}
              >
                <Text className="text-primary font-medium">Mark as paid (without payment)</Text>
              </TouchableOpacity>
            </Card>
          )}
          
          {/* Payment History */}
          <View className="mb-6">
            <Text className="text-xl font-bold text-gray-800 mb-4">Payment History</Text>
            
            {paymentHistory.length > 0 ? (
              paymentHistory.map((payment, index) => (
                <Card key={index} className="mb-3">
                  <View className="flex-row justify-between items-center">
                    <View>
                      <Text className="text-gray-600 mb-1">{payment.date ? formatDate(payment.date) : 'No date'}</Text>
                      <Text className="text-gray-500 text-sm">{payment.method} • {payment.reference}</Text>
                    </View>
                    
                    <Text className="text-green-600 font-bold">₹{payment.amount}</Text>
                  </View>
                </Card>
              ))
            ) : (
              <Text className="text-gray-500">No payment records found</Text>
            )}
          </View>
          
          {/* Reminder Settings */}
          <View>
            <Text className="text-xl font-bold text-gray-800 mb-4">Reminder Settings</Text>
            
            <Card>
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-gray-800">Enable Reminders</Text>
                <View className="h-6 w-10 bg-primary rounded-full flex items-center justify-end px-1">
                  <View className="h-4 w-4 rounded-full bg-white" />
                </View>
              </View>
              
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-gray-800">Remind 3 days before due</Text>
                <View className="h-6 w-10 bg-primary rounded-full flex items-center justify-end px-1">
                  <View className="h-4 w-4 rounded-full bg-white" />
                </View>
              </View>
              
              <View className="flex-row justify-between items-center">
                <Text className="text-gray-800">Remind on due date</Text>
                <View className="h-6 w-10 bg-primary rounded-full flex items-center justify-end px-1">
                  <View className="h-4 w-4 rounded-full bg-white" />
                </View>
              </View>
            </Card>
            
            <Button 
              variant="outline" 
              size="md" 
              className="mt-4"
              onPress={() => {
                Alert.alert('Delete Bill', 
                  'Are you sure you want to delete this bill?', 
                  [
                    { text: 'Cancel', style: 'cancel' },
                    { 
                      text: 'Delete', 
                      style: 'destructive',
                      onPress: () => {
                        navigation.goBack();
                      }
                    }
                  ]
                );
              }}
            >
              <View className="flex-row items-center">
                <Ionicons name="trash-outline" size={18} color="rgb(239, 68, 68)" />
                <Text className="text-red-500 ml-1">Delete Bill</Text>
              </View>
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BillDetailScreen;
