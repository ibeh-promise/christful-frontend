import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import {
  setStatusBarStyle,
  setStatusBarBackgroundColor,
} from "expo-status-bar";

export default function Page() {
  const router = useRouter();
  setStatusBarStyle("dark");
  setStatusBarBackgroundColor("white");
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Let's Get Started</Text>
      <Image
        style={styles.image}
        source={require("@/assets/images/rb_7121.png")}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.navigate("/auth/signup")}
        >
          <MaterialIcons name="email" size={25} color={"white"} />
          <Text style={styles.buttonText}> Signup with Email </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#E3E3E3" }]}
        >
          <FontAwesome5 name="google" size={25} color={"red"} />
          <Text style={styles.buttonText}> Signup with Google </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#E3E3E3" }]}
        >
          <FontAwesome5 name="facebook" size={25} color={"blue"} />
          <Text style={styles.buttonText}> Signup with FaceBook </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cta}
          onPress={() => router.navigate("/auth/login")}
        >
          <Text style={styles.ctaButtonText}> Log in To Existing Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 30,
    fontFamily: "IrishGrover",
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 141,
    resizeMode: "contain",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 200,
  },
  button: {
    padding: 5,
    paddingLeft: 20,
    width: "80%",
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.light.button,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
    fontWeight: "800",
    marginHorizontal: "auto",
  },
});
