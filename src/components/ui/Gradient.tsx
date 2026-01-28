// En återanvändbar Gradient-komponent
// Kommentarer: Förklara komplex logik på svenska.

import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../hooks/useTheme";

export type GradientVariant =
  | "primary"
  | "subtle"
  | "accent"
  | "hero"
  | "warm"
  | "cool"; // expandera vid behov

type Props = {
  variant?: GradientVariant;
  colors?: string[]; // kan override:a token
  // valfria koordinater och locations för mer kontroll
  start?: [number, number];
  end?: [number, number];
  locations?: number[];
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

/**
 * Gradient - wrapper runt Expo LinearGradient som använder theme-gradients som default.
 * Syfte: centralisera gradient-styling och göra den återanvändbar och temadriven.
 */
const Gradient: React.FC<Props> = ({
  variant = "primary",
  colors,
  start,
  end,
  locations,
  style,
  children,
}) => {
  const { theme } = useTheme();

  // Lös ut defaults från theme om inte explicita props skickas
  const token = (theme.gradients as any)[variant] ?? theme.gradients.primary;

  const resolved = colors
    ? { colors, start: start ?? [0, 0], end: end ?? [0, 1], locations }
    : {
        colors: token.colors,
        start: token.start,
        end: token.end,
        locations: (token as any).locations,
      };

  return (
    <LinearGradient
      colors={resolved.colors as unknown as [string, string, ...string[]]}
      start={resolved.start}
      end={resolved.end}
      // locations är frivillig och skickas bara om den finns
      locations={
        resolved.locations as unknown as
          | [number, number, ...number[]]
          | undefined
      }
      style={style}
    >
      {children}
    </LinearGradient>
  );
};

export default Gradient;
