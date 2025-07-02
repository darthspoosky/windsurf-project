import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Image, 
  Alert 
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { FamilyMember } from '../../services/api/types';

type FamilyMemberDetailsRouteProp = RouteProp<RootStackParamList, 'FamilyMemberDetails'>;
type FamilyMemberDetailsNavigationProp = StackNavigationProp<RootStackParamList, 'FamilyMemberDetails'>;

// Mock data for family members (same as in FamilyListScreen)
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
    healthDetails: {
      allergies: ['Peanuts', 'Dust'],
      conditions: ['Hypertension'],
      medications: [
        { name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily', time: 'Morning' }
      ],
    },
    documents: [
      { id: 'd1', name: 'Aadhar Card', path: '/documents/rajesh/aadhar.pdf' },
      { id: 'd2', name: 'PAN Card', path: '/documents/rajesh/pan.pdf' },
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
    healthDetails: {
      allergies: ['Seafood'],
      conditions: [],
      medications: [],
    },
    documents: [
      { id: 'd3', name: 'Aadhar Card', path: '/documents/priya/aadhar.pdf' },
      { id: 'd4', name: 'PAN Card', path: '/documents/priya/pan.pdf' },
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
    healthDetails: {
      allergies: ['Milk'],
      conditions: ['Asthma'],
      medications: [
        { name: 'Ventolin Inhaler', dosage: '2 puffs', frequency: 'As needed', time: '' }
      ],
    },
    documents: [
      { id: 'd5', name: 'Birth Certificate', path: '/documents/arjun/birth.pdf' },
      { id: 'd6', name: 'School ID', path: '/documents/arjun/school.pdf' },
    ],
    profilePic: 'https://randomuser.me/api/portraits/lego/1.jpg',
  }
];

const FamilyMemberDetailsScreen = () => {
  const route = useRoute<FamilyMemberDetailsRouteProp>();
  const navigation = useNavigation<FamilyMemberDetailsNavigationProp>();
  const { memberId } = route.params;
  
  const [member, setMember] = useState<FamilyMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'info' | 'health' | 'documents'>('info');

  useEffect(() => {
    // In a real app, we would fetch member details from an API
    const memberData = mockFamilyMembers.find(m => m.id === memberId) || null;
    
    setMember(memberData);
    setLoading(false);
    
    // Set navigation title
    if (memberData) {
      navigation.setOptions({
        headerTitle: memberData.name,
      });
    }
  }, [memberId, navigation]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  const getAge = (dateOfBirth: string): number => {
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
  
  const handleEditMember = () => {
    if (member) {
      navigation.navigate('EditFamilyMember', { memberId: member.id });
    }
  };
  
  const handleDeleteMember = () => {
    Alert.alert(
      'Delete Family Member',
      'Are you sure you want to delete this family member? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            // In a real app, we would call the API to delete the member
            navigation.goBack();
          }
        }
      ]
    );
  };
  
  const handleCallMember = (phone: string) => {
    if (!phone) return;
    Alert.alert(
      'Call Member',
      `Call ${member?.name} at ${phone}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => {
          // In a real app, this would initiate a phone call
          Alert.alert('Calling', `Dialing ${phone}`);
        }}
      ]
    );
  };
  
  const handleEmailMember = (email: string) => {
    if (!email) return;
    Alert.alert(
      'Email Member',
      `Send an email to ${member?.name} at ${email}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Email', onPress: () => {
          // In a real app, this would open email composer
          Alert.alert('Email', `Opening email composer for ${email}`);
        }}
      ]
    );
  };
  
  const handleAddDocument = () => {
    if (member) {
      navigation.navigate('AddFamilyDocument', { memberId: member.id });
    }
  };
  
  const handleAddMedicalRecord = () => {
    if (member) {
      navigation.navigate('AddHealthRecord', { memberId: member.id });
    }
  };

  if (loading || !member) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView contentContainerClassName="pb-8">
        {/* Member Header */}
        <View className="bg-primary p-6 items-center">
          {member.profilePic ? (
            <Image 
              source={{ uri: member.profilePic }} 
              className="h-24 w-24 rounded-full mb-4"
            />
          ) : (
            <View className="h-24 w-24 rounded-full bg-white items-center justify-center mb-4">
              <Text className="text-primary text-xl font-bold">{getInitials(member.name)}</Text>
            </View>
          )}
          
          <Text className="text-white text-xl font-bold">{member.name}</Text>
          <Text className="text-white opacity-90">{member.relationship}</Text>
          
          <View className="flex-row mt-4">
            {member.phone && (
              <TouchableOpacity 
                className="bg-white rounded-full p-3 mx-2"
                onPress={() => handleCallMember(member.phone)}
              >
                <Ionicons name="call-outline" size={20} color="#6366f1" />
              </TouchableOpacity>
            )}
            
            {member.email && (
              <TouchableOpacity 
                className="bg-white rounded-full p-3 mx-2"
                onPress={() => handleEmailMember(member.email)}
              >
                <Ionicons name="mail-outline" size={20} color="#6366f1" />
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              className="bg-white rounded-full p-3 mx-2"
              onPress={handleEditMember}
            >
              <Ionicons name="create-outline" size={20} color="#6366f1" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Tab Navigation */}
        <View className="flex-row border-b border-gray-200 bg-white">
          <TouchableOpacity 
            className={`flex-1 items-center py-3 ${activeTab === 'info' ? 'border-b-2 border-primary' : ''}`}
            onPress={() => setActiveTab('info')}
          >
            <Text className={activeTab === 'info' ? 'font-bold text-primary' : 'text-gray-600'}>Info</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`flex-1 items-center py-3 ${activeTab === 'health' ? 'border-b-2 border-primary' : ''}`}
            onPress={() => setActiveTab('health')}
          >
            <Text className={activeTab === 'health' ? 'font-bold text-primary' : 'text-gray-600'}>Health</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`flex-1 items-center py-3 ${activeTab === 'documents' ? 'border-b-2 border-primary' : ''}`}
            onPress={() => setActiveTab('documents')}
          >
            <Text className={activeTab === 'documents' ? 'font-bold text-primary' : 'text-gray-600'}>Documents</Text>
          </TouchableOpacity>
        </View>
        
        {/* Content based on active tab */}
        <View className="p-4">
          {activeTab === 'info' && (
            <Card>
              <View className="mb-4">
                <Text className="text-gray-500 text-sm">Full Name</Text>
                <Text className="text-gray-800 text-lg">{member.name}</Text>
              </View>
              
              <View className="mb-4">
                <Text className="text-gray-500 text-sm">Relationship</Text>
                <Text className="text-gray-800 text-lg">{member.relationship}</Text>
              </View>
              
              <View className="mb-4">
                <Text className="text-gray-500 text-sm">Date of Birth</Text>
                <Text className="text-gray-800 text-lg">
                  {formatDate(member.dateOfBirth)} ({getAge(member.dateOfBirth)} years)
                </Text>
              </View>
              
              <View className="mb-4">
                <Text className="text-gray-500 text-sm">Blood Group</Text>
                <Text className="text-gray-800 text-lg">{member.bloodGroup || 'Not specified'}</Text>
              </View>
              
              <View className="mb-4">
                <Text className="text-gray-500 text-sm">Phone</Text>
                <Text className="text-gray-800 text-lg">{member.phone || 'Not specified'}</Text>
              </View>
              
              <View>
                <Text className="text-gray-500 text-sm">Email</Text>
                <Text className="text-gray-800 text-lg">{member.email || 'Not specified'}</Text>
              </View>
            </Card>
          )}
          
          {activeTab === 'health' && (
            <>
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-bold text-gray-800">Health Information</Text>
                <Button 
                  variant="primary" 
                  size="sm" 
                  onPress={handleAddMedicalRecord}
                >
                  Add Record
                </Button>
              </View>
              
              <Card className="mb-4">
                <Text className="text-gray-800 font-bold mb-2">Allergies</Text>
                {member.healthDetails.allergies.length > 0 ? (
                  <View className="flex-row flex-wrap">
                    {member.healthDetails.allergies.map((allergy, index) => (
                      <View key={index} className="bg-red-100 rounded-full px-3 py-1 mr-2 mb-2">
                        <Text className="text-red-700">{allergy}</Text>
                      </View>
                    ))}
                  </View>
                ) : (
                  <Text className="text-gray-500">No known allergies</Text>
                )}
              </Card>
              
              <Card className="mb-4">
                <Text className="text-gray-800 font-bold mb-2">Medical Conditions</Text>
                {member.healthDetails.conditions.length > 0 ? (
                  <View className="flex-row flex-wrap">
                    {member.healthDetails.conditions.map((condition, index) => (
                      <View key={index} className="bg-blue-100 rounded-full px-3 py-1 mr-2 mb-2">
                        <Text className="text-blue-700">{condition}</Text>
                      </View>
                    ))}
                  </View>
                ) : (
                  <Text className="text-gray-500">No medical conditions</Text>
                )}
              </Card>
              
              <Card>
                <Text className="text-gray-800 font-bold mb-2">Medications</Text>
                {member.healthDetails.medications.length > 0 ? (
                  member.healthDetails.medications.map((med, index) => (
                    <View key={index} className="mb-3 last:mb-0">
                      <View className="flex-row justify-between">
                        <Text className="font-medium text-gray-800">{med.name}</Text>
                        <Text className="text-primary">{med.dosage}</Text>
                      </View>
                      <Text className="text-gray-500">
                        {med.frequency}{med.time ? ` • ${med.time}` : ''}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text className="text-gray-500">No medications</Text>
                )}
              </Card>
            </>
          )}
          
          {activeTab === 'documents' && (
            <>
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-bold text-gray-800">Documents</Text>
                <Button 
                  variant="primary" 
                  size="sm" 
                  onPress={handleAddDocument}
                >
                  Add Document
                </Button>
              </View>
              
              {member.documents.length > 0 ? (
                member.documents.map((doc) => (
                  <Card key={doc.id} className="mb-3">
                    <TouchableOpacity
                      onPress={() => {
                        Alert.alert('View Document', `Opening ${doc.name}`);
                      }}
                      className="flex-row items-center"
                    >
                      <View className="h-10 w-10 bg-gray-200 rounded items-center justify-center mr-3">
                        <Ionicons name="document-text-outline" size={20} color="#6366f1" />
                      </View>
                      
                      <View className="flex-1">
                        <Text className="font-medium text-gray-800">{doc.name}</Text>
                        <Text className="text-gray-500 text-sm">{doc.path.split('/').pop()}</Text>
                      </View>
                      
                      <Ionicons name="chevron-forward" size={20} color="#6366f1" />
                    </TouchableOpacity>
                  </Card>
                ))
              ) : (
                <View className="items-center py-6">
                  <Text className="text-gray-500 mb-2">No documents uploaded yet</Text>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onPress={handleAddDocument}
                  >
                    Upload Document
                  </Button>
                </View>
              )}
            </>
          )}
        </View>
        
        {/* Delete button at bottom */}
        <View className="px-4">
          <Button 
            variant="destructive"
            onPress={handleDeleteMember}
          >
            <View className="flex-row items-center justify-center">
              <Ionicons name="trash-outline" size={18} color="#fff" />
              <Text className="text-white ml-1">Remove Family Member</Text>
            </View>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FamilyMemberDetailsScreen;
