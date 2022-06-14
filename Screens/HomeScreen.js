import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Image, TouchableOpacity, Text, View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function HomeScreen({ navigation }) {
  // const [Auth, setAuth] = useState<Boolean>(false);
  return (
    <View style={styles.container}>
      <Image 
        style={{ height: 300, width: 300 }}
        source={require("../assets/logo.png")}
      />
      <View style={{ padding: 20, marginLeft: 10 }}>
        <Text style={styles.M}>MAKE ALL YOUR    THINGS</Text>
        <Text style={styles.O}>
          ORGANIZED
          {" \n"}
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate("AuthScreen")}>
          <Image
            style={{ height: 40, width: 60, marginLeft: 250 }}
            source={require("../assets/arrow.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity  onPress={() => navigation.navigate("CreateTodo")}>
          
          <Text
            style={{
              fontSize: 20,
              fontWeight: "400",
              marginLeft: 150,
              marginTop: 20,
              opacity: 0.2,
            }}
          >
            Let's get started
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    color: "#242423",
    justifyContent: "center",
  },
  M: {
    color: "#242423",
    fontSize: 50,
    fontWeight: "500",
  },
  O: {
    color: "#F5CB5C",
    fontSize: 53,
    fontWeight: "700",
    padding: 10,
  },
});