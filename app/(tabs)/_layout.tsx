import { Tabs } from "expo-router";
import React from "react";
import FloatingTabBar from "../../src/components/FloatingTabBar/FloatingTabBar";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <FloatingTabBar {...props} />}
    />
  );
}
