import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Preview() {
  return (
    <SafeAreaView className="flex-1">
      <Text>Preview</Text>
    </SafeAreaView>
  );
}
