// expo install expo-web-browser expo-auth-session expo-random

import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  Button,
} from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import AwesomeButton from "react-native-really-awesome-button";

WebBrowser.maybeCompleteAuthSession();

export default function AuthScreen() {
  const [accessToken, setAccessToken] = React.useState();
  const [userInfo, setUserInfo] = React.useState();
  const [message, setMessage] = React.useState();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "242080826208-67fhgt1dqvb9lo4jfgpt006jk8k4ovsh.apps.googleusercontent.com",
    iosClientId:
      "242080826208-riitrtfpcj94sd3cd99dgfqqvp2v143o.apps.googleusercontent.com",
    expoClientId:
      "242080826208-67fhgt1dqvb9lo4jfgpt006jk8k4ovsh.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    setMessage(JSON.stringify(response));
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
    }
  }, [response]);
  async function getUserData() {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    userInfoResponse.json().then((data) => {
      setUserInfo(data);
    });
    
  }

  function showUserInfo() {
    if (userInfo) {
      return (
        <View style={styles.userInfo}>
          <Image source={{ uri: userInfo.picture }} style={styles.profilePic} />
          <Text>Welcome {userInfo.name}</Text>
          {/* <Text>{userInfo.email}</Text> */}
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 100 }}>
        <Image
          style={{ height: 100, width: 100 }}
          source={require("../assets/logo.png")}
        />
      </View>

      {showUserInfo()}
      <View style={{ flexDirection: "row" }}>
        <View style={styles.divider} />
        <Text style={{ fontWeight: "500", color: "#284B63" }}>
          {" "}
          WELCOME TO <Text style={styles.title}>ORGANIZELY</Text>
        </Text>

        <View style={styles.divider} />
      </View>
      <Text>
        {"\n "}
        {"\n "}
        {"\n "}
        {"\n "}
        {"\n "}
        {"\n "}
        {"\n "}
      </Text>
      <TouchableOpacity>
        <AwesomeButton
          backgroundColor="#333533"
          width={150}
          onPress={
            accessToken
              ? getUserData
              : () => {
                  promptAsync({ useProxy: true, showInRecents: true });
                }
          }
        >
          <Text style={{ color: "#fff" }}>
            {accessToken ? "View Profile" : "Sign in by Google"}{" "}

          </Text>
          <Image
            style={{ height: 20, width: 20 }}
            source={require("../assets/google.png")}
          />
        </AwesomeButton>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    // justifyContent: "center",
  },
  userInfo: {
    alignItems: "center",
    justifyContent: "center",
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius:20,
    
  },
  divider: {
    backgroundColor: "#284B63",
    height: 1,
    flex: 1,
    alignSelf: "center",
    paddingVertical: 1,
  },
  title: {
    fontSize: 23,
    fontWeight: "800",
    color: "#F5CB5C",
    paddingHorizontal: 64,
  },
});
