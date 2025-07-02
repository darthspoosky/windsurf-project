import React from 'react';
import { View, Text } from 'react-native';

// Mock data for staff attendance
const mockStaffData = {
  week: {
    totalHours: 87,
    attendance: [
      { name: 'Ramesh', role: 'Driver', hours: 42, attendance: 100, efficiency: 95 },
      { name: 'Lakshmi', role: 'Cook', hours: 28, attendance: 100, efficiency: 100 },
      { name: 'Suresh', role: 'Gardener', hours: 17, attendance: 85, efficiency: 90 },
    ],
  },
  month: {
    totalHours: 380,
    attendance: [
      { name: 'Ramesh', role: 'Driver', hours: 175, attendance: 95, efficiency: 92 },
      { name: 'Lakshmi', role: 'Cook', hours: 120, attendance: 100, efficiency: 98 },
      { name: 'Suresh', role: 'Gardener', hours: 85, attendance: 90, efficiency: 88 },
    ],
  },
  year: {
    totalHours: 4560,
    attendance: [
      { name: 'Ramesh', role: 'Driver', hours: 2100, attendance: 93, efficiency: 90 },
      { name: 'Lakshmi', role: 'Cook', hours: 1440, attendance: 98, efficiency: 95 },
      { name: 'Suresh', role: 'Gardener', hours: 1020, attendance: 92, efficiency: 89 },
    ],
  },
};

interface StaffAttendanceProps {
  timeframe: 'week' | 'month' | 'year';
}

export const StaffAttendance: React.FC<StaffAttendanceProps> = ({ timeframe }) => {
  const data = mockStaffData[timeframe];
  
  const getEfficiencyColor = (efficiency: number): string => {
    if (efficiency >= 95) return 'bg-green-500';
    if (efficiency >= 85) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  const getAttendanceColor = (attendance: number): string => {
    if (attendance >= 95) return 'bg-green-500';
    if (attendance >= 85) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  return (
    <View>
      <View className="p-3 bg-gray-50 rounded-lg mb-4">
        <Text className="text-gray-500 text-xs">Total Staff Hours</Text>
        <Text className="text-gray-800 font-bold text-xl">{data.totalHours} hours</Text>
      </View>
      
      {data.attendance.map((staff, index) => (
        <View key={index} className="mb-4 last:mb-0">
          <View className="flex-row justify-between items-center mb-2">
            <View className="flex-row items-center">
              <View className="h-8 w-8 rounded-full bg-primary items-center justify-center mr-2">
                <Text className="text-white font-bold">{staff.name.charAt(0)}</Text>
              </View>
              <View>
                <Text className="text-gray-800 font-medium">{staff.name}</Text>
                <Text className="text-gray-500 text-xs">{staff.role}</Text>
              </View>
            </View>
            <Text className="text-gray-700 font-bold">{staff.hours} hrs</Text>
          </View>
          
          <View className="mb-2">
            <View className="flex-row justify-between mb-1">
              <Text className="text-gray-500 text-xs">Attendance</Text>
              <Text className="text-gray-700 text-xs font-medium">{staff.attendance}%</Text>
            </View>
            
            <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <View 
                className={`h-full ${getAttendanceColor(staff.attendance)} rounded-full`} 
                style={{ width: `${staff.attendance}%` }} 
              />
            </View>
          </View>
          
          <View>
            <View className="flex-row justify-between mb-1">
              <Text className="text-gray-500 text-xs">Efficiency</Text>
              <Text className="text-gray-700 text-xs font-medium">{staff.efficiency}%</Text>
            </View>
            
            <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <View 
                className={`h-full ${getEfficiencyColor(staff.efficiency)} rounded-full`} 
                style={{ width: `${staff.efficiency}%` }} 
              />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default StaffAttendance;
