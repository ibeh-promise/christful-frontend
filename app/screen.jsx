import Onboarding from "react-native-onboarding-swiper";
import { StyleSheet, Image, View, Text } from "react-native";
import { router } from "expo-router";

export default function screen() {
  return (
    <Onboarding
      onDone={() => router.replace("/auth/")}
      color="red"
      pages={[
        {
          backgroundColor: "#fff",
          image: (
            <Image
              style={styles.image}
              source={require("@/assets/images/board/rb_5592.png")}
            />
          ),
          title: (
            <View style={styles.textContainer}>
              <Text style={styles.title}>Empower Ministers</Text>
              <Text style={styles.subtitle}>
                Share sermons and gospel teachings with a global audience.
              </Text>
            </View>
          ),
          subtitle: "",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              style={styles.image}
              source={require("@/assets/images/board/rb_11034.png")}
            />
          ),
          title: (
            <View style={styles.textContainer}>
              <Text style={styles.title}>Engage In Discussions</Text>
              <Text style={styles.subtitle}>
                Ask questions, share opinions, and connect with believers
                worldwide.
              </Text>
            </View>
          ),
          subtitle: "",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              style={styles.image}
              source={require("@/assets/images/board/rb_83933.png")}
            />
          ),
          title: (
            <View style={styles.textContainer}>
              <Text style={styles.title}>Personalized Experience</Text>
              <Text style={styles.subtitle}>
                Get a tailored feed of content that resonates with your faith
                journey.
              </Text>
            </View>
          ),
          subtitle: "",
        },
      ]}
    />
  );
}
const styles = StyleSheet.create({
  image: {
    width: 370,
    height: 370,
  },
  textContainer: {
    position: "absolute",
    top: 50, // Move text up or down by adjusting this value
    left: 30,
    width: 300,
  },
  title: {
    fontSize: 31,
    fontWeight: "900",
  },
  subtitle: {
    fontSize: 30,
    fontWeight: 400,
    fontFamily: "IrishGrover",
    marginTop: 15,
  },
});
