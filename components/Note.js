import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Modal } from "react-native";
// import TodoModal from "./TodoModal";
import NoteModal from "./NoteModal";


export default class Note extends React.Component {
    state = {
        showNoteVisible: false,
      };
      toggleAddNoteModal() {
        this.setState({ showNoteVisible: !this.state.showNoteVisible });
      }
     

    render(){
        const note = this.props.note;
        return (
         <View>
            <Modal
          animationType="slide"
          visible={this.state.showNoteVisible}
          onRequestClose={() => this.toggleAddNoteModal()}
          >
              <NoteModal
              note={note}  closeModal={()=> this.toggleAddNoteModal()} 
              updateNote={this.props.updateNote}
              />
        </Modal>
                <TouchableOpacity
                style={[styles.noteContainer, { backgroundColor: note.color }]}
                onPress={() => this.toggleAddNoteModal()}
                >

              <Text style={styles.noteTitle} numberOfLines={1}>
               {note.name}
              </Text>
    
            </TouchableOpacity>
            </View>
            
        )
    }
    
}


const styles = StyleSheet.create({
    noteContainer: {
      paddingHorizontal:16,
      paddingVertical: 16,
      borderRadius: 6,
      marginHorizontal: 12,
      width: 150,
      height:160,
      alignItems: "center",
    },
    noteTitle: {
      backgroundColor: "#242423",
      // height: 1,
      // flex: 1,
      alignSelf: "center",
    },
    noteTitle: {
      fontSize: 20,

      fontWeight: "700",
      color: "#FFFFFF",
      marginTop: 48,
    },
  });