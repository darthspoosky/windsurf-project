import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ViewStyle } from "react-native";
import FadeInView from "./FadeInView";

interface ScreenContainerProps {
  duration?: number;
  style?: ViewStyle;
  children: React.ReactNode;
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({
  duration,
  style,
  children,
}) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FadeInView duration={duration} style={[{ flex: 1 }, style]}>
        {children}
      </FadeInView>
    </SafeAreaView>
  );
};

export default ScreenContainer;
