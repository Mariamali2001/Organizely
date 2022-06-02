import React from "react";
import {View,StyleSheet,Text,TouchableOpacity,KeyboardAvoidingView,TextInput,} from "react-native";
import { AntDesign } from "@expo/vector-icons";
// import tempData from "../tempData";

export default class AddListModal extends React.Component {
    backgroundColors=["#3C6E71","#F5CB5C" , "#8ecae6" ,"#353535", "#D9D9D9","#284B63"]
    state={
        name :"",
        color : this.backgroundColors[0]
    };
    createTodo=()=>{
        const {name,color}= this.state
       
        const list = { name, color };

        this.props.addList(list);
        this.setState({name:""});
        this.props.closeModal();
    }
    renderColors(){
      return this.backgroundColors.map(color =>{
          return (
            <TouchableOpacity key={color} style={[styles.colorSelect, {backgroundColor:color}]} 
            onPress={()=> this.setState({color})}
            />

              
          )
      })  
    }
  render(){
      return (
       <KeyboardAvoidingView style={styles.container} behavior="padding">
           <TouchableOpacity style={{ position: "absolute", top: 64, right: 32 }} onPress={this.props.closeModal}>
               <AntDesign name="close" size ={24} color="#242423" />
           </TouchableOpacity> 

           <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
           <Text style={styles.title}>Create Todo List</Text>

           <TextInput
            style={styles.input}
            placeholder="List Name?" 
            onChangeText={(text) => this.setState({ name: text })}
          />


          <View style = {{flexDirection:"row",justifyContent:"space-between" , marginTop:12}}>{this.renderColors()}</View>
          <TouchableOpacity
           style={[styles.create, {backgroundColor:this.state.color}]}
           onPress={this.createTodo}
          >
            <Text style={{ color: "#242423", fontWeight: "600" }}>Create </Text>
          </TouchableOpacity>
           </View>
       </KeyboardAvoidingView>
      );
  }




}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFFFF",
      alignItems: "center",
      justifyContent: "center",
    },
    divider: {
      backgroundColor: "#F5CB5C",
      height: 1,
      flex: 1,
      alignSelf: "center",
    },
    title: {
      fontSize: 24,
      fontWeight: "700",
      color: "#284B63",
      alignSelf: "center",
      marginBottom: 16,
    },
    addList: {
      borderWidth: 2,
      borderColor: "#F5CB5C",
      borderRadius: 4,
      padding: 16,
      alignItems: "center",
      justifyContent: "center",
    },
    input: {
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: "#284B63",
      color: "#284B63",
      borderRadius: 6,
      fontSize: 18,
      marginTop: 8,
      paddingHorizontal: 16,
    },
    create: {
      marginTop: 24,
      height: 50,
      borderRadius: 6,
      alignItems: "center",
      justifyContent: "center",
    },
    colorSelect: {
      width: 30,
      height: 30,
      borderRadius: 4,
    },
  });