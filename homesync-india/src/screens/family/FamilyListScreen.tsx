import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView, 
  Image 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { FamilyMember } from '../../services/api/types';

type FamilyListNavigationProp = StackNavigationProp<RootStackParamList, 'FamilyList'>;

// Mock data for family members
const mockFamilyMembers: FamilyMember[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    relationship: 'Self',
    dateOfBirth: '1980-05-15',
    bloodGroup: 'B+',
    phone: '+91 9876543210',
    email: 'rajesh@example.com',
    role: 'admin',
    createdAt: '2023-01-01',
    updatedAt: '2023-06-15',
    healthDetails: {
      allergies: ['Peanuts', 'Dust'],
      conditions: ['Hypertension'],
      medications: [
        { name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily', time: 'Morning' }
      ],
    },
    documents: [
      { id: 'd1', name: 'Aadhar Card', title: 'Aadhar Card', path: '/documents/rajesh/aadhar.pdf', fileUrl: '/documents/rajesh/aadhar.pdf', fileType: 'application/pdf', fileSize: 1024000, category: 'Identity', sharedWith: [], uploadDate: '2023-01-15', createdAt: '2023-01-15', updatedAt: '2023-01-15' },
      { id: 'd2', name: 'PAN Card', title: 'PAN Card', path: '/documents/rajesh/pan.pdf', fileUrl: '/documents/rajesh/pan.pdf', fileType: 'application/pdf', fileSize: 512000, category: 'Identity', sharedWith: [], uploadDate: '2023-01-15', createdAt: '2023-01-15', updatedAt: '2023-01-15' },
    ],
    profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: '2',
    name: 'Priya Kumar',
    relationship: 'Spouse',
    dateOfBirth: '1985-08-22',
    bloodGroup: 'O+',
    phone: '+91 9876543211',
    email: 'priya@example.com',
    role: 'admin',
    createdAt: '2023-01-01',
    updatedAt: '2023-06-15',
    healthDetails: {
      allergies: ['Seafood'],
      conditions: [],
      medications: [],
    },
    documents: [
      { id: 'd3', name: 'Aadhar Card', title: 'Aadhar Card', path: '/documents/priya/aadhar.pdf', fileUrl: '/documents/priya/aadhar.pdf', fileType: 'application/pdf', fileSize: 1024000, category: 'Identity', sharedWith: [], uploadDate: '2023-02-20', createdAt: '2023-02-20', updatedAt: '2023-02-20' },
      { id: 'd4', name: 'PAN Card', title: 'PAN Card', path: '/documents/priya/pan.pdf', fileUrl: '/documents/priya/pan.pdf', fileType: 'application/pdf', fileSize: 512000, category: 'Identity', sharedWith: [], uploadDate: '2023-02-20', createdAt: '2023-02-20', updatedAt: '2023-02-20' },
    ],
    profilePic: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: '3',
    name: 'Arjun Kumar',
    relationship: 'Son',
    dateOfBirth: '2010-03-12',
    bloodGroup: 'B+',
    phone: '',
    email: '',
    role: 'member',
    createdAt: '2023-01-01',
    updatedAt: '2023-06-15',
    healthDetails: {
      allergies: ['Milk'],
      conditions: ['Asthma'],
      medications: [
        { name: 'Ventolin Inhaler', dosage: '2 puffs', frequency: 'As needed', time: '' }
      ],
    },
    documents: [
      { id: 'd5', name: 'Birth Certificate', title: 'Birth Certificate', path: '/documents/arjun/birth.pdf', fileUrl: '/documents/arjun/birth.pdf', fileType: 'application/pdf', fileSize: 768000, category: 'Identity', sharedWith: [], uploadDate: '2023-03-10', createdAt: '2023-03-10', updatedAt: '2023-03-10' },
      { id: 'd6', name: 'School ID', title: 'School ID', path: '/documents/arjun/school.pdf', fileUrl: '/documents/arjun/school.pdf', fileType: 'application/pdf', fileSize: 256000, category: 'Education', sharedWith: [], uploadDate: '2023-03-10', createdAt: '2023-03-10', updatedAt: '2023-03-10' },
    ],
    profilePic: 'https://randomuser.me/api/portraits/lego/1.jpg',
  },
  {
    id: '4',
    name: 'Sneha Kumar',
    relationship: 'Daughter',
    dateOfBirth: '2015-11-05',
    bloodGroup: 'O+',
    phone: '',
    email: '',
    role: 'member',
    createdAt: '2023-01-01',
    updatedAt: '2023-06-15',
    healthDetails: {
      allergies: [],
      conditions: [],
      medications: [],
    },
    documents: [
      { id: 'd7', name: 'Birth Certificate', title: 'Birth Certificate', path: '/documents/sneha/birth.pdf', fileUrl: '/documents/sneha/birth.pdf', fileType: 'application/pdf', fileSize: 768000, category: 'Identity', sharedWith: [], uploadDate: '2023-04-05', createdAt: '2023-04-05', updatedAt: '2023-04-05' },
      { id: 'd8', name: 'School ID', title: 'School ID', path: '/documents/sneha/school.pdf', fileUrl: '/documents/sneha/school.pdf', fileType: 'application/pdf', fileSize: 256000, category: 'Education', sharedWith: [], uploadDate: '2023-04-05', createdAt: '2023-04-05', updatedAt: '2023-04-05' },
    ],
    profilePic: 'https://randomuser.me/api/portraits/lego/2.jpg',
  },
  {
    id: '5',
    name: 'Ramesh Kumar',
    relationship: 'Father',
    dateOfBirth: '1955-01-30',
    bloodGroup: 'A+',
    phone: '+91 9876543212',
    email: 'ramesh@example.com',
    role: 'member',
    createdAt: '2023-01-01',
    updatedAt: '2023-06-15',
    healthDetails: {
      allergies: [],
      conditions: ['Diabetes', 'Heart Disease'],
      medications: [
        { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', time: 'Morning & Evening' },
        { name: 'Aspirin', dosage: '75mg', frequency: 'Once daily', time: 'Morning' }
      ],
    },
    documents: [
      { id: 'd9', name: 'Aadhar Card', title: 'Aadhar Card', path: '/documents/ramesh/aadhar.pdf', fileUrl: '/documents/ramesh/aadhar.pdf', fileType: 'application/pdf', fileSize: 1024000, category: 'Identity', sharedWith: [], uploadDate: '2023-05-12', createdAt: '2023-05-12', updatedAt: '2023-05-12' },
      { id: 'd10', name: 'Medical Insurance', title: 'Medical Insurance', path: '/documents/ramesh/insurance.pdf', fileUrl: '/documents/ramesh/insurance.pdf', fileType: 'application/pdf', fileSize: 2048000, category: 'Insurance', sharedWith: [], uploadDate: '2023-05-12', createdAt: '2023-05-12', updatedAt: '2023-05-12' },
    ],
    profilePic: 'https://randomuser.me/api/portraits/men/70.jpg',
  },
];

const FamilyListScreen = () => {
  const navigation = useNavigation<FamilyListNavigationProp>();
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(mockFamilyMembers);
  
  const getAge = (dateOfBirth?: string): number => {
    if (!dateOfBirth) return 0;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };
  
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase();
  };
  
  const handleAddFamilyMember = () => {
    navigation.navigate('AddFamilyMember');
  };
  
  const handleCallMember = (phone: string) => {
    if (!phone) return;
    // In a real app, this would initiate a phone call
    alert(`Calling ${phone}`);
  };
  
  const renderFamilyMember = ({ item }: { item: FamilyMember }) => {
    const age = getAge(item.dateOfBirth);
    
    return (
      <Card className="mb-4">
        <TouchableOpacity
          onPress={() => navigation.navigate('FamilyMemberDetails', { memberId: item.id })}
          className="flex-row"
        >
          <View className="mr-4">
            {item.profilePic ? (
              <Image 
                source={{ uri: item.profilePic }} 
                className="h-16 w-16 rounded-full"
              />
            ) : (
              <View className="h-16 w-16 rounded-full bg-primary items-center justify-center">
                <Text className="text-white text-xl font-bold">{getInitials(item.name)}</Text>
              </View>
            )}
            {item.role === 'admin' && (
              <View className="absolute top-0 right-0 bg-yellow-500 rounded-full h-4 w-4 items-center justify-center">
                <Ionicons name="star" size={8} color="#fff" />
              </View>
            )}
          </View>
          
          <View className="flex-1">
            <View className="flex-row justify-between">
              <View>
                <Text className="font-bold text-lg text-gray-800">{item.name}</Text>
                <Text className="text-gray-600">{item.relationship}</Text>
              </View>
              
              {item.phone && (
                <TouchableOpacity 
                  onPress={() => item.phone && handleCallMember(item.phone)}
                  className="h-10 w-10 rounded-full bg-green-100 items-center justify-center"
                >
                  <Ionicons name="call-outline" size={20} color="#16a34a" />
                </TouchableOpacity>
              )}
            </View>
            
            <View className="flex-row mt-2">
              <View className="bg-gray-200 rounded-full px-3 py-1 mr-2">
                <Text className="text-xs text-gray-700">{age} years</Text>
              </View>
              
              {item.bloodGroup && (
                <View className="bg-red-100 rounded-full px-3 py-1 mr-2">
                  <Text className="text-xs text-red-700">{item.bloodGroup}</Text>
                </View>
              )}
              
              {item.healthDetails && item.healthDetails.conditions && item.healthDetails.conditions.length > 0 && (
                <View className="bg-blue-100 rounded-full px-3 py-1">
                  <Text className="text-xs text-blue-700">
                    {item.healthDetails && item.healthDetails.conditions ? item.healthDetails.conditions.length : 0} Medical {item.healthDetails && item.healthDetails.conditions && item.healthDetails.conditions.length === 1 ? 'Condition' : 'Conditions'}
                  </Text>
                </View>
              )}
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
          <Text className="text-2xl font-bold text-gray-800">Family</Text>
          <Button 
            variant="primary" 
            size="sm" 
            onPress={handleAddFamilyMember}
          >
            <View className="flex-row items-center">
              <Ionicons name="person-add" size={18} color="#fff" />
              <Text className="text-white ml-1">Add Member</Text>
            </View>
          </Button>
        </View>
        
        {/* Family members list */}
        {familyMembers.length > 0 ? (
          <FlatList
            data={familyMembers}
            keyExtractor={(item) => item.id}
            renderItem={renderFamilyMember}
            showsVerticalScrollIndicator={false}
            contentContainerClassName="pb-4"
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-500 text-lg mb-4">No family members added yet</Text>
            <Button 
              variant="primary" 
              onPress={handleAddFamilyMember}
            >
              Add Family Member
            </Button>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default FamilyListScreen;
