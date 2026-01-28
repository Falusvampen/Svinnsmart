// utils/makeStyles.ts (Förslag på ny fil)
import { useMemo } from "react";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { AppTheme } from "../constants/theme";
import { useTheme } from "./useTheme";

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export const makeStyles = <T extends NamedStyles<T> | NamedStyles<any>>(
  styles: (theme: AppTheme) => T,
) => {
  return () => {
    const { theme } = useTheme();
    return useMemo(() => StyleSheet.create(styles(theme)), [theme]);
  };
};
