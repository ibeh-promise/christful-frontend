import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
  Modal,
  ActivityIndicator,
  Image,
  Video,
  ScrollView,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { FontAwesome5, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import useApi from "@/hooks/useApi";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useVideoPlayer, VideoPlayer, VideoView } from "expo-video";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [content, setContent] = useState("");
  const [media_url, setMedia_url] = useState("");
  const [isImageSafe, setIsImageSafe] = useState(false);
  const [isVideoSafe, setIsVideoSafe] = useState(false);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const { createPost, mediaUpload, checkMediaForNSFW, getAllPosts, uriToBlob } =
    useApi();

  const handlePost = async () => {
    try {
      // Upload media first
      const uploadedMediaUrl = await mediaUpload(
        media_url,
        setMedia_url,
        setLoading,
        image
      );

      // Only call createPost if the media upload was successful
      if (uploadedMediaUrl) {
        await createPost(content, uploadedMediaUrl, setMedia_url, setLoading);
        await getAllPosts(setLoading, setError);
        router.back();
      } else {
        Alert.alert("Error", "Media upload failed. Post was not created.");
      }
    } catch (error) {
      console.error("Error in handlePost:", error);
      Alert.alert("Error", "An error occurred while creating the post.");
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setVideo(null);
      setMedia_url(result.assets[0].uri);
    }

    await checkMediaForNSFW(result.assets[0].uri, setIsImageSafe, image);
  };
  const pickVideo = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["videos"],
      allowsEditing: true,
      quality: 1,
      // base64: true,
    });

    console.log(result);

    if (!result.canceled) {
      const blob = await uriToBlob(result.assets[0].uri);
      console.log("blob", blob.data.__collector);
      setVideo(result.assets[0].uri);
      setImage(null);
      setMedia_url(result.assets[0].uri);
    }

    // await checkMediaForNSFW(result.assets[0].uri, setIsVideoSafe, image);
  };

  const player = useVideoPlayer(video, (player) => {
    player.pause();
  });
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()}>
            <FontAwesome6 name="arrow-left" size={20} />
          </TouchableOpacity>
          <Text style={styles.postTitle}>Post</Text>
        </View>
        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Text style={styles.postText}>Post</Text>
        </TouchableOpacity>
      </View>
      {loading && (
        <Modal transparent>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator />
          </View>
        </Modal>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Share Your Opinion"
          multiline
          numberOfLines={100}
          textAlignVertical="top"
          onChangeText={(text) => setContent(text)}
        />
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.mediaOverviewContainer}>
          {isImageSafe && (
            <Image source={{ uri: image }} style={styles.media} />
          )}

          {video && (
            <VideoView
              style={styles.media}
              player={player}
              allowsFullscreen
              allowsPictureInPicture
            />
          )}
        </View>
        <View style={styles.bottomContainerUploadsOptions}>
          <TouchableOpacity style={styles.uploadOptions} onPress={pickImage}>
            <FontAwesome5 name="image" color={Colors.light.icon} size={20} />
            <Text style={styles.uploadOptionsText}>Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.uploadOptions} onPress={pickVideo}>
            <MaterialIcons
              name="smart-display"
              color={Colors.light.icon}
              size={20}
            />
            <Text style={styles.uploadOptionsText}>Video</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.uploadOptions}>
            <MaterialIcons name="headset" color={Colors.light.icon} size={20} />
            <Text style={styles.uploadOptionsText}>Audio</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    flex: 1,
  },
  inputContainer: {
    width: "100%",
    margin: 10,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    borderTopWidth: 0.2,
  },
  bottomContainerUploadsOptions: {
    backgroundColor: Colors.light.tint,
  },
  mediaOverviewContainer: {
    padding: 20,
    flexDirection: "row",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 3,
    borderColor: "rgba(0, 0, 0, 0.1)",
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
  postButton: {
    backgroundColor: Colors.light.button,
    padding: 12,
    width: 100,
    alignSelf: "center",
    borderRadius: 30,
  },
  postText: {
    color: "white",
    fontSize: 14,
    fontWeight: "900",
    textAlign: "center",
  },
  postTitle: {
    fontSize: 20,
    fontWeight: "500",
  },
  headerLeft: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 100,
    paddingLeft: 10,
  },
  media: {
    width: 100,
    height: 100,
    marginHorizontal: 10,
  },
});
