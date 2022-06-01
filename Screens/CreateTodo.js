import React from "react";
import { StyleSheet, Text , View} from "react-native";


export default class CreateTodo extends React.Component {
   render (){
    return (
       
        <View style={styles.container}>
          <View style={{flexDirection:"row"}}>  
          <Text style={styles.title}>
              Todo <Text style = {{ fontWeight:"300", color: "#3f3244"}}>
              Lists </Text>
          </Text>
          
          <View style={styles.divider}/>
          </View>
          <View>   
          </View>
        </View>
    );
 
   }
   
}

const styles = StyleSheet.create({
    container:
    {
        flex:1,
        backgroundColor:"#fff",
        alignItems:"center",
        justifyContent:"center",

    },
    divider:{
        backgroundColor: "#e8998d",
        height:1,
        flex:1,
        alignSelf:"center"
      },
      title: {
        fontSize:38,
        fontWeight:"800",
        color:"#e8998d",
        paddingHorizontal:64
    
      },
})
