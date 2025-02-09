import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { FontAwesome, FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

export default function Posts({ data }) {
  return (
    <View style={styles.container}>
      <View style={styles.reactContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {data?.media_url ? (
              <Image
                source={require("../assets/images/react-logo.png")}
                style={styles.profileImage}
              />
            ) : (
              <FontAwesome
                name="user-circle"
                size={40}
                style={styles.profileImage}
                color="#d5d5d5"
              />
            )}
            <View>
              <Text style={{ fontWeight: "700" }}>Adamu samuel</Text>
              <Text>5hrs ago</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: 100,
            }}
          >
            <TouchableOpacity style={styles.followButton}>
              <Text style={{ color: "white" }}>follow</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome5 name="ellipsis-v" size={18} color={"black"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.postContainer}>
        <Text style={styles.postText} numberOfLines={12}>
          {data?.content}
        </Text>
        <View>
          <View
            style={{
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <View style={{ flexDirection: "row", width: 40 }}>
              <FontAwesome5 name="eye" size={14} />
              <Text style={{ fontWeight: "400", fontSize: 12, marginLeft: 5 }}>
                1.5k
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "70%",
          }}
        >
          <View style={styles.reactActions}>
            <FontAwesome name="thumbs-up" size={20} color={Colors.light.tint} />
            <Text>5.1k</Text>
          </View>
          <View style={styles.reactActions}>
            <FontAwesome
              name="thumbs-down"
              size={20}
              color={Colors.light.tint}
            />
            <Text>5.1k</Text>
          </View>
          <View style={styles.reactActions}>
            <FontAwesome name="comment" size={20} color={Colors.light.tint} />
            <Text>5.1k</Text>
          </View>
          <View style={styles.reactActions}>
            <FontAwesome name="share" size={20} color={Colors.light.tint} />
            <Text>5.1k</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  postContainer: {
    padding: 20,
    paddingBottom: 10,
    borderBottomWidth: 3,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: 15,
    fontWeight: 800,
    marginBottom: 20,
  },
  postText: {
    fontSize: 12,
    fontWeight: "600",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "white",
  },
  reactContainer: {
    padding: 20,
    paddingBottom: 10,
    // borderBottomWidth: 0.5,
    // borderColor: "rgba(0, 0, 0, 0.2)",
  },
  followButton: {
    backgroundColor: Colors.light.button,
    paddingVertical: 5,
    paddingHorizontal: 20,
    height: 29,
    borderRadius: 7,
  },
  reactActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
