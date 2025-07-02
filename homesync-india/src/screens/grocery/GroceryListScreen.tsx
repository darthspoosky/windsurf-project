import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView, 
  TextInput,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { GroceryItem } from '../../services/api/types';

type GroceryListNavigationProp = StackNavigationProp<RootStackParamList, 'GroceryList'>;

// Mock data for grocery items
const mockGroceryItems: GroceryItem[] = [
  {
    id: '1',
    name: 'Milk',
    quantity: 2,
    unit: 'litre',
    category: 'Dairy',
    isCompleted: false,
    notes: 'Full fat',
    createdAt: '2025-07-01',
    updatedAt: '2025-07-01',
  },
  {
    id: '2',
    name: 'Bread',
    quantity: 1,
    unit: 'loaf',
    category: 'Bakery',
    isCompleted: false,
    notes: 'Whole wheat',
    createdAt: '2025-07-01',
    updatedAt: '2025-07-01',
  },
  {
    id: '3',
    name: 'Eggs',
    quantity: 12,
    unit: 'count',
    category: 'Dairy',
    isCompleted: true,
    notes: 'Free-range',
    createdAt: '2025-07-01',
    updatedAt: '2025-07-01',
  },
  {
    id: '4',
    name: 'Tomatoes',
    quantity: 500,
    unit: 'g',
    category: 'Vegetables',
    isCompleted: false,
    notes: '',
    createdAt: '2025-07-01',
    updatedAt: '2025-07-01',
  },
  {
    id: '5',
    name: 'Chicken',
    quantity: 1,
    unit: 'kg',
    category: 'Meat',
    isCompleted: true,
    notes: 'Boneless',
    createdAt: '2025-07-01',
    updatedAt: '2025-07-01',
  },
];

const GroceryListScreen = () => {
  const navigation = useNavigation<GroceryListNavigationProp>();
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>(mockGroceryItems);
  const [newItem, setNewItem] = useState('');
  const [showCompleted, setShowCompleted] = useState(true);
  
  const filteredItems = groceryItems.filter(item => showCompleted || !item.isCompleted);
  
  const handleAddItem = () => {
    if (newItem.trim()) {
      const item: GroceryItem = {
        id: `${Date.now()}`,
        name: newItem.trim(),
        quantity: 1,
        unit: 'item',
        category: 'Other',
        isCompleted: false,
        notes: '',
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      };
      
      setGroceryItems([item, ...groceryItems]);
      setNewItem('');
    }
  };
  
  const handleToggleComplete = (id: string) => {
    setGroceryItems(groceryItems.map(item => 
      item.id === id 
        ? { 
            ...item, 
            isCompleted: !item.isCompleted,
            updatedAt: new Date().toISOString().split('T')[0]
          } 
        : item
    ));
  };
  
  const handleDeleteItem = (id: string) => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            setGroceryItems(groceryItems.filter(item => item.id !== id));
          }
        }
      ]
    );
  };

  const renderGroceryItem = ({ item }: { item: GroceryItem }) => {
    return (
      <Card className="mb-3">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => handleToggleComplete(item.id)}
            className={`h-6 w-6 rounded-full border border-gray-300 mr-3 items-center justify-center ${
              item.isCompleted ? 'bg-primary border-primary' : 'bg-white'
            }`}
          >
            {item.isCompleted && (
              <Ionicons name="checkmark" size={16} color="#fff" />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 flex-row items-center"
            onPress={() => navigation.navigate('GroceryItemDetail', { itemId: item.id })}
          >
            <View className="flex-1">
              <Text className={`font-medium text-lg ${
                item.isCompleted ? 'text-gray-400 line-through' : 'text-gray-800'
              }`}>
                {item.name}
              </Text>
              
              <Text className={`text-sm ${
                item.isCompleted ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {item.quantity} {item.unit} • {item.category}
                {item.notes ? ` • ${item.notes}` : ''}
              </Text>
            </View>
            
            <TouchableOpacity
              className="p-2"
              onPress={() => handleDeleteItem(item.id)}
            >
              <Ionicons name="trash-outline" size={20} color="#ef4444" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </Card>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 p-4">
        <View className="mb-6 flex-row justify-between items-center">
          <Text className="text-2xl font-bold text-gray-800">Grocery List</Text>
          <Button 
            variant="primary" 
            size="sm" 
            onPress={() => navigation.navigate('GroceryCategories')}
          >
            Categories
          </Button>
        </View>
        
        {/* Add new item */}
        <View className="flex-row mb-6">
          <TextInput
            className="flex-1 bg-white border border-gray-300 rounded-l-lg px-4 py-2"
            placeholder="Add grocery item..."
            value={newItem}
            onChangeText={setNewItem}
            returnKeyType="done"
            onSubmitEditing={handleAddItem}
          />
          <TouchableOpacity
            className="bg-primary px-4 items-center justify-center rounded-r-lg"
            onPress={handleAddItem}
          >
            <Ionicons name="add" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        
        {/* Filter toggle */}
        <View className="flex-row justify-end mb-4">
          <TouchableOpacity 
            className="flex-row items-center"
            onPress={() => setShowCompleted(!showCompleted)}
          >
            <View className={`h-5 w-5 rounded border mr-2 items-center justify-center ${
              showCompleted ? 'bg-primary border-primary' : 'bg-white border-gray-300'
            }`}>
              {showCompleted && <Ionicons name="checkmark" size={12} color="#fff" />}
            </View>
            <Text className="text-gray-700">Show completed items</Text>
          </TouchableOpacity>
        </View>
        
        {/* Grocery list */}
        {filteredItems.length > 0 ? (
          <FlatList
            data={filteredItems}
            keyExtractor={(item) => item.id}
            renderItem={renderGroceryItem}
            showsVerticalScrollIndicator={false}
            contentContainerClassName="pb-4"
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-500 text-lg mb-4">Your grocery list is empty</Text>
            <Button 
              variant="primary" 
              onPress={() => setNewItem('Milk')}
            >
              Add Some Items
            </Button>
          </View>
        )}
        
        {/* Summary footer */}
        <Card className="mt-4">
          <View className="flex-row justify-between items-center">
            <Text className="font-medium text-gray-700">Items remaining</Text>
            <Text className="font-bold text-lg text-primary">{
              groceryItems.filter(item => !item.isCompleted).length
            }</Text>
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
};

export default GroceryListScreen;
