import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import { authService } from '../../services/auth/AuthService';
import { RootStackParamList } from '../../navigation/AppNavigator';

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

const RegisterScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // Validate inputs
    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setError(null);
    setLoading(true);
    
    try {
      const response = await authService.register(name, email, password);
      
      if (response.error || !response.data) {
        setError(response.error || 'Registration failed');
        return;
      }
      
      // Navigate to Home on successful registration
      navigation.replace('Home');
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView contentContainerClassName="flex-grow">
        <View className="flex-1 justify-center p-6">
          <View className="mb-8 items-center">
            <Text className="text-3xl font-bold text-gray-800 mb-2">HomeSync India</Text>
            <Text className="text-gray-600 text-center">Create your account</Text>
          </View>
          
          <Card className="mb-6">
            {error && (
              <View className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <Text className="text-red-600">{error}</Text>
              </View>
            )}
            
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              autoCapitalize="words"
              value={name}
              onChangeText={setName}
              className="mb-4"
            />
            
            <Input
              label="Email"
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              className="mb-4"
            />
            
            <Input
              label="Password"
              placeholder="Create a password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              className="mb-4"
            />
            
            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              className="mb-6"
            />
            
            <Button
              variant="primary"
              size="lg"
              onPress={handleRegister}
              loading={loading}
              disabled={loading}
              className="w-full mb-4"
            >
              Create Account
            </Button>
          </Card>
          
          <View className="flex-row justify-center">
            <Text className="text-gray-600">Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text className="text-primary font-medium">Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
