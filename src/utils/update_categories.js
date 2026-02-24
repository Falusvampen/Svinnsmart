// Importera Node.js inbyggda filsystem-modul
const fs = require("fs");

// 1. Definition av standardvärden per Varuområde (i dagar)
const areaShelfLife = {
  Djupfryst: 180,
  "Färskvaror/Kylvaror": 14,
  "Kolonial/Speceri": 720,
  "Non food": 0,
  "Hittar ej.": 0,
};

// 2. Specifika värden för Huvudgrupper inom Djupfryst (OBS: Kod 0 hanteras separat)
const frozenSubCategoryShelfLife = {
  64: 180,
  67: 270,
  68: 180,
  65: 90,
  66: 180,
  60: 360,
  61: 360,
  58: 360,
  57: 360,
  44: 360,
  59: 360,
  62: 180,
  50: 360,
  48: 180,
  49: 180,
  47: 180,
  2: 180,
  53: 180,
  55: 90,
  56: 90,
  45: 90,
  46: 180,
  52: 360,
  51: 180,
  54: 360,
  108: 90,
  89: 180,
};

// 3. Specifika värden för Huvudgrupper inom Färskvaror/Kylvaror (OBS: Kod 0 hanteras separat)
const chilledSubCategoryShelfLife = {
  82: 1,
  84: 1,
  86: 2,
  83: 14,
  85: 14,
  87: 14,
  3: 7,
  75: 14,
  71: 30,
  73: 30,
  74: 2,
  72: 30,
  81: 2,
  80: 3,
  79: 30,
  69: 3,
  103: 3,
  104: 3,
  105: 3,
  95: 3,
  110: 2,
  70: 3,
  76: 4,
  77: 2,
  78: 2,
  90: 1,
};

// 4. Specifika värden för Huvudgrupper inom Kolonial/Speceri (OBS: Kod 0 hanteras separat)
const pantrySubCategoryShelfLife = {
  12: 1800,
  11: 1800,
  42: 1800,
  1: 180,
  9: 180,
  7: 720,
  10: 360,
  4: 360,
  6: 360,
  35: 720,
  13: 360,
  31: 1080,
  32: 1080,
  33: 1080,
  29: 720,
  28: 720,
  27: 720,
  30: 720,
  17: 720,
  16: 360,
  26: 360,
  19: 360,
  18: 360,
  21: 360,
  41: 360,
  94: 360,
  25: 360,
  96: 3,
  8: 180,
  5: 180,
  43: 180,
  40: 360,
  23: 360,
  20: 360,
  92: 180,
  34: 360,
  109: 360,
  24: 180,
  36: 180,
  22: 180,
  38: 180,
  15: 360,
  14: 180,
  88: 180,
};

/**
 * Funktion som applicerar hållbarhet på JSON-data
 */
function applyShelfLife(data) {
  if (!data || !data.Varuomraden) return data;

  data.Varuomraden.forEach((omrade) => {
    let areaDefault =
      areaShelfLife[omrade.Benamning] !== undefined
        ? areaShelfLife[omrade.Benamning]
        : 0;
    omrade.DefaultShelfLife = areaDefault;

    if (omrade.Huvudgrupper) {
      omrade.Huvudgrupper.forEach((grupp) => {
        if (grupp.Kod === 0) {
          switch (grupp.Benamning) {
            case "Fisk- och skaldjur, oberedd":
              grupp.DefaultShelfLife = 180;
              break;
            case "Enportionsrätter (kompletta)":
              grupp.DefaultShelfLife = 3;
              break;
            case "Cider & alkoholhaltiga blanddrycker":
              grupp.DefaultShelfLife = 360;
              break;
            case "Sprit":
              grupp.DefaultShelfLife = 1800;
              break;
            case "Öl och maltdrycker":
              grupp.DefaultShelfLife = 180;
              break;
            default:
              grupp.DefaultShelfLife = areaDefault;
          }
        } else if (
          omrade.Benamning === "Djupfryst" &&
          frozenSubCategoryShelfLife[grupp.Kod] !== undefined
        ) {
          grupp.DefaultShelfLife = frozenSubCategoryShelfLife[grupp.Kod];
        } else if (
          omrade.Benamning === "Färskvaror/Kylvaror" &&
          chilledSubCategoryShelfLife[grupp.Kod] !== undefined
        ) {
          grupp.DefaultShelfLife = chilledSubCategoryShelfLife[grupp.Kod];
        } else if (
          omrade.Benamning === "Kolonial/Speceri" &&
          pantrySubCategoryShelfLife[grupp.Kod] !== undefined
        ) {
          grupp.DefaultShelfLife = pantrySubCategoryShelfLife[grupp.Kod];
        } else {
          grupp.DefaultShelfLife = areaDefault;
        }
      });
    }
  });

  return data;
}

// 5. Kör scriptet på filen
try {
  console.log("Läser in data.json...");
  // Byt ut 'data.json' här nedanför om din fil heter något annat!
  const rawData = fs.readFileSync("raw.json", "utf8");
  const jsonData = JSON.parse(rawData);

  console.log("Applicerar hållbarhetstider...");
  const updatedData = applyShelfLife(jsonData);

  console.log("Sparar till updated_data.json...");
  // Skriver den nya filen. 'null, 2' gör att JSON-filen blir snyggt formaterad och lättläst
  fs.writeFileSync(
    "updated_data.json",
    JSON.stringify(updatedData, null, 2),
    "utf8",
  );

  console.log("Klar! Kolla i mappen efter updated_data.json 🎉");
} catch (error) {
  console.error(
    "Något gick fel! Har du döpt filen till data.json och lagt den i samma mapp?",
    error.message,
  );
}
