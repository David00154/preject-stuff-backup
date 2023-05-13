import { Stack } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "(tabs)",
};
const Layout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(modal)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      <StatusBar style="dark" />
    </>
  );
};

export default Layout;
