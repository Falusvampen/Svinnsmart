// Theme tokens for Hasse (Japandi / environment-friendly mood)
// Kommentarer: Förklara komplex logik på svenska.

export type ColorTokens = {
  background: string;
  surface: string;
  muted: string;
  text: string;
  textMuted: string;
  primary: string;
  primaryDark: string;
  accent: string;
  success: string;
  warning: string;
  danger: string;
  border: string;
  facebook: string;
  google: string;
  shadow: string; // rgba
};

export type TypographyTokens = {
  fontSizes: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  lineHeights: {
    sm: number;
    md: number;
    lg: number;
  };
  fontWeights: {
    regular: string;
    medium: string;
    bold: string;
  };
};

export type SpacingTokens = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

export type RadiusTokens = {
  sm: number;
  md: number;
  lg: number;
};

export type ElevationTokens = {
  low: {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
  mid: {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
  high: {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
};

export type AppTheme = {
  colors: ColorTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  radius: RadiusTokens;
  elevation: ElevationTokens;
  // Gradient tokener (återanvändbara gradienter)
  gradients: Record<
    string,
    {
      colors: string[];
      start: [number, number];
      end: [number, number];
      locations?: number[];
    }
  >;
  // Små helpers
  getContrastText: (bg: string) => string;
};

// Hjälpfunktion: en simpel luminanscheck för att välja textfärg mot bakgrund.
function luminance(hex: string) {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16) / 255;
  const g = parseInt(c.substring(2, 4), 16) / 255;
  const b = parseInt(c.substring(4, 6), 16) / 255;
  const a = [r, g, b].map((v) =>
    v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4),
  );
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

function pickContrast(bg: string) {
  // Returnerar svart eller vitt beroende på luminans
  return luminance(bg) > 0.5 ? "#222222" : "#FFFFFF";
}

// Japandi-inspired färgpalett: varma neutrala baser + dämpade gröna accenter
export const lightTheme: AppTheme = {
  colors: {
    background: "#FAF8F4", // varm off-white
    surface: "#FFFFFF",
    muted: "#F4F8F4",
    text: "#22221F", // mörk kol
    textMuted: "#4f554d",
    primary: "#2ea84d", // mer livfull grön (energisk)
    primaryDark: "#155f31",
    accent: "#D98C5B", // varmare terracotta för energi
    success: "#34D399", // klar, positiv grön
    warning: "#F59E0B", // mer vibrerande amber
    danger: "#EF4444", // klar röd för fel
    border: "#E8F0E8",
    facebook: "#1877F2",
    google: "#FFFFFF",
    shadow: "rgba(23, 23, 18, 0.08)",
  },
  typography: {
    fontSizes: { xs: 12, sm: 14, md: 16, lg: 20, xl: 24 },
    lineHeights: { sm: 18, md: 22, lg: 28 },
    fontWeights: { regular: "400", medium: "500", bold: "700" },
  },
  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
  radius: { sm: 6, md: 12, lg: 18 },
  elevation: {
    low: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 4,
      elevation: 2,
    },
    mid: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 10,
      elevation: 6,
    },
    high: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.12,
      shadowRadius: 20,
      elevation: 12,
    },
  },
  gradients: {
    primary: {
      // Mjukare, lager-på-lager gradient: varm topp -> lätt grön mitt -> djupare botten
      colors: ["#FBF7F2", "#CFF2D0", "#7ED58A", "#2EA84D"],
      start: [0, 0],
      end: [1, 1],
      // locations kan användas för finjustering om behövs
      locations: [0, 0.45, 0.75, 1],
    },
    subtle: {
      // En mycket svag toning för användning bakom kort eller som låg-intensitet bakgrund
      colors: ["#FFFFFF", "#F7FBF8"],
      start: [0, 0],
      end: [0, 1],
    },
    accent: {
      // Terracotta/accent-variant för små highlights och badges
      colors: ["#FFF6F1", "#F7E1D2", "#D98C5B"],
      start: [0, 0],
      end: [1, 1],
    },
    hero: {
      // "Soft Horizon" - Mjuk övergång från bakgrund till en blek salvia-grön botten.
      // Mycket diskret för att inte störa innehållet.
      colors: ["#FAF8F4", "#E3EDE5", "#D6E6DA"],
      start: [0, 0],
      end: [0, 1], // Vertikal toning
      locations: [0, 0.6, 1],
    },
    warm: {
      colors: ["#FFF6F1", "#F6E9DD", "#F0C9A8"],
      start: [0, 0],
      end: [1, 1],
    },
    cool: {
      colors: ["#F3FAF9", "#BEE8D6", "#7ED58A"],
      start: [0, 0],
      end: [1, 1],
    },
  },
  getContrastText: pickContrast,
};

export const darkTheme: AppTheme = {
  colors: {
    background: "#0F0F0D", // mörk, matt bakgrund (dämpad)
    surface: "#161614",
    muted: "#1E241F",
    text: "#F3F1ED",
    textMuted: "#BFC1B7",
    primary: "#9EDFA6", // ljus, energisk grön för mörkt läge
    primaryDark: "#53B35A",
    accent: "#E07A48",
    success: "#4CE08A",
    warning: "#F59E0B",
    danger: "#EF4444",
    border: "#243327",
    facebook: "#1877F2",
    google: "#F7F7F7",
    shadow: "rgba(0, 0, 0, 0.6)",
  },
  typography: lightTheme.typography,
  spacing: lightTheme.spacing,
  radius: lightTheme.radius,
  elevation: {
    low: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.4,
      shadowRadius: 3,
      elevation: 2,
    },
    mid: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.5,
      shadowRadius: 12,
      elevation: 8,
    },
    high: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 14 },
      shadowOpacity: 0.6,
      shadowRadius: 22,
      elevation: 16,
    },
  },
  gradients: {
    primary: {
      // Naturlig, djup mörk gradient med en sval grön ton i mitten
      colors: ["#0F0F0D", "#1C2E22", "#3A6B48", "#53B35A"],
      start: [0, 0],
      end: [1, 1],
      locations: [0, 0.5, 0.8, 1],
    },
    subtle: {
      colors: ["#141413", "#191A18"],
      start: [0, 0],
      end: [0, 1],
    },
    accent: {
      colors: ["#2B130A", "#4E3017", "#E07A48"],
      start: [0, 0],
      end: [1, 1],
    },
    hero: {
      // En subtil "natt-dimma" för dark mode. Väldigt svag ljusning mot botten.
      colors: ["#0F0F0D", "#151F19", "#1E2B23"],
      start: [0, 0],
      end: [0, 1],
      locations: [0, 0.5, 1],
    },
    warm: {
      colors: ["#1B0F0C", "#3A221A", "#6A3F2A"],
      start: [0, 0],
      end: [1, 1],
    },
    cool: {
      colors: ["#0F1210", "#16351F", "#3A6B48"],
      start: [0, 0],
      end: [1, 1],
    },
  },
  getContrastText: pickContrast,
};

// Default export (light theme) för enkel import
export default lightTheme;
