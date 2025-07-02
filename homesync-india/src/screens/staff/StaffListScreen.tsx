import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { StaffMember } from '../../services/api/types';

type StaffListNavigationProp = StackNavigationProp<RootStackParamList, 'StaffList'>;

// Mock data for staff members
const mockStaffData: StaffMember[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    phoneNumber: '+91 9876543210',
    role: 'Housekeeper',
    salary: 8000,
    joiningDate: '2024-02-15',
    notes: 'Works Monday to Saturday, 8 AM to 5 PM',
    createdAt: '2024-02-10',
    updatedAt: '2024-02-10',
  },
  {
    id: '2',
    name: 'Anita Sharma',
    phoneNumber: '+91 8765432109',
    role: 'Cook',
    salary: 10000,
    joiningDate: '2024-01-10',
    notes: 'Works twice daily, morning and evening',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05',
  },
  {
    id: '3',
    name: 'Suresh Verma',
    phoneNumber: '+91 7654321098',
    role: 'Driver',
    salary: 12000,
    joiningDate: '2023-12-01',
    notes: 'Full-time, on call as needed',
    createdAt: '2023-11-25',
    updatedAt: '2023-11-25',
  },
];

const StaffListScreen = () => {
  const navigation = useNavigation<StaffListNavigationProp>();
  const [staffList, setStaffList] = useState<StaffMember[]>(mockStaffData);

  const renderStaffItem = ({ item }: { item: StaffMember }) => {
    return (
      <Card className="mb-4">
        <TouchableOpacity
          onPress={() => navigation.navigate('StaffDetails', { staffId: item.id })}
          className="flex-row items-center"
        >
          <View className="h-16 w-16 rounded-full bg-gray-300 items-center justify-center mr-4">
            <Text className="font-bold text-xl text-gray-600">
              {item.name.charAt(0).toUpperCase()}
            </Text>
          </View>

          <View className="flex-1">
            <Text className="font-bold text-lg text-gray-800">{item.name}</Text>
            <Text className="text-gray-600">{item.role}</Text>
            <Text className="text-gray-500">{item.phoneNumber}</Text>
          </View>

          <View className="items-end">
            <Text className="font-medium text-primary">₹{item.salary}/mo</Text>
            <View className="flex-row items-center mt-1">
              <TouchableOpacity 
                className="mr-4 p-2" 
                onPress={() => {
                  // Phone call functionality would go here
                  console.log(`Calling ${item.phoneNumber}`);
                }}
              >
                <Ionicons name="call-outline" size={20} color="#6366f1" />
              </TouchableOpacity>
              <TouchableOpacity 
                className="p-2" 
                onPress={() => {
                  // Message functionality would go here
                  console.log(`Messaging ${item.phoneNumber}`);
                }}
              >
                <Ionicons name="chatbubble-outline" size={20} color="#6366f1" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Card>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 p-4">
        <View className="mb-6 flex-row justify-between items-center">
          <Text className="text-2xl font-bold text-gray-800">Staff Management</Text>
          <Button 
            variant="primary" 
            size="sm" 
            onPress={() => navigation.navigate('AddStaff')}
          >
            <View className="flex-row items-center">
              <Ionicons name="add" size={18} color="#fff" />
              <Text className="text-white ml-1">Add Staff</Text>
            </View>
          </Button>
        </View>
        
        {staffList.length > 0 ? (
          <FlatList
            data={staffList}
            keyExtractor={(item) => item.id}
            renderItem={renderStaffItem}
            showsVerticalScrollIndicator={false}
            contentContainerClassName="pb-4"
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-500 text-lg mb-4">No staff members added yet</Text>
            <Button 
              variant="primary" 
              onPress={() => navigation.navigate('AddStaff')}
            >
              Add Your First Staff Member
            </Button>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default StaffListScreen;
