import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text, Card, Button, TextInput, useTheme, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
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

  const theme = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text variant="headlineMedium" style={styles.title}>HomeSync India</Text>
            <Text variant="bodyMedium" style={styles.subtitle}>Create your account</Text>
          </View>
          
          <Card style={styles.card}>
            <Card.Content>
              {error && (
                <View style={styles.errorContainer}>
                  <Text style={{ color: theme.colors.error }}>{error}</Text>
                </View>
              )}
              
              <TextInput
                label="Full Name"
                placeholder="Enter your full name"
                autoCapitalize="words"
                value={name}
                onChangeText={setName}
                mode="outlined"
                style={styles.input}
              />
              
              <TextInput
                label="Email"
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                style={styles.input}
              />
              
              <TextInput
                label="Password"
                placeholder="Create a password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                style={styles.input}
              />
              
              <TextInput
                label="Confirm Password"
                placeholder="Confirm your password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                mode="outlined"
                style={styles.input}
              />
              
              <Button
                mode="contained"
                onPress={handleRegister}
                disabled={loading}
                style={styles.registerButton}
                labelStyle={styles.buttonText}
              >
                {loading ? <ActivityIndicator color="white" /> : 'Create Account'}
              </Button>
            </Card.Content>
          </Card>
          
          <View style={styles.footer}>
            <Text variant="bodyMedium" style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: '#666',
    textAlign: 'center',
  },
  card: {
    marginBottom: 24,
    elevation: 4,
  },
  errorContainer: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#FFEBEE',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  input: {
    marginBottom: 16,
  },
  registerButton: {
    marginVertical: 8,
    paddingVertical: 6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  footerText: {
    color: '#666',
  },
});

export default RegisterScreen;
