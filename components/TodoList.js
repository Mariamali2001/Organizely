import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Modal } from "react-native";
import TodoModal from "./TodoModal";

export default class TodoList extends React.Component {
  state = {
    showListVisible: false,
  };
  toggleAddTodoModal() {
    this.setState({ showListVisible: !this.state.showListVisible });
  }

  render() {
    const list = this.props.list;

    const completedCount = list.todos.filter((todo) => todo.completed).length;
    const remainingCount = list.todos.length - completedCount;
    return (
      <View>
        <Modal
          animationType="slide"
          visible={this.state.showListVisible}
          onRequestClose={() => this.toggleAddTodoModal()}
        >
          <TodoModal
            list={list}
            closeModal={() => this.toggleAddTodoModal()}
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
          <View style={{ alignItems: "center" }}>
            <Text style={styles.count}>{remainingCount}</Text>
            <Text style={styles.subtitle}>Remaining</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.count}>{completedCount}</Text>
            <Text style={styles.subtitle}>completed</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 32,
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
    color: "#FFFFFF",
  },
});
