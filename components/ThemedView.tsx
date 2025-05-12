import { Colors } from "@/constants";
import { useThemeContext } from "@/contexts/ThemeContext";
import { View, type ViewProps } from "react-native";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const { theme } = useThemeContext();

  return (
    <View
      style={[{ backgroundColor: Colors[theme].background }, style]}
      {...otherProps}
    />
  );
}
