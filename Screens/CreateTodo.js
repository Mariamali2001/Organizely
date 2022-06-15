import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import TodoList from "../components/TodoList";
import Note from "../components/Note";
import AddNewModal from "../components/AddNewModal";
import tempData from "../tempData";
import tempNotes from "../tempNotes";
export default class CreateTodo extends React.Component {
  state = {
    addTodoVisible: false,
    addNoteVisible: false,
    lists: tempData,
    notes: tempNotes,
  };
  toggleAddTodoModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  }

  toggleAddNoteModal() {
    this.setState({ addNoteVisible: !this.state.addNoteVisible });
  }

  renderList = (list) => {
    return <TodoList list={list} updateList={this.updateList} />;
  };

  renderNote = (note) => {
    return (
      <Note
        note={note}
        updateNote={this.updateNote}
        deleteNotes={this.deleteNotes}
      />
    );
  };

  addList = (list) => {
    this.setState({
      lists: [
        { ...list, id: this.state.lists.length + 1, todos: [] },
        ...this.state.lists,
      ],
    });
  };
  updateList = (list) => {
    this.setState({
      lists: this.state.lists.map((item) => {
        return item.id === list.id ? list : item;
      }),
    });
  };

  addNote = (note) => {
    this.setState({
      notes: [
        
        { ...note, id: this.state.notes.length + 1, notes: [] },
        ...this.state.notes,
      ],
    });
  };
  updateNote = (note) => {
    this.setState({
      notes: this.state.notes.map((item) => {
        return item.id === note.id ? note : item;
      }),
    });
  };
  deleteNotes = (note) => {
    this.state.notes.length!==0 &&(
    this.setState({
      notes: this.state.notes.map((item) => {
       return  item.id === note.id ? this.state.notes.splice(note.id, 1) : item;
      }),
    }));
    this.setState({
      notes: this.state.notes.map((item) => {
        return item.id === note.id ? note : item;
      }),
    });
  }
  

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          visible={this.state.addTodoVisible}
          onRequestClose={() => this.toggleAddTodoModal()}
        >
          <AddNewModal
            closeModal={() => this.toggleAddTodoModal()}
            addList={this.addList}
            addNote={this.addNote}
          />
        </Modal>
        <Modal
          animationType="slide"
          visible={this.state.addNoteVisible}
          onRequestClose={() => this.toggleAddNoteModal()}
        >
          {/* <AddNewModal
            closeModal={() => this.toggleAddNoteModal()}
            addNote={this.addNote}
          /> */}
        </Modal>

        <View style={{ flexDirection: "row", marginBottom: 50 }}>
          {/* <View style={styles.divider} /> */}
          <Text style={styles.title}>
            What's On Your{" "}
            <Text style={{ fontWeight: "300", color: "#284B63" }}> Mind</Text>
          </Text>

          {/* <View style={styles.divider} /> */}
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={styles.divider} />
          <Text
            style={{
              fontWeight: "700",
              color: "#284B63",
              paddingHorizontal: 54,
            }}
          >
            {" "}
            Your Notes
          </Text>
          <View style={styles.divider} />
        </View>
        <View style={{ height: 211, paddingLeft: 32, paddingTop: 20 }}>
          <FlatList
            data={this.state.notes}
            keyExtractor={(item) => item.name}
            horizontal={true}
            showHorizontalScrollIndicator={false}
            renderItem={({ item }) => this.renderNote(item)}
            keyboardShouldPersistTaps="always"
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.divider} />
          <Text
            style={{
              fontWeight: "700",
              color: "#284B63",
              paddingHorizontal: 54,
            }}
          >
            {" "}
            Your Checklists
          </Text>
          <View style={styles.divider} />
        </View>
        <View style={{ height: 225, paddingLeft: 32, paddingTop: 20 }}>
          <FlatList
            data={this.state.lists}
            keyExtractor={(item) => item.name}
            horizontal={true}
            showHorizontalScrollIndicator={false}
            renderItem={({ item }) => this.renderList(item)}
            keyboardShouldPersistTaps="always"
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <TouchableOpacity
            style={styles.addList}
            onPress={() => this.toggleAddTodoModal()}
          >
            <AntDesign name="plus" size={16} color="#242423" />
          </TouchableOpacity>

          <Text style={styles.new}>  New </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    backgroundColor: "#284B63",
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#284B63",
    paddingHorizontal: 94,
  },
  addList: {
    borderWidth: 2,
    borderColor: "#284B63",
    borderRadius: 4,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  new: {
    color: "#284B63",
    fontWeight: "700",
    fontSize: 15,
    // marginTop: 1,
  },
});
