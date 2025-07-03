import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { Vehicle } from '../../services/api/types';

type VehicleListNavigationProp = StackNavigationProp<RootStackParamList, 'Vehicle'>;

// Mock data for vehicles
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
      { 
        id: 'd1', 
        title: 'Insurance Policy',
        name: 'Insurance Policy', 
        path: '/documents/car1/insurance.pdf',
        fileUrl: '/documents/car1/insurance.pdf',
        fileType: 'application/pdf',
        fileSize: 2048,
        category: 'insurance',
        sharedWith: [],
        uploadDate: '2024-11-10',
        createdAt: '2024-11-10',
        updatedAt: '2024-11-10'
      },
      { 
        id: 'd2', 
        title: 'RC Book',
        name: 'RC Book', 
        path: '/documents/car1/rc.pdf',
        fileUrl: '/documents/car1/rc.pdf',
        fileType: 'application/pdf',
        fileSize: 1536,
        category: 'registration',
        sharedWith: [],
        uploadDate: '2024-11-10',
        createdAt: '2024-11-10',
        updatedAt: '2024-11-10'
      },
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
      { 
        id: 'd3', 
        title: 'Insurance Policy',
        name: 'Insurance Policy', 
        path: '/documents/car2/insurance.pdf',
        fileUrl: '/documents/car2/insurance.pdf',
        fileType: 'application/pdf',
        fileSize: 2048,
        category: 'insurance',
        sharedWith: [],
        uploadDate: '2024-11-10',
        createdAt: '2024-11-10',
        updatedAt: '2024-11-10'
      },
      { 
        id: 'd4', 
        title: 'RC Book',
        name: 'RC Book', 
        path: '/documents/car2/rc.pdf',
        fileUrl: '/documents/car2/rc.pdf',
        fileType: 'application/pdf',
        fileSize: 1536,
        category: 'registration',
        sharedWith: [],
        uploadDate: '2024-11-10',
        createdAt: '2024-11-10',
        updatedAt: '2024-11-10'
      },
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
      { 
        id: 'd5', 
        title: 'Insurance Policy',
        name: 'Insurance Policy', 
        path: '/documents/bike1/insurance.pdf',
        fileUrl: '/documents/bike1/insurance.pdf',
        fileType: 'application/pdf',
        fileSize: 1024,
        category: 'insurance',
        sharedWith: [],
        uploadDate: '2025-01-05',
        createdAt: '2025-01-05',
        updatedAt: '2025-01-05'
      },
      { 
        id: 'd6', 
        title: 'RC Book',
        name: 'RC Book', 
        path: '/documents/bike1/rc.pdf',
        fileUrl: '/documents/bike1/rc.pdf',
        fileType: 'application/pdf',
        fileSize: 768,
        category: 'registration',
        sharedWith: [],
        uploadDate: '2025-01-05',
        createdAt: '2025-01-05',
        updatedAt: '2025-01-05'
      },
    ],
    createdAt: '2025-01-05',
    updatedAt: '2025-02-05',
  },
];

const VehicleListScreen = () => {
  const navigation = useNavigation<VehicleListNavigationProp>();
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  
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
  
  const getExpiryStatus = (dateString: string | undefined) => {
    if (!dateString) {
      return { text: 'Not Available', color: 'bg-gray-100 text-gray-800' };
    }
    const daysUntil = getDaysUntil(dateString);
    
    if (daysUntil < 0) {
      return { text: 'Expired', color: 'bg-red-100 text-red-800' };
    } else if (daysUntil <= 30) {
      return { text: `Expires in ${daysUntil} days`, color: 'bg-yellow-100 text-yellow-800' };
    } else {
      return { text: `Valid till ${formatDate(dateString)}`, color: 'bg-green-100 text-green-800' };
    }
  };
  
  const getVehicleIcon = (type: string | undefined) => {
    if (!type) {
      return 'car-outline';
    }
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
  
  const renderVehicleItem = ({ item }: { item: Vehicle }) => {
    // Add null checks for potentially undefined values
    const insuranceStatus = getExpiryStatus(item.insuranceExpiryDate);
    const pollutionStatus = getExpiryStatus(item.pollutionExpiryDate);
    
    return (
      <Card className="mb-4">
        <TouchableOpacity
          onPress={() => navigation.navigate('VehicleDetails', { vehicleId: item.id })}
        >
          <View className="flex-row items-center mb-3">
            <View className="h-12 w-12 rounded-full bg-gray-200 items-center justify-center mr-3">
              <Ionicons name={getVehicleIcon(item.type)} size={24} color="#6366f1" />
            </View>
            
            <View className="flex-1">
              <Text className="font-bold text-lg text-gray-800">{item.name}</Text>
              <Text className="text-gray-600">{item.registrationNumber}</Text>
            </View>
          </View>
          
          <View className="border-t border-gray-200 pt-3">
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Type</Text>
              <Text className="font-medium text-gray-800">{item.type}</Text>
            </View>
            
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Model & Year</Text>
              <Text className="font-medium text-gray-800">{item.model}, {item.year}</Text>
            </View>
            
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Fuel Type</Text>
              <Text className="font-medium text-gray-800">{item.fuelType}</Text>
            </View>
            
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Insurance</Text>
              <View className={`px-2 py-1 rounded-md ${insuranceStatus.color}`}>
                <Text className="text-xs font-medium">
                  {insuranceStatus.text}
                </Text>
              </View>
            </View>
            
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Pollution Check</Text>
              <View className={`px-2 py-1 rounded-md ${pollutionStatus.color}`}>
                <Text className="text-xs font-medium">
                  {pollutionStatus.text}
                </Text>
              </View>
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
          <Text className="text-2xl font-bold text-gray-800">Vehicles</Text>
          <Button 
            variant="primary" 
            size="sm" 
            onPress={() => navigation.navigate('AddVehicle')}
          >
            <View className="flex-row items-center">
              <Ionicons name="add" size={18} color="#fff" />
              <Text className="text-white ml-1">Add Vehicle</Text>
            </View>
          </Button>
        </View>
        
        {/* Vehicle list */}
        {vehicles.length > 0 ? (
          <FlatList
            data={vehicles}
            keyExtractor={(item) => item.id}
            renderItem={renderVehicleItem}
            showsVerticalScrollIndicator={false}
            contentContainerClassName="pb-4"
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-500 text-lg mb-4">No vehicles added yet</Text>
            <Button 
              variant="primary" 
              onPress={() => navigation.navigate('AddVehicle')}
            >
              Add Your First Vehicle
            </Button>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default VehicleListScreen;
