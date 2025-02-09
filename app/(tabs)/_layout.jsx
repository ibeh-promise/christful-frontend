import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { useRouter, Tabs, useSegments } from "expo-router";
import { Colors } from "@/constants/Colors";
import useApi from "@/hooks/useApi";

export default function TabLayout() {
  const router = useRouter();
  const { logout } = useApi();

  const segments = useSegments();
  const currentRoute = segments[segments.length - 1];
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 80,
        },
        tabBarLabelStyle: {
          marginTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="sermon"
        options={{
          headerTitle: "",
          headerShadowVisible: true,
          headerLeft: () => (
            <View style={styles.logoContainer}>
              <Image
                source={require("@/assets/images/logo.png")}
                style={styles.img}
              />
            </View>
          ),
          headerRight: () => (
            <View style={styles.headerLeftContainer}>
              <TouchableOpacity onPress={() => router.reload()}>
                <FontAwesome5 name="plus" size={18} color={Colors.light.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => logout()}>
                <FontAwesome5
                  name="book-open"
                  size={18}
                  color={Colors.light.icon}
                />
              </TouchableOpacity>
              <FontAwesome5 name="search" size={18} color={Colors.light.icon} />
              <FontAwesome5 name="ellipsis-v" size={18} color={"black"} />
            </View>
          ),
          tabBarIcon: () => (
            <View
              style={[styles.nav, currentRoute == "sermon" && styles.active]}
            >
              <FontAwesome5
                name="church"
                size={18}
                color={currentRoute == "sermon" && "white"}
              />
            </View>
          ),
          tabBarActiveTintColor: "#808000",
        }}
      />
      <Tabs.Screen
        name="communities"
        options={{
          headerTitle: "Communities",
          headerShadowVisible: false,

          headerRight: () => (
            <View style={styles.headerLeftContainer}>
              <FontAwesome5
                name="book-open"
                size={18}
                color={Colors.light.icon}
              />
              <FontAwesome5 name="search" size={18} color={Colors.light.icon} />
              <FontAwesome5 name="ellipsis-v" size={18} color={"black"} />
            </View>
          ),
          tabBarIcon: () => (
            <View
              style={[
                styles.nav,
                currentRoute == "communities" && styles.active,
              ]}
            >
              <FontAwesome5
                name="users"
                size={18}
                color={currentRoute == "communities" && "white"}
              />
            </View>
          ),
          tabBarActiveTintColor: "#808000",
        }}
      />
    </Tabs>
  );
}
const styles = StyleSheet.create({
  headerLeftContainer: {
    flexDirection: "row",
    width: 125,
    justifyContent: "space-around",
    marginRight: 10,
  },
  logoContainer: {
    width: 200,
    marginRight: 20,
  },
  img: {
    width: 100,
    height: 30,
  },
  nav: {
    width: 80,
    height: 35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  active: {
    borderRadius: 20,
    backgroundColor: Colors.light.icon,
  },
});
