import { makeStyles } from "@/hooks/makeStyles";
import { useTheme } from "@/hooks/useTheme";
import HasseMascot from "@assets/images/mascot/hasse.svg";
// import { LinearGradient } from "expo-linear-gradient"; // Se till att denna är installerad
import React from "react";
import { Dimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Gradient from "./ui/Gradient";
import { ThemedText } from "./ui/ThemedText";

interface HeroProps {
  message: string; // Vad säger Hasse? T.ex. "Mm jag är sugen på något gott"
  children?: React.ReactNode; // Sökfält, knappar eller annat innehåll
}

export const Hero: React.FC<HeroProps> = ({ message, children }) => {
  const styles = useStyles();
  const { theme } = useTheme();
  const gradientData = theme.gradients.hero;
  const insets = useSafeAreaInsets();
  const { width } = Dimensions.get("window");

  // Justera Hasses storlek baserat på skärmbredd, men håll honom lagom stor för en header
  const mascotSize = width * 0.35;

  return (
    <View style={styles.wrapper}>
      {/* Vi använder hero-gradienten från ditt tema */}
      <Gradient
        colors={gradientData.colors}
        start={gradientData.start}
        end={gradientData.end}
        locations={gradientData.locations}
        style={[styles.container, { paddingTop: insets.top + 10 }]}
      >
        <View style={styles.topRow}>
          {/* Pratbubbla-sektion */}
          <View style={styles.bubbleWrapper}>
            <View style={styles.bubble}>
              <ThemedText style={styles.bubbleText} variant="default">
                {message}
              </ThemedText>
              {/* Den lilla triangeln (svansen) på bubblan */}
              <View style={styles.bubbleTail} />
            </View>
          </View>

          {/* Hasse */}
          <View style={styles.mascotWrapper}>
            <HasseMascot width={mascotSize} height={mascotSize} />
          </View>
        </View>

        {/* Plats för sökfält eller annat (children) */}
        {children && <View style={styles.contentContainer}>{children}</View>}
      </Gradient>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  wrapper: {
    // Bra att ha om vi vill lägga skugga eller liknande runt hela heron senare
    borderBottomLeftRadius: theme.radius.lg,
    borderBottomRightRadius: theme.radius.lg,
    overflow: "hidden",
    backgroundColor: theme.colors.background, // Fallback
  },
  container: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center", // Centrera vertikalt så Hasse och bubblan lirar
    justifyContent: "space-between",
    marginBottom: theme.spacing.md,
  },
  bubbleWrapper: {
    flex: 1,
    marginRight: theme.spacing.md, // Avstånd till Hasse
    alignItems: "flex-start", // Vänsterställ bubblan
  },
  bubble: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.lg,
    borderBottomLeftRadius: 2, // Gör den lite mer "pratig" i formen
    // Skugga för att lyfta bubblan från bakgrunden
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: "relative", // För att kunna positionera svansen
  },
  bubbleTail: {
    position: "absolute",
    right: -8, // Skjut ut den till höger mot Hasse
    bottom: 15, // Justera höjd beroende på var du vill ha "pilen"
    width: 0,
    height: 0,
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderLeftWidth: 10,
    borderStyle: "solid",
    backgroundColor: "transparent",
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: theme.colors.surface, // Samma färg som bubblan
  },
  bubbleText: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.sm,
    // Typing for fontWeight in the theme is broader than RN's FontWeight union, cast to satisfy TS
  },
  mascotWrapper: {
    // Här kan vi justera om Hasse ska "sticka upp" eller vara helt inom ramen
    justifyContent: "flex-end",
    alignItems: "flex-end", // Placera Hasse helt till höger
    // Se till att Hasse ligger över pratbubblan (speciellt Android där elevation påverkar ritordning)
    zIndex: 2,
    elevation: 4,
  },
  contentContainer: {
    marginTop: theme.spacing.xs,
  },
}));
