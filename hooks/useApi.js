import axios from "axios";
import { Alert } from "react-native";
import { router, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useApi = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const signup = async (
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    setLoading
  ) => {
    if (firstName && lastName && email && password && confirmPassword) {
      if (emailPattern.test(email)) {
        if (password.length < 8) {
          Alert.alert(
            "Signup Error",
            "Your password must be more than 8 characters"
          );
        } else {
          if (password == confirmPassword) {
            setLoading(true);
            try {
              const res = await axios.post(
                `https://christful-server.vercel.app/register`,
                {
                  firstName,
                  lastName,
                  email,
                  password,
                }
              );

              Alert.alert("", res.data.message);
              router.back();
            } catch (err) {
              console.log(err.response.data.message);
              const errorMessage = err.response
                ? err.response.data.message
                : "An error occurred";

              setLoading(false);
              Alert.alert("Signup Error", errorMessage);
            } finally {
              setLoading(false);
            }
          } else {
            Alert.alert("Signup Error", "Password does not match");
          }
        }
      } else {
        Alert.alert("Signup Error", "Email is not valid");
      }
    } else {
      Alert.alert("Signup Error", "Please fill up the form before submission");
    }
  };

  const login = async (email, password, setLoading) => {
    if (email && password) {
      setLoading(true);

      try {
        const res = await axios.post(
          `https://christful-server.vercel.app/login`,
          {
            email,
            password,
          }
        );
        console.log(res.data);
        if (res.data.token) {
          Alert.alert("", "Login Successfully");
          console.log(res.data.token);
          await AsyncStorage.setItem("token", res.data.token);
          router.navigate("/(tabs)/sermon");
        }
      } catch (error) {
        const errorMessage = error.response
          ? error.response.data.message
          : "An error occurred";

        Alert.alert(
          "Login Error",
          errorMessage.length == 0 ? "Try Again" : errorMessage
        );
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert("Login Error", "Please fill up the form before submission");
    }
  };

  const logout = async () => {
    try {
      const token = await AsyncStorage.removeItem("token");
      const response = await axios.get(
        `https://christful-server.vercel.app/logout`
      );
      Alert.alert(response.data.message);
      return response.data.message;
    } catch (error) {
      console.log(error.response);
    }
  };

  const profile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `https://christful-server.vercel.app/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.log(error.response);
    }
  };
  const post = async (content, media_url, setLoading) => {
    if (content || media_url) {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem("token");
        const response = await axios.post(
          `https://christful-server.vercel.app/post`,
          { content, media_url },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.message);
        Alert.alert("Post Sucessful", response.data.message);
        router.back();
        return response.data.message;
      } catch (error) {
        console.log(error.response);
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert("Post Error", "Try typing or uploading before submission");
    }
  };

  const getAllPosts = async (setLoading, setError) => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `https://christful-server.vercel.app/getAllPosts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      if (response.data.data) setLoading(false);
      if (response.status == 401) {
        await AsyncStorage.removeItem("token");
        await router.replace("/auth/login");
      }
      setError(false);
      return response.data.data;
    } catch (error) {
      console.log(error.response);
      setError(true);
      Alert.alert("Network Error", "Check your network connection");
    } finally {
      setLoading(false);
    }
  };

  const checkImageForNSFW = async (base64Image, setIsContentSafe) => {
    try {
      // Create FormData object
      let formData = new FormData();

      // Convert Base64 to Blob (Required for React Native)
      let blob = {
        uri: `data:image/jpeg;base64,${base64Image}`,
        name: "image.jpg",
        type: "image/jpeg",
      };

      formData.append("media", blob);
      formData.append("models", "nudity-2.1");
      formData.append("api_user", "1030119388");
      formData.append("api_secret", "4qfzZfQ6GsFzMsq9NcktWnCovezM2a8t");

      const imageResponse = await axios.post(
        "https://api.sightengine.com/1.0/check.json",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Auto-handled by Axios
          },
        }
      );

      const { nudity } = imageResponse.data;
      if (nudity.sexual_activity > 0.9) {
        Alert.alert("Warning", "Your image contains NSFW content.");
        setIsContentSafe(false);
        console.log(imageResponse.data);
      } else {
        Alert.alert("Success", "Image is safe.");
        setIsContentSafe(true);
        console.log(imageResponse.data);
      }
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
      console.log(error);
      Alert.alert("Error", "Failed to check image content.");
    }
  };

  return {
    signup,
    login,
    logout,
    profile,
    post,
    getAllPosts,
    checkImageForNSFW,
  };
};

export default useApi;
