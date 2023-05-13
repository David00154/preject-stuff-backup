import React from "react";
import { Text, View } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native-gesture-handler";

const TabBar = ({ navigation: { isFocused } }: BottomTabBarProps) => {
  return (
    <View/>
  );
};

export default TabBar;
