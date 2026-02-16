export interface LdbIngredient {
  LdbName: string;
  LdbId: number;
  LdbGroups: LivsmedelsverketGroup;
  LdbEnergy: Energy;
  LdbCarbohydrates: Carbohydrates;
  LdbFat: Fat;
  LdbProtein: Protein;
  LdbVitamins: Vitamins;
  LdbMinerals: Minerals;
  LdbOther: Other;
}

interface Energy {
  "Energi (kcal)": number | null;
  "Energi (kJ)": number | null;
}

interface Carbohydrates {
  "Kolhydrater, tillgängliga (g)": number | null;
  "Fibrer (g)": number | null;
  "Sockerarter, totalt (g)": number | null;
  "Monosackarider (g)": number | null;
  "Disackarider (g)": number | null;
  "Tillsatt socker (g)": number | null;
  "Fritt socker (g)": number | null;
  "Fullkorn totalt (g)": number | null;
}

interface Fat {
  "Fett, totalt (g)": number | null;
  "Summa mättade fettsyror (g)": number | null;
  "Fettsyra 4:0-10:0 (g)": number | null;
  "Laurinsyra C12:0 (g)": number | null;
  "Myristinsyra C14:0 (g)": number | null;
  "Palmitinsyra C16:0 (g)": number | null;
  "Stearinsyra C18:0 (g)": number | null;
  "Arakidinsyra C20:0 (g)": number | null;
  "Summa enkelomättade fettsyror (g)": number | null;
  "Palmitoljesyra C16:1 (g)": number | null;
  "Oljesyra C18:1 (g)": number | null;
  "Summa fleromättade fettsyror (g)": number | null;
  "Linolsyra C18:2 (g)": number | null;
  "Linolensyra C18:3 (g)": number | null;
  "Arakidonsyra C20:4 (g)": number | null;
  "EPA (C20:5) (g)": number | null;
  "DPA (C22:5) (g)": number | null;
  "DHA (C22:6) (g)": number | null;
  "Kolesterol (mg)": number | null;
}

interface Protein {
  "Protein (g)": number | null;
}

interface Vitamins {
  "Vitamin A (RE/µg)": number | null;
  "Retinol (µg)": number | null;
  "Betakaroten/β-Karoten (µg)": number | null;
  "Vitamin D (µg)": number | null;
  "Vitamin D inkl 25-OH-D3 (µg)": number | null;
  "Vitamin E (mg)": number | null;
  "Vitamin K (µg)": number | null;
  "Tiamin (mg)": number | null;
  "Riboflavin (mg)": number | null;
  "Niacin (mg)": number | null;
  "Niacinekvivalenter (NE/mg)": number | null;
  "Vitamin B6 (mg)": number | null;
  "Folat, totalt (µg)": number | null;
  "Vitamin B12 (µg)": number | null;
  "Vitamin C (mg)": number | null;
}

interface Minerals {
  "Fosfor, P (mg)": number | null;
  "Jod, I (µg)": number | null;
  "Järn, Fe (mg)": number | null;
  "Kalcium, Ca (mg)": number | null;
  "Kalium, K (mg)": number | null;
  "Magnesium, Mg (mg)": number | null;
  "Natrium, Na (mg)": number | null;
  "Salt, NaCl (g)": number | null;
  "Selen, Se (µg)": number | null;
  "Zink, Zn (mg)": number | null;
}

interface Other {
  "Vatten (g)": number | null;
  "Alkohol (g)": number | null;
  "Aska (g)": number | null;
  "Avfall (skal etc.) (%)": number | null;
  [key: string]: number | null | undefined;
}

export type LivsmedelsverketGroup =
  | "Bröd"
  | "Bullar, kakor, tårtor"
  | "Dryck"
  | "Fett, olja"
  | "Fisk, skaldjur"
  | "Flingor, frukostflingor, müsli, gröt, välling"
  | "Frukt, bär"
  | "Glass"
  | "Godis"
  | "Grönsaker, baljväxter, svamp"
  | "Korv"
  | "Kyckling, fågel"
  | "Kött"
  | "Lever, njure, tunga etc."
  | "Mejeri"
  | "Mjöl"
  | "Måltidsersättning, sportpreparat"
  | "Nötter, frön"
  | "Pasta, ris, gryn"
  | "Potatis"
  | "Pålägg"
  | "Quorn, sojaprotein, vegetariska produkter"
  | "Rätter"
  | "Smaksättare"
  | "Snacks"
  | "Sylt, marmelad, gelé, chutney"
  | "Ägg, rom, kaviar"
  | "Övrigt";
