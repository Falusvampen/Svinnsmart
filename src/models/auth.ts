// Typer för autentieringrelaterade komponenter och props.
// Kommentarer och förklaringar skrivs på svenska enligt projektets riktlinjer.

export type AuthMode = "login" | "register";

export interface LoginFormProps {
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  isLogin: boolean;
  loading: boolean;
  error?: string | null;
  isValid: boolean;
  submit: () => void;
  startGoogle: () => void;
  startFacebook: () => void;
  setMode: (mode: AuthMode) => void;
}
