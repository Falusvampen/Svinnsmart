import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Komponenter
import { LoginForm } from "../components/auth/LoginForm";
import { LoginHeader } from "../components/auth/LoginHeader";
import { Mascot } from "../components/auth/Mascot";
import { ThemedView } from "../components/ui/ThemedView";

// Hooks
import { makeStyles } from "../hooks/makeStyles";
import { useAuthForm } from "../hooks/useAuthForm";
import { useSocialAuth } from "../hooks/useSocialAuth";

// Assets

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
              <LoginHeader isLogin={isLogin} />
              <Mascot />

              <LoginForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                isLogin={isLogin}
                loading={loading}
                error={error}
                isValid={isValid}
                submit={submit}
                startGoogle={startGoogle}
                startFacebook={startFacebook}
                setMode={setMode}
              />
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
}));
