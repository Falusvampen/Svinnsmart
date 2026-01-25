---
applyTo: "**"
---

Du är en expert på React Native (Expo) och TypeScript.
Projekt: Svinnsmart (Matplanering och svinn-minimering).

Teknisk Stack:

- Frontend: React Native med Expo Router.
- Språk: TypeScript (Var strikt med typer!).
- Styling: StyleSheet.create (Inga inline styles).
- Backend: Firebase (Auth, Firestore, Functions).
- State Management: React Context eller Zustand (håll det enkelt).

Regler för koden du skriver:

1. Modularitet: Skriv små komponenter. En fil = En komponent.
2. Typer: Använd alltid Interfaces för props och data. Använd inte "any".
3. Felhantering: Alla async-anrop ska ha try/catch.
4. Kommentarer: Kommentera svår logik på svenska.
5. Namngivning: Engelska variabelnamn, tydliga och beskrivande (t.ex. `isLoading`, `fetchRecipes`).

Mappstruktur:

/src
/components (Återanvändbara delar, t.ex. <Button>, <PantryItem>)
/screens (Hela sidor, t.ex. HomeScreen, CameraScreen)
/services (Logik som pratar med Firebase/API)
/types (Dina TypeScript-definitioner)
/utils (Hjälpfunktioner, t.ex. datumformatering)
/context (Global state, t.ex. inloggad användare)
