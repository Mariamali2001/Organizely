import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Modal } from "react-native";
import TodoModal from "./TodoModal";

export default class Note extends React.Component {
    state = {
        showListVisible: false,
      };
      toggleAddTodoModal() {
        this.setState({ showListVisible: !this.state.showListVisible });
      }
     

    render(){
        const list = this.props.list;
        return (
         <View>
            <Modal
          animationType="slide"
          visible={this.state.showListVisible}
          onRequestClose={() => this.toggleAddTodoModal()}
          >
              <TodoModal
              list={list}  closeModal={()=> this.toggleAddTodoModal()} 
              updateList={this.props.updateList}
              />
        </Modal>
                <TouchableOpacity
                style={[styles.listContainer, { backgroundColor: list.color }]}
                onPress={() => this.toggleAddTodoModal()}
                >

              <Text style={styles.listTitle} numberOfLines={1}>
               {list.name}
              </Text>
    
            </TouchableOpacity>
            </View>
            
        )
    }
    
}


const styles = StyleSheet.create({
    listContainer: {
      paddingHorizontal:16,
      paddingVertical: 16,
      borderRadius: 6,
      marginHorizontal: 12,
      width: 200,
      alignItems: "center",
    },
    listTitle: {
      backgroundColor: "#242423",
      height: 1,
      flex: 1,
      alignSelf: "center",
    },
    listTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: "#FFFFFF",
      marginBottom: 18,
    },
    count: {
      fontSize: 30,
      fontWeight: "200",
      color: "#FFFFFF",
    },
    subtitle: {
      fontSize: 12,
      fontWeight: "700",
      color:"#FFFFFF",
    },
  });