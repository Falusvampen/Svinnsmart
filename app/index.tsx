// app/index.tsx
import { FontAwesome } from "@expo/vector-icons";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as Google from "expo-auth-session/providers/google";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AuthService } from "../src/services/authService";

WebBrowser.maybeCompleteAuthSession();

export default function Index() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"login" | "register">("login");

  // Konfigurera Google auth-request
  // TODO: Fyll i era klient-ID:n (Android/iOS/Web) i app.json eller env
  const [googleRequest, googleResponse, promptGoogleAsync] =
    Google.useAuthRequest({
      clientId: process.env.WEB_GOOGLE_CLIENT_ID || "<WEB_CLIENT_ID>",
      iosClientId: process.env.IOS_GOOGLE_CLIENT_ID || "<IOS_CLIENT_ID>",
      androidClientId:
        process.env.ANDROID_GOOGLE_CLIENT_ID || "<ANDROID_CLIENT_ID>",
    });

  // Konfigurera Facebook auth-request
  // TODO: Fyll i Facebook App ID
  const [fbRequest, fbResponse, promptFacebookAsync] = Facebook.useAuthRequest({
    clientId: process.env.FACEBOOK_APP_ID || "minhemligasvinnsmartsecret",
  });

  // useEffect(() => {
  //   // Hantera Google-svar
  //   if (googleResponse?.type === "success") {
  //     const auth = googleResponse.authentication;
  //     if (auth?.idToken) {
  //       handleGoogleToken(auth.idToken, auth.accessToken);
  //     }
  //   }
  // }, [googleResponse]);

  // useEffect(() => {
  //   // Hantera Facebook-svar
  //   if (fbResponse?.type === "success") {
  //     // @ts-ignore - params finns på svaret
  //     const token = fbResponse?.params?.access_token as string | undefined;
  //     if (token) {
  //       handleFacebookToken(token);
  //     }
  //   }
  // }, [fbResponse]);

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

  // // Skickar Google-token till AuthService
  // const handleGoogleToken = async (idToken: string, accessToken?: string) => {
  //   setError(null);
  //   setLoading(true);
  //   try {
  //     const res = await AuthService.loginWithGoogleToken(idToken, accessToken);
  //     if (res.error) setError(res.error);
  //     else {
  //       Alert.alert("Välkommen!", "Inloggning via Google lyckades.");
  //       router.replace("/");
  //     }
  //   } catch (e: any) {
  //     setError(e.message ?? "Google-inloggning misslyckades.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // // Skickar Facebook-token till AuthService
  // const handleFacebookToken = async (accessToken: string) => {
  //   setError(null);
  //   setLoading(true);
  //   try {
  //     const res = await AuthService.loginWithFacebookToken(accessToken);
  //     if (res.error) setError(res.error);
  //     else {
  //       Alert.alert("Välkommen!", "Inloggning via Facebook lyckades.");
  //       router.replace("/");
  //     }
  //   } catch (e: any) {
  //     setError(e.message ?? "Facebook-inloggning misslyckades.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
      <LinearGradient
        colors={["#E6FFFA", "#EFF6FF"]}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.gradient}
      />

      <View style={styles.bgCircleOne} />
      <View style={styles.bgCircleTwo} />

      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.logo}>Svinnsmart</Text>
          <Text style={styles.subtitle}>
            Minska matsvinn — planera smartare
          </Text>
        </View>

        <View style={styles.inputRow}>
          <FontAwesome
            name="envelope"
            size={16}
            color="#6b7280"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="E-post"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            accessibilityLabel="email-input"
          />
        </View>

        <View style={styles.inputRow}>
          <FontAwesome
            name="lock"
            size={16}
            color="#6b7280"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Lösenord"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            accessibilityLabel="password-input"
          />
        </View>

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
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {mode === "login" ? "Logga in" : "Skapa konto"}
            </Text>
          )}
        </Pressable>

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>eller</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.socialRow}>
          <Pressable
            style={({ pressed }) => [
              styles.iconButtonLarge,
              styles.googleIcon,
              pressed && styles.pressed,
            ]}
            onPress={startGoogleSignIn}
            disabled={loading}
            accessibilityLabel="Logga in med Google"
            accessibilityHint="Öppnar Google-inloggning i nytt fönster"
            accessible={true}
            accessibilityRole="button"
          >
            <FontAwesome name="google" size={26} color="#fff" />
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.iconButtonLarge,
              styles.facebookIcon,
              pressed && styles.pressed,
            ]}
            onPress={startFacebookSignIn}
            disabled={loading}
            accessibilityLabel="Logga in med Facebook"
            accessibilityHint="Öppnar Facebook-inloggning i nytt fönster"
            accessible={true}
            accessibilityRole="button"
          >
            <FontAwesome name="facebook" size={26} color="#fff" />
          </Pressable>
        </View>

        <View style={styles.row}>
          <Text style={styles.smallText}>
            {mode === "login" ? "Inget konto än?" : "Redan medlem?"}
          </Text>
          <Pressable
            onPress={() => {
              setMode(mode === "login" ? "register" : "login");
              setError(null);
            }}
            accessibilityRole="button"
          >
            <Text style={styles.linkText}>
              {mode === "login" ? " Skapa konto" : " Logga in"}
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f7fb",
    padding: 20,
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
    backgroundColor: "rgba(14,165,164,0.06)",
    top: -60,
    left: -40,
  },
  bgCircleTwo: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(59,130,246,0.05)",
    bottom: -50,
    right: -30,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#ffffff",
    padding: 22,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 6,
  },
  header: {
    alignItems: "center",
    marginBottom: 12,
  },
  logo: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0f172a",
  },
  subtitle: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 4,
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    height: 48,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: "100%",
    padding: 0,
    color: "#0f172a",
  },
  button: {
    height: 50,
    backgroundColor: "#0ea5a4",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
    shadowColor: "#0ea5a4",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3,
  },
  pressed: {
    opacity: 0.85,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 14,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#e6edf3",
  },
  dividerText: {
    marginHorizontal: 12,
    color: "#94a3b8",
    textTransform: "lowercase",
  },
  socialRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  iconButtonLarge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  googleIcon: {
    backgroundColor: "#DB4437",
  },
  facebookIcon: {
    backgroundColor: "#1877F2",
  },
  buttonDisabled: {
    backgroundColor: "#94a3b8",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  errorText: {
    color: "#b91c1c",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },
  smallText: {
    color: "#64748b",
  },
  linkText: {
    color: "#0ea5a4",
    fontWeight: "600",
  },
});
