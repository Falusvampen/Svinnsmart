// app/index.tsx
import * as Facebook from "expo-auth-session/providers/facebook";
import * as Google from "expo-auth-session/providers/google";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Komponenter
import { AuthHeader } from "../src/components/AuthHeader";
import { Divider } from "../src/components/Divider";
import { InputRow } from "../src/components/InputRow";
import { SocialButtons } from "../src/components/SocialButtons";
import { ToggleModeRow } from "../src/components/ToggleModeRow";
import Gradient from "../src/components/ui/Gradient";
import useTheme from "../src/hooks/useTheme";
import { AuthService } from "../src/services/authService";

WebBrowser.maybeCompleteAuthSession();

export default function Index() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"login" | "register">("login");

  const { theme } = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  // --- OAUTH KONFIGURATION ---

  // Google
  const [, , promptGoogleAsync] = Google.useAuthRequest({
    clientId: process.env.WEB_GOOGLE_CLIENT_ID || "<WEB_CLIENT_ID>",
    iosClientId: process.env.IOS_GOOGLE_CLIENT_ID || "<IOS_CLIENT_ID>",
    androidClientId:
      process.env.ANDROID_GOOGLE_CLIENT_ID || "<ANDROID_CLIENT_ID>",
  });

  // Facebook
  const [, , promptFacebookAsync] = Facebook.useAuthRequest({
    clientId: process.env.FACEBOOK_APP_ID || "minhemligasvinnsmartsecret",
  });

  // --- LOGIK ---

  const isValid = (): boolean => {
    return email.trim().length > 0 && password.length >= 6;
  };

  const handleAuth = async () => {
    setError(null);
    if (!isValid()) {
      setError("Ange giltig e-post och ett lösenord med minst 6 tecken.");
      return;
    }
    setLoading(true);
    try {
      const res =
        mode === "login"
          ? await AuthService.login(email.trim(), password)
          : await AuthService.register(email.trim(), password);

      if (res.error) {
        setError(res.error);
        return;
      }

      // Lyckad inloggning
      // Alert.alert("Välkommen!", `Inloggning lyckades för ${email}`); // Valfritt
      router.replace("./(tabs)");
    } catch (e: any) {
      setError(e.message ?? "Något gick fel.");
    } finally {
      setLoading(false);
    }
  };

  const startGoogleSignIn = async () => {
    setError(null);
    try {
      await promptGoogleAsync();
    } catch (e: any) {
      setError(e.message ?? "Kunde inte starta Google-inloggning.");
    }
  };

  const startFacebookSignIn = async () => {
    setError(null);
    try {
      await promptFacebookAsync();
    } catch (e: any) {
      setError(e.message ?? "Kunde inte starta Facebook-inloggning.");
    }
  };

  // --- UI ---

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Bakgrundsdekorationer */}
      <Gradient variant="primary" style={styles.gradient} />
      <View style={styles.bgCircleOne} />
      <View style={styles.bgCircleTwo} />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.card}>
              {/* Header */}
              <AuthHeader
                style={styles.header}
                title="Svinnsmart"
                titleStyle={styles.logo}
                subtitleStyle={styles.subtitle}
              />

              {/* Input Fields */}
              <View style={styles.inputContainer}>
                <InputRow
                  icon="envelope"
                  placeholder="E-post"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                  accessibilityLabel="email-input"
                  style={styles.inputRow}
                  iconStyle={styles.inputIcon}
                  inputStyle={styles.input}
                />

                <InputRow
                  icon="lock"
                  placeholder="Lösenord"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  accessibilityLabel="password-input"
                  style={styles.inputRow}
                  iconStyle={styles.inputIcon}
                  inputStyle={styles.input}
                />

                {/* Glömt lösenord länk (exempel) */}
                {mode === "login" && (
                  <Text
                    style={styles.forgotPassword}
                    onPress={() => console.log("Återställ")}
                  >
                    Glömt lösenord?
                  </Text>
                )}
              </View>

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              {/* Huvudknapp */}
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  !isValid() && styles.buttonDisabled,
                  pressed && styles.pressed,
                ]}
                onPress={handleAuth}
                disabled={loading || !isValid()}
                accessibilityRole="button"
              >
                {loading ? (
                  <ActivityIndicator
                    color={theme.getContrastText(theme.colors.primary)}
                  />
                ) : (
                  <Text style={styles.buttonText}>
                    {mode === "login" ? "Logga in" : "Skapa konto"}
                  </Text>
                )}
              </Pressable>

              {/* Divider */}
              <Divider
                style={styles.divider}
                lineStyle={styles.line}
                textStyle={styles.dividerText}
              />

              {/* Social Login */}
              <SocialButtons
                onPressGoogle={startGoogleSignIn}
                onPressFacebook={startFacebookSignIn}
                disabled={loading}
                style={styles.socialRow}
                buttonStyle={styles.iconButtonLarge}
                googleStyle={styles.googleIcon}
                facebookStyle={styles.facebookIcon}
              />

              {/* Byt läge (Logga in / Registrera) */}
              <ToggleModeRow
                mode={mode}
                onToggle={() => {
                  setMode(mode === "login" ? "register" : "login");
                  setError(null);
                }}
                style={styles.row}
                textStyle={styles.smallText}
                linkStyle={styles.linkText}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

function makeStyles(theme: any) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: "center",
      padding: theme.spacing.md,
      paddingBottom: 40,
    },
    gradient: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    bgCircleOne: {
      position: "absolute",
      width: 260,
      height: 260,
      borderRadius: 130,
      backgroundColor: theme.colors.primary,
      opacity: 0.08,
      top: -80,
      left: -40,
    },
    bgCircleTwo: {
      position: "absolute",
      width: 180,
      height: 180,
      borderRadius: 90,
      backgroundColor: theme.colors.primaryDark,
      opacity: 0.06,
      bottom: -50,
      right: -20,
    },
    card: {
      width: "100%",
      maxWidth: 400, // Begränsa bredden på iPad/stora skärmar
      alignSelf: "center",
      backgroundColor: theme.colors.surface, // Eller 'rgba(255,255,255,0.9)' för glas-effekt
      paddingVertical: 32,
      paddingHorizontal: 24,
      borderRadius: 24, // Mer rundade hörn
      // Modern skugga
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.1,
      shadowRadius: 20,
      elevation: 10,
    },
    header: {
      alignItems: "center",
      marginBottom: 32,
    },
    logo: {
      fontSize: 32, // Större titel
      fontWeight: "800",
      color: theme.colors.text,
      letterSpacing: -1,
    },
    subtitle: {
      fontSize: 14,
      color: theme.colors.textMuted,
      marginTop: 8,
      textAlign: "center",
    },
    inputContainer: {
      marginBottom: 20,
    },
    inputRow: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.background, // Liten kontrast mot kortet
      borderRadius: 16, // Matchar knapparnas mjukhet
      paddingHorizontal: 16,
      marginBottom: 16,
      height: 56, // Högre inputs = modernare
      borderWidth: 1,
      borderColor: "transparent", // För att kunna animera border senare om man vill
    },
    inputIcon: {
      marginRight: 12,
      opacity: 0.5,
    },
    input: {
      flex: 1,
      height: "100%",
      padding: 0,
      fontSize: 16,
      color: theme.colors.text,
    },
    forgotPassword: {
      alignSelf: "flex-end",
      color: theme.colors.primary,
      fontSize: 13,
      marginTop: -8,
      marginBottom: 16,
      fontWeight: "600",
    },
    button: {
      height: 56, // Högre knapp
      backgroundColor: theme.colors.primary,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 4,
      marginTop: 8,
    },
    buttonDisabled: {
      backgroundColor: theme.colors.border,
      shadowOpacity: 0,
    },
    pressed: {
      opacity: 0.9,
      transform: [{ scale: 0.98 }],
    },
    buttonText: {
      color: "#fff", // Säkerställ att texten är vit på primärfärg
      fontWeight: "700",
      fontSize: 16,
    },
    errorText: {
      color: theme.colors.danger,
      marginBottom: 16,
      textAlign: "center",
    },
    divider: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 32,
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: theme.colors.border,
      opacity: 0.5,
    },
    dividerText: {
      marginHorizontal: 16,
      color: theme.colors.textMuted,
      fontSize: 12,
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    socialRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 16, // Om React Native version >= 0.71, annars använd margins
    },
    iconButtonLarge: {
      width: 56,
      height: 56,
      borderRadius: 28,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    googleIcon: { backgroundColor: "#fff" }, // Google brukar vara vit knapp med färgad logga
    facebookIcon: { backgroundColor: "#1877F2" },
    row: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 40,
    },
    smallText: {
      color: theme.colors.textMuted,
      fontSize: 14,
    },
    linkText: {
      color: theme.colors.primary,
      fontWeight: "700",
      fontSize: 14,
      marginLeft: 4,
    },
  });
}
