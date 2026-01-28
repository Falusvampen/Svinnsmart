import * as Facebook from "expo-auth-session/providers/facebook";
import * as Google from "expo-auth-session/providers/google";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { AuthService } from "../services/authService";
import { getErrorMessage } from "../utils/error";

export const useSocialAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [, googleResponse, promptGoogleAsync] = Google.useAuthRequest({
    clientId: process.env.WEB_GOOGLE_CLIENT_ID || "<WEB_CLIENT_ID>",
    iosClientId: process.env.IOS_GOOGLE_CLIENT_ID || "<IOS_CLIENT_ID>",
    androidClientId:
      process.env.ANDROID_GOOGLE_CLIENT_ID || "<ANDROID_CLIENT_ID>",
  });

  const [, facebookResponse, promptFacebookAsync] = Facebook.useAuthRequest({
    clientId: process.env.FACEBOOK_APP_ID || "minhemligasvinnsmartsecret",
  });

  // När Google returnerar en successful response -> utbyt token mot Firebase credential
  useEffect(() => {
    if (!googleResponse) return;
    if (googleResponse.type !== "success") return;
    const idToken = (googleResponse as any).authentication?.idToken as
      | string
      | undefined;
    const accessToken = (googleResponse as any).authentication?.accessToken as
      | string
      | undefined;
    if (!idToken && !accessToken) return;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await AuthService.loginWithGoogleToken(
          idToken ?? "",
          accessToken,
        );
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
    })();
  }, [googleResponse, router]);

  // Facebook response -> utbyt accessToken mot Firebase credential
  useEffect(() => {
    if (!facebookResponse) return;
    if (facebookResponse.type !== "success") return;

    const accessToken = (facebookResponse as any).authentication
      ?.accessToken as string | undefined;
    if (!accessToken) return;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await AuthService.loginWithFacebookToken(accessToken);
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
    })();
  }, [facebookResponse, router]);

  const startGoogle = useCallback(async () => {
    setError(null);
    try {
      await promptGoogleAsync();
    } catch (e: unknown) {
      setError(getErrorMessage(e));
    }
  }, [promptGoogleAsync]);

  const startFacebook = useCallback(async () => {
    setError(null);
    try {
      await promptFacebookAsync();
    } catch (e: unknown) {
      setError(getErrorMessage(e));
    }
  }, [promptFacebookAsync]);

  return { startGoogle, startFacebook, loading, error } as const;
};
