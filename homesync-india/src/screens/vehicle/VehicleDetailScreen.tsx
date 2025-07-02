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
import { Vehicle } from '../../services/api/types';

type VehicleDetailRouteProp = RouteProp<RootStackParamList, 'VehicleDetails'>;
type VehicleDetailNavigationProp = StackNavigationProp<RootStackParamList, 'VehicleDetails'>;

// Mock data for vehicles (same as in VehicleListScreen)
const mockVehicles: Vehicle[] = [
  {
    id: '1',
    name: 'Honda City',
    registrationNumber: 'DL 01 AB 1234',
    type: 'Sedan',
    fuelType: 'Petrol',
    model: 'ZX',
    year: 2022,
    insuranceExpiryDate: '2026-03-15',
    pollutionExpiryDate: '2025-09-30',
    serviceHistory: [
      { date: '2025-01-15', odometer: 5000, service: 'Regular Service', cost: 5000 },
      { date: '2024-07-20', odometer: 2500, service: 'Oil Change', cost: 2000 },
    ],
    documents: [
      { id: 'd1', name: 'Insurance Policy', path: '/documents/car1/insurance.pdf' },
      { id: 'd2', name: 'RC Book', path: '/documents/car1/rc.pdf' },
    ],
    createdAt: '2024-05-10',
    updatedAt: '2025-01-15',
  },
  {
    id: '2',
    name: 'Hyundai Creta',
    registrationNumber: 'DL 02 CD 5678',
    type: 'SUV',
    fuelType: 'Diesel',
    model: 'SX',
    year: 2023,
    insuranceExpiryDate: '2026-05-20',
    pollutionExpiryDate: '2025-12-15',
    serviceHistory: [
      { date: '2025-06-10', odometer: 3000, service: 'Regular Service', cost: 6000 },
    ],
    documents: [
      { id: 'd3', name: 'Insurance Policy', path: '/documents/car2/insurance.pdf' },
      { id: 'd4', name: 'RC Book', path: '/documents/car2/rc.pdf' },
    ],
    createdAt: '2024-08-15',
    updatedAt: '2025-06-10',
  },
  {
    id: '3',
    name: 'Hero Splendor',
    registrationNumber: 'DL 03 EF 9012',
    type: 'Motorcycle',
    fuelType: 'Petrol',
    model: 'Plus',
    year: 2024,
    insuranceExpiryDate: '2025-08-30',
    pollutionExpiryDate: '2025-08-30',
    serviceHistory: [
      { date: '2025-02-05', odometer: 1000, service: 'First Service', cost: 0 },
    ],
    documents: [
      { id: 'd5', name: 'Insurance Policy', path: '/documents/bike1/insurance.pdf' },
      { id: 'd6', name: 'RC Book', path: '/documents/bike1/rc.pdf' },
    ],
    createdAt: '2025-01-05',
    updatedAt: '2025-02-05',
  },
];

const VehicleDetailScreen = () => {
  const route = useRoute<VehicleDetailRouteProp>();
  const navigation = useNavigation<VehicleDetailNavigationProp>();
  const { vehicleId } = route.params;
  
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'details' | 'service' | 'documents'>('details');

  useEffect(() => {
    // In a real app, we would fetch vehicle details from an API
    // For now, we'll use mock data
    const vehicleData = mockVehicles.find(v => v.id === vehicleId) || null;
    
    setVehicle(vehicleData);
    setLoading(false);
    
    // Set up the navigation options with the vehicle name
    if (vehicleData) {
      navigation.setOptions({
        headerTitle: vehicleData.name,
      });
    }
  }, [vehicleId, navigation]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };
  
  const getDaysUntil = (dateString: string): number => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const targetDate = new Date(dateString);
    const diffTime = targetDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  const getExpiryStatus = (dateString: string) => {
    const daysUntil = getDaysUntil(dateString);
    
    if (daysUntil < 0) {
      return { text: 'Expired', color: 'text-red-600', bg: 'bg-red-100' };
    } else if (daysUntil <= 30) {
      return { text: `Expires in ${daysUntil} days`, color: 'text-yellow-600', bg: 'bg-yellow-100' };
    } else {
      return { text: `Valid till ${formatDate(dateString)}`, color: 'text-green-600', bg: 'bg-green-100' };
    }
  };

  const handleAddService = () => {
    navigation.navigate('AddVehicleService', { vehicleId });
  };
  
  const handleAddDocument = () => {
    navigation.navigate('AddVehicleDocument', { vehicleId });
  };

  const handleRenewal = (type: 'insurance' | 'pollution') => {
    Alert.alert(
      `Renew ${type === 'insurance' ? 'Insurance' : 'Pollution Certificate'}`,
      `Set a reminder for ${type === 'insurance' ? 'insurance' : 'pollution certificate'} renewal?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Set Reminder',
          onPress: () => {
            // In a real app, this would create a calendar reminder
            Alert.alert(
              'Reminder Set',
              `You will be reminded before the ${type === 'insurance' ? 'insurance' : 'pollution certificate'} expires.`
            );
          }
        }
      ]
    );
  };
  
  const getVehicleIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'sedan':
      case 'hatchback':
        return 'car-sport-outline';
      case 'suv':
        return 'car-outline';
      case 'motorcycle':
      case 'scooter':
        return 'bicycle-outline';
      default:
        return 'car-outline';
    }
  };
  
  if (loading || !vehicle) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text>Loading...</Text>
      </View>
    );
  }

  const insuranceStatus = getExpiryStatus(vehicle.insuranceExpiryDate);
  const pollutionStatus = getExpiryStatus(vehicle.pollutionExpiryDate);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView contentContainerClassName="pb-8">
        {/* Vehicle Header */}
        <View className="bg-primary p-6 items-center">
          <View className="h-24 w-24 rounded-full bg-white items-center justify-center mb-4">
            <Ionicons name={getVehicleIcon(vehicle.type)} size={40} color="#6366f1" />
          </View>
          <Text className="text-white text-xl font-bold">{vehicle.name}</Text>
          <Text className="text-white opacity-90">{vehicle.registrationNumber}</Text>
          
          <View className="flex-row mt-4">
            <TouchableOpacity 
              className="bg-white rounded-full p-3 mx-2"
              onPress={() => navigation.navigate('EditVehicle', { vehicleId: vehicle.id })}
            >
              <Ionicons name="create-outline" size={20} color="#6366f1" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="bg-white rounded-full p-3 mx-2"
              onPress={handleAddService}
            >
              <Ionicons name="construct-outline" size={20} color="#6366f1" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="bg-white rounded-full p-3 mx-2"
              onPress={handleAddDocument}
            >
              <Ionicons name="document-outline" size={20} color="#6366f1" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Tab Navigation */}
        <View className="flex-row border-b border-gray-200 bg-white">
          <TouchableOpacity 
            className={`flex-1 items-center py-3 ${activeTab === 'details' ? 'border-b-2 border-primary' : ''}`}
            onPress={() => setActiveTab('details')}
          >
            <Text className={activeTab === 'details' ? 'font-bold text-primary' : 'text-gray-600'}>Details</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`flex-1 items-center py-3 ${activeTab === 'service' ? 'border-b-2 border-primary' : ''}`}
            onPress={() => setActiveTab('service')}
          >
            <Text className={activeTab === 'service' ? 'font-bold text-primary' : 'text-gray-600'}>Service History</Text>
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
          {activeTab === 'details' && (
            <>
              <Card className="mb-6">
                <View className="mb-4">
                  <Text className="text-gray-500 text-sm">Type</Text>
                  <Text className="text-gray-800 text-lg">{vehicle.type}</Text>
                </View>
                
                <View className="mb-4">
                  <Text className="text-gray-500 text-sm">Model & Year</Text>
                  <Text className="text-gray-800 text-lg">{vehicle.model}, {vehicle.year}</Text>
                </View>
                
                <View className="mb-4">
                  <Text className="text-gray-500 text-sm">Fuel Type</Text>
                  <Text className="text-gray-800 text-lg">{vehicle.fuelType}</Text>
                </View>
              </Card>
              
              <Card className="mb-6">
                <Text className="text-lg font-bold text-gray-800 mb-3">Important Dates</Text>
                
                <View className="mb-4">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-gray-600">Insurance</Text>
                    <View className={`px-3 py-1 rounded-full ${insuranceStatus.bg}`}>
                      <Text className={`font-medium text-sm ${insuranceStatus.color}`}>
                        {insuranceStatus.text}
                      </Text>
                    </View>
                  </View>
                  
                  <View className="flex-row justify-end mt-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onPress={() => handleRenewal('insurance')}
                    >
                      <View className="flex-row items-center">
                        <Ionicons name="refresh" size={16} color="#6366f1" />
                        <Text className="text-primary ml-1">Renew</Text>
                      </View>
                    </Button>
                  </View>
                </View>
                
                <View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-gray-600">Pollution Check</Text>
                    <View className={`px-3 py-1 rounded-full ${pollutionStatus.bg}`}>
                      <Text className={`font-medium text-sm ${pollutionStatus.color}`}>
                        {pollutionStatus.text}
                      </Text>
                    </View>
                  </View>
                  
                  <View className="flex-row justify-end mt-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onPress={() => handleRenewal('pollution')}
                    >
                      <View className="flex-row items-center">
                        <Ionicons name="refresh" size={16} color="#6366f1" />
                        <Text className="text-primary ml-1">Renew</Text>
                      </View>
                    </Button>
                  </View>
                </View>
              </Card>
              
              <Button 
                variant="outline"
                className="mb-4"
                onPress={() => {
                  // Share vehicle details
                  Alert.alert(
                    'Share Vehicle Details',
                    'This would share vehicle details via messaging apps in a real implementation.'
                  );
                }}
              >
                <View className="flex-row items-center">
                  <Ionicons name="share-outline" size={18} color="#6366f1" />
                  <Text className="text-primary ml-1">Share Details</Text>
                </View>
              </Button>
              
              <Button 
                variant="outline"
                className="mb-4"
                onPress={() => {
                  Alert.alert(
                    'Delete Vehicle',
                    'Are you sure you want to delete this vehicle?',
                    [
                      { text: 'Cancel', style: 'cancel' },
                      { 
                        text: 'Delete', 
                        style: 'destructive',
                        onPress: () => navigation.goBack() 
                      }
                    ]
                  );
                }}
              >
                <View className="flex-row items-center">
                  <Ionicons name="trash-outline" size={18} color="#ef4444" />
                  <Text className="text-red-500 ml-1">Delete Vehicle</Text>
                </View>
              </Button>
            </>
          )}
          
          {activeTab === 'service' && (
            <>
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-bold text-gray-800">Service History</Text>
                <Button 
                  variant="primary" 
                  size="sm" 
                  onPress={handleAddService}
                >
                  Add Service
                </Button>
              </View>
              
              {vehicle.serviceHistory.length > 0 ? (
                vehicle.serviceHistory.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((service, index) => (
                  <Card key={index} className="mb-3">
                    <View className="flex-row justify-between items-center mb-2">
                      <Text className="font-bold text-gray-800">{service.service}</Text>
                      <Text className="text-gray-600">{formatDate(service.date)}</Text>
                    </View>
                    
                    <View className="flex-row justify-between">
                      <Text className="text-gray-600">Odometer: {service.odometer} km</Text>
                      <Text className="font-medium text-primary">₹{service.cost}</Text>
                    </View>
                  </Card>
                ))
              ) : (
                <View className="items-center py-6">
                  <Text className="text-gray-500 mb-2">No service records yet</Text>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onPress={handleAddService}
                  >
                    Add First Service Record
                  </Button>
                </View>
              )}
              
              {vehicle.serviceHistory.length > 0 && (
                <Card className="mt-4">
                  <View className="flex-row justify-between items-center">
                    <Text className="font-medium text-gray-700">Total Service Cost</Text>
                    <Text className="font-bold text-lg text-primary">₹{
                      vehicle.serviceHistory.reduce((total, service) => total + service.cost, 0)
                    }</Text>
                  </View>
                </Card>
              )}
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
              
              {vehicle.documents.length > 0 ? (
                vehicle.documents.map((doc) => (
                  <Card key={doc.id} className="mb-3">
                    <TouchableOpacity
                      onPress={() => {
                        // In a real app, this would open the document
                        Alert.alert('View Document', `Opening ${doc.name}...`);
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default VehicleDetailScreen;
