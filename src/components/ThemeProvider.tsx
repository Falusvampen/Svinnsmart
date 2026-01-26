import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Appearance, ColorSchemeName } from "react-native";
import { AppTheme, darkTheme, lightTheme } from "../../app/constants/theme";

type ThemeContextType = {
  theme: AppTheme;
  colorScheme: ColorSchemeName;
  setColorScheme: (scheme: ColorSchemeName) => void;
};

const defaultContext: ThemeContextType = {
  theme: lightTheme,
  colorScheme: "light",
  setColorScheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const system = Appearance.getColorScheme() ?? "light";
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>(system);

  useEffect(() => {
    // Lyssna på systemtemaändringar
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      if (colorScheme) setColorScheme(colorScheme);
    });
    return () => sub.remove();
  }, []);

  const theme = useMemo(
    () => (colorScheme === "dark" ? darkTheme : lightTheme),
    [colorScheme],
  );

  return (
    <ThemeContext.Provider value={{ theme, colorScheme, setColorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;
