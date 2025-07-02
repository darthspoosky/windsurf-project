import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { RootStackParamList } from '../../navigation/AppNavigator';

// Types
type HealthDashboardNavigationProp = StackNavigationProp<RootStackParamList, 'HealthDashboard'>;

type HealthFamilyMember = {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  lastCheckup: string;
  upcomingAppointment: string | null;
  chronicConditions: string[];
  allergies: string[];
  medicationReminders: number;
};

type Appointment = {
  id: string;
  familyMemberId: string;
  memberName: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  reason: string;
};

type MedicationReminder = {
  id: string;
  familyMemberId: string;
  memberName: string;
  medication: string;
  dosage: string;
  frequency: string;
  timing: string;
  refillDate: string;
};

// Mock family member data
const familyMembers: HealthFamilyMember[] = [
  {
    id: '1',
    name: 'Raj Sharma',
    age: 42,
    gender: 'Male',
    bloodGroup: 'O+',
    lastCheckup: '2025-05-15',
    upcomingAppointment: '2025-07-20',
    chronicConditions: ['Hypertension', 'Type 2 Diabetes'],
    allergies: ['Penicillin'],
    medicationReminders: 2
  },
  {
    id: '2',
    name: 'Priya Sharma',
    age: 38,
    gender: 'Female',
    bloodGroup: 'B+',
    lastCheckup: '2025-06-05',
    upcomingAppointment: null,
    chronicConditions: [],
    allergies: ['Dust', 'Pollen'],
    medicationReminders: 0
  },
  {
    id: '3',
    name: 'Arjun Sharma',
    age: 15,
    gender: 'Male',
    bloodGroup: 'B+',
    lastCheckup: '2025-06-10',
    upcomingAppointment: '2025-08-01',
    chronicConditions: ['Asthma'],
    allergies: ['Peanuts'],
    medicationReminders: 1
  },
  {
    id: '4',
    name: 'Riya Sharma',
    age: 12,
    gender: 'Female',
    bloodGroup: 'O+',
    lastCheckup: '2025-06-10',
    upcomingAppointment: null,
    chronicConditions: [],
    allergies: [],
    medicationReminders: 0
  }
];

// Mock upcoming appointments
const upcomingAppointments: Appointment[] = [
  {
    id: '1',
    familyMemberId: '1',
    memberName: 'Raj Sharma',
    doctor: 'Dr. Anil Gupta',
    specialty: 'Endocrinologist',
    date: '2025-07-20',
    time: '10:30 AM',
    location: 'Apollo Hospital, Delhi',
    reason: 'Diabetes Follow-up'
  },
  {
    id: '2',
    familyMemberId: '3',
    memberName: 'Arjun Sharma',
    doctor: 'Dr. Meera Patel',
    specialty: 'Pulmonologist',
    date: '2025-08-01',
    time: '3:15 PM',
    location: 'Max Healthcare, Gurgaon',
    reason: 'Asthma Review'
  }
];

// Mock medication reminders
const medicationReminders: MedicationReminder[] = [
  {
    id: '1',
    familyMemberId: '1',
    memberName: 'Raj Sharma',
    medication: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    timing: 'After meals',
    refillDate: '2025-07-25'
  },
  {
    id: '2',
    familyMemberId: '1',
    memberName: 'Raj Sharma',
    medication: 'Amlodipine',
    dosage: '5mg',
    frequency: 'Once daily',
    timing: 'Morning',
    refillDate: '2025-08-10'
  },
  {
    id: '3',
    familyMemberId: '3',
    memberName: 'Arjun Sharma',
    medication: 'Ventolin Inhaler',
    dosage: '2 puffs',
    frequency: 'As needed',
    timing: 'During asthma attacks',
    refillDate: '2025-09-01'
  }
];

// Define the health metric type
type HealthMetric = {
  date: string;
  bloodPressure: string;
  bloodSugar: string;
  weight: string;
  notes: string;
};

// Mock health metrics for family members
const healthMetrics: Record<string, HealthMetric[]> = {
  '1': [
    { date: '2025-06-30', bloodPressure: '130/85', bloodSugar: '140', weight: '78', notes: 'Post dinner reading' },
    { date: '2025-06-15', bloodPressure: '135/90', bloodSugar: '145', weight: '79', notes: 'Feeling stressed' },
    { date: '2025-06-01', bloodPressure: '128/82', bloodSugar: '135', weight: '78', notes: 'Normal day' }
  ],
  '2': [
    { date: '2025-06-28', bloodPressure: '120/75', bloodSugar: '', weight: '62', notes: 'After yoga' },
    { date: '2025-06-10', bloodPressure: '118/78', bloodSugar: '', weight: '63', notes: '' }
  ],
  '3': [
    { date: '2025-06-25', bloodPressure: '110/70', bloodSugar: '', weight: '58', notes: 'After sports practice' },
    { date: '2025-06-10', bloodPressure: '112/72', bloodSugar: '', weight: '57', notes: 'Morning reading' }
  ]
};

const HealthDashboardScreen = () => {
  const navigation = useNavigation<HealthDashboardNavigationProp>();
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

  // Format date to Indian format
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not scheduled';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Get health status indicator color based on conditions
  const getHealthStatusColor = (member: HealthFamilyMember) => {
    if (member.chronicConditions.length > 0) return 'bg-amber-500'; // Amber for chronic conditions
    if (member.medicationReminders > 0) return 'bg-blue-500'; // Blue for medication reminders
    return 'bg-green-500'; // Green for healthy
  };

  // Get upcoming appointment for a member
  const getMemberAppointments = (memberId: string): Appointment[] => {
    return upcomingAppointments.filter(app => app.familyMemberId === memberId);
  };

  // Get medication reminders for a member
  const getMemberMedications = (memberId: string): MedicationReminder[] => {
    return medicationReminders.filter(med => med.familyMemberId === memberId);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView>
        <View className="p-4">
          <View className="mb-6">
            <Text className="text-2xl font-bold text-gray-800 mb-1">Family Health Dashboard</Text>
            <Text className="text-gray-500">Monitor health metrics and appointments</Text>
          </View>

          {/* Family Member Health Cards */}
          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold text-gray-800">Family Members</Text>
              <TouchableOpacity 
                className="flex-row items-center" 
                onPress={() => navigation.navigate('AddFamilyMember')}
              >
                <Ionicons name="person-add-outline" size={18} color="#6366f1" />
                <Text className="ml-1 text-primary font-medium">Add</Text>
              </TouchableOpacity>
            </View>

            {familyMembers.map((member) => (
              <TouchableOpacity 
                key={member.id}
                onPress={() => navigation.navigate('FamilyMemberDetails', { memberId: member.id })}
              >
                <Card className="mb-3">
                  <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                      <View className={`h-10 w-10 rounded-full ${getHealthStatusColor(member)} items-center justify-center mr-3`}>
                        <Text className="text-white font-bold">{member.name.charAt(0)}</Text>
                      </View>
                      <View>
                        <Text className="text-lg font-semibold text-gray-800">{member.name}</Text>
                        <Text className="text-gray-500">
                          {member.age} years • {member.gender} • {member.bloodGroup}
                        </Text>
                      </View>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                  </View>

                  {member.chronicConditions.length > 0 && (
                    <View className="mt-2 flex-row flex-wrap">
                      {member.chronicConditions.map((condition, idx) => (
                        <View key={idx} className="bg-amber-100 px-2 py-1 rounded-full mr-2 mb-1">
                          <Text className="text-amber-800 text-xs">{condition}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                  
                  {member.upcomingAppointment && (
                    <View className="mt-2 flex-row items-center">
                      <Ionicons name="calendar-outline" size={16} color="#6366f1" />
                      <Text className="ml-1 text-sm text-primary">
                        Appointment on {formatDate(member.upcomingAppointment)}
                      </Text>
                    </View>
                  )}
                </Card>
              </TouchableOpacity>
            ))}
          </View>

          {/* Upcoming Appointments */}
          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold text-gray-800">Upcoming Appointments</Text>
              <TouchableOpacity 
                className="flex-row items-center" 
                onPress={() => navigation.navigate('AddEvent')}
              >
                <Ionicons name="add-circle-outline" size={18} color="#6366f1" />
                <Text className="ml-1 text-primary font-medium">Schedule</Text>
              </TouchableOpacity>
            </View>

            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appointment) => (
                <Card key={appointment.id} className="mb-3">
                  <View className="flex-row justify-between items-center">
                    <View>
                      <View className="flex-row items-center mb-1">
                        <Text className="text-lg font-semibold text-gray-800">{appointment.memberName}</Text>
                        <Text className="text-primary text-sm ml-2">• {appointment.specialty}</Text>
                      </View>
                      <Text className="text-gray-700">{appointment.doctor}</Text>
                      <Text className="text-gray-500 text-sm">{formatDate(appointment.date)} at {appointment.time}</Text>
                      <Text className="text-gray-500 text-sm">{appointment.location}</Text>
                    </View>
                    
                    <TouchableOpacity className="p-2">
                      <Ionicons name="ellipsis-vertical" size={20} color="#6b7280" />
                    </TouchableOpacity>
                  </View>

                  <View className="mt-3 flex-row">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1 mr-2"
                    >
                      <View className="flex-row items-center">
                        <Ionicons name="create-outline" size={16} color="#6366f1" />
                        <Text className="ml-1 text-primary">Edit</Text>
                      </View>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1"
                    >
                      <View className="flex-row items-center">
                        <Ionicons name="calendar-clear-outline" size={16} color="#ef4444" />
                        <Text className="ml-1 text-red-500">Cancel</Text>
                      </View>
                    </Button>
                  </View>
                </Card>
              ))
            ) : (
              <Card>
                <Text className="text-gray-500 text-center">No upcoming appointments</Text>
              </Card>
            )}
          </View>

          {/* Medication Reminders */}
          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold text-gray-800">Medication Reminders</Text>
              <TouchableOpacity className="flex-row items-center">
                <Ionicons name="add-circle-outline" size={18} color="#6366f1" />
                <Text className="ml-1 text-primary font-medium">Add</Text>
              </TouchableOpacity>
            </View>

            {medicationReminders.length > 0 ? (
              medicationReminders.map((medication) => (
                <Card key={medication.id} className="mb-3">
                  <View className="flex-row justify-between">
                    <View>
                      <View className="flex-row items-center mb-1">
                        <Text className="text-lg font-semibold text-gray-800">{medication.medication}</Text>
                        <Text className="text-gray-500 text-sm ml-2">• {medication.dosage}</Text>
                      </View>
                      <Text className="text-gray-700">{medication.memberName}</Text>
                      <Text className="text-gray-500 text-sm">{medication.frequency}, {medication.timing}</Text>
                      <View className="flex-row items-center mt-1">
                        <Ionicons name="reload-outline" size={14} color="#6366f1" />
                        <Text className="text-primary text-xs ml-1">Refill by {formatDate(medication.refillDate)}</Text>
                      </View>
                    </View>
                    
                    <View className="flex-row items-center">
                      <View className="h-6 w-12 bg-gray-200 rounded-full flex items-center px-1">
                        <View className="h-4 w-4 rounded-full bg-primary" />
                      </View>
                    </View>
                  </View>
                </Card>
              ))
            ) : (
              <Card>
                <Text className="text-gray-500 text-center">No medication reminders</Text>
              </Card>
            )}
          </View>

          {/* Health Metrics Summary */}
          <View>
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold text-gray-800">Recent Health Metrics</Text>
              <TouchableOpacity className="flex-row items-center">
                <Ionicons name="analytics-outline" size={18} color="#6366f1" />
                <Text className="ml-1 text-primary font-medium">All Metrics</Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row mb-4">
              {familyMembers.map(member => (
                <TouchableOpacity
                  key={member.id}
                  className={`py-2 px-3 rounded-full mr-2 ${selectedMemberId === member.id ? 'bg-primary' : 'bg-gray-200'}`}
                  onPress={() => setSelectedMemberId(member.id)}
                >
                  <Text 
                    className={`${selectedMemberId === member.id ? 'text-white' : 'text-gray-700'} font-medium`}
                  >
                    {member.name.split(' ')[0]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Card>
              {selectedMemberId && healthMetrics[selectedMemberId] ? (
                <View>
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-gray-500">Date</Text>
                    <View className="flex-row">
                      <Text className="text-gray-500 w-20 text-center">BP</Text>
                      <Text className="text-gray-500 w-20 text-center">Sugar</Text>
                      <Text className="text-gray-500 w-20 text-center">Weight</Text>
                    </View>
                  </View>
                  {healthMetrics[selectedMemberId].map((metric, idx) => (
                    <View key={idx} className="flex-row justify-between py-2 border-t border-gray-100">
                      <Text className="text-gray-800">{formatDate(metric.date)}</Text>
                      <View className="flex-row">
                        <Text className="text-gray-800 w-20 text-center">{metric.bloodPressure || '-'}</Text>
                        <Text className="text-gray-800 w-20 text-center">{metric.bloodSugar || '-'}</Text>
                        <Text className="text-gray-800 w-20 text-center">{metric.weight} kg</Text>
                      </View>
                    </View>
                  ))}
                  
                  <Button className="mt-3">
                    <Text className="text-white font-medium">Add New Reading</Text>
                  </Button>
                </View>
              ) : (
                <Text className="text-gray-500 text-center">Select a family member to view health metrics</Text>
              )}
            </Card>

            <Button 
              variant="outline" 
              className="mt-5 mb-3"
              onPress={() => navigation.navigate('AddMedicalRecord', { memberId: selectedMemberId || familyMembers[0].id })}
            >
              <View className="flex-row items-center">
                <Ionicons name="document-text-outline" size={18} color="#6366f1" />
                <Text className="ml-1 text-primary">Add Medical Record</Text>
              </View>
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HealthDashboardScreen;
