import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { RootStackParamList } from '../../navigation/AppNavigator';

// Types
type MedicalRecordRouteProp = RouteProp<RootStackParamList, 'MedicalRecord'>;
type MedicalRecordNavigationProp = StackNavigationProp<RootStackParamList, 'MedicalRecord'>;

interface MedicalRecord {
  id: string;
  familyMemberId: string;
  memberName: string;
  recordType: 'visit' | 'lab' | 'prescription' | 'hospitalization' | 'vaccination';
  date: string;
  doctorName: string;
  hospitalName: string;
  diagnosis: string;
  treatment: string;
  prescriptions: {
    medication: string;
    dosage: string;
    instructions: string;
  }[];
  labResults: {
    testName: string;
    result: string;
    normalRange: string;
    isNormal: boolean;
  }[];
  attachments: {
    name: string;
    type: string;
    size: string;
    url: string;
  }[];
  notes: string;
  followUpDate: string | null;
}

// Mock medical record data
const mockMedicalRecords: { [key: string]: MedicalRecord } = {
  '1': {
    id: '1',
    familyMemberId: '1',
    memberName: 'Raj Sharma',
    recordType: 'visit',
    date: '2025-05-15',
    doctorName: 'Dr. Anil Gupta',
    hospitalName: 'Apollo Hospital, Delhi',
    diagnosis: 'Type 2 Diabetes, Hypertension',
    treatment: 'Medication adjustment, dietary recommendations, and regular monitoring',
    prescriptions: [
      {
        medication: 'Metformin',
        dosage: '500mg twice daily',
        instructions: 'Take after meals'
      },
      {
        medication: 'Amlodipine',
        dosage: '5mg once daily',
        instructions: 'Take in the morning'
      }
    ],
    labResults: [
      {
        testName: 'HbA1c',
        result: '7.2%',
        normalRange: '<5.7%',
        isNormal: false
      },
      {
        testName: 'Blood Pressure',
        result: '140/90 mmHg',
        normalRange: '<130/80 mmHg',
        isNormal: false
      },
      {
        testName: 'Total Cholesterol',
        result: '180 mg/dL',
        normalRange: '<200 mg/dL',
        isNormal: true
      }
    ],
    attachments: [
      {
        name: 'Blood Test Report.pdf',
        type: 'pdf',
        size: '2.3 MB',
        url: 'https://example.com/reports/blood-test.pdf'
      },
      {
        name: 'Doctor Prescription.jpg',
        type: 'image',
        size: '1.1 MB',
        url: 'https://example.com/prescriptions/rx12345.jpg'
      }
    ],
    notes: 'Patient showing improvement with current medication regimen. Advised to increase physical activity and follow low-carb diet. Blood pressure still slightly elevated.',
    followUpDate: '2025-07-20'
  },
  '2': {
    id: '2',
    familyMemberId: '3',
    memberName: 'Arjun Sharma',
    recordType: 'vaccination',
    date: '2025-04-10',
    doctorName: 'Dr. Meera Patel',
    hospitalName: 'Max Healthcare, Gurgaon',
    diagnosis: 'Routine vaccination',
    treatment: 'HPV Vaccination (1st dose)',
    prescriptions: [],
    labResults: [],
    attachments: [
      {
        name: 'Vaccination Certificate.pdf',
        type: 'pdf',
        size: '0.8 MB',
        url: 'https://example.com/certificates/vacc_hpv.pdf'
      }
    ],
    notes: 'First dose of HPV vaccination administered. Patient tolerated well with no immediate adverse reactions.',
    followUpDate: '2025-10-10'
  }
};

const MedicalRecordScreen = () => {
  const route = useRoute<MedicalRecordRouteProp>();
  const navigation = useNavigation<MedicalRecordNavigationProp>();
  const { recordId } = route.params;
  
  const [record, setRecord] = useState<MedicalRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, we would fetch record details from an API
    // For now, we'll use mock data
    const recordData = mockMedicalRecords[recordId] || null;
    
    setRecord(recordData);
    setLoading(false);
    
    // Set up the navigation options with the record title
    if (recordData) {
      navigation.setOptions({
        headerTitle: `${recordData.memberName}'s Record`,
      });
    }
  }, [recordId, navigation]);

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

  // Get record type badge color
  const getRecordTypeColor = (type: string) => {
    switch(type) {
      case 'visit': return 'bg-blue-100 text-blue-800';
      case 'lab': return 'bg-purple-100 text-purple-800';
      case 'prescription': return 'bg-green-100 text-green-800';
      case 'hospitalization': return 'bg-red-100 text-red-800';
      case 'vaccination': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get record type icon
  const getRecordTypeIcon = (type: string) => {
    switch(type) {
      case 'visit': return 'medical-outline';
      case 'lab': return 'flask-outline';
      case 'prescription': return 'document-text-outline';
      case 'hospitalization': return 'bed-outline';
      case 'vaccination': return 'shield-outline';
      default: return 'folder-outline';
    }
  };

  // Get formatted record type label
  const getRecordTypeLabel = (type: string) => {
    switch(type) {
      case 'visit': return 'Doctor Visit';
      case 'lab': return 'Lab Test';
      case 'prescription': return 'Prescription';
      case 'hospitalization': return 'Hospitalization';
      case 'vaccination': return 'Vaccination';
      default: return 'Record';
    }
  };

  // Get formatted file icon based on type
  const getFileIcon = (fileType: string) => {
    switch(fileType) {
      case 'pdf': return 'document-text-outline';
      case 'image': 
      case 'jpg':
      case 'png': 
        return 'image-outline';
      default: return 'document-outline';
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500">Loading record...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!record) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500">Record not found</Text>
          <Button 
            className="mt-4"
            onPress={() => navigation.goBack()}
          >
            <Text className="text-white font-medium">Go Back</Text>
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView>
        <View className="p-4">
          {/* Record Header */}
          <Card className="mb-4">
            <View className="flex-row justify-between items-start">
              <View>
                <View className="flex-row items-center mb-2">
                  <Text className="text-xl font-bold text-gray-800">{record.memberName}</Text>
                  <View className={`ml-2 px-2 py-1 rounded-full ${getRecordTypeColor(record.recordType)}`}>
                    <View className="flex-row items-center">
                      <Ionicons name={getRecordTypeIcon(record.recordType)} size={14} color="currentColor" />
                      <Text className={`ml-1 text-xs font-medium`}>
                        {getRecordTypeLabel(record.recordType)}
                      </Text>
                    </View>
                  </View>
                </View>
                <Text className="text-gray-500">{formatDate(record.date)}</Text>
                <Text className="text-gray-700 mt-1">{record.hospitalName}</Text>
                <Text className="text-gray-700">{record.doctorName}</Text>
              </View>
              
              <TouchableOpacity 
                className="p-2" 
                onPress={() => Alert.alert('Share Record', 'Share this medical record?')}
              >
                <Ionicons name="share-outline" size={24} color="#6366f1" />
              </TouchableOpacity>
            </View>

            {record.followUpDate && (
              <View className="mt-3 p-3 bg-blue-50 rounded-md flex-row items-center">
                <Ionicons name="calendar-outline" size={18} color="#3b82f6" />
                <Text className="ml-2 text-blue-700 font-medium">
                  Follow-up appointment: {formatDate(record.followUpDate)}
                </Text>
              </View>
            )}
          </Card>

          {/* Diagnosis & Treatment */}
          <Card className="mb-4">
            <Text className="text-lg font-bold text-gray-800 mb-2">Diagnosis & Treatment</Text>
            
            <View className="mb-3">
              <Text className="text-gray-500 mb-1">Diagnosis</Text>
              <Text className="text-gray-800">{record.diagnosis}</Text>
            </View>

            <View>
              <Text className="text-gray-500 mb-1">Treatment</Text>
              <Text className="text-gray-800">{record.treatment}</Text>
            </View>
          </Card>

          {/* Prescriptions */}
          {record.prescriptions.length > 0 && (
            <Card className="mb-4">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-lg font-bold text-gray-800">Prescriptions</Text>
                <TouchableOpacity>
                  <Ionicons name="print-outline" size={20} color="#6366f1" />
                </TouchableOpacity>
              </View>
              
              {record.prescriptions.map((prescription, index) => (
                <View 
                  key={index} 
                  className={`py-3 ${index !== record.prescriptions.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                  <Text className="text-gray-800 font-medium">{prescription.medication}</Text>
                  <Text className="text-gray-600">{prescription.dosage}</Text>
                  <Text className="text-gray-500 text-sm">{prescription.instructions}</Text>
                </View>
              ))}
            </Card>
          )}

          {/* Lab Results */}
          {record.labResults.length > 0 && (
            <Card className="mb-4">
              <Text className="text-lg font-bold text-gray-800 mb-2">Lab Results</Text>
              
              <View className="flex-row justify-between border-b border-gray-100 pb-2 mb-2">
                <Text className="text-gray-500 font-medium flex-1">Test</Text>
                <Text className="text-gray-500 font-medium w-24 text-right">Result</Text>
                <Text className="text-gray-500 font-medium w-24 text-right">Normal Range</Text>
              </View>
              
              {record.labResults.map((result, index) => (
                <View 
                  key={index} 
                  className={`flex-row justify-between items-center py-2 ${index !== record.labResults.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                  <Text className="text-gray-800 flex-1">{result.testName}</Text>
                  <Text 
                    className={`w-24 text-right font-medium ${result.isNormal ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {result.result}
                  </Text>
                  <Text className="text-gray-600 w-24 text-right">{result.normalRange}</Text>
                </View>
              ))}
            </Card>
          )}

          {/* Attachments */}
          {record.attachments.length > 0 && (
            <Card className="mb-4">
              <Text className="text-lg font-bold text-gray-800 mb-2">Attachments</Text>
              
              {record.attachments.map((file, index) => (
                <TouchableOpacity 
                  key={index}
                  className={`flex-row justify-between items-center py-3 ${index !== record.attachments.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                  <View className="flex-row items-center flex-1">
                    <View className="h-10 w-10 rounded-lg bg-gray-100 items-center justify-center mr-3">
                      <Ionicons name={getFileIcon(file.type)} size={20} color="#6366f1" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-gray-800 font-medium" numberOfLines={1}>{file.name}</Text>
                      <Text className="text-gray-500 text-sm">{file.size}</Text>
                    </View>
                  </View>
                  <TouchableOpacity className="p-2">
                    <Ionicons name="download-outline" size={20} color="#6366f1" />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </Card>
          )}

          {/* Notes */}
          {record.notes && (
            <Card className="mb-4">
              <Text className="text-lg font-bold text-gray-800 mb-2">Doctor's Notes</Text>
              <Text className="text-gray-800">{record.notes}</Text>
            </Card>
          )}

          {/* Action Buttons */}
          <View className="flex-row justify-between mb-4">
            <Button
              variant="outline"
              size="md"
              className="flex-1 mr-2"
            >
              <View className="flex-row items-center">
                <Ionicons name="create-outline" size={18} color="#6366f1" />
                <Text className="ml-1 text-primary">Edit Record</Text>
              </View>
            </Button>
            
            <Button
              variant="outline"
              size="md"
              className="flex-1"
              onPress={() => {
                Alert.alert('Delete Record', 
                  'Are you sure you want to delete this medical record? This action cannot be undone.', 
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
                <Text className="ml-1 text-red-500">Delete</Text>
              </View>
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MedicalRecordScreen;
