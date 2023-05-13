import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function ModalsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="preview"
        options={{
          presentation: "modal",
          animation: "none",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="search/index"
        // options={{
        //   presentation: "modal",
        //   animation: "slide_from_right",
        //   headerShown: false,
        // }}
      />
    </Stack>
  );
}
