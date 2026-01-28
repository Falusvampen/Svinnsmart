# Theme usage guide ✅

**Short summary**

The app exposes a single, typed theme from `app/constants/theme.ts` and a runtime `ThemeProvider` at `src/context/ThemeProvider.tsx` that wraps the app (already applied in `app/_layout.tsx`). The provider listens to the OS color scheme and exposes both the current `theme` and a `setColorScheme` function so screens can toggle or force a scheme.

---

## How it works 🔧

- Theme tokens and types: `AppTheme` in `app/constants/theme.ts` (keys: `colors`, `typography`, `spacing`, `radius`, `elevation`, `gradients`, and helper `getContrastText`).
- Runtime provider: `src/context/ThemeProvider.tsx` — uses `Appearance` to follow system theme changes and exposes `{ theme, colorScheme, setColorScheme }`.
- Hook usage: `import useTheme from 'src/hooks/useTheme'` — returns the ThemeContext value.
- Styles helper: `src/hooks/makeStyles.ts` — pass a function `(theme: AppTheme) => StyleSheet.NamedStyles` and it memoizes the result for the active theme.
- UI primitives: `src/components/ui/ThemedText.tsx`, `src/components/ui/ThemedButton.tsx` are ready-to-use components that follow tokens.

---

## Quick examples 💡

Toggle theme programmatically:

```tsx
const { colorScheme, setColorScheme } = useTheme();

// force dark
setColorScheme("dark");

// reset to follow system
setColorScheme(Appearance.getColorScheme());
```

Use `makeStyles` and tokens:

```tsx
import { StyleSheet, View } from "react-native";
import { makeStyles } from "src/hooks/makeStyles"; // Obs: { makeStyles }

// 1. Create the hook outside the component (convention: name it useStyles)
const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
}));

export default function Screen() {
  // 2. Call the hook inside the component to get the current styles
  const styles = useStyles();

  return <View style={styles.container} />;
}
```

Use gradients and contrast helper:

```tsx
// React Native LinearGradient (example)
<LinearGradient
  colors={theme.gradients.primary.colors}
  start={theme.gradients.primary.start}
  end={theme.gradients.primary.end}
>
  <Text style={{ color: theme.getContrastText(theme.colors.primary) }}>
    CTA
  </Text>
</LinearGradient>
```

---

## Migration tips & checklist ✅

1. Replace literal color values with `theme.colors.*`.
2. Prefer spacing/radius tokens (`theme.spacing.md`, `theme.radius.sm`) over numeric constants.
3. Move component styles into `makeStyles(theme)` so they update automatically when the scheme changes.
4. Use `ThemedText`/`ThemedButton` for common elements; create small themed wrappers in `src/components/ui` for repeated patterns.

Suggested priority when converting screens:

1. Header / Navigation (app/\_layout.tsx and `(tabs)/_layout.tsx`)
2. `app/recipes.tsx` and recipe detail screens
3. `app/shopping.tsx` and lists/cards
4. Profile and settings screens (good place to add a manual theme toggle)

---

## Notes & gotchas ⚠️

- The `ThemeProvider` follows system changes by default. Calling `setColorScheme` will override until you explicitly reset it.
- `getContrastText(bg)` is a tiny helper to choose readable text color against a background; prefer it for CTA text.
- When using shadows/elevation, match `theme.elevation.*` to keep consistent depth across themes.

---

If you'd like, I can:

- Convert one or more screens to the new theme (pick a priority), or
- Run a codemod to replace simple color literals across the `app/` folder and open the PR for review.

Tell me which option you prefer (or point me to the screens you want converted).
