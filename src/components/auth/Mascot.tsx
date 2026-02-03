import { makeStyles } from "@/hooks/makeStyles";
import HasseMascot from "@assets/images/mascot/hasse.svg";
import React from "react";
import { Dimensions, View, ViewStyle } from "react-native";

export const Mascot: React.FC = () => {
  const styles = useStyles();
  const { width } = Dimensions.get("window");

  return (
    <View style={styles.mascotContainer}>
      <HasseMascot width={width * 0.45} height={width * 0.45} />
    </View>
  );
};

const useStyles = makeStyles<{ mascotContainer: ViewStyle }>((theme) => ({
  mascotContainer: {
    alignItems: "flex-end",
    paddingRight: theme.spacing.lg,
    zIndex: 1,
    marginBottom: -45,
  },
}));
