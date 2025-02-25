import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useVideoPlayer, VideoPlayer, VideoView } from "expo-video";

// Helper function to check media type
const isImage = (url) => /\.(jpeg|jpg|png|gif|webp)$/i.test(url);
const isVideo = (url) => /\.(mp4|mov|avi|wmv|flv|mkv|webm)$/i.test(url);

export default function Posts({ data }) {
  const { media_url } = data;
  const videoPlayer = useVideoPlayer(media_url, (player) => player.pause());

  return (
    <View style={styles.container}>
      <View style={styles.reactContainer}>
        <View style={styles.header}>
          <View style={styles.profileContainer}>
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
              <Text style={{ fontWeight: "700" }}>
                {data.firstname} {data.lastname}
              </Text>
              <Text>{data.created_at.split("T")[0]}</Text>
            </View>
          </View>
          <View style={styles.actionButtons}>
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

        {/* ✅ Check if media is an image or video */}
        {isImage(media_url) ? (
          <Image source={{ uri: media_url }} style={styles.image} />
        ) : isVideo(media_url) ? (
          <VideoView
            style={styles.media}
            player={videoPlayer}
            allowsFullscreen
            allowsPictureInPicture
          />
        ) : null}

        <View style={styles.reactionsContainer}>
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
  postText: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    width: 100,
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
    marginTop: 20,
  },
  image: {
    width: "100%",
    height: 400,
  },
  media: {
    width: "100%",
    height: 400,
  },
  reactionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "70%",
  },
});
