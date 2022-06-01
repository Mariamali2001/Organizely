import { StatusBar } from "expo-status-bar";
import { StyleSheet, Image,TouchableOpacity, Text, View } from "react-native";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';



export default function HomeScreen({navigation}) {
  // const navigation = useNavigation()
  return (
    <View style={styles.container}>

       <Image  style={{ height:300,width:300}}
      source={require('../assets/logo.png')}/>
      <View style={{padding:20,marginLeft:10}}>
      <Text style={{color:'#242423', fontSize: 50, fontWeight: "700" }}>
        MAKE ALL
      </Text>
      <Text
          style={{
            fontSize: 30,
            fontWeight: "400",
            padding:20,
          }}
        >
          YOUR THINGS
        </Text>

        <Text
          style={{
            fontSize: 50,
            fontWeight: "400",
            padding: 10,
          }}
        >
          ORGANIZED
          {" \n"}
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate('AuthScreen')} >

      <Image  style={{ height:40,width:60,marginLeft: 250}}
            source={require('../assets/arrow.png')}/>
           
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('CreateTodo')} >


      <Text style={{
      fontSize: 20,
      fontWeight: "400",
      marginLeft:150,
      marginTop:20,
      opacity:'.20'
    }} >

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
    backgroundColor: "#E8EDDF",
    alignItems: 'center',
    color:'#242423',
    justifyContent: "center",
  },
});