import React from 'react';
import { View, Text } from 'react-native';

// Mock data for utility usage
const mockUtilityData = {
  week: {
    electricity: { 
      units: 68, 
      amount: 850, 
      change: 5,
      previousUnits: 65
    },
    water: { 
      units: 1250, 
      amount: 420, 
      change: -8,
      previousUnits: 1350
    },
    gas: { 
      units: 3.2, 
      amount: 680, 
      change: 12,
      previousUnits: 2.8
    },
    internet: { 
      units: 145, // GB used
      amount: 999, 
      change: 0,
      previousUnits: 145
    },
  },
  month: {
    electricity: { 
      units: 285, 
      amount: 3570, 
      change: 7,
      previousUnits: 267
    },
    water: { 
      units: 5200, 
      amount: 1750, 
      change: -3,
      previousUnits: 5356
    },
    gas: { 
      units: 14.5, 
      amount: 3100, 
      change: 5,
      previousUnits: 13.8
    },
    internet: { 
      units: 580, // GB used
      amount: 999, 
      change: 8,
      previousUnits: 538
    },
  },
  year: {
    electricity: { 
      units: 3420, 
      amount: 42800, 
      change: 4,
      previousUnits: 3290
    },
    water: { 
      units: 62400, 
      amount: 21000, 
      change: -2,
      previousUnits: 63700
    },
    gas: { 
      units: 174, 
      amount: 37200, 
      change: 6,
      previousUnits: 164
    },
    internet: { 
      units: 6970, // GB used
      amount: 11988, 
      change: 5,
      previousUnits: 6640
    },
  },
};

// Format currency to INR
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

interface UtilityUsageProps {
  timeframe: 'week' | 'month' | 'year';
}

export const UtilityUsage: React.FC<UtilityUsageProps> = ({ timeframe }) => {
  const data = mockUtilityData[timeframe];
  
  const getUnitLabel = (utilityType: string): string => {
    switch (utilityType) {
      case 'electricity': return 'kWh';
      case 'water': return 'L';
      case 'gas': return 'kg';
      case 'internet': return 'GB';
      default: return '';
    }
  };

  const getIconBg = (utilityType: string): string => {
    switch (utilityType) {
      case 'electricity': return 'bg-yellow-100';
      case 'water': return 'bg-blue-100';
      case 'gas': return 'bg-red-100';
      case 'internet': return 'bg-purple-100';
      default: return 'bg-gray-100';
    }
  };
  
  return (
    <View>
      <View className="flex-row justify-between mb-4">
        <UtilityCard 
          name="Electricity"
          type="electricity"
          units={data.electricity.units}
          amount={data.electricity.amount}
          change={data.electricity.change}
          previousUnits={data.electricity.previousUnits}
          timeframe={timeframe}
        />
        
        <UtilityCard 
          name="Water"
          type="water"
          units={data.water.units}
          amount={data.water.amount}
          change={data.water.change}
          previousUnits={data.water.previousUnits}
          timeframe={timeframe}
        />
      </View>
      
      <View className="flex-row justify-between">
        <UtilityCard 
          name="Gas"
          type="gas"
          units={data.gas.units}
          amount={data.gas.amount}
          change={data.gas.change}
          previousUnits={data.gas.previousUnits}
          timeframe={timeframe}
        />
        
        <UtilityCard 
          name="Internet"
          type="internet"
          units={data.internet.units}
          amount={data.internet.amount}
          change={data.internet.change}
          previousUnits={data.internet.previousUnits}
          timeframe={timeframe}
        />
      </View>
    </View>
  );
};

interface UtilityCardProps {
  name: string;
  type: string;
  units: number;
  amount: number;
  change: number;
  previousUnits: number;
  timeframe: 'week' | 'month' | 'year';
}

const UtilityCard: React.FC<UtilityCardProps> = ({ 
  name, type, units, amount, change, previousUnits, timeframe 
}) => {
  const getUnitLabel = (utilityType: string): string => {
    switch (utilityType) {
      case 'electricity': return 'kWh';
      case 'water': return 'L';
      case 'gas': return 'kg';
      case 'internet': return 'GB';
      default: return '';
    }
  };

  const getIconBg = (utilityType: string): string => {
    switch (utilityType) {
      case 'electricity': return 'bg-yellow-100';
      case 'water': return 'bg-blue-100';
      case 'gas': return 'bg-red-100';
      case 'internet': return 'bg-purple-100';
      default: return 'bg-gray-100';
    }
  };
  
  const getIcon = (utilityType: string): string => {
    switch (utilityType) {
      case 'electricity': return 'flash-outline';
      case 'water': return 'water-outline';
      case 'gas': return 'flame-outline';
      case 'internet': return 'wifi-outline';
      default: return 'help-outline';
    }
  };
  
  const bgColor = getIconBg(type);
  const unitLabel = getUnitLabel(type);
  
  return (
    <View className="p-3 bg-white rounded-lg border border-gray-200 flex-1 mr-2 last:mr-0">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-gray-800 font-medium">{name}</Text>
        <View className={`h-6 w-6 rounded-full ${bgColor} items-center justify-center`}>
          {/* Replace with actual icon component */}
          <Text className="text-xs">{getIcon(type).charAt(0).toUpperCase()}</Text>
        </View>
      </View>
      
      <Text className="text-gray-800 text-lg font-bold">
        {units} <Text className="text-xs font-normal text-gray-500">{unitLabel}</Text>
      </Text>
      
      <View className="flex-row justify-between items-center mt-1">
        <Text className="text-gray-500 text-xs">{formatCurrency(amount)}</Text>
        
        <View className="flex-row items-center">
          {change > 0 ? (
            <Text className="text-red-500 text-xs">+{change}%</Text>
          ) : change < 0 ? (
            <Text className="text-green-500 text-xs">{change}%</Text>
          ) : (
            <Text className="text-gray-500 text-xs">0%</Text>
          )}
        </View>
      </View>
      
      <View className="h-1 bg-gray-100 rounded-full mt-2">
        <View 
          className={change > 0 ? "h-full bg-red-400 rounded-full" : "h-full bg-green-400 rounded-full"}
          style={{ width: `${Math.min(Math.abs(change) * 10, 100)}%` }} 
        />
      </View>
      
      <Text className="text-gray-500 text-xs mt-1">
        vs {previousUnits} {unitLabel} last {timeframe}
      </Text>
    </View>
  );
};

export default UtilityUsage;
