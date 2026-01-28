import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { AuthService } from "../services/authService";
import { getErrorMessage } from "../utils/error";

export const useAuthForm = (initialMode: "login" | "register" = "login") => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState(initialMode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValid = email.trim().length > 0 && password.length >= 6;

  const submit = useCallback(async () => {
    setError(null);
    if (!isValid) {
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
      router.replace("./(tabs)");
    } catch (e: unknown) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [email, password, mode, router, isValid]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    mode,
    setMode,
    loading,
    error,
    isValid,
    submit,
  } as const;
};
