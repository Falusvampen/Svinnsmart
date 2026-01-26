# Theme usage guide ✅

This app uses a central theme (Japandi-inspired) exposed from `app/constants/theme.ts` and a `ThemeProvider` (`src/components/ThemeProvider.tsx`) that should wrap the entire app (already applied in `app/_layout.tsx`).

How to use

- Use the `useTheme` hook: `import useTheme from 'src/hooks/useTheme'` to get `{ theme }`.
- Prefer tokens over hard-coded values: `theme.colors.primary`, `theme.spacing.md`, `theme.radius.sm`, etc.
- Use provided UI primitives in `src/components/ui`:
  - `ThemedText` — text using theme tokens
  - `ThemedButton` — button styled with theme tokens

Migration tips

1. Replace hard-coded color values with `theme.colors.*`.
2. Move local styles into `makeStyles(theme)` functions so they update automatically when theme changes.
3. For components used across many screens, create a themed variant in `src/components/ui` and update usages.

Examples:

```
const { theme } = useTheme();
const styles = makeStyles(theme);

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: { backgroundColor: theme.colors.background }
  })
}
```

I created themed example screens for `Skafferi` and `Recept` under `app/pantry` and `app/recipes` as a starting point. Use these as templates when converting additional screens: they demonstrate `useTheme`, `ThemedText`, `ThemedButton` and a reusable `PantryItem` component.

If you want, I can:

1. Convert more existing screens to use tokens automatically (suggested priority: header/navigation, pantry details, recipe detail), or
2. Run an automated codemod to replace simple color constants across the `app/` folder.

Tell me which approach and which screens to do next.
