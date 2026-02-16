import * as fs from "fs";
import * as XLSX_CJS from "xlsx";

// --- FIX FÖR IMPORT-STRUL ---
const XLSX = (XLSX_CJS as any).default || XLSX_CJS;

// ==========================================
// 1. TYPDEFINITIONER (ENGLISH)
// ==========================================

// Rådatan från Excel (Svenska rubriker måste vara kvar här för att matcha filen)
interface ExcelRow {
  Livsmedelsnamn: string;
  Livsmedelsnummer: number;
  Gruppering: string;
  [key: string]: string | number | null;
}

// ==========================================
// 2. CONFIGURATION
// ==========================================

const inputFilename = "./scripts/LivsmedelsDB_202602111823.xlsx";
const outputFilename = "output_english.json";

// Mapping: English Key -> List of Swedish Excel Columns
const groups: Record<string, string[]> = {
  Energy: ["Energi (kcal)", "Energi (kJ)"],
  Carbohydrates: [
    "Kolhydrater, tillgängliga (g)",
    "Fibrer (g)",
    "Sockerarter, totalt (g)",
    "Monosackarider (g)",
    "Disackarider (g)",
    "Tillsatt socker (g)",
    "Fritt socker (g)",
    "Fullkorn totalt (g)",
  ],
  Fat: [
    "Fett, totalt (g)",
    "Summa mättade fettsyror (g)",
    "Fettsyra 4:0-10:0 (g)",
    "Laurinsyra C12:0 (g)",
    "Myristinsyra C14:0 (g)",
    "Palmitinsyra C16:0 (g)",
    "Stearinsyra C18:0 (g)",
    "Arakidinsyra C20:0 (g)",
    "Summa enkelomättade fettsyror (g)",
    "Palmitoljesyra C16:1 (g)",
    "Oljesyra C18:1 (g)",
    "Summa fleromättade fettsyror (g)",
    "Linolsyra C18:2 (g)",
    "Linolensyra C18:3 (g)",
    "Arakidonsyra C20:4 (g)",
    "EPA (C20:5) (g)",
    "DPA (C22:5) (g)",
    "DHA (C22:6) (g)",
    "Kolesterol (mg)",
  ],
  Protein: ["Protein (g)"],
  Vitamins: [
    "Vitamin A (RE/µg)",
    "Retinol (µg)",
    "Betakaroten/β-Karoten (µg)",
    "Vitamin D (µg)",
    "Vitamin D inkl 25-OH-D3 (µg)",
    "Vitamin E (mg)",
    "Vitamin K (µg)",
    "Tiamin (mg)",
    "Riboflavin (mg)",
    "Niacin (mg)",
    "Niacinekvivalenter (NE/mg)",
    "Vitamin B6 (mg)",
    "Folat, totalt (µg)",
    "Vitamin B12 (µg)",
    "Vitamin C (mg)",
  ],
  Minerals: [
    "Fosfor, P (mg)",
    "Jod, I (µg)",
    "Järn, Fe (mg)",
    "Kalcium, Ca (mg)",
    "Kalium, K (mg)",
    "Magnesium, Mg (mg)",
    "Natrium, Na (mg)",
    "Salt, NaCl (g)",
    "Selen, Se (µg)",
    "Zink, Zn (mg)",
  ],
  Other: ["Vatten (g)", "Alkohol (g)", "Aska (g)", "Avfall (skal etc.) (%)"],
};

// ==========================================
// 3. LOGIC
// ==========================================

function main() {
  try {
    console.log(`Reading file: ${inputFilename}...`);

    const workbook = XLSX.readFile(inputFilename);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    const rawData = XLSX.utils.sheet_to_json(worksheet, {
      range: 2,
      defval: null,
    }) as ExcelRow[];

    console.log(`Found ${rawData.length} rows. Converting...`);

    const warnedKeys = new Set<string>();

    const structuredData = rawData.map((rad) => {
      // Create the new object with English keys
      const newItem: any = {
        LdbName: rad["Livsmedelsnamn"],
        LdbId: rad["Livsmedelsnummer"],
        LdbGroups: rad["Gruppering"],
        LdbEnergy: {},
        LdbCarbohydrates: {},
        LdbFat: {},
        LdbProtein: {},
        LdbVitamins: {},
        LdbMinerals: {},
        LdbOther: {},
      };

      Object.keys(rad).forEach((key) => {
        // Skip metadata columns (handled manually above)
        if (["Livsmedelsnamn", "Livsmedelsnummer", "Gruppering"].includes(key))
          return;

        const value = rad[key];
        let placed = false;

        // Find which English group this Swedish key belongs to
        for (const [englishGroupName, swedishKeys] of Object.entries(groups)) {
          if (swedishKeys.includes(key)) {
            const targetKey = `Ldb${englishGroupName}`;
            newItem[targetKey][key] = value;
            placed = true;
            break;
          }
        }

        if (!placed) {
          newItem.LdbOther[key] = value;
          if (!warnedKeys.has(key) && !key.startsWith("__EMPTY")) {
            console.warn(
              `WARNING: Unknown column: "${key}" -> Saved in 'Other'`,
            );
            warnedKeys.add(key);
          }
        }
      });

      return newItem;
    });

    const jsonContent = JSON.stringify(structuredData, null, 2);
    fs.writeFileSync(outputFilename, jsonContent, "utf8");

    console.log(`Success! Saved to ${outputFilename}`);
  } catch (error: any) {
    console.error("ERROR:", error.message);
  }
}

main();
