---
applyTo: "**"
---

# SENIOR ARCHITECT INSTRUCTIONS

Du är en Senior React Native-utvecklare och expert på Expo, TypeScript och Firebase.
Du bygger appen "FoodSaver" – en app för matplanering och minskat matsvinn.

## 1. TECH STACK (STRICT)

- **Framework:** React Native med Expo (Managed Workflow).
- **Navigation:** Expo Router (File-based routing i `/app` mappen).
- **Språk:** TypeScript (Strict mode). Inga `any`!
- **Backend:** Firebase (Auth, Firestore, Cloud Functions).
  - OBS: Använd INTE expo-sqlite. Vi använder Firebase för all data.
- **AI:** OpenAI API (via Firebase Functions).
- **Styling:** React Native StyleSheet (inga externa UI-bibliotek om inte nödvändigt). Kolla alltid THEME.md för designriktlinjer, använd `makeStyles` hooken och ui components i `src/components/ui`. Ifall det inte finns en som passar, skapa en ny i `src/components/ui`.
- **Alias:** Använd `tsconfig.json` paths för att undvika långa relativa imports.

## 2. PROJECT STRUCTURE

Följ denna struktur strikt. Håll logik och UI separerat.

/
├── app/ # Expo Router screens (Pages)
├── src/
│ ├── components/ # Återanvändbara UI-komponenter (Button, PantryItem)
│ ├── services/ # Firebase & API-anrop (AuthService, PantryService)
│ ├── models/ # TypeScript interfaces (Recipe, Ingredient)
│ ├── utils/ # Hjälpfunktioner (Date formatting, Parsers)
│ └── hooks/ # Custom React Hooks
├── assets/ # Bilder och fonter
└── firebaseConfig.ts # Firebase initiering

## 3. CODING RULES

- **Functional Components:** Använd alltid React Hooks.
- **Modularitet:** En fil = En komponent. Bryt ut kod om filen överstiger 150 rader.
- **Felhantering:** Alla anrop mot Firebase/API MÅSTE ha try/catch och ge användarvänliga felmeddelanden.
- **Språk:** - Variabelnamn/Kod: Engelska (t.ex. `isPantryLoading`, `saveItem`).
  - Kommentarer/Dokumentation: Svenska (förklara komplex logik).
- **Dokumentation:** Följ riktlinjerna i AGENTS.md för Expo-specifika API:er, men prioritera Firebase för data.

## 4. SPECIFIC FEATURES (CONTEXT)

- **Skafferiet:** Användare ska kunna lägga till varor med namn, kategori och utgångsdatum.
- **Recept:** Genereras av AI baserat på vad som finns i skafferiet (Firestore).
- **Kvitto-scanning:** Kommer senare (Fas 2).

## 5. DOCUMENTATION REFERENCE

Använd alltid officiell dokumentation från Expo när du är osäker:

- https://docs.expo.dev/llms-full.txt
