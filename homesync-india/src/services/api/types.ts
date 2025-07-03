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
  name: string; // Adding name property that's used in DocumentDetailScreen
  fileUrl: string;
  fileType: string;
  fileSize: number; // Adding fileSize property
  path?: string; // Adding path property
  category: string;
  tags?: string[];
  sharedWith: { id: string; name: string; email: string }[]; // Adding sharedWith property
  expiryDate?: string;
  uploadDate: string; // Adding uploadDate property
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
  createdAt: string; // Adding createdAt property used in GroceryItemDetailScreen
  updatedAt: string; // Adding updatedAt property used in GroceryListScreen
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
  date: string;            // Changed from startDate to match CalendarScreen usage
  startTime: string | null;  // Added to match CalendarScreen usage
  endTime: string | null;    // Added to match CalendarScreen usage
  location: string;        // Changed from optional to match CalendarScreen usage
  description: string;     // Changed from optional to match CalendarScreen usage
  category: string;
  attendees: string[];     // Added to match CalendarScreen usage
  createdAt: string;
  updatedAt: string;
}

// Alias for Event to fix import issues
export type CalendarEvent = Event;

// Vehicle Management Types
export interface Vehicle {
  id: string;
  make?: string;
  name?: string;             // Added name property used in VehicleDetailScreen
  model: string;
  year: number;
  licensePlate?: string;
  registrationNumber?: string; // Added property used in VehicleDetailScreen
  type?: string;             // Added type property used in VehicleDetailScreen (Sedan, SUV, etc.)
  color?: string;
  vinNumber?: string;
  purchaseDate?: string;
  insuranceExpiryDate?: string; // Added property used in VehicleDetailScreen
  pollutionExpiryDate?: string; // Added property used in VehicleDetailScreen
  insuranceDetails?: {
    provider: string;
    policyNumber: string;
    expiryDate: string;
    premium: number;
  };
  serviceHistory: {
    id?: string;
    date: string;
    type?: string;
    description?: string;
    mileage?: number;
    cost: number;
    serviceCenter?: string;
    documents?: Document[];
    odometer?: number;  // Added odometer property used in VehicleDetailScreen
    service?: string;   // Added service property used in VehicleDetailScreen
  }[];
  documents: Document[];
  fuelType: string;
  currentMileage?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Family Management Types
export interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  phone?: string; // Alias for phoneNumber used in some screens
  email?: string;
  address?: string;
  emergencyContact?: {
    name: string;
    phoneNumber: string;
    relationship: string;
  };
  healthDetails?: {
    bloodGroup?: string;
    allergies: string[];
    conditions: string[];
    medications: { name: string; dosage: string; frequency: string; time: string; }[];
  };
  bloodGroup?: string; // Direct access to bloodGroup (not through healthDetails)
  profilePic?: string; // Profile picture URL
  role?: string; // Role in the family (e.g., 'admin')
  documents: Document[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Finance Management Types
export interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense' | 'transfer';
  category: string;
  description?: string;
  date: string;
  paymentMethod?: string;
  account: string; // Added account property used in Finance screens
  relatedBillId?: string;
  relatedDocumentId?: string;
  recurrence?: {
    frequency: 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';
    endDate?: string;
  };
  tags?: string[];
  location?: string;
  createdAt: string;
  updatedAt: string;
}
