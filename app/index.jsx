import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) router.replace("/(tabs)/sermon");
      setIsAuthenticated(true);
      setIsTokenChecked(true);
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={30} color={Colors.light.icon} />
      </View>
    );
  }

  if (isTokenChecked) {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 2000);
  }
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.boardTitle}>Welcome To ChristFul</Text>
        <Text style={styles.textContent}>
          Connecting Christians worldwide. Share, grow, and engage in
          faith-based discussions.
        </Text>
        <Image
          style={styles.image}
          source={require("@/assets/images/board/rb_1370.png")}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.navigate("/screen");
          }}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 30,
  },
  boardTitle: {
    fontSize: 39,
    fontWeight: "900",
    width: 300,
  },
  textContent: {
    fontSize: 30,
    fontWeight: 400,
    fontFamily: "IrishGrover",
    marginTop: 15,
  },
  image: {
    alignSelf: "center",
    width: 370,
    height: 370,
    marginTop: 70,
  },
  button: {
    width: "90%",
    height: 45,
    padding: 10,
    alignSelf: "center",
    borderRadius: 7,
    backgroundColor: Colors.light.button,
    position: "absolute",
    justifyContent: "center",
    bottom: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: 800,
  },
});
