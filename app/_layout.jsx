import { useState, useEffect } from "react";
import { Stack, useRouter, Slot } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { setStatusBarStyle } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity, Text } from "react-native";
import { Colors } from "@/constants/Colors";
// setStatusBarStyle("dark");

export default function RootLayout() {
  const router = useRouter();
  const [isAppReady, setIsAppReady] = useState(false);
  const [isTokenChecked, setIsTokenChecked] = useState(false);

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    IrishGrover: require("../assets/fonts/IrishGrover-Regular.ttf"),
  });
  useEffect(() => {
    if (loaded) {
      setStatusBarStyle("dark");
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <>
      <Stack
        screenOptions={{
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="screen"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="auth/index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="auth/login"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="auth/signup"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="overlayOptions/post"
          options={{
            headerShown: false,
            headerTitle: "Post",
            headerShadowVisible: true,
          }}
        />
      </Stack>
    </>
  );
}
