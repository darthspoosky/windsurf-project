import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { StaffMember, Attendance } from '../../services/api/types';

type StaffDetailRouteProp = RouteProp<RootStackParamList, 'StaffDetails'>;
type StaffDetailNavigationProp = StackNavigationProp<RootStackParamList, 'StaffDetails'>;

// Mock data for staff members (same as in StaffListScreen)
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

// Mock attendance data
const mockAttendanceData: {[key: string]: Attendance[]} = {
  '1': [
    { id: 'a1', staffId: '1', date: '2025-07-01', status: 'present', notes: '' },
    { id: 'a2', staffId: '1', date: '2025-06-30', status: 'present', notes: '' },
    { id: 'a3', staffId: '1', date: '2025-06-29', status: 'absent', notes: 'Sick leave' },
    { id: 'a4', staffId: '1', date: '2025-06-28', status: 'present', notes: '' },
    { id: 'a5', staffId: '1', date: '2025-06-27', status: 'present', notes: '' },
  ],
  '2': [
    { id: 'b1', staffId: '2', date: '2025-07-01', status: 'present', notes: '' },
    { id: 'b2', staffId: '2', date: '2025-06-30', status: 'present', notes: '' },
    { id: 'b3', staffId: '2', date: '2025-06-29', status: 'present', notes: '' },
    { id: 'b4', staffId: '2', date: '2025-06-28', status: 'half-day', notes: 'Left early for doctor appointment' },
    { id: 'b5', staffId: '2', date: '2025-06-27', status: 'present', notes: '' },
  ],
  '3': [
    { id: 'c1', staffId: '3', date: '2025-07-01', status: 'leave', notes: 'Personal leave' },
    { id: 'c2', staffId: '3', date: '2025-06-30', status: 'present', notes: '' },
    { id: 'c3', staffId: '3', date: '2025-06-29', status: 'present', notes: '' },
    { id: 'c4', staffId: '3', date: '2025-06-28', status: 'present', notes: '' },
    { id: 'c5', staffId: '3', date: '2025-06-27', status: 'present', notes: '' },
  ],
};

const StaffDetailScreen = () => {
  const route = useRoute<StaffDetailRouteProp>();
  const navigation = useNavigation<StaffDetailNavigationProp>();
  const { staffId } = route.params;
  
  const [staff, setStaff] = useState<StaffMember | null>(null);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, we would fetch staff details from an API
    // For now, we'll use mock data
    const staffMember = mockStaffData.find(s => s.id === staffId) || null;
    const staffAttendance = mockAttendanceData[staffId] || [];
    
    setStaff(staffMember);
    setAttendance(staffAttendance);
    setLoading(false);
    
    // Set up the navigation options with the staff member's name
    if (staffMember) {
      navigation.setOptions({
        headerTitle: staffMember.name,
      });
    }
  }, [staffId, navigation]);

  const handleMarkAttendance = (status: 'present' | 'absent' | 'half-day' | 'leave') => {
    // In a real app, we would update the attendance via an API
    // For now, we'll just show an alert
    Alert.alert(
      'Attendance Marked',
      `${staff?.name} marked as ${status} for today.`,
      [{ text: 'OK' }]
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
      case 'present': return 'bg-green-100 text-green-800';
      case 'absent': return 'bg-red-100 text-red-800';
      case 'half-day': return 'bg-yellow-100 text-yellow-800';
      case 'leave': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  if (loading || !staff) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView contentContainerClassName="pb-8">
        {/* Staff Profile Header */}
        <View className="bg-primary p-6 items-center">
          <View className="h-24 w-24 rounded-full bg-white items-center justify-center mb-4">
            <Text className="font-bold text-3xl text-primary">
              {staff.name.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text className="text-white text-xl font-bold">{staff.name}</Text>
          <Text className="text-white opacity-90">{staff.role}</Text>
          
          <View className="flex-row mt-4">
            <TouchableOpacity 
              className="bg-white rounded-full p-3 mx-2"
              onPress={() => {
                // Phone call functionality would go here
                console.log(`Calling ${staff.phoneNumber}`);
              }}
            >
              <Ionicons name="call-outline" size={20} color="#6366f1" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="bg-white rounded-full p-3 mx-2"
              onPress={() => {
                // Message functionality would go here
                console.log(`Messaging ${staff.phoneNumber}`);
              }}
            >
              <Ionicons name="chatbubble-outline" size={20} color="#6366f1" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="bg-white rounded-full p-3 mx-2"
              onPress={() => navigation.navigate('EditStaff', { staffId: staff.id })}
            >
              <Ionicons name="create-outline" size={20} color="#6366f1" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Staff Details */}
        <View className="px-4 py-6">
          <Card className="mb-6">
            <View className="mb-4">
              <Text className="text-gray-500 text-sm">Phone Number</Text>
              <Text className="text-gray-800 text-lg">{staff.phoneNumber}</Text>
            </View>
            
            <View className="mb-4">
              <Text className="text-gray-500 text-sm">Monthly Salary</Text>
              <Text className="text-gray-800 text-lg">₹{staff.salary}</Text>
            </View>
            
            <View className="mb-4">
              <Text className="text-gray-500 text-sm">Joining Date</Text>
              <Text className="text-gray-800 text-lg">{formatDate(staff.joiningDate)}</Text>
            </View>
            
            {staff.notes && (
              <View>
                <Text className="text-gray-500 text-sm">Notes</Text>
                <Text className="text-gray-800">{staff.notes}</Text>
              </View>
            )}
          </Card>
          
          {/* Today's Attendance */}
          <View className="mb-6">
            <Text className="text-xl font-bold text-gray-800 mb-4">Today's Attendance</Text>
            <Card>
              <Text className="text-gray-600 mb-3">Mark attendance for {formatDate(new Date().toISOString())}</Text>
              
              <View className="flex-row flex-wrap">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mr-2 mb-2" 
                  onPress={() => handleMarkAttendance('present')}
                >
                  Present
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mr-2 mb-2" 
                  onPress={() => handleMarkAttendance('absent')}
                >
                  Absent
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mr-2 mb-2" 
                  onPress={() => handleMarkAttendance('half-day')}
                >
                  Half Day
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mb-2" 
                  onPress={() => handleMarkAttendance('leave')}
                >
                  Leave
                </Button>
              </View>
            </Card>
          </View>
          
          {/* Attendance History */}
          <View>
            <Text className="text-xl font-bold text-gray-800 mb-4">Attendance History</Text>
            
            {attendance.length > 0 ? (
              attendance.map((record) => (
                <Card key={record.id} className="mb-3">
                  <View className="flex-row justify-between items-center">
                    <View>
                      <Text className="text-gray-800 font-medium">{formatDate(record.date)}</Text>
                      {record.notes && (
                        <Text className="text-gray-500 text-sm">{record.notes}</Text>
                      )}
                    </View>
                    
                    <View className={`px-3 py-1 rounded-full ${getStatusColor(record.status)}`}>
                      <Text className={`font-medium text-sm ${getStatusColor(record.status)}`}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </Text>
                    </View>
                  </View>
                </Card>
              ))
            ) : (
              <Text className="text-gray-500">No attendance records found</Text>
            )}
            
            <Button 
              variant="outline" 
              size="md" 
              className="mt-3"
              onPress={() => navigation.navigate('StaffAttendance', { staffId: staff.id })}
            >
              View Full Attendance History
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StaffDetailScreen;
