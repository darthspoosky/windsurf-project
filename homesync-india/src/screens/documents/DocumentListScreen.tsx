import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView,
  TextInput
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { Document } from '../../services/api/types';

type DocumentListNavigationProp = StackNavigationProp<RootStackParamList, 'DocumentList'>;

// Mock data for documents
const mockDocuments: Document[] = [
  {
    id: 'd1',
    name: 'House Purchase Agreement',
    category: 'Property',
    uploadDate: '2025-01-15',
    fileType: 'pdf',
    fileSize: 2.4,
    path: '/documents/property/house_agreement.pdf',
    tags: ['property', 'legal', 'house'],
    sharedWith: ['Priya Kumar'],
  },
  {
    id: 'd2',
    name: 'Car Insurance Policy',
    category: 'Vehicle',
    uploadDate: '2025-03-20',
    fileType: 'pdf',
    fileSize: 1.8,
    path: '/documents/vehicle/car_insurance.pdf',
    tags: ['car', 'insurance', 'honda'],
    sharedWith: [],
  },
  {
    id: 'd3',
    name: 'Medical Insurance Policy',
    category: 'Insurance',
    uploadDate: '2025-02-10',
    fileType: 'pdf',
    fileSize: 3.2,
    path: '/documents/insurance/medical_policy.pdf',
    tags: ['health', 'insurance', 'family'],
    sharedWith: ['Priya Kumar'],
  },
  {
    id: 'd4',
    name: 'Electricity Bill - March 2025',
    category: 'Utilities',
    uploadDate: '2025-03-05',
    fileType: 'pdf',
    fileSize: 0.7,
    path: '/documents/bills/electricity_mar25.pdf',
    tags: ['bill', 'utility', 'electricity'],
    sharedWith: [],
  },
  {
    id: 'd5',
    name: 'School Admission Letter - Arjun',
    category: 'Education',
    uploadDate: '2025-01-22',
    fileType: 'pdf',
    fileSize: 0.9,
    path: '/documents/education/arjun_admission.pdf',
    tags: ['school', 'arjun', 'education'],
    sharedWith: [],
  },
  {
    id: 'd6',
    name: 'Passport - Rajesh Kumar',
    category: 'Identity',
    uploadDate: '2024-12-05',
    fileType: 'pdf',
    fileSize: 1.5,
    path: '/documents/identity/rajesh_passport.pdf',
    tags: ['passport', 'identity', 'travel'],
    sharedWith: ['Priya Kumar'],
  },
  {
    id: 'd7',
    name: 'Salary Slip - January 2025',
    category: 'Finance',
    uploadDate: '2025-01-31',
    fileType: 'pdf',
    fileSize: 0.6,
    path: '/documents/finance/salary_jan25.pdf',
    tags: ['salary', 'finance', 'income'],
    sharedWith: [],
  },
  {
    id: 'd8',
    name: 'Property Tax Receipt - 2024',
    category: 'Property',
    uploadDate: '2024-11-15',
    fileType: 'pdf',
    fileSize: 1.1,
    path: '/documents/property/tax_2024.pdf',
    tags: ['tax', 'property', 'receipt'],
    sharedWith: [],
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

const DocumentListScreen = () => {
  const navigation = useNavigation<DocumentListNavigationProp>();
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Get unique categories from documents
  const categories = Array.from(
    new Set(['All', ...documents.map(doc => doc.category)])
  );
  
  // Filter documents based on search query and selected category
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === null || 
                           selectedCategory === 'All' || 
                           doc.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric',
      month: 'short',
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
  
  const handleAddDocument = () => {
    navigation.navigate('AddDocument');
  };
  
  const renderCategoryItem = ({ item }: { item: string }) => (
    <TouchableOpacity 
      className={`mr-2 px-4 py-2 rounded-full ${
        item === selectedCategory ? 'bg-primary' : 'bg-gray-200'
      }`}
      onPress={() => setSelectedCategory(item === 'All' ? null : item)}
    >
      <Text 
        className={`${
          item === selectedCategory ? 'text-white' : 'text-gray-700'
        } font-medium`}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );
  
  const renderDocumentItem = ({ item }: { item: Document }) => {
    return (
      <Card className="mb-3">
        <TouchableOpacity
          onPress={() => navigation.navigate('DocumentDetail', { documentId: item.id })}
          className="flex-row items-start"
        >
          <View className={`h-12 w-12 rounded-lg ${categoryColors[item.category] || 'bg-gray-100'} items-center justify-center mr-3`}>
            <Ionicons 
              name={getFileTypeIcon(item.fileType)} 
              size={24} 
              color="#6366f1" 
            />
          </View>
          
          <View className="flex-1">
            <Text className="font-bold text-gray-800">{item.name}</Text>
            
            <View className="flex-row items-center mt-1">
              <View className={`h-5 w-5 rounded-full ${categoryColors[item.category] || 'bg-gray-100'} items-center justify-center mr-1`}>
                <Ionicons 
                  name={categoryIcons[item.category] || 'document-outline'} 
                  size={12} 
                  color="#6366f1" 
                />
              </View>
              <Text className="text-gray-600 text-sm mr-3">{item.category}</Text>
              
              <Ionicons name="time-outline" size={12} color="#9ca3af" />
              <Text className="text-gray-500 text-xs ml-1">{formatDate(item.uploadDate)}</Text>
            </View>
            
            <View className="flex-row items-center mt-1">
              <Text className="text-gray-500 text-xs mr-3">{item.fileSize} MB</Text>
              
              {item.sharedWith.length > 0 && (
                <View className="flex-row items-center">
                  <Ionicons name="people-outline" size={12} color="#9ca3af" />
                  <Text className="text-gray-500 text-xs ml-1">
                    Shared with {item.sharedWith.length} {item.sharedWith.length === 1 ? 'person' : 'people'}
                  </Text>
                </View>
              )}
            </View>
            
            {item.tags.length > 0 && (
              <View className="flex-row flex-wrap mt-2">
                {item.tags.slice(0, 3).map((tag, index) => (
                  <View key={index} className="bg-gray-100 rounded-full px-2 py-1 mr-1">
                    <Text className="text-gray-600 text-xs">#{tag}</Text>
                  </View>
                ))}
                {item.tags.length > 3 && (
                  <View className="bg-gray-100 rounded-full px-2 py-1">
                    <Text className="text-gray-600 text-xs">+{item.tags.length - 3}</Text>
                  </View>
                )}
              </View>
            )}
          </View>
          
          <Ionicons name="chevron-forward" size={20} color="#6366f1" />
        </TouchableOpacity>
      </Card>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 p-4">
        <View className="mb-6 flex-row justify-between items-center">
          <Text className="text-2xl font-bold text-gray-800">Documents</Text>
          <Button 
            variant="primary" 
            size="sm" 
            onPress={handleAddDocument}
          >
            <View className="flex-row items-center">
              <Ionicons name="add" size={18} color="#fff" />
              <Text className="text-white ml-1">Add Document</Text>
            </View>
          </Button>
        </View>
        
        {/* Search bar */}
        <View className="mb-4 flex-row items-center bg-white rounded-lg px-3 py-2">
          <Ionicons name="search-outline" size={20} color="#9ca3af" />
          <TextInput
            className="flex-1 ml-2 text-gray-800"
            placeholder="Search documents..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#9ca3af" />
            </TouchableOpacity>
          )}
        </View>
        
        {/* Categories horizontal scroll */}
        <View className="mb-4">
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="py-1"
          />
        </View>
        
        {/* Documents list */}
        {filteredDocuments.length > 0 ? (
          <FlatList
            data={filteredDocuments}
            renderItem={renderDocumentItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerClassName="pb-4"
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            {searchQuery !== '' || selectedCategory ? (
              <>
                <Ionicons name="search" size={48} color="#d1d5db" />
                <Text className="text-gray-500 text-lg mt-2">No documents found</Text>
                <Text className="text-gray-400 text-center mb-4">
                  Try adjusting your search or filters
                </Text>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onPress={() => {
                    setSearchQuery('');
                    setSelectedCategory(null);
                  }}
                >
                  Clear Filters
                </Button>
              </>
            ) : (
              <>
                <Ionicons name="document-text" size={48} color="#d1d5db" />
                <Text className="text-gray-500 text-lg mb-4">No documents added yet</Text>
                <Button 
                  variant="primary" 
                  onPress={handleAddDocument}
                >
                  Add Your First Document
                </Button>
              </>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default DocumentListScreen;
