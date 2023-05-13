import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import colors from "../../lib/colors";
import { Feather, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

function TabBarIcon({
  Icon,
  ...props
}: {
  Icon: any;
  name: string;
  color: string;
}) {
  return (
    <Icon
      size={22}
      style={{
        marginBottom: -8,
      }}
      {...props}
    />
  );
}

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // tabBarShowLabel: false,
        tabBarActiveTintColor: colors.custom["play-btn-bg-color"],
        tabBarInactiveTintColor: colors.custom.light,
        tabBarStyle: {
          position: "absolute",
          height: 55,
          right: 0,
          left: 0,
          bottom: 0,
          elevation: 0,
          borderTopWidth: 0,
          backgroundColor: colors.custom["dark-secondary"],
        },
        tabBarLabelStyle: {
          marginBottom: 8,
          // fontSize: 11.5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <TabBarIcon Icon={Feather} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="category"
        options={{
          title: "Category",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              Icon={MaterialCommunityIcons}
              name="view-dashboard-outline"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="playlist"
        options={{
          title: "Playlist",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              Icon={MaterialCommunityIcons}
              name="playlist-music-outline"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <TabBarIcon Icon={Ionicons} name="person-outline" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
