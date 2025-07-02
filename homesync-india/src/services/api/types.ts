// API Response Types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

// AI Provider Types
export type AIProvider = 'openai' | 'gemini' | 'claude';

export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AICompletionRequest {
  messages: AIMessage[];
  provider: AIProvider;
  options?: {
    temperature?: number;
    maxTokens?: number;
  };
}

export interface AICompletionResponse {
  content: string;
  provider: AIProvider;
  usage?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
  };
}

// User & Auth Types
export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  familyId?: string;
  role: 'owner' | 'member' | 'guest';
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// Staff Management Types
export interface StaffMember {
  id: string;
  name: string;
  phoneNumber: string;
  role: string;
  salary: number;
  joiningDate: string;
  documents?: Document[];
  attendance?: Attendance[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Attendance {
  id: string;
  staffId: string;
  date: string;
  status: 'present' | 'absent' | 'half-day' | 'leave';
  notes?: string;
}

// Bill Management Types
export interface Bill {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  category: string;
  status: 'paid' | 'unpaid' | 'overdue';
  recurringType?: 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  documentId?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Document Types
export interface Document {
  id: string;
  title: string;
  fileUrl: string;
  fileType: string;
  category: string;
  tags?: string[];
  expiryDate?: string;
  createdAt: string;
  updatedAt: string;
}

// Grocery Types
export interface GroceryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  isCompleted: boolean;
  notes?: string;
}

export interface GroceryList {
  id: string;
  title: string;
  items: GroceryItem[];
  createdAt: string;
  updatedAt: string;
}

// Calendar/Event Types
export interface Event {
  id: string;
  title: string;
  startDate: string;
  endDate?: string;
  allDay: boolean;
  location?: string;
  description?: string;
  reminderTime?: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}
