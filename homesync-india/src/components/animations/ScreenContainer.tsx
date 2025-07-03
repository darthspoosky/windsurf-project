import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ViewStyle } from "react-native";
import FadeInView from "./FadeInView";

interface ScreenContainerProps {
  duration?: number;
  style?: ViewStyle | ViewStyle[];
  children: React.ReactNode;
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({
  duration,
  style,
  children,
}) => {
  return (
    <SafeAreaView style={style}>
      <FadeInView duration={duration}>
        {children}
      </FadeInView>
    </SafeAreaView>
  );
};

export default ScreenContainer;
