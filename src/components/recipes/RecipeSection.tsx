import { ThemedText } from "@/components/ui/ThemedText";
import { makeStyles } from "@/hooks/makeStyles";
import React from "react";
import { ScrollView, View } from "react-native";

type Props = {
  title: string;
  horizontal?: boolean;
  children?: React.ReactNode;
};

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: 20,
  },
  title: {
    marginBottom: 12,
  },
}));

const RecipeSection: React.FC<Props> = ({
  title,
  horizontal = false,
  children,
}) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <ThemedText variant="title" style={styles.title}>
        {title}
      </ThemedText>
      {horizontal ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={{ paddingRight: 12 }}
        >
          {children}
        </ScrollView>
      ) : (
        <View>{children}</View>
      )}
    </View>
  );
};

export default RecipeSection;
