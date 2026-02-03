import { makeStyles } from "@/hooks/makeStyles";
import React from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";

// Header för inloggningssidan. Separera presentation för återanvändbarhet.
export const LoginHeader: React.FC<{ isLogin: boolean }> = ({ isLogin }) => {
  const styles = useStyles();

  return (
    <View style={styles.headerSection}>
      <Text style={styles.welcomeTitle}>
        {isLogin ? "Välkommen tillbaka!" : "Häng med Hasse!"}
      </Text>
      <Text style={styles.welcomeSubtitle}>
        {isLogin
          ? "Logga in för att fortsätta äventyret."
          : "Skapa ett konto och kom igång direkt."}
      </Text>
    </View>
  );
};

const useStyles = makeStyles<{
  headerSection: ViewStyle;
  welcomeTitle: TextStyle;
  welcomeSubtitle: TextStyle;
}>((theme) => ({
  headerSection: {
    justifyContent: "center",
    marginTop: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    alignItems: "flex-start",
  },
  welcomeTitle: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: theme.typography.fontWeights.bold as any,
    textAlign: "left",
    marginBottom: theme.spacing.xs,
    color: theme.colors.text,
  },
  welcomeSubtitle: {
    fontSize: theme.typography.fontSizes.md,
    color: theme.colors.textMuted,
    textAlign: "left",
    maxWidth: "70%",
    lineHeight: 22,
  },
}));
