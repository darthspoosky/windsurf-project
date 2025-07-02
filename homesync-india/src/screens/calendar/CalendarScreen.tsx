import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { CalendarEvent } from '../../services/api/types';

type CalendarNavigationProp = StackNavigationProp<RootStackParamList, 'Calendar'>;

// Mock data for calendar events
const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Family Dinner',
    date: '2025-07-03',
    startTime: '19:00',
    endTime: '21:00',
    location: 'Home',
    description: 'Monthly family dinner with everyone',
    category: 'Family',
    attendees: ['Mom', 'Dad', 'Sister', 'Brother'],
    createdAt: '2025-06-20',
    updatedAt: '2025-06-20',
  },
  {
    id: '2',
    title: 'Plumber Visit',
    date: '2025-07-03',
    startTime: '10:00',
    endTime: '11:00',
    location: 'Home',
    description: 'Fix bathroom sink leak',
    category: 'Home Maintenance',
    attendees: [],
    createdAt: '2025-06-25',
    updatedAt: '2025-06-25',
  },
  {
    id: '3',
    title: 'Cook Interview',
    date: '2025-07-05',
    startTime: '14:00',
    endTime: '15:00',
    location: 'Home',
    description: 'Interview for new household cook',
    category: 'Staff',
    attendees: ['Dad'],
    createdAt: '2025-06-28',
    updatedAt: '2025-06-28',
  },
  {
    id: '4',
    title: 'Car Service',
    date: '2025-07-10',
    startTime: '09:00',
    endTime: '12:00',
    location: 'AutoCare Service Center',
    description: 'Regular maintenance and oil change',
    category: 'Vehicle',
    attendees: [],
    createdAt: '2025-06-30',
    updatedAt: '2025-06-30',
  },
  {
    id: '5',
    title: 'Pay Property Tax',
    date: '2025-07-15',
    startTime: null,
    endTime: null,
    location: '',
    description: 'Last date for quarterly property tax payment',
    category: 'Finance',
    attendees: [],
    createdAt: '2025-06-30',
    updatedAt: '2025-06-30',
  },
];

// Helper function to group events by date
const groupEventsByDate = (events: CalendarEvent[]): { [key: string]: CalendarEvent[] } => {
  const grouped: { [key: string]: CalendarEvent[] } = {};
  
  events.forEach(event => {
    if (!grouped[event.date]) {
      grouped[event.date] = [];
    }
    grouped[event.date].push(event);
  });
  
  return grouped;
};

const CalendarScreen = () => {
  const navigation = useNavigation<CalendarNavigationProp>();
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [visibleMonth, setVisibleMonth] = useState<Date>(new Date());
  
  const groupedEvents = groupEventsByDate(events);
  const daysInMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1).getDay();
  
  // Generate days for calendar grid
  const calendarDays: Array<{ date: string | null, day: number | null, isCurrentMonth: boolean }> = [];
  
  // Add empty cells for days before the first day of month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push({ date: null, day: null, isCurrentMonth: false });
  }
  
  // Add days of current month
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), i);
    const dateString = date.toISOString().split('T')[0];
    calendarDays.push({ 
      date: dateString, 
      day: i, 
      isCurrentMonth: true 
    });
  }
  
  // Add empty cells to complete the grid (6 rows * 7 columns = 42 cells)
  const remainingCells = 42 - calendarDays.length;
  for (let i = 0; i < remainingCells; i++) {
    calendarDays.push({ date: null, day: null, isCurrentMonth: false });
  }
  
  const isToday = (dateString: string): boolean => {
    const today = new Date().toISOString().split('T')[0];
    return dateString === today;
  };
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      weekday: 'long', 
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  const formatTime = (timeString: string | null): string => {
    if (!timeString) return '';
    
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    
    return `${hour12}:${minutes} ${ampm}`;
  };
  
  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'Family': return 'bg-blue-100 text-blue-800';
      case 'Home Maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'Staff': return 'bg-purple-100 text-purple-800';
      case 'Vehicle': return 'bg-green-100 text-green-800';
      case 'Finance': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const goToNextMonth = () => {
    setVisibleMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1));
  };
  
  const goToPrevMonth = () => {
    setVisibleMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1));
  };
  
  const goToToday = () => {
    const today = new Date();
    setVisibleMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(today.toISOString().split('T')[0]);
  };
  
  const selectedDateEvents = groupedEvents[selectedDate] || [];

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView contentContainerClassName="pb-4">
        <View className="p-4">
          <View className="mb-4 flex-row justify-between items-center">
            <Text className="text-2xl font-bold text-gray-800">Calendar</Text>
            <Button 
              variant="primary" 
              size="sm" 
              onPress={() => navigation.navigate('AddEvent')}
            >
              <View className="flex-row items-center">
                <Ionicons name="add" size={18} color="#fff" />
                <Text className="text-white ml-1">Add Event</Text>
              </View>
            </Button>
          </View>
          
          {/* Month Navigation */}
          <Card className="mb-4">
            <View className="flex-row justify-between items-center mb-4">
              <TouchableOpacity onPress={goToPrevMonth} className="p-2">
                <Ionicons name="chevron-back" size={20} color="#6366f1" />
              </TouchableOpacity>
              
              <Text className="text-lg font-bold text-gray-800">
                {visibleMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </Text>
              
              <TouchableOpacity onPress={goToNextMonth} className="p-2">
                <Ionicons name="chevron-forward" size={20} color="#6366f1" />
              </TouchableOpacity>
            </View>
            
            {/* Days of Week Headers */}
            <View className="flex-row mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                <View key={index} className="flex-1 items-center">
                  <Text className="font-medium text-gray-500">{day}</Text>
                </View>
              ))}
            </View>
            
            {/* Calendar Grid */}
            <View className="flex-row flex-wrap">
              {calendarDays.map((day, index) => (
                <TouchableOpacity
                  key={index}
                  className={`w-1/7 aspect-square items-center justify-center p-1 ${
                    day.date === selectedDate ? 'bg-primary rounded-full' : ''
                  }`}
                  onPress={() => day.date && setSelectedDate(day.date)}
                  disabled={!day.date}
                >
                  {day.day !== null && (
                    <>
                      <Text className={`font-medium ${
                        day.date === selectedDate ? 'text-white' : 
                        isToday(day.date!) ? 'text-primary' : 'text-gray-800'
                      }`}>
                        {day.day}
                      </Text>
                      {day.date && groupedEvents[day.date] && (
                        <View className={`h-1 w-1 rounded-full mt-1 ${
                          day.date === selectedDate ? 'bg-white' : 'bg-primary'
                        }`} />
                      )}
                    </>
                  )}
                </TouchableOpacity>
              ))}
            </View>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2 self-center"
              onPress={goToToday}
            >
              Today
            </Button>
          </Card>
          
          {/* Selected Date Events */}
          <View className="mb-4">
            <Text className="text-xl font-bold text-gray-800 mb-2">
              {formatDate(selectedDate)}
            </Text>
            
            {selectedDateEvents.length > 0 ? (
              selectedDateEvents.map((event) => (
                <TouchableOpacity
                  key={event.id}
                  onPress={() => navigation.navigate('EventDetail', { eventId: event.id })}
                >
                  <Card className="mb-3">
                    <View className="flex-row justify-between items-start">
                      <View className="flex-1">
                        <Text className="font-bold text-lg text-gray-800">
                          {event.title}
                        </Text>
                        
                        <View className="flex-row items-center mt-1">
                          {event.startTime && (
                            <View className="flex-row items-center mr-4">
                              <Ionicons name="time-outline" size={16} color="#6366f1" />
                              <Text className="text-gray-600 ml-1">
                                {formatTime(event.startTime)}
                                {event.endTime ? ` - ${formatTime(event.endTime)}` : ''}
                              </Text>
                            </View>
                          )}
                          
                          {event.location && (
                            <View className="flex-row items-center">
                              <Ionicons name="location-outline" size={16} color="#6366f1" />
                              <Text className="text-gray-600 ml-1">{event.location}</Text>
                            </View>
                          )}
                        </View>
                        
                        {event.description && (
                          <Text className="text-gray-600 mt-1 text-sm">{event.description}</Text>
                        )}
                      </View>
                      
                      <View className={`px-2 py-1 rounded-md ${getCategoryColor(event.category)}`}>
                        <Text className={`text-xs font-medium ${getCategoryColor(event.category)}`}>
                          {event.category}
                        </Text>
                      </View>
                    </View>
                  </Card>
                </TouchableOpacity>
              ))
            ) : (
              <Card>
                <View className="items-center py-4">
                  <Text className="text-gray-500">No events scheduled</Text>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onPress={() => navigation.navigate('AddEvent', { date: selectedDate })}
                  >
                    Add Event
                  </Button>
                </View>
              </Card>
            )}
          </View>
          
          {/* Upcoming Events */}
          <View>
            <Text className="text-xl font-bold text-gray-800 mb-2">Upcoming</Text>
            
            {events
              .filter(event => event.date >= new Date().toISOString().split('T')[0])
              .sort((a, b) => a.date.localeCompare(b.date) || 
                              (a.startTime && b.startTime ? a.startTime.localeCompare(b.startTime) : 0))
              .slice(0, 3)
              .map((event) => (
                <TouchableOpacity
                  key={event.id}
                  onPress={() => navigation.navigate('EventDetail', { eventId: event.id })}
                >
                  <Card className="mb-3">
                    <View className="flex-row justify-between items-start">
                      <View className="flex-1">
                        <Text className="font-bold text-lg text-gray-800">
                          {event.title}
                        </Text>
                        
                        <View className="flex-row items-center mt-1">
                          <View className="flex-row items-center mr-4">
                            <Ionicons name="calendar-outline" size={16} color="#6366f1" />
                            <Text className="text-gray-600 ml-1">
                              {new Date(event.date).toLocaleDateString('en-IN', { 
                                day: 'numeric',
                                month: 'short'
                              })}
                            </Text>
                          </View>
                          
                          {event.startTime && (
                            <View className="flex-row items-center">
                              <Ionicons name="time-outline" size={16} color="#6366f1" />
                              <Text className="text-gray-600 ml-1">
                                {formatTime(event.startTime)}
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>
                      
                      <View className={`px-2 py-1 rounded-md ${getCategoryColor(event.category)}`}>
                        <Text className={`text-xs font-medium ${getCategoryColor(event.category)}`}>
                          {event.category}
                        </Text>
                      </View>
                    </View>
                  </Card>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CalendarScreen;
