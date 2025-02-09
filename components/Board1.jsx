import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

export default function Board1() {
  return (
    <View>
      <Text>Empower Ministers</Text>
      <Image
        style={styles.image}
        source={require("@/assets/images/board/rb_5592.png")}
      />
      <Text>Board1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 370,
    height: 370,
  },
});
