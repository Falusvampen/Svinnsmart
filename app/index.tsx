// app/index.tsx
import * as Facebook from "expo-auth-session/providers/facebook";
import * as Google from "expo-auth-session/providers/google";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
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

  // Konfigurera Google auth-request
  // TODO: Fyll i era klient-ID:n (Android/iOS/Web) i app.json eller env
  const [, , promptGoogleAsync] = Google.useAuthRequest({
    clientId: process.env.WEB_GOOGLE_CLIENT_ID || "<WEB_CLIENT_ID>",
    iosClientId: process.env.IOS_GOOGLE_CLIENT_ID || "<IOS_CLIENT_ID>",
    androidClientId:
      process.env.ANDROID_GOOGLE_CLIENT_ID || "<ANDROID_CLIENT_ID>",
  });

  // Konfigurera Facebook auth-request
  // TODO: Fyll i Facebook App ID
  const [, , promptFacebookAsync] = Facebook.useAuthRequest({
    clientId: process.env.FACEBOOK_APP_ID || "minhemligasvinnsmartsecret",
  });

  // Enkel validering
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

      // Lyckad inloggning/registrering
      Alert.alert("Välkommen!", `Inloggning lyckades för ${email}`);
      router.replace("/");
    } catch (e: any) {
      setError(e.message ?? "Något gick fel.");
    } finally {
      setLoading(false);
    }
  };

  // Starta Google OAuth flow
  const startGoogleSignIn = async () => {
    setError(null);
    try {
      await promptGoogleAsync();
    } catch (e: any) {
      setError(e.message ?? "Kunde inte starta Google-inloggning.");
    }
  };

  // Starta Facebook OAuth flow
  const startFacebookSignIn = async () => {
    setError(null);
    try {
      await promptFacebookAsync();
    } catch (e: any) {
      setError(e.message ?? "Kunde inte starta Facebook-inloggning.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      {/* Decoration */}
      <Gradient variant="primary" style={styles.gradient} />

      <View style={styles.bgCircleOne} />
      <View style={styles.bgCircleTwo} />

      <View style={styles.card}>
        <AuthHeader
          style={styles.header}
          title="Svinnsmart"
          titleStyle={styles.logo}
          subtitleStyle={styles.subtitle}
        />

        <InputRow
          icon="envelope"
          placeholder="E-post"
          keyboardType="email-address"
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

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

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

        <Divider
          style={styles.divider}
          lineStyle={styles.line}
          textStyle={styles.dividerText}
        />

        <SocialButtons
          onPressGoogle={startGoogleSignIn}
          onPressFacebook={startFacebookSignIn}
          disabled={loading}
          style={styles.socialRow}
          buttonStyle={styles.iconButtonLarge}
          googleStyle={styles.googleIcon}
          facebookStyle={styles.facebookIcon}
        />

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
    </KeyboardAvoidingView>
  );
}

function makeStyles(theme: any) {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.background,
      padding: theme.spacing.md,
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
      // Mild, warm highlight ovanför
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
      // Djupare ton nedanför för balans
      backgroundColor: theme.colors.primaryDark,
      opacity: 0.06,
      bottom: -50,
      right: -20,
    },
    card: {
      width: "100%",
      maxWidth: 420,
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.md + 6,
      borderRadius: theme.radius.md,
      shadowColor: theme.elevation.mid.shadowColor,
      shadowOffset: theme.elevation.mid.shadowOffset,
      shadowOpacity: theme.elevation.mid.shadowOpacity,
      shadowRadius: theme.elevation.mid.shadowRadius,
      elevation: theme.elevation.mid.elevation,
    },
    header: {
      alignItems: "center",
      marginBottom: theme.spacing.sm,
    },
    logo: {
      fontSize: theme.typography.fontSizes.xl - 2,
      fontWeight: "800",
      color: theme.colors.text,
    },
    subtitle: {
      fontSize: theme.typography.fontSizes.sm,
      color: theme.colors.textMuted,
      marginTop: theme.spacing.xs,
      textAlign: "center",
    },
    inputRow: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.muted,
      borderRadius: theme.radius.sm,
      paddingHorizontal: 12,
      marginBottom: theme.spacing.sm,
      height: 48,
    },
    inputIcon: {
      marginRight: 8,
    },
    input: {
      flex: 1,
      height: "100%",
      padding: 0,
      color: theme.colors.text,
    },
    button: {
      height: 50,
      backgroundColor: theme.colors.primary,
      borderRadius: theme.radius.md,
      justifyContent: "center",
      alignItems: "center",
      marginTop: theme.spacing.xs,
      shadowColor: theme.colors.primaryDark,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.12,
      shadowRadius: 12,
      elevation: 3,
    },
    pressed: { opacity: 0.85 },
    divider: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: theme.spacing.md,
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: theme.colors.border,
    },
    dividerText: {
      marginHorizontal: theme.spacing.sm,
      color: theme.colors.textMuted,
      textTransform: "lowercase",
    },
    socialRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: theme.spacing.sm,
    },
    iconButton: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 12,
      shadowColor: theme.elevation.low.shadowColor,
      shadowOffset: theme.elevation.low.shadowOffset,
      shadowOpacity: theme.elevation.low.shadowOpacity,
      shadowRadius: theme.elevation.low.shadowRadius,
      elevation: theme.elevation.low.elevation,
    },
    iconButtonLarge: {
      width: 56,
      height: 56,
      borderRadius: 28,
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 14,
      shadowColor: theme.elevation.mid.shadowColor,
      shadowOffset: theme.elevation.mid.shadowOffset,
      shadowOpacity: theme.elevation.mid.shadowOpacity,
      shadowRadius: theme.elevation.mid.shadowRadius,
      elevation: theme.elevation.mid.elevation,
    },
    googleIcon: { backgroundColor: "#DB4437" },
    facebookIcon: { backgroundColor: "#1877F2" },
    buttonDisabled: { backgroundColor: theme.colors.border },
    buttonText: {
      color: theme.getContrastText(theme.colors.primary),
      fontWeight: "600",
    },
    errorText: {
      color: theme.colors.danger,
      marginBottom: theme.spacing.xs,
    },
    row: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: theme.spacing.md,
    },
    smallText: { color: theme.colors.textMuted },
    linkText: { color: theme.colors.primary, fontWeight: "600" },
  });
}
