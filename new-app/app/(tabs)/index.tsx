import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Octicons, Feather } from "@expo/vector-icons";
import { TextInput } from "react-native";
import { Pressable } from "react-native";
import { Link } from "expo-router";
import colors from "tailwindcss/colors";

export default () => {
  return (
    <SafeAreaView className="flex-1">
      <Header />
      <View className="px-6 mb-4">
        <Text className="text-[23px]">
          What kind of podacast do you want to hear today?
        </Text>
      </View>
      <Search />
      <Animated.ScrollView></Animated.ScrollView>
    </SafeAreaView>
  );
};

const Header = () => (
  <View className="flex-row justify-between items-center px-6 mb-4">
    <View />
    <TouchableOpacity className="justify-center items-center h-[48px] w-[48px] bg-white rounded-full">
      <Octicons name="bell" size={20} color="black" />
    </TouchableOpacity>
  </View>
);

const Search = () => (
  // <View className="flex-row justify-center px-6">
  //   <View className="bg-custom-light w-full h-[50px] border-0 rounded-tr-full  rounded-br-full overflow-y-hidden">
  //     <TextInput
  //       className="w-auto ml-3 mt-2"
  //       placeholder="Search podcast"
  //     ></TextInput>
  //   </View>
  // </View>
  <Link
    asChild
    href={"(modal)/search"}
    className="px-6 justify-center items-center"
  >
    <Pressable>
      {() => (
        <View className="flex-row bg-custom-light rounded-full w-full items-center p-4">
          <Feather name="search" size={26} color={colors.gray[800]} />
          <Text className="text-base text-gray-600 ml-2">Search podcast</Text>
        </View>
      )}
    </Pressable>
  </Link>
);
