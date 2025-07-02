import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { ViewStyle } from "react-native";

interface FadeInViewProps {
  duration?: number;
  style?: ViewStyle;
  children: React.ReactNode;
}

const FadeInView: React.FC<FadeInViewProps> = ({
  duration = 500,
  style,
  children,
}) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration });
  }, [duration, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
  );
};

export default FadeInView;
