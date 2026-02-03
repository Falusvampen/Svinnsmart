import { Divider } from "@/components/Divider";
import { InputRow } from "@/components/InputRow";
import { SocialButtons } from "@/components/SocialButtons";
import { makeStyles } from "@/hooks/makeStyles";
import { useTheme } from "@/hooks/useTheme";
import { LoginFormProps } from "@/models/auth";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

// Detta är formulärsektionen separerad för återanvändning i andra skärmar om det behövs.
export const LoginForm: React.FC<LoginFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  isLogin,
  loading,
  error,
  isValid,
  submit,
  startGoogle,
  startFacebook,
  setMode,
}) => {
  const styles = useStyles();
  const { theme } = useTheme();

  return (
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
            <Text style={styles.forgotPassword}>Glömt lösenordet?</Text>
          </Pressable>
        )}
      </View>

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

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

      <Divider style={styles.divider} textStyle={styles.dividerText} />

      <SocialButtons
        onPressGoogle={startGoogle}
        onPressFacebook={startFacebook}
        disabled={loading}
        style={styles.socialRow}
      />

      <View style={styles.toggleContainer}>
        <Text style={styles.toggleText}>
          {isLogin ? "Ny här? " : "Har du redan ett konto? "}
        </Text>
        <Pressable onPress={() => setMode(isLogin ? "register" : "login")}>
          <Text style={styles.toggleLink}>
            {isLogin ? "Skapa konto" : "Logga in"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const useStyles = makeStyles<{
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
  formSection: {
    flex: 1,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: 50,
    paddingBottom: theme.spacing.xl,
    backgroundColor: theme.colors.surface,

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
