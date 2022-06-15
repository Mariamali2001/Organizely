import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Animated,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
  TextInput,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { FlatList, Swipeable } from "react-native-gesture-handler";
// import ImagePicker from 'react-native-image-picker';


export default class noteModal extends React.Component {
  state = {
    newNote: "",
  };

  addNote = () => {
    let note = this.props.note;

    note.notes.push({ title: this.state.newNote });

    this.props.updateNote(note);

    this.setState({ newNote: "" });
    Keyboard.dismiss();
  };

  deleteNote = (index) => {
    let note = this.props.note;
    note.notes.splice(index, 1);

    this.props.updateNote(note);
  };


  renderNote = (note, index) => {
    return (
      <Swipeable
        renderRightActions={(_, dragX) => this.rightActions(dragX, index)}
      >
        <View style={styles.noteContainer}>
          <Text style={[styles.note]}>{note.title}</Text>
        </View>
      </Swipeable>
    );
  };
  rightActions = (dragX, index) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0.9],
      extrapolate: "clamp",
    });
    const opacity = dragX.interpolate({
      inputRange: [-100, -20, 0],
      outputRange: [1, 0.9, 0],
      extrapolate: "clamp",
    });
    return (
      <TouchableOpacity onPress={() => this.deleteNote(index)}>
        <Animated.View style={[styles.deleteButton,{backgroundColor:this.props.note.color}, { opacity: opacity }]}>
          <Animated.Text
            style={{
              color: "#FFF",
              fontWeight: "800",
              transform: [{ scale }],
            }}
          >
            Delete
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  render() {
    const note = this.props.note;

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            style={{ position: "absolute", top: 64, right: 32, zIndex: 10 }}
            onPress={this.props.closeModal}
          >
            <AntDesign name="close" size={24} color="#353535" />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ position: "center", top: 22, right: 142, zIndex: 10 }}
            onPress={this.props.deleteNotes(note)}
          >
            <AntDesign name="delete" size={25} color="#353535" />
          </TouchableOpacity>

          <View
            style={[
              styles.section,
              styles.header,
              { borderBottomColor: note.color },
            ]}
          >
            <View>
              <Text style={styles.title}>{note.name}</Text>
            </View>
          </View>

          <View style={[styles.section, { flex: 3, marginVertical: 16 }]}>
            <FlatList
              data={note.notes}
              renderItem={({ item, index }) => this.renderNote(item, index)}
              keyExtractor={(item) => item.title}
              showsVerticalScrollIndicator={false}
            />
          </View>
          
          <View style={[styles.section, styles.footer]}>
            <TextInput
              style={[styles.input, { borderColor: note.color }]}
              onChangeText={(text) => this.setState({ newNote: text })}
              value={this.state.newNote}
            />
            <TouchableOpacity
              style={[styles.addNote, { backgroundColor: note.color }]}
              onPress={() => this.addNote()}
            >
              <AntDesign name="plus" size={16} color="#FFF" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#242423",
    alignSelf: "center",
    marginBottom: 16,
  },
  section: {
    alignSelf: "stretch",
  },
  header: {
    marginLeft: 35,
    borderBottomWidth: 4,
    justifyContent: "flex-end",
    paddingTop: 16,
  },
  taskCount: {
    color: "333533",
    fontWeight: "800",
    marginTop: 4,
    marginBottom: 16,
  },
  colorSelect: {
    width: 30,
    height: 30,
    orderRadius: 4,
  },

  footer: {
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
  },

  addNote: {
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  noteContainer: {
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 32,
  },
  note: {
    color: "#242423",
    fontSize:20,
    fontWeight: "500",
  },
  deleteButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 80,
  },
});
