import React from "react";
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface TabButtonStyles {
  tabButton: StyleProp<ViewStyle>;
  iconContainer: StyleProp<ViewStyle>;
  activeIconContainer: StyleProp<ViewStyle>;
  label: StyleProp<TextStyle>;
}

interface Props {
  label?: string | number;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
  renderIcon: (color: string) => React.ReactNode;
  styles: TabButtonStyles;
  activeColor: string;
  inactiveColor: string;
}

const TabButton: React.FC<Props> = ({
  label,
  isFocused,
  onPress,
  onLongPress,
  renderIcon,
  styles,
  activeColor,
  inactiveColor,
}) => {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabButton}
      activeOpacity={0.7}
    >
      <View
        style={[styles.iconContainer, isFocused && styles.activeIconContainer]}
      >
        {renderIcon(isFocused ? activeColor : inactiveColor)}
      </View>

      {isFocused && (
        <Text style={[styles.label, { color: activeColor }]}>
          {label as string}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default TabButton;
