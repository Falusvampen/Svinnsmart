import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Komponenter
import { Divider } from "../components/Divider";
import { InputRow } from "../components/InputRow";
import { SocialButtons } from "../components/SocialButtons";
import { ThemedView } from "../components/ui/ThemedView";

// Hooks
import { makeStyles } from "../hooks/makeStyles";
import { useAuthForm } from "../hooks/useAuthForm";
import { useSocialAuth } from "../hooks/useSocialAuth";
import { useTheme } from "../hooks/useTheme";

// Assets
import HasseMascot from "@assets/images/mascot/hasse.svg"; // Justera sökvägen om det behövs

const { width } = Dimensions.get("window");

export const LoginScreen: React.FC = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    mode,
    setMode,
    loading: formLoading,
    error: formError,
    isValid,
    submit,
  } = useAuthForm();

  const {
    startGoogle,
    startFacebook,
    loading: socialLoading,
    error: socialError,
  } = useSocialAuth();

  const { theme } = useTheme();
  const styles = useStyles();

  const loading = formLoading || socialLoading;
  const error = formError ?? socialError;
  const isLogin = mode === "login";

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
          keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              bounces={false}
            >
              {/* --- Sektion 1: Text & Rubriker --- */}
              {/* Notera: Jag vänsterställde texten här för att balansera upp Hasse som står till höger */}
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

              {/* --- Sektion 2: Maskot (Står på HÖGER kant) --- */}
              <View style={styles.mascotContainer}>
                <HasseMascot width={width * 0.45} height={width * 0.45} />
              </View>

              {/* --- Sektion 3: Formulär --- */}
              <View style={styles.formSection}>
                <View style={styles.inputsContainer}>
                  <InputRow
                    icon="envelope"
                    placeholder="namn@exempel.se"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.cleanInput}
                  />

                  <View style={styles.spacer} />

                  <InputRow
                    icon="lock"
                    placeholder="Lösenord"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    style={styles.cleanInput}
                  />

                  {isLogin && (
                    <Pressable
                      onPress={() => console.log("Återställ")}
                      style={styles.forgotPassContainer}
                    >
                      <Text style={styles.forgotPassword}>
                        Glömt lösenordet?
                      </Text>
                    </Pressable>
                  )}
                </View>

                {/* Felmeddelanden */}
                {error ? (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                  </View>
                ) : null}

                {/* Huvudknapp */}
                <Pressable
                  style={({ pressed }) => [
                    styles.primaryButton,
                    { backgroundColor: theme.colors.primary },
                    !isValid && styles.buttonDisabled,
                    pressed && styles.buttonPressed,
                  ]}
                  onPress={submit}
                  disabled={loading || !isValid}
                >
                  {loading ? (
                    <ActivityIndicator
                      color={theme.getContrastText(theme.colors.primary)}
                    />
                  ) : (
                    <Text style={styles.primaryButtonText}>
                      {isLogin ? "Logga in" : "Skapa konto"}
                    </Text>
                  )}
                </Pressable>

                <Divider
                  style={styles.divider}
                  textStyle={styles.dividerText}
                />

                {/* Social Login */}
                <SocialButtons
                  onPressGoogle={startGoogle}
                  onPressFacebook={startFacebook}
                  disabled={loading}
                  style={styles.socialRow}
                />

                {/* Toggle Mode */}
                <View style={styles.toggleContainer}>
                  <Text style={styles.toggleText}>
                    {isLogin ? "Ny här? " : "Har du redan ett konto? "}
                  </Text>
                  <Pressable
                    onPress={() => setMode(isLogin ? "register" : "login")}
                  >
                    <Text style={styles.toggleLink}>
                      {isLogin ? "Skapa konto" : "Logga in"}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
};

const useStyles = makeStyles<{
  container: ViewStyle;
  safeArea: ViewStyle;
  keyboardView: ViewStyle;
  scrollContent: ViewStyle;
  headerSection: ViewStyle;
  mascotContainer: ViewStyle;
  welcomeTitle: TextStyle;
  welcomeSubtitle: TextStyle;
  formSection: ViewStyle;
  inputsContainer: ViewStyle;
  cleanInput: ViewStyle;
  spacer: ViewStyle;
  forgotPassContainer: ViewStyle;
  forgotPassword: TextStyle;
  primaryButton: ViewStyle;
  buttonDisabled: ViewStyle;
  buttonPressed: ViewStyle;
  primaryButtonText: TextStyle;
  errorContainer: ViewStyle;
  errorText: TextStyle;
  divider: ViewStyle;
  dividerText: TextStyle;
  socialRow: ViewStyle;
  toggleContainer: ViewStyle;
  toggleText: TextStyle;
  toggleLink: TextStyle;
}>((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
  },

  // Header Styles
  headerSection: {
    justifyContent: "center",
    marginTop: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg, // Lite mer padding på sidorna
    marginBottom: theme.spacing.md,
    // Tips: Om Hasse står till höger kan det vara snyggt att vänsterställa texten:
    alignItems: "flex-start",
  },
  welcomeTitle: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: theme.typography.fontWeights.bold as any,
    textAlign: "left", // Ändrat till left för balans
    marginBottom: theme.spacing.xs,
    color: theme.colors.text,
  },
  welcomeSubtitle: {
    fontSize: theme.typography.fontSizes.md,
    color: theme.colors.textMuted,
    textAlign: "left", // Ändrat till left för balans
    maxWidth: "70%", // Begränsar bredden så texten inte krockar visuellt med där Hasse ska stå
    lineHeight: 22,
  },

  // Mascot Styles (HÖGERJUSTERAD)
  mascotContainer: {
    alignItems: "flex-end", // Flyttar Hasse till höger
    paddingRight: theme.spacing.lg, // Samma avstånd till kanten som formuläret har
    zIndex: 1,
    marginBottom: -45, // Justera detta för att få fötterna exakt på linjen
  },

  // Form Styles
  formSection: {
    flex: 1,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: 50,
    paddingBottom: theme.spacing.xl,
    backgroundColor: theme.colors.surface,

    // Skuggor
    shadowColor: theme.elevation.high.shadowColor,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 15,
  },
  inputsContainer: {
    marginBottom: theme.spacing.lg,
  },
  cleanInput: {
    marginBottom: 0,
  },
  spacer: {
    height: theme.spacing.md,
  },
  forgotPassContainer: {
    alignSelf: "flex-end",
    marginTop: theme.spacing.sm,
  },
  forgotPassword: {
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.fontWeights.medium as any,
    color: theme.colors.primary,
  },

  // Button Styles
  primaryButton: {
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.lg,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
  },
  primaryButtonText: {
    color: theme.getContrastText(theme.colors.primary),
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: theme.typography.fontWeights.bold as any,
  },

  // Error & Divider
  errorContainer: {
    marginBottom: theme.spacing.md,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.danger + "22",
    borderRadius: theme.radius.sm,
  },
  errorText: {
    color: theme.colors.danger,
    textAlign: "center",
  },
  divider: {
    marginBottom: theme.spacing.lg,
  },
  dividerText: {
    color: theme.colors.textMuted,
  },

  // Footer / Toggle
  socialRow: {
    marginBottom: theme.spacing.xl,
    justifyContent: "center",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  toggleText: {
    fontSize: theme.typography.fontSizes.md,
    color: theme.colors.textMuted,
  },
  toggleLink: {
    fontSize: theme.typography.fontSizes.md,
    fontWeight: theme.typography.fontWeights.bold as any,
    color: theme.colors.primary,
  },
}));
