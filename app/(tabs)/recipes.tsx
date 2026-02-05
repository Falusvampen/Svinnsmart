import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Egna komponenter
import { Hero } from "@/components/Hero"; // <-- Din nya Hero
import { RecipeCard } from "@/components/recipes/RecipeCard";
import { useTheme } from "@/context/ThemeProvider";
import recipes from "@/data/recipes.json";

// Simulerat skafferi
const MY_PANTRY = [
  "Pasta",
  "Pesto",
  "Krossade tomater",
  "Lök",
  "Vitlök",
  "Nudlar",
];

export default function RecipeFeedScreen() {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [searchQuery, setSearchQuery] = useState("");

  // --- DATA SELECTION ---
  const featuredRecipes = recipes.slice(0, 3);
  const quickRecipes = recipes.filter((r) => r.duration <= 20);
  const allRecipes = recipes;

  // --- COMPONENT: Search Bar (ligger inuti Hero) ---
  const SearchInput = () => (
    <View style={styles.searchContainer}>
      <Ionicons
        name="search-outline"
        size={20}
        color={theme.colors.textMuted}
        style={styles.searchIcon}
      />
      <TextInput
        placeholder="Sök ingrediens eller recept..."
        placeholderTextColor={theme.colors.textMuted}
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {/* Filterknapp (optional) */}
      <TouchableOpacity style={styles.filterButton}>
        <Ionicons
          name="options-outline"
          size={20}
          color={theme.colors.primary}
        />
      </TouchableOpacity>
    </View>
  );

  // --- COMPONENT: Section Header ---
  const SectionHeader = ({
    title,
    subtitle,
  }: {
    title: string;
    subtitle?: string;
  }) => (
    <View style={styles.sectionHeader}>
      <View>
        <Text style={styles.sectionTitle}>{title}</Text>
        {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
      </View>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        barStyle={
          theme.colors.background === "#0F0F0D"
            ? "light-content"
            : "dark-content"
        }
        backgroundColor="transparent"
        translucent
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* --- HERO SECTION --- */}
        <Hero message="Mmm - Jag är sugen på något gott! Vad har vi hemma?">
          <SearchInput />
        </Hero>

        {/* --- SEKTION 1: VECKANS UTVALDA --- */}
        <SectionHeader title="Veckans Utvalda" subtitle="Säsongens favoriter" />
        <FlatList
          horizontal
          data={featuredRecipes}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
          renderItem={({ item }) => (
            <View style={{ width: 280, marginRight: 16 }}>
              <RecipeCard
                {...item}
                variant="vertical"
                userPantry={MY_PANTRY}
                image={item.image}
              />
            </View>
          )}
        />

        {/* --- SEKTION 2: SNABBA VAL --- */}
        <SectionHeader title="Snabba puckar" subtitle="Under 20 minuter" />
        <FlatList
          horizontal
          data={quickRecipes}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
          renderItem={({ item }) => (
            <View style={{ width: 160, marginRight: 16 }}>
              {/* Notera: Jag ökade bredden till 160 för att ge texten lite mer luft */}
              <RecipeCard
                {...item}
                variant="square"
                userPantry={MY_PANTRY}
                // TA BORT RADEN: subtitle=""
              />
            </View>
          )}
        />

        {/* --- SEKTION 3: ALLA RECEPT --- */}
        <SectionHeader
          title="Skafferi & Inspiration"
          subtitle="Baserat på vad du har hemma"
        />
        <View style={styles.verticalList}>
          {allRecipes.map((item) => (
            <RecipeCard
              key={item.id}
              {...item}
              variant="horizontal"
              userPantry={MY_PANTRY}
              style={{ marginBottom: 16 }}
            />
          ))}
        </View>

        {/* Footer Space (för att inte täckas av ev. tabbar) */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

// --- STYLES ---
const createStyles = (theme: any) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: theme.spacing.xl,
    },

    // Search Bar Styles (Inuti Hero)
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.md,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm, // Lite mer höjd
      // Japandi Shadow
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 4,
    },
    searchIcon: {
      marginRight: theme.spacing.sm,
    },
    searchInput: {
      flex: 1,
      fontSize: theme.typography.fontSizes.md,
      color: theme.colors.text,
      fontFamily: "System",
      paddingVertical: 4, // Fix för Android text alignment
    },
    filterButton: {
      marginLeft: theme.spacing.sm,
      padding: 4,
    },

    // Headers
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      paddingHorizontal: theme.spacing.lg,
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.md,
    },
    sectionTitle: {
      fontSize: theme.typography.fontSizes.lg,
      fontWeight: theme.typography.fontWeights.bold,
      color: theme.colors.text,
    },
    sectionSubtitle: {
      fontSize: theme.typography.fontSizes.xs,
      color: theme.colors.textMuted,
      marginTop: 2,
    },

    // Lists
    horizontalList: {
      paddingHorizontal: theme.spacing.lg,
      paddingBottom: theme.spacing.xs,
    },
    verticalList: {
      paddingHorizontal: theme.spacing.lg,
    },
  });
