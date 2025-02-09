import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import useApi from "@/hooks/useApi";
import { setStatusBarStyle } from "expo-status-bar";

export default function Page() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const { signup, error, response } = useApi();

  const handleSignUp = async () => {
    if (loading) return;
    await signup(
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      setLoading
    );
  };
  setStatusBarStyle("dark");
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, width: "100%" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ width: "100%", alignItems: "center" }}>
          <Image
            style={styles.image}
            source={require("@/assets/images/logo.png")}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.Input}
              placeholder="Firstname"
              onChangeText={(text) => setFirstName(text)}
            />
            <TextInput
              style={styles.Input}
              placeholder="Lastname"
              onChangeText={(text) => setLastName(text)}
            />
            <TextInput
              style={styles.Input}
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
            />
            <View style={[styles.Input, styles.passwordContainer]}>
              <TextInput
                placeholder="Password"
                secureTextEntry={showPassword && true}
                style={{ width: 200 }}
                onChangeText={(text) => setPassword(text)}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <FontAwesome5
                  name={!showPassword ? "eye-slash" : "eye"}
                  size={20}
                />
              </TouchableOpacity>
            </View>
            <View style={[styles.Input, styles.passwordContainer]}>
              <TextInput
                placeholder="Confirm Password"
                secureTextEntry={showPassword && true}
                style={{ width: 200 }}
                onChangeText={(text) => setConfirmPassword(text)}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <FontAwesome5
                  name={!showPassword ? "eye-slash" : "eye"}
                  size={20}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSignUp}
              disabled={loading && true}
            >
              {loading && <ActivityIndicator color={"white"} />}
              <Text style={styles.buttonText}>SignUp</Text>
            </TouchableOpacity>
            <View style={styles.cta}>
              <Text style={styles.ctaText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.navigate("/auth/login")}>
                <Text style={styles.ctaButtonText}> Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    height: "100%",
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
  inputContainer: {
    width: Dimensions.get("window").width,
    flexDirection: "column",
    marginTop: 30,
    alignItems: "center",
    height: 200,
  },
  Input: {
    padding: 5,
    paddingLeft: 20,
    width: "80%",
    height: 45,
    marginTop: 20,
    backgroundColor: "#E3E3E3",
    borderRadius: 10,
  },
  passwordContainer: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 10,
  },
  button: {
    marginTop: 20,
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
  cta: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ctaButtonText: {
    color: "blue",
  },
});
