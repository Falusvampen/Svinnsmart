// src/services/authService.ts
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";

// Typ-definition för svaret vi får tillbaka (för felhantering)
interface AuthResponse {
  user?: User;
  error?: string;
}

export const AuthService = {
  // Skapa nytt konto
  register: async (email: string, pass: string): Promise<AuthResponse> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        pass,
      );
      return { user: userCredential.user };
    } catch (e: unknown) {
      const msg =
        e instanceof Error
          ? e.message
          : typeof e === "string"
            ? e
            : "Kunde inte skapa konto.";
      return { error: msg };
    }
  },

  // Logga in
  login: async (email: string, pass: string): Promise<AuthResponse> => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        pass,
      );
      return { user: userCredential.user };
    } catch (e: unknown) {
      const msg =
        e instanceof Error
          ? e.message
          : typeof e === "string"
            ? e
            : "Kunde inte logga in.";
      return { error: msg };
    }
  },

  // Logga in med Google-token
  // Input: idToken (JWT) och valfri accessToken
  // Använder Firebase credential för att skapa/återanvända användaren.
  loginWithGoogleToken: async (
    idToken: string,
    accessToken?: string,
  ): Promise<AuthResponse> => {
    try {
      const credential = GoogleAuthProvider.credential(idToken, accessToken);
      const userCredential = await signInWithCredential(auth, credential);
      return { user: userCredential.user };
    } catch (e: unknown) {
      const msg =
        e instanceof Error
          ? e.message
          : typeof e === "string"
            ? e
            : "Kunde inte logga in med Google-token.";
      return { error: msg };
    }
  },

  // Logga in med Facebook access token
  loginWithFacebookToken: async (
    accessToken: string,
  ): Promise<AuthResponse> => {
    try {
      const credential = FacebookAuthProvider.credential(accessToken);
      const userCredential = await signInWithCredential(auth, credential);
      return { user: userCredential.user };
    } catch (e: unknown) {
      const msg =
        e instanceof Error
          ? e.message
          : typeof e === "string"
            ? e
            : "Kunde inte logga in med Facebook-token.";
      return { error: msg };
    }
  },

  // Logga ut
  logout: async () => {
    try {
      await signOut(auth);
    } catch (e: unknown) {
      console.error(e);
    }
  },
};
