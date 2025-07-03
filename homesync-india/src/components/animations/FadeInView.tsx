import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";

interface FadeInViewProps {
  duration?: number;
  children: React.ReactNode;
}

const FadeInView: React.FC<FadeInViewProps> = ({
  duration = 500,
  children,
}) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration });
  }, [duration, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    flex: 1,
  }));

  return (
    <Animated.View style={animatedStyle}>{children}</Animated.View>
  );
};

export default FadeInView;
