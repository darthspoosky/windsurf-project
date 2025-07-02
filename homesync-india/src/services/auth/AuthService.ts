import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiResponse, AuthResponse, User } from '../api/types';

/**
 * AuthService handles user authentication, registration, and session management
 */
export class AuthService {
  private readonly AUTH_TOKEN_KEY = '@HomeSync:authToken';
  private readonly REFRESH_TOKEN_KEY = '@HomeSync:refreshToken';
  private readonly USER_KEY = '@HomeSync:user';
  
  /**
   * Login with email and password
   */
  async login(email: string, password: string): Promise<ApiResponse<AuthResponse>> {
    try {
      // This is a placeholder. In a real app, this would make an API call to your backend
      console.log('Logging in with:', { email, password });
      
      // Mock successful login response
      const mockResponse: AuthResponse = {
        user: {
          id: 'user123',
          name: 'Test User',
          email: email,
          role: 'owner',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        token: 'mock-auth-token',
        refreshToken: 'mock-refresh-token'
      };
      
      // Store auth data in AsyncStorage
      await this.saveAuthData(mockResponse);
      
      return {
        data: mockResponse,
        status: 200
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Login failed',
        status: 401
      };
    }
  }
  
  /**
   * Register a new user
   */
  async register(name: string, email: string, password: string): Promise<ApiResponse<AuthResponse>> {
    try {
      // This is a placeholder. In a real app, this would make an API call to your backend
      console.log('Registering:', { name, email, password });
      
      // Mock successful registration response
      const mockResponse: AuthResponse = {
        user: {
          id: 'new-user-' + Date.now(),
          name: name,
          email: email,
          role: 'owner',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        token: 'mock-auth-token',
        refreshToken: 'mock-refresh-token'
      };
      
      // Store auth data in AsyncStorage
      await this.saveAuthData(mockResponse);
      
      return {
        data: mockResponse,
        status: 201
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Registration failed',
        status: 400
      };
    }
  }
  
  /**
   * Logout the current user
   */
  async logout(): Promise<void> {
    try {
      // Clear all auth data from AsyncStorage
      await AsyncStorage.multiRemove([
        this.AUTH_TOKEN_KEY,
        this.REFRESH_TOKEN_KEY,
        this.USER_KEY
      ]);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }
  
  /**
   * Check if the user is logged in
   */
  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await AsyncStorage.getItem(this.AUTH_TOKEN_KEY);
      return !!token;
    } catch (error) {
      console.error('Auth check error:', error);
      return false;
    }
  }
  
  /**
   * Get the current authenticated user
   */
  async getCurrentUser(): Promise<User | null> {
    try {
      const userJson = await AsyncStorage.getItem(this.USER_KEY);
      if (userJson) {
        return JSON.parse(userJson) as User;
      }
      return null;
    } catch (error) {
      console.error('Get user error:', error);
      return null;
    }
  }
  
  /**
   * Get the current auth token
   */
  async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(this.AUTH_TOKEN_KEY);
    } catch (error) {
      console.error('Get token error:', error);
      return null;
    }
  }
  
  /**
   * Save authentication data to AsyncStorage
   */
  private async saveAuthData(authResponse: AuthResponse): Promise<void> {
    try {
      const { token, refreshToken, user } = authResponse;
      
      // Store all auth data in AsyncStorage
      await AsyncStorage.setItem(this.AUTH_TOKEN_KEY, token);
      await AsyncStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
      await AsyncStorage.setItem(this.USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Save auth data error:', error);
      throw error;
    }
  }
}

// Export a singleton instance
export const authService = new AuthService();
export default authService;
