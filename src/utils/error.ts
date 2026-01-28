// src/utils/error.ts
// Hjälp för att plocka ut ett felmeddelande från okänt felobjekt
export function getErrorMessage(error: unknown) {
  if (!error) return "Något gick fel.";
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  // Om Firebase returnerar ett objekt med `message`-fält
  if (typeof error === "object" && error !== null && "message" in error) {
    const maybeMsg = (error as { message?: unknown }).message;
    if (typeof maybeMsg === "string") return maybeMsg;
    return "Något gick fel.";
  }
  return "Något gick fel.";
}
