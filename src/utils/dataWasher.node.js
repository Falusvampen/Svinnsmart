const TRANSLATION_MAP = {
  mellanmjölk: "Semi-skimmed milk",
  lättmjölk: "Low-fat milk",
  standardmjolk: "Whole milk",
  mjölk: "Milk",
  grädde: "Cream",
  vispgrädde: "Whipping cream",
  matlagningsgrädde: "Cooking cream",
  "crème fraiche": "Crème fraîche",
  yoghurt: "Yoghurt",
  "grekisk yoghurt": "Greek yoghurt",
  filmjölk: "Soured milk",
  kvarg: "Quark",
  keso: "Cottage cheese",
  ägg: "Eggs",
  smör: "Butter",
  margarin: "Margarine",
  ost: "Cheese",
  "riven ost": "Grated cheese",
  färs: "Minced meat",
  köttfärs: "Minced meat",
  nötkött: "Beef",
  fläsk: "Pork",
  fläskkött: "Pork",
  lamm: "Lamb",
  fågel: "Poultry",
  kyckling: "Chicken",
  kalkon: "Turkey",
  skinka: "Ham",
  korv: "Sausage",
  bacon: "Bacon",
  lax: "Salmon",
  torsk: "Cod",
  tonfisk: "Tuna",
  fisk: "Fish",
  räkor: "Shrimp",
  skaldjur: "Shellfish",
  äpplen: "Apples",
  äpple: "Apple",
  banan: "Banana",
  apelsin: "Orange",
  päron: "Pear",
  jordgubbar: "Strawberries",
  hallon: "Raspberries",
  blåbär: "Blueberries",
  potatis: "Potato",
  sötpotatis: "Sweet potato",
  rödbeta: "Beetroot",
  lök: "Onion",
  vitlök: "Garlic",
  morot: "Carrot",
  sallad: "Lettuce",
  spenat: "Spinach",
  broccoli: "Broccoli",
  blomkål: "Cauliflower",
  paprika: "Bell pepper",
  tomat: "Tomato",
  gurka: "Cucumber",
  avokado: "Avocado",
  örter: "Fresh herbs",
  persilja: "Parsley",
  dill: "Dill",
  basilika: "Basil",
  salladslök: "Spring onion",
  vårlök: "Spring onion",
  bröd: "Bread",
  limpa: "Loaf",
  fralla: "Roll",
  baguette: "Baguette",
  tunnbröd: "Flatbread",
  kanelbulle: "Cinnamon bun",
  kaka: "Cake",
  kex: "Biscuits",
  tårtbotten: "Cake base",
  pasta: "Pasta",
  spaghetti: "Spaghetti",
  penne: "Penne",
  ris: "Rice",
  basmatiris: "Basmati rice",
  mjöl: "Flour",
  havregryn: "Oats",
  müsli: "Muesli",
  cereal: "Cereal",
  socker: "Sugar",
  salt: "Salt",
  bönor: "Beans",
  linser: "Lentils",
  kikärtor: "Chickpeas",
  nötter: "Nuts",
  "torkad frukt": "Dried fruit",
  konserv: "Canned goods",
  burk: "Can",
  olja: "Oil",
  olivolja: "Olive oil",
  rapsolja: "Rapeseed oil",
  vinäger: "Vinegar",
  soja: "Soy sauce",
  woksås: "Wok sauce",
  ketchup: "Ketchup",
  senap: "Mustard",
  majonnäs: "Mayonnaise",
  honung: "Honey",
  sirap: "Syrup",
  buljong: "Stock",
  bakpulver: "Baking powder",
  vaniljsocker: "Vanilla sugar",
  jäst: "Yeast",
  kakao: "Cocoa",
  glass: "Ice cream",
  "fryst pizza": "Frozen pizza",
  läsk: "Soda",
  juice: "Juice",
  kaffe: "Coffee",
  te: "Tea",
  vatten: "Water",
  öl: "Beer",
  vin: "Wine",
  chips: "Chips",
  godis: "Candy",
  choklad: "Chocolate",
};

const KEYWORDS = {
  dairy: [
    "mjölk",
    "mellanmjölk",
    "lättmjölk",
    "grädde",
    "vispgrädde",
    "matlagningsgrädde",
    "crème",
    "crème fraiche",
    "yoghurt",
    "grekisk yoghurt",
    "kvarg",
    "keso",
    "ost",
    "riven ost",
    "smör",
    "margarin",
    "fil",
  ],
  eggs: ["ägg", "äggula", "äggvita"],
  meatFish: [
    "kött",
    "nötkött",
    "fläsk",
    "fläskkött",
    "lamm",
    "fågel",
    "kyckling",
    "kalkon",
    "skinka",
    "korv",
    "bacon",
    "färs",
    "köttfärs",
    "hamburgare",
    "fisk",
    "lax",
    "torsk",
    "tonfisk",
    "räkor",
    "skaldjur",
  ],
  fruitVeg: [
    "äpple",
    "äpplen",
    "banan",
    "apelsin",
    "päron",
    "jordgubbar",
    "hallon",
    "blåbär",
    "potatis",
    "sötpotatis",
    "rödbeta",
    "morot",
    "lök",
    "vitlök",
    "sallad",
    "spenat",
    "broccoli",
    "blomkål",
    "paprika",
    "tomat",
    "gurka",
    "avokado",
    "avocado",
    "örter",
    "persilja",
    "dill",
    "basilika",
    "salladslök",
    "vårlök",
  ],
  rootVegPantry: ["potatis", "lök", "rödbeta", "rotselleri", "sötpotatis"],
  bread: [
    "bröd",
    "limpa",
    "fralla",
    "baguette",
    "tunnbröd",
    "kaka",
    "tårta",
    "bakelse",
    "kanelbulle",
    "kex",
    "tårtbotten",
  ],
  pantryDry: [
    "pasta",
    "spaghetti",
    "penne",
    "ris",
    "basmatiris",
    "mjöl",
    "havregryn",
    "müsli",
    "cereal",
    "socker",
    "salt",
    "bönor",
    "linser",
    "kikärtor",
    "nötter",
    "torkad",
    "torkad frukt",
    "bulgur",
    "couscous",
    "majs",
    "polenta",
    "mjölmix",
  ],
  flavorBaking: [
    "salt",
    "peppar",
    "pepparmix",
    "krydda",
    "kryddor",
    "olja",
    "olivolja",
    "rapsolja",
    "vinäger",
    "soja",
    "woksås",
    "ketchup",
    "senap",
    "majonnäs",
    "honung",
    "sirap",
    "buljong",
    "bakpulver",
    "vaniljsocker",
    "jäst",
    "kakao",
    "vanilj",
  ],
  frozen: ["glass", "fryst", "frysta", "djupfryst", "frozen", "frys"],
  drinksSnacks: [
    "läsk",
    "läskedryck",
    "juice",
    "smoothie",
    "saft",
    "kaffe",
    "te",
    "vatten",
    "öl",
    "vin",
    "energidryck",
    "chips",
    "godis",
    "choklad",
    "bars",
    "kakor",
    "crunch",
  ],
};

const UI_KEYWORDS = {
  volume: [
    "mjölk",
    "yoghurt",
    "grädde",
    "crème",
    "crème fraiche",
    "soppa",
    "sås",
    "dressing",
    "majonnäs",
    "sylt",
    "honung",
    "sirap",
    "mjöl",
    "pasta",
    "ris",
    "färs",
    "riven ost",
    "färskost",
    "juice",
    "saft",
  ],
  count: [
    "ägg",
    "äpple",
    "banan",
    "avokado",
    "avocado",
    "bröd",
    "limpa",
    "fralla",
    "kakor",
    "konserv",
    "konservburk",
    "burk",
    "flaska",
    "paket",
    "pkt",
    "st",
  ],
  binary: [
    "salt",
    "peppar",
    "kryddor",
    "olja",
    "olivolja",
    "rapsolja",
    "vinäger",
    "soja",
    "ketchup",
    "senap",
    "buljong",
    "bakpulver",
    "jäst",
    "vaniljsocker",
    "kakao",
  ],
};

function normalize(text) {
  return (text || "")
    .toLowerCase()
    .replace(/[åä]/g, "a")
    .replace(/ö/g, "o")
    .trim();
}

function translateName(name) {
  let cleaned = name
    .toLowerCase()
    .replace(/\([^)]*\)/g, "")
    .replace(/\b\d+[\s-]?(g|kg|ml|l|cl|st|pkt|paket|x)\b/g, "")
    .replace(
      /\b(förpackning|förp|burk|flaska|kartong|ask|pkt|paket|styck|stycken)\b/g,
      "",
    )
    .replace(
      /\b(skivad|hackad|krossad|fryst|tinad|färsk|färskaste|kant|halv)\b/g,
      "",
    )
    .trim();

  const key = normalize(cleaned);
  if (TRANSLATION_MAP[key]) return TRANSLATION_MAP[key];
  for (const k of Object.keys(TRANSLATION_MAP)) {
    if (key.includes(k)) return TRANSLATION_MAP[k];
  }
  const firstWord =
    cleaned.split(/\s+/).find((w) => w && !/^[0-9]+$/.test(w)) ||
    name.split(/\s+/)[0];
  return firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
}

function enrichItem(item) {
  const raw = normalize(item.name || item.Name || "");
  const group = normalize(item.originalGroup || "");

  let category = undefined;

  if (
    [...KEYWORDS.dairy, ...KEYWORDS.eggs].some(
      (k) => raw.includes(k) || group.includes(k),
    )
  ) {
    category = "Dairy & Eggs";
  } else if (
    KEYWORDS.meatFish.some((k) => raw.includes(k) || group.includes(k))
  ) {
    category = "Meat, Fish & Poultry";
  } else if (
    KEYWORDS.frozen.some((k) => raw.includes(k) || group.includes(k))
  ) {
    category = "Frozen";
  } else if (
    KEYWORDS.fruitVeg.some((k) => raw.includes(k) || group.includes(k))
  ) {
    category = "Fruit & Vegetables";
  } else if (KEYWORDS.bread.some((k) => raw.includes(k) || group.includes(k))) {
    category = "Bread & Bakery";
  } else if (
    KEYWORDS.pantryDry.some((k) => raw.includes(k) || group.includes(k))
  ) {
    category = "Pantry & Dry Goods";
  } else if (
    KEYWORDS.flavorBaking.some((k) => raw.includes(k) || group.includes(k))
  ) {
    category = "Flavoring & Baking";
  } else if (
    KEYWORDS.drinksSnacks.some((k) => raw.includes(k) || group.includes(k))
  ) {
    category = "Drinks & Snacks";
  } else {
    category = "Pantry & Dry Goods";
  }

  let storage = "pantry";
  switch (category) {
    case "Dairy & Eggs":
      storage = "fridge";
      break;
    case "Meat, Fish & Poultry":
      storage = KEYWORDS.frozen.some((k) => raw.includes(k))
        ? "freezer"
        : "fridge";
      break;
    case "Fruit & Vegetables":
      storage = KEYWORDS.rootVegPantry.some((k) => raw.includes(k))
        ? "pantry"
        : "fridge";
      break;
    case "Bread & Bakery":
      storage = "pantry";
      break;
    case "Pantry & Dry Goods":
      storage = "pantry";
      break;
    case "Flavoring & Baking":
      storage = "pantry";
      break;
    case "Frozen":
      storage = "freezer";
      break;
    case "Drinks & Snacks":
      storage = "pantry";
      break;
    default:
      storage = "pantry";
  }

  let uiType = "count";
  if (UI_KEYWORDS.count.some((k) => raw.includes(k) || group.includes(k)))
    uiType = "count";
  else if (UI_KEYWORDS.binary.some((k) => raw.includes(k) || group.includes(k)))
    uiType = "binary";
  else if (UI_KEYWORDS.volume.some((k) => raw.includes(k) || group.includes(k)))
    uiType = "volume";
  else {
    if (category === "Pantry & Dry Goods" || category === "Flavoring & Baking")
      uiType = "binary";
    else if (category === "Dairy & Eggs" || category === "Drinks & Snacks")
      uiType = "volume";
    else uiType = "count";
  }

  const nameEn = translateName(item.name || item.Name || "");

  return {
    id: item.id || item.Id || 0,
    name: item.name || item.Name || "",
    nameEn,
    category,
    storage,
    uiType,
  };
}

module.exports = { enrichItem };
