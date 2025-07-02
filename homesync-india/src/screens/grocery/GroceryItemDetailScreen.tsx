import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView, 
  TextInput,
  Alert 
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { GroceryItem } from '../../services/api/types';

type GroceryItemDetailRouteProp = RouteProp<RootStackParamList, 'GroceryItemDetail'>;
type GroceryItemDetailNavigationProp = StackNavigationProp<RootStackParamList, 'GroceryItemDetail'>;

// Mock data for grocery items (same as in GroceryListScreen)
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

// Available categories and units for selection
const categories = ['Dairy', 'Bakery', 'Vegetables', 'Fruits', 'Meat', 'Seafood', 'Beverages', 'Snacks', 'Canned', 'Dry Goods', 'Frozen', 'Household', 'Other'];
const units = ['item', 'kg', 'g', 'litre', 'ml', 'dozen', 'count', 'pack', 'box', 'bottle', 'can', 'loaf'];

const GroceryItemDetailScreen = () => {
  const route = useRoute<GroceryItemDetailRouteProp>();
  const navigation = useNavigation<GroceryItemDetailNavigationProp>();
  const { itemId } = route.params;
  
  const [item, setItem] = useState<GroceryItem | null>(null);
  const [isEditing, setIsEditing] = useState(itemId === 'new');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [unit, setUnit] = useState('item');
  const [category, setCategory] = useState('Other');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showUnitPicker, setShowUnitPicker] = useState(false);

  useEffect(() => {
    // In a real app, we would fetch item details from an API
    // For now, we'll use mock data
    if (itemId === 'new') {
      setItem(null);
      setIsEditing(true);
      setLoading(false);
      navigation.setOptions({ headerTitle: 'Add New Item' });
    } else {
      const groceryItem = mockGroceryItems.find(i => i.id === itemId) || null;
      
      if (groceryItem) {
        setItem(groceryItem);
        setName(groceryItem.name);
        setQuantity(groceryItem.quantity.toString());
        setUnit(groceryItem.unit);
        setCategory(groceryItem.category);
        setNotes(groceryItem.notes || '');
        
        navigation.setOptions({ headerTitle: groceryItem.name });
      }
      
      setLoading(false);
    }
  }, [itemId, navigation]);

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a name for the item');
      return;
    }
    
    if (isNaN(Number(quantity)) || Number(quantity) <= 0) {
      Alert.alert('Error', 'Please enter a valid quantity');
      return;
    }
    
    const updatedItem: GroceryItem = {
      id: item?.id || `new-${Date.now()}`,
      name: name.trim(),
      quantity: Number(quantity),
      unit,
      category,
      isCompleted: item?.isCompleted || false,
      notes: notes.trim(),
      createdAt: item?.createdAt || new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    
    // In a real app, we would save to the backend
    Alert.alert(
      'Success',
      `Item ${itemId === 'new' ? 'added' : 'updated'} successfully`,
      [{ 
        text: 'OK',
        onPress: () => navigation.goBack()
      }]
    );
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            // In a real app, we would delete from backend
            navigation.goBack();
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView contentContainerClassName="p-4">
        {/* Toggle Edit/View Mode */}
        {!isEditing && item && (
          <Button
            variant="outline"
            className="mb-6 self-end"
            onPress={() => setIsEditing(true)}
          >
            <View className="flex-row items-center">
              <Ionicons name="create-outline" size={18} color="#6366f1" />
              <Text className="text-primary ml-1">Edit Item</Text>
            </View>
          </Button>
        )}
        
        <Card className="mb-6">
          {isEditing ? (
            // Edit Mode
            <>
              <View className="mb-4">
                <Text className="text-gray-600 mb-1">Item Name *</Text>
                <TextInput
                  className="bg-white border border-gray-300 rounded-lg px-4 py-2"
                  placeholder="Enter item name"
                  value={name}
                  onChangeText={setName}
                />
              </View>
              
              <View className="flex-row mb-4">
                <View className="flex-1 mr-2">
                  <Text className="text-gray-600 mb-1">Quantity *</Text>
                  <TextInput
                    className="bg-white border border-gray-300 rounded-lg px-4 py-2"
                    placeholder="Enter quantity"
                    value={quantity}
                    onChangeText={setQuantity}
                    keyboardType="numeric"
                  />
                </View>
                
                <View className="flex-1">
                  <Text className="text-gray-600 mb-1">Unit</Text>
                  <TouchableOpacity
                    className="bg-white border border-gray-300 rounded-lg px-4 py-2 flex-row justify-between items-center"
                    onPress={() => {
                      setShowUnitPicker(!showUnitPicker);
                      setShowCategoryPicker(false);
                    }}
                  >
                    <Text>{unit}</Text>
                    <Ionicons name="chevron-down" size={18} color="#666" />
                  </TouchableOpacity>
                </View>
              </View>
              
              {showUnitPicker && (
                <View className="mb-4 bg-white border border-gray-300 rounded-lg p-2 max-h-40">
                  <ScrollView>
                    {units.map((u) => (
                      <TouchableOpacity
                        key={u}
                        className={`p-2 ${u === unit ? 'bg-gray-100' : ''}`}
                        onPress={() => {
                          setUnit(u);
                          setShowUnitPicker(false);
                        }}
                      >
                        <Text className={`${u === unit ? 'text-primary' : 'text-gray-800'}`}>
                          {u}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
              
              <View className="mb-4">
                <Text className="text-gray-600 mb-1">Category</Text>
                <TouchableOpacity
                  className="bg-white border border-gray-300 rounded-lg px-4 py-2 flex-row justify-between items-center"
                  onPress={() => {
                    setShowCategoryPicker(!showCategoryPicker);
                    setShowUnitPicker(false);
                  }}
                >
                  <Text>{category}</Text>
                  <Ionicons name="chevron-down" size={18} color="#666" />
                </TouchableOpacity>
              </View>
              
              {showCategoryPicker && (
                <View className="mb-4 bg-white border border-gray-300 rounded-lg p-2 max-h-40">
                  <ScrollView>
                    {categories.map((c) => (
                      <TouchableOpacity
                        key={c}
                        className={`p-2 ${c === category ? 'bg-gray-100' : ''}`}
                        onPress={() => {
                          setCategory(c);
                          setShowCategoryPicker(false);
                        }}
                      >
                        <Text className={`${c === category ? 'text-primary' : 'text-gray-800'}`}>
                          {c}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
              
              <View className="mb-4">
                <Text className="text-gray-600 mb-1">Notes</Text>
                <TextInput
                  className="bg-white border border-gray-300 rounded-lg px-4 py-2"
                  placeholder="Add notes (optional)"
                  value={notes}
                  onChangeText={setNotes}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />
              </View>
              
              <View className="flex-row">
                <Button
                  variant="primary"
                  className="flex-1 mr-2"
                  onPress={handleSave}
                >
                  Save
                </Button>
                
                <Button
                  variant="outline"
                  className="flex-1"
                  onPress={() => {
                    if (item) {
                      // Reset to original values
                      setName(item.name);
                      setQuantity(item.quantity.toString());
                      setUnit(item.unit);
                      setCategory(item.category);
                      setNotes(item.notes || '');
                      setIsEditing(false);
                    } else {
                      // For new items, go back
                      navigation.goBack();
                    }
                  }}
                >
                  Cancel
                </Button>
              </View>
            </>
          ) : (
            // View Mode
            <>
              <View className="mb-4 flex-row items-center">
                <TouchableOpacity
                  onPress={() => {
                    if (item) {
                      const updatedItem = { 
                        ...item, 
                        isCompleted: !item.isCompleted,
                        updatedAt: new Date().toISOString().split('T')[0]
                      };
                      setItem(updatedItem);
                    }
                  }}
                  className={`h-6 w-6 rounded-full border border-gray-300 mr-3 items-center justify-center ${
                    item?.isCompleted ? 'bg-primary border-primary' : 'bg-white'
                  }`}
                >
                  {item?.isCompleted && (
                    <Ionicons name="checkmark" size={16} color="#fff" />
                  )}
                </TouchableOpacity>
                
                <Text className={`text-xl font-bold ${
                  item?.isCompleted ? 'text-gray-400 line-through' : 'text-gray-800'
                }`}>
                  {item?.name}
                </Text>
              </View>
              
              <View className="mb-3">
                <Text className="text-gray-500 text-sm">Quantity</Text>
                <Text className="text-gray-800 text-lg">{item?.quantity} {item?.unit}</Text>
              </View>
              
              <View className="mb-3">
                <Text className="text-gray-500 text-sm">Category</Text>
                <Text className="text-gray-800 text-lg">{item?.category}</Text>
              </View>
              
              {item?.notes && (
                <View>
                  <Text className="text-gray-500 text-sm">Notes</Text>
                  <Text className="text-gray-800">{item?.notes}</Text>
                </View>
              )}
            </>
          )}
        </Card>
        
        {!isEditing && item && (
          <>
            <Card className="mb-6">
              <Text className="text-lg font-bold text-gray-800 mb-3">Quick Actions</Text>
              
              <View className="flex-row flex-wrap">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mr-2 mb-2" 
                  onPress={() => {
                    setQuantity((parseInt(quantity) + 1).toString());
                    if (!isEditing) setIsEditing(true);
                  }}
                >
                  <View className="flex-row items-center">
                    <Ionicons name="add-circle-outline" size={16} color="#6366f1" />
                    <Text className="text-primary ml-1">Increase Qty</Text>
                  </View>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mb-2" 
                  onPress={() => {
                    const newQty = Math.max(1, parseInt(quantity) - 1);
                    setQuantity(newQty.toString());
                    if (!isEditing) setIsEditing(true);
                  }}
                >
                  <View className="flex-row items-center">
                    <Ionicons name="remove-circle-outline" size={16} color="#6366f1" />
                    <Text className="text-primary ml-1">Decrease Qty</Text>
                  </View>
                </Button>
              </View>
            </Card>
            
            <Button
              variant="outline"
              size="md"
              className="mb-6"
              onPress={handleDelete}
            >
              <View className="flex-row items-center">
                <Ionicons name="trash-outline" size={18} color="rgb(239, 68, 68)" />
                <Text className="text-red-500 ml-1">Delete Item</Text>
              </View>
            </Button>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default GroceryItemDetailScreen;
