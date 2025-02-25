import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  TextInput,
  Dimensions,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import Posts from "@/components/Posts";
import { FontAwesome5, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useApi from "@/hooks/useApi";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import Animated, {
  useSharedValue,
  withTiming,
  withReanimatedTimer,
  withSpring,
} from "react-native-reanimated";

export default function Page() {
  const { getAllPosts } = useApi();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(true);
  const [response, setResponse] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const height = useSharedValue(50);
  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = async () => {
    const result = await getAllPosts(setLoading, setError);
    setResponse(result);
    console.log("result", result);
  };

  const handleGrow = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      height.value = withTiming(height.value + 135);
    } else {
      height.value = withTiming(height.value - 135);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      handleFetch();
      setRefreshing(false);
    }, 2000);
  }, []);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={30} color={Colors.light.icon} />
      </View>
    );
  }
  // if (error) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <MaterialIcons name="signal-wifi-connected-no-internet-4" size={100} />
  //       <TouchableOpacity style={styles.errorButton} onPress={handleFetch}>
  //         <Text style={styles.errorButtonText}>Refresh</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <View
        style={{
          position: "absolute",
          bottom: 50,
          right: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Animated.View style={[styles.overlayContainer, { height }]}>
          <TouchableOpacity
            style={styles.overlayOptions}
            onPress={() => router.navigate("/overlayOptions/post")}
          >
            <FontAwesome6
              name="plus"
              size={18}
              color={Colors.light.icon}
              style={styles.overlayIcons}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.overlayOptions}>
            <FontAwesome5
              name="microphone"
              size={18}
              color={Colors.light.icon}
              style={styles.overlayIcons}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.overlayOptions}>
            <FontAwesome5
              name="book-open"
              size={18}
              color={Colors.light.icon}
              style={styles.overlayIcons}
            />
          </TouchableOpacity>
        </Animated.View>
        <TouchableHighlight
          underlayColor={"red"}
          style={styles.overlayButton}
          onPress={handleGrow}
        >
          <FontAwesome5 name="layer-group" size={20} color={"white"} />
        </TouchableHighlight>
      </View>
      {/* <Modal transparent={false} animationType="slide">
        <View style={styles.postContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Share Your Opinion"
              multiline
              numberOfLines={100}
              textAlignVertical="top"
            />
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity style={styles.uploadOptions}>
              <FontAwesome5 name="image" color={Colors.light.icon} size={20} />
              <Text style={styles.uploadOptionsText}>Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.uploadOptions}>
              <MaterialIcons
                name="smart-display"
                color={Colors.light.icon}
                size={20}
              />
              <Text style={styles.uploadOptionsText}>Video</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.uploadOptions}>
              <MaterialIcons
                name="headset"
                color={Colors.light.icon}
                size={20}
              />
              <Text style={styles.uploadOptionsText}>Audio</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
      <FlatList
        data={response}
        renderItem={({ item }) => <Posts data={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  overlayContainer: {
    width: 50,
    backgroundColor: "#f2f2f2",
    borderRadius: 50,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: -50,
    paddingTop: 20,
    overflow: "hidden",
    zIndex: 9,
  },
  overlayButton: {
    width: 70,
    height: 70,
    elevation: 5,
    borderRadius: 50,
    zIndex: 99,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.button,
  },
  overlayOptions: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayIcons: { textAlign: "center", marginBottom: 20 },

  postContainer: {
    backgroundColor: Colors.light.background,
    flex: 1,
  },
  inputContainer: {
    width: "100%",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    borderTopWidth: 0.2,
    backgroundColor: Colors.light.tint,
    height: 300,
  },
  uploadOptions: {
    width: Dimensions.get("window").width,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  uploadOptionsText: {
    marginLeft: 20,
  },
  errorButton: {
    width: 200,
    padding: 10,
    backgroundColor: Colors.light.button,
    marginTop: 20,
  },
  errorButtonText: {
    color: "white",
    textAlign: "center",
  },
});
