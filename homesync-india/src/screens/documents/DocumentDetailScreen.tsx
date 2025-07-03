import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Alert,
  Share
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { Document } from '../../services/api/types';

type DocumentDetailRouteProp = RouteProp<RootStackParamList, 'DocumentDetail'>;
type DocumentDetailNavigationProp = StackNavigationProp<RootStackParamList, 'DocumentDetail'>;

// Mock data for documents (same as in DocumentListScreen)
const mockDocuments: Document[] = [
  {
    id: 'd1',
    title: 'House Purchase Agreement',
    name: 'House Purchase Agreement',
    category: 'Property',
    uploadDate: '2025-01-15',
    fileType: 'pdf',
    fileSize: 2.4,
    fileUrl: '/documents/property/house_agreement.pdf',
    path: '/documents/property/house_agreement.pdf',
    tags: ['property', 'legal', 'house'],
    sharedWith: [{ id: 'u1', name: 'Priya Kumar', email: 'priya@example.com' }],
    createdAt: '2025-01-15',
    updatedAt: '2025-01-15'
  },
  {
    id: 'd2',
    title: 'Car Insurance Policy',
    name: 'Car Insurance Policy',
    category: 'Vehicle',
    uploadDate: '2025-03-20',
    fileType: 'pdf',
    fileSize: 1.8,
    fileUrl: '/documents/vehicle/car_insurance.pdf',
    path: '/documents/vehicle/car_insurance.pdf',
    tags: ['car', 'insurance', 'honda'],
    sharedWith: [],
    createdAt: '2025-03-20',
    updatedAt: '2025-03-20'
  },
  {
    id: 'd3',
    title: 'Medical Insurance Policy',
    name: 'Medical Insurance Policy',
    category: 'Insurance',
    uploadDate: '2025-02-10',
    fileType: 'pdf',
    fileSize: 3.2,
    fileUrl: '/documents/insurance/medical_policy.pdf',
    path: '/documents/insurance/medical_policy.pdf',
    tags: ['health', 'insurance', 'family'],
    sharedWith: [{ id: 'u1', name: 'Priya Kumar', email: 'priya@example.com' }],
    createdAt: '2025-02-10',
    updatedAt: '2025-02-10'
  },
  {
    id: 'd4',
    title: 'Electricity Bill - March 2025',
    name: 'Electricity Bill - March 2025',
    category: 'Utilities',
    uploadDate: '2025-03-05',
    fileType: 'pdf',
    fileSize: 0.7,
    fileUrl: '/documents/bills/electricity_mar25.pdf',
    path: '/documents/bills/electricity_mar25.pdf',
    tags: ['bill', 'utility', 'electricity'],
    sharedWith: [],
    createdAt: '2025-03-05',
    updatedAt: '2025-03-05'
  },
];

// Category colors
const categoryColors: Record<string, string> = {
  'Property': 'bg-blue-100',
  'Vehicle': 'bg-green-100',
  'Insurance': 'bg-purple-100',
  'Utilities': 'bg-yellow-100',
  'Education': 'bg-pink-100',
  'Identity': 'bg-red-100',
  'Finance': 'bg-cyan-100',
  'Other': 'bg-gray-100',
};

// Category icons
const categoryIcons: Record<string, string> = {
  'Property': 'home-outline',
  'Vehicle': 'car-outline',
  'Insurance': 'shield-outline',
  'Utilities': 'flash-outline',
  'Education': 'school-outline',
  'Identity': 'card-outline',
  'Finance': 'cash-outline',
  'Other': 'document-outline',
};

const DocumentDetailScreen = () => {
  const route = useRoute<DocumentDetailRouteProp>();
  const navigation = useNavigation<DocumentDetailNavigationProp>();
  const { documentId } = route.params;
  
  const [document, setDocument] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, we would fetch document details from an API
    // For now, we'll use mock data
    const documentData = mockDocuments.find(d => d.id === documentId) || null;
    
    setDocument(documentData);
    setLoading(false);
    
    // Set up the navigation options
    if (documentData) {
      navigation.setOptions({
        headerTitle: documentData.name,
      });
    }
  }, [documentId, navigation]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  const getFileTypeIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'pdf': return 'document-text-outline';
      case 'doc':
      case 'docx': return 'document-outline';
      case 'xls':
      case 'xlsx': return 'grid-outline';
      case 'jpg':
      case 'jpeg':
      case 'png': return 'image-outline';
      default: return 'document-outline';
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Document',
      'Are you sure you want to delete this document? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            // In a real app, we would call the API to delete the document
            // For now, we'll just navigate back
            navigation.goBack();
          }
        }
      ]
    );
  };

  const handleEdit = () => {
    if (document) {
      navigation.navigate('EditDocument', { documentId: document.id });
    }
  };
  
  const handleShare = async () => {
    if (!document) return;
    
    try {
      // In a real app, this would share the actual document
      await Share.share({
        title: document.name,
        message: `Check out this document: ${document.name}`,
      });
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while sharing the document');
    }
  };
  
  const handleAddTag = () => {
    Alert.alert(
      'Add Tag',
      'Enter a new tag for this document:',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Add',
          onPress: (tag) => {
            // In a real app, this would add the tag to the document
            Alert.alert('Success', 'Tag added successfully');
          }
        }
      ],
      { cancelable: true }
    );
  };
  
  const handleRemoveTag = (tag: string) => {
    Alert.alert(
      'Remove Tag',
      `Are you sure you want to remove the tag "${tag}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          onPress: () => {
            // In a real app, this would remove the tag from the document
            Alert.alert('Success', 'Tag removed successfully');
          }
        }
      ]
    );
  };
  
  const handleShareWithFamily = () => {
    if (document) {
      navigation.navigate('ShareDocument', { documentId: document.id });
    }
  };

  if (loading || !document) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView contentContainerClassName="p-4 pb-8">
        {/* Document Preview */}
        <View className="items-center mb-6">
          <View className={`h-20 w-20 rounded-lg ${categoryColors[document.category] || 'bg-gray-100'} items-center justify-center`}>
            <Ionicons 
              name={getFileTypeIcon(document.fileType)} 
              size={36} 
              color="#6366f1" 
            />
          </View>
          <Text className="text-xl font-bold text-gray-800 mt-2 text-center">
            {document.name}
          </Text>
          <Text className="text-gray-500">
            {document.fileSize} MB • {document.fileType.toUpperCase()}
          </Text>
        </View>
        
        {/* Quick Actions */}
        <View className="flex-row justify-between mb-6">
          <TouchableOpacity
            className="items-center"
            onPress={() => {
              // In a real app, this would open the document
              Alert.alert('Open', `Opening ${document.name}...`);
            }}
          >
            <View className="h-12 w-12 rounded-full bg-primary items-center justify-center mb-1">
              <Ionicons name="eye-outline" size={24} color="#fff" />
            </View>
            <Text className="text-gray-700 text-sm">Open</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            className="items-center"
            onPress={handleShare}
          >
            <View className="h-12 w-12 rounded-full bg-primary items-center justify-center mb-1">
              <Ionicons name="share-outline" size={24} color="#fff" />
            </View>
            <Text className="text-gray-700 text-sm">Share</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            className="items-center"
            onPress={() => {
              // In a real app, this would download the document
              Alert.alert('Download', `Downloading ${document.name}...`);
            }}
          >
            <View className="h-12 w-12 rounded-full bg-primary items-center justify-center mb-1">
              <Ionicons name="download-outline" size={24} color="#fff" />
            </View>
            <Text className="text-gray-700 text-sm">Download</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            className="items-center"
            onPress={handleEdit}
          >
            <View className="h-12 w-12 rounded-full bg-primary items-center justify-center mb-1">
              <Ionicons name="create-outline" size={24} color="#fff" />
            </View>
            <Text className="text-gray-700 text-sm">Edit</Text>
          </TouchableOpacity>
        </View>
        
        {/* Document Details */}
        <Card className="mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">Document Details</Text>
          
          <View className="mb-4">
            <Text className="text-gray-500 text-sm">Category</Text>
            <View className="flex-row items-center mt-1">
              <View className={`h-6 w-6 rounded-full ${categoryColors[document.category] || 'bg-gray-100'} items-center justify-center mr-2`}>
                <Ionicons 
                  name={categoryIcons[document.category] as any || 'document-outline' as any} 
                  size={14} 
                  color="#6366f1" 
                />
              </View>
              <Text className="text-gray-800 text-lg">{document.category}</Text>
            </View>
          </View>
          
          <View className="mb-4">
            <Text className="text-gray-500 text-sm">Upload Date</Text>
            <Text className="text-gray-800 text-lg">{formatDate(document.uploadDate)}</Text>
          </View>
          
          <View className="mb-4">
            <Text className="text-gray-500 text-sm">File Type</Text>
            <Text className="text-gray-800 text-lg">{document.fileType.toUpperCase()}</Text>
          </View>
          
          <View className="mb-4">
            <Text className="text-gray-500 text-sm">File Size</Text>
            <Text className="text-gray-800 text-lg">{document.fileSize} MB</Text>
          </View>
          
          <View>
            <Text className="text-gray-500 text-sm">File Path</Text>
            <Text className="text-gray-800 text-lg">{document.path}</Text>
          </View>
        </Card>
        
        {/* Tags */}
        <Card className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-gray-800">Tags</Text>
            <Button 
              variant="outline" 
              size="sm"
              onPress={handleAddTag}
            >
              <View className="flex-row items-center">
                <Ionicons name="add-outline" size={16} color="#6366f1" />
                <Text className="text-primary ml-1">Add Tag</Text>
              </View>
            </Button>
          </View>
          
          {document.tags && document.tags.length > 0 ? (
            <View className="flex-row flex-wrap">
              {document.tags.map((tag, index) => (
                <View key={index} className="bg-gray-100 rounded-full px-3 py-2 mr-2 mb-2 flex-row items-center">
                  <Text className="text-gray-700">#{tag}</Text>
                  <TouchableOpacity 
                    className="ml-1" 
                    onPress={() => handleRemoveTag(tag)}
                  >
                    <Ionicons name="close-circle" size={16} color="#9ca3af" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : (
            <Text className="text-gray-500">No tags added yet</Text>
          )}
        </Card>
        
        {/* Shared With */}
        <Card className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-gray-800">Shared With</Text>
            <Button 
              variant="outline" 
              size="sm"
              onPress={handleShareWithFamily}
            >
              <View className="flex-row items-center">
                <Ionicons name="people-outline" size={16} color="#6366f1" />
                <Text className="text-primary ml-1">Share</Text>
              </View>
            </Button>
          </View>
          
          {document.sharedWith.length > 0 ? (
            document.sharedWith.map((person, index) => (
              <View key={index} className="flex-row items-center mb-2 last:mb-0">
                <View className="h-8 w-8 rounded-full bg-primary items-center justify-center mr-2">
                  <Text className="text-white font-bold">{person.name.charAt(0)}</Text>
                </View>
                <Text className="text-gray-800 flex-1">{person.name}</Text>
                <TouchableOpacity 
                  onPress={() => {
                    // In a real app, this would remove sharing permission
                    Alert.alert('Remove Access', `Remove ${person}'s access to this document?`, [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Remove', style: 'destructive' }
                    ]);
                  }}
                >
                  <Ionicons name="close-circle-outline" size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text className="text-gray-500">Not shared with anyone</Text>
          )}
        </Card>
        
        {/* Delete Button */}
        <Button 
          variant="destructive"
          onPress={handleDelete}
        >
          <View className="flex-row items-center justify-center">
            <Ionicons name="trash-outline" size={18} color="#fff" />
            <Text className="text-white ml-1">Delete Document</Text>
          </View>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DocumentDetailScreen;
