import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Switch,
  Alert 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { RootStackParamList } from '../../navigation/AppNavigator';

type AISettingsNavigationProp = StackNavigationProp<RootStackParamList, 'AISettings'>;

// Default AI settings
const defaultSettings = {
  aiProvider: 'openai', // 'openai', 'gemini', 'claude'
  model: 'gpt-4',
  temperature: 0.7,
  maxTokens: 1000,
  useVoiceCommands: true,
  rememberConversations: true,
  personalizedResponses: true,
  proactiveAssistance: false,
  privacyMode: false, // If true, no data sent to AI provider servers
  apiKey: '', // User's API key if they want to use their own
};

const AISettingsScreen = () => {
  const navigation = useNavigation<AISettingsNavigationProp>();
  const [settings, setSettings] = useState(defaultSettings);
  
  // Models available for each provider
  const models = {
    openai: [
      { id: 'gpt-4', name: 'GPT-4', description: 'Most advanced OpenAI model with wider knowledge and reasoning' },
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', description: 'Fast and efficient for most tasks' },
    ],
    gemini: [
      { id: 'gemini-pro', name: 'Gemini Pro', description: 'Google\'s most advanced model' },
      { id: 'gemini-lite', name: 'Gemini Lite', description: 'Optimized for mobile devices' },
    ],
    claude: [
      { id: 'claude-3-opus', name: 'Claude 3 Opus', description: 'Anthropic\'s most capable model' },
      { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', description: 'Balanced performance and efficiency' },
    ],
  };
  
  const temperatures = [
    { value: 0.3, label: 'Focused (0.3)', description: 'More precise, consistent responses' },
    { value: 0.7, label: 'Balanced (0.7)', description: 'Mix of creativity and consistency' },
    { value: 1.0, label: 'Creative (1.0)', description: 'More varied, creative responses' },
  ];
  
  const tokenLimits = [
    { value: 500, label: '500 tokens', description: 'Short responses, saves data' },
    { value: 1000, label: '1000 tokens', description: 'Medium-length responses' },
    { value: 2000, label: '2000 tokens', description: 'Detailed responses' },
  ];
  
  const handleProviderChange = (provider: 'openai' | 'gemini' | 'claude') => {
    // When provider changes, also update the model to the first one for that provider
    const firstModel = models[provider][0].id;
    setSettings({
      ...settings,
      aiProvider: provider,
      model: firstModel,
    });
  };
  
  const handleModelChange = (model: string) => {
    setSettings({
      ...settings,
      model,
    });
  };
  
  const handleTemperatureChange = (temp: number) => {
    setSettings({
      ...settings,
      temperature: temp,
    });
  };
  
  const handleMaxTokensChange = (tokens: number) => {
    setSettings({
      ...settings,
      maxTokens: tokens,
    });
  };
  
  const handleToggleSetting = (setting: keyof typeof settings) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting as keyof typeof settings],
    });
  };
  
  const handleSaveSettings = () => {
    // In a real app, this would save to persistent storage and update the AI service
    Alert.alert(
      'Settings Saved',
      'Your AI assistant settings have been updated successfully.',
      [{ text: 'OK' }]
    );
  };
  
  const handleSetAPIKey = () => {
    // In a real app, this would show a secure input for API key
    Alert.alert(
      'Set API Key',
      'In a real app, this would securely store your personal API key.',
      [{ text: 'OK' }]
    );
  };
  
  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'openai': return 'aperture-outline';
      case 'gemini': return 'logo-google';
      case 'claude': return 'at-circle-outline';
      default: return 'chatbubble-outline';
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView contentContainerClassName="p-4 pb-8">
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-800">AI Assistant Settings</Text>
          <Text className="text-gray-500 mt-1">
            Customize how your AI assistant works and responds
          </Text>
        </View>
        
        {/* AI Provider Selection */}
        <Card className="mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">AI Provider</Text>
          
          <View className="flex-row mb-2">
            <TouchableOpacity
              className={`flex-1 p-3 rounded-lg mr-2 ${
                settings.aiProvider === 'openai' ? 'bg-primary' : 'bg-gray-200'
              }`}
              onPress={() => handleProviderChange('openai')}
            >
              <View className="items-center">
                <Ionicons 
                  name={getProviderIcon('openai')} 
                  size={24} 
                  color={settings.aiProvider === 'openai' ? '#fff' : '#374151'} 
                />
                <Text className={`mt-1 font-medium ${settings.aiProvider === 'openai' ? 'text-white' : 'text-gray-700'}`}>
                  OpenAI
                </Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity
              className={`flex-1 p-3 rounded-lg mr-2 ${
                settings.aiProvider === 'gemini' ? 'bg-primary' : 'bg-gray-200'
              }`}
              onPress={() => handleProviderChange('gemini')}
            >
              <View className="items-center">
                <Ionicons 
                  name={getProviderIcon('gemini')} 
                  size={24} 
                  color={settings.aiProvider === 'gemini' ? '#fff' : '#374151'} 
                />
                <Text className={`mt-1 font-medium ${settings.aiProvider === 'gemini' ? 'text-white' : 'text-gray-700'}`}>
                  Gemini
                </Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity
              className={`flex-1 p-3 rounded-lg ${
                settings.aiProvider === 'claude' ? 'bg-primary' : 'bg-gray-200'
              }`}
              onPress={() => handleProviderChange('claude')}
            >
              <View className="items-center">
                <Ionicons 
                  name={getProviderIcon('claude')} 
                  size={24} 
                  color={settings.aiProvider === 'claude' ? '#fff' : '#374151'} 
                />
                <Text className={`mt-1 font-medium ${settings.aiProvider === 'claude' ? 'text-white' : 'text-gray-700'}`}>
                  Claude
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity
            className="bg-gray-200 rounded-lg p-3 flex-row justify-between items-center"
            onPress={handleSetAPIKey}
          >
            <View>
              <Text className="font-medium text-gray-800">Use Your Own API Key</Text>
              <Text className="text-gray-500 text-sm">Add your personal API key for this provider</Text>
            </View>
            <Ionicons name="key-outline" size={24} color="#374151" />
          </TouchableOpacity>
        </Card>
        
        {/* Model Selection */}
        <Card className="mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">AI Model</Text>
          
          {models[settings.aiProvider as keyof typeof models].map((model) => (
            <TouchableOpacity
              key={model.id}
              className={`mb-3 p-3 rounded-lg ${
                settings.model === model.id ? 'bg-primary bg-opacity-10 border border-primary' : 'bg-white border border-gray-200'
              }`}
              onPress={() => handleModelChange(model.id)}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className={`font-medium ${settings.model === model.id ? 'text-primary' : 'text-gray-800'}`}>
                    {model.name}
                  </Text>
                  <Text className="text-gray-500 text-sm mt-1">{model.description}</Text>
                </View>
                
                {settings.model === model.id && (
                  <Ionicons name="checkmark-circle" size={24} color="#6366f1" />
                )}
              </View>
            </TouchableOpacity>
          ))}
          
          <View className="bg-yellow-50 rounded-lg p-3 mt-2">
            <Text className="text-yellow-800 text-sm">
              Note: Different models may have different capabilities and response styles.
            </Text>
          </View>
        </Card>
        
        {/* Response Settings */}
        <Card className="mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">Response Settings</Text>
          
          <Text className="font-medium text-gray-700 mb-2">Temperature (Creativity)</Text>
          <View className="mb-4">
            {temperatures.map((temp) => (
              <TouchableOpacity
                key={temp.value}
                className={`mb-2 p-3 rounded-lg ${
                  settings.temperature === temp.value ? 'bg-primary bg-opacity-10 border border-primary' : 'bg-white border border-gray-200'
                }`}
                onPress={() => handleTemperatureChange(temp.value)}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <Text className={`font-medium ${settings.temperature === temp.value ? 'text-primary' : 'text-gray-800'}`}>
                      {temp.label}
                    </Text>
                    <Text className="text-gray-500 text-sm">{temp.description}</Text>
                  </View>
                  
                  {settings.temperature === temp.value && (
                    <Ionicons name="checkmark-circle" size={24} color="#6366f1" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
          
          <Text className="font-medium text-gray-700 mb-2">Maximum Response Length</Text>
          <View>
            {tokenLimits.map((limit) => (
              <TouchableOpacity
                key={limit.value}
                className={`mb-2 p-3 rounded-lg ${
                  settings.maxTokens === limit.value ? 'bg-primary bg-opacity-10 border border-primary' : 'bg-white border border-gray-200'
                }`}
                onPress={() => handleMaxTokensChange(limit.value)}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <Text className={`font-medium ${settings.maxTokens === limit.value ? 'text-primary' : 'text-gray-800'}`}>
                      {limit.label}
                    </Text>
                    <Text className="text-gray-500 text-sm">{limit.description}</Text>
                  </View>
                  
                  {settings.maxTokens === limit.value && (
                    <Ionicons name="checkmark-circle" size={24} color="#6366f1" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Card>
        
        {/* Features */}
        <Card className="mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">Features</Text>
          
          <View className="mb-4">
            <View className="flex-row justify-between items-center mb-1">
              <View className="flex-1">
                <Text className="font-medium text-gray-800">Voice Commands</Text>
                <Text className="text-gray-500 text-sm">Talk to your AI assistant using your voice</Text>
              </View>
              <Switch
                value={settings.useVoiceCommands}
                onValueChange={() => handleToggleSetting('useVoiceCommands')}
                trackColor={{ false: '#d1d5db', true: '#c7d2fe' }}
                thumbColor={settings.useVoiceCommands ? '#6366f1' : '#f3f4f6'}
              />
            </View>
          </View>
          
          <View className="mb-4">
            <View className="flex-row justify-between items-center mb-1">
              <View className="flex-1">
                <Text className="font-medium text-gray-800">Remember Conversations</Text>
                <Text className="text-gray-500 text-sm">Assistant recalls previous interactions</Text>
              </View>
              <Switch
                value={settings.rememberConversations}
                onValueChange={() => handleToggleSetting('rememberConversations')}
                trackColor={{ false: '#d1d5db', true: '#c7d2fe' }}
                thumbColor={settings.rememberConversations ? '#6366f1' : '#f3f4f6'}
              />
            </View>
          </View>
          
          <View className="mb-4">
            <View className="flex-row justify-between items-center mb-1">
              <View className="flex-1">
                <Text className="font-medium text-gray-800">Personalized Responses</Text>
                <Text className="text-gray-500 text-sm">Tailor responses based on your preferences</Text>
              </View>
              <Switch
                value={settings.personalizedResponses}
                onValueChange={() => handleToggleSetting('personalizedResponses')}
                trackColor={{ false: '#d1d5db', true: '#c7d2fe' }}
                thumbColor={settings.personalizedResponses ? '#6366f1' : '#f3f4f6'}
              />
            </View>
          </View>
          
          <View>
            <View className="flex-row justify-between items-center mb-1">
              <View className="flex-1">
                <Text className="font-medium text-gray-800">Proactive Assistance</Text>
                <Text className="text-gray-500 text-sm">Suggest actions based on your household patterns</Text>
              </View>
              <Switch
                value={settings.proactiveAssistance}
                onValueChange={() => handleToggleSetting('proactiveAssistance')}
                trackColor={{ false: '#d1d5db', true: '#c7d2fe' }}
                thumbColor={settings.proactiveAssistance ? '#6366f1' : '#f3f4f6'}
              />
            </View>
          </View>
        </Card>
        
        {/* Privacy */}
        <Card className="mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">Privacy</Text>
          
          <View>
            <View className="flex-row justify-between items-center mb-1">
              <View className="flex-1">
                <Text className="font-medium text-gray-800">Privacy Mode</Text>
                <Text className="text-gray-500 text-sm">Process data on-device when possible, with reduced capabilities</Text>
              </View>
              <Switch
                value={settings.privacyMode}
                onValueChange={() => handleToggleSetting('privacyMode')}
                trackColor={{ false: '#d1d5db', true: '#c7d2fe' }}
                thumbColor={settings.privacyMode ? '#6366f1' : '#f3f4f6'}
              />
            </View>
          </View>
          
          <TouchableOpacity
            className="bg-red-50 rounded-lg p-3 mt-4 flex-row justify-between items-center"
            onPress={() => {
              Alert.alert(
                'Clear Data',
                'Are you sure you want to clear all conversation history and personalized data?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { 
                    text: 'Clear All Data', 
                    style: 'destructive',
                    onPress: () => Alert.alert('Data Cleared', 'All AI conversation history has been removed.') 
                  }
                ]
              );
            }}
          >
            <Text className="font-medium text-red-600">Clear All Conversation History</Text>
            <Ionicons name="trash-outline" size={20} color="#dc2626" />
          </TouchableOpacity>
        </Card>
        
        {/* Save Button */}
        <Button 
          variant="primary" 
          className="mb-2"
          onPress={handleSaveSettings}
        >
          Save Settings
        </Button>
        
        <Button 
          variant="outline" 
          onPress={() => navigation.goBack()}
        >
          Cancel
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AISettingsScreen;
