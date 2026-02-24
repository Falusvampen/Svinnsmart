import { useTheme } from "@/hooks/useTheme";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  LayoutChangeEvent,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  value?: number; // 0..1
  onChange?: (v: number) => void;
  labels?: string[];
  showValueLabel?: boolean;
};

const clamp = (v: number) => Math.max(0, Math.min(1, v));

const FuzzySlider: React.FC<Props> = ({
  value = 0,
  onChange,
  labels = ["Slut", "Lite", "Halv", "Mycket", "Ny"],
  showValueLabel = true,
}) => {
  const { theme } = useTheme();
  const styles = useStyles(theme);

  const [trackWidth, setTrackWidth] = React.useState(1);
  const trackWidthRef = React.useRef(1);
  const [internal, setInternal] = React.useState<number>(clamp(value));

  // Synka props till state
  React.useEffect(() => {
    setInternal(clamp(value));
  }, [value]);

  const SNAP_INTERVALS = 4;

  // Hitta text-label
  const labelIndex = Math.round(internal * (labels.length - 1));
  const currentLabel = labels[Math.min(labelIndex, labels.length - 1)];

  const handleChange = (rawRatio: number) => {
    const clamped = clamp(rawRatio);
    const snapped = Math.round(clamped * SNAP_INTERVALS) / SNAP_INTERVALS;

    setInternal((prev) => {
      if (prev !== snapped) {
        Haptics.selectionAsync();
        onChange?.(snapped);
        return snapped;
      }
      return prev;
    });
  };

  const pan = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        const x = evt.nativeEvent.locationX;
        handleChange(x / Math.max(1, trackWidthRef.current));
      },
      onPanResponderMove: (evt) => {
        const x = evt.nativeEvent.locationX;
        handleChange(x / Math.max(1, trackWidthRef.current));
      },
    }),
  ).current;

  const onTrackLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width || 1;
    setTrackWidth(w);
    trackWidthRef.current = w;
  };

  const fillPx = internal * trackWidth;
  const thumbSize = 24;
  const thumbLeft = fillPx - thumbSize / 2;

  return (
    <View style={styles.container}>
      {/* Exempel på hur label kan visas */}
      {showValueLabel && (
        <View style={styles.topRow}>
          <Text style={styles.valueText}>{currentLabel}</Text>
        </View>
      )}

      <View
        style={styles.touchArea}
        onLayout={onTrackLayout}
        {...pan.panHandlers}
        // TILLGÄNGLIGHET: Gör så skärmläsare fattar att detta är en slider
        accessible={true}
        accessibilityRole="adjustable"
        accessibilityLabel="Nivåväljare"
        accessibilityValue={{ text: currentLabel }}
        accessibilityActions={[{ name: "increment" }, { name: "decrement" }]}
        onAccessibilityAction={(event) => {
          // Gör så volymknappar kan styra slidern när VoiceOver är på
          if (event.nativeEvent.actionName === "increment") {
            handleChange(internal + 0.25);
          } else if (event.nativeEvent.actionName === "decrement") {
            handleChange(internal - 0.25);
          }
        }}
      >
        {/* FÖRBÄTTRING: pointerEvents="none" här för att undvika "locationX"-buggar */}
        <View
          style={[styles.track, { backgroundColor: theme.colors.border }]}
          pointerEvents="none"
        >
          <LinearGradient
            colors={[theme.colors.success, theme.colors.accent]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.fill, { width: fillPx }]}
          />

          <View style={styles.markers}>
            {[0, 1, 2, 3, 4].map((i) => (
              <View
                key={i}
                style={[
                  styles.marker,
                  i / 4 <= internal
                    ? { backgroundColor: "rgba(255,255,255,0.9)" }
                    : {},
                ]}
              />
            ))}
          </View>

          <View style={[styles.thumb, { left: thumbLeft }]} />
        </View>
      </View>
    </View>
  );
};

export default FuzzySlider;

const useStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      paddingVertical: 8,
      // paddingRight: 8, // Tog bort denna, kan göra centreringen skev om inte container hanterar det
      width: "100%",
    },
    touchArea: {
      height: 50,
      justifyContent: "center",
      width: "100%",
    },
    track: {
      height: 8,
      borderRadius: 4,
      position: "relative",
      width: "100%",
      backgroundColor: "#e0e0e0", // Fallback om theme saknas
    },
    thumb: {
      position: "absolute",
      width: 24, // Matchar din thumbSize variabel
      height: 24,
      borderRadius: 12,
      backgroundColor: "#fff",
      borderWidth: 1,
      borderColor: "rgba(0,0,0,0.1)",
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: 5,
      top: -8, // (24 - 8) / 2 = 8. Lyfter den 8px för att centrera.
      zIndex: 10,
    },
    fill: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      borderRadius: 4,
    },
    markers: {
      position: "absolute",
      left: 0,
      right: 0,
      height: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    marker: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: "rgba(0,0,0,0.1)",
    },
    topRow: {
      marginBottom: 8,
      alignItems: "center",
    },
    valueText: {
      fontWeight: "bold",
      color: theme.colors.text || "#000",
    },
  });
