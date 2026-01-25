import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
// @ts-ignore: getReactNativePersistence exists in the RN bundle
// but is often missing from public TypeScript definitions.
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Dina nycklar från Svinnsmart-projektet
const firebaseConfig = {
  apiKey: "AIzaSyB8Cq_Bb0IJd1zZXMm1d-d-S3CEiWCHtXI",
  authDomain: "svinnsmart.firebaseapp.com",
  projectId: "svinnsmart",
  storageBucket: "svinnsmart.firebasestorage.app",
  messagingSenderId: "785521314416",
  appId: "1:785521314416:web:1153e3d9914571ba9b82b5",
  measurementId: "G-WX41PQSW1V",
};

// 1. Initiera Firebase-appen
const app = initializeApp(firebaseConfig);

// 2. Konfigurera inloggning (Auth) så att den kommer ihåg användaren
// Vi använder AsyncStorage för att spara inloggningen på telefonen
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// 3. Initiera Databasen (Firestore)
const db = getFirestore(app);

// Vi exporterar auth och db så vi kan använda dem i andra filer
export { auth, db };
