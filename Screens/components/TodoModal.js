import React from "react";
import {View,StyleSheet,Text,TouchableOpacity,FlatList,SafeAreaView,KeyboardAvoidingView,keyboard,TextInput} from "react-native";
import { AntDesign ,Ionicons} from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';



export default class TodoModal extends React.Component {
    state = {
       newTodo:""
      };

      
  toggleTodoCompleted=index=>{
    let list=this.props.list
    list.todos[index].completed=!list.todos[index].completed;
  
    this.props.updateList(list);
    };
    addTodo=()=>{
           let list = this.props.list
           list.todos.push({title:this.state.newTodo , completed:false})

           this.props.updateList(list)
           this.setState({newTodo:""});

         keyboard.dismiss()  
    }

    deleteTodo=index=>{
        // this.setState({lists: [...this.state.lists,{...list, id :this.state.lists.length -1,todos:[] }]})
        let list=this.props.list
        list.todos.splice(index,1);
        // this.setstate(list);
      
        this.props.updateList(list);

        };
  
    
      renderTodo = (todo, index) => {
          return (
              <View style={styles.todoContainer}>
                  <TouchableOpacity onPress={()=>this.toggleTodoCompleted(index)}>
                      <Ionicons name= {todo.completed? "ios-square" : "ios-square-outline"}
                      
                      size={24}
                     color="#333533"
                     style={{ width: 32 }} />
                     
                  </TouchableOpacity >
                  <Text style={[styles.todo, 
                    { textDecorationLine: todo.completed ? "line-through" : "none",
                    color:todo.completed ?"#D9D9D9":"#242423"}]}>
                    {todo.title}  
                  </Text>
                 
               
                   <TouchableOpacity  onPress={()=>this.deleteTodo(index)} >
                     <MaterialIcons name="delete" size={24}  color="black" />
                   </TouchableOpacity>
                  
              
              
              </View>
          )
      }

    render(){
        const list = this.props.list;
        const taskCount = list.todos.length;

        const completedCount = list.todos.filter(todo=>todo.completed).length;

        return (
            <KeyboardAvoidingView style={{flex:1}} behavior="padding">
           

            <SafeAreaView style= {styles.container}>
                <TouchableOpacity
                 style={{ position: "absolute", top: 64, right: 32, zIndex: 10 }}
                 onPress={this.props.closeModal}
        >
                <AntDesign name="close" size={24} color="#353535"/>
              </TouchableOpacity>

                 <View style={[styles.section,styles.header, { borderBottomColor: list.color } ]}>
                   <View>
                     <Text style={styles.title}>{list.name}</Text>
                     <Text style={styles.taskCount}>
                       {completedCount} of {taskCount} tasks
                     </Text>
                  </View>
              </View>

              <View style={[styles.section, {flex:3}]}>
                 <FlatList
                 data={list.todos}
                 renderItem={({item , index})=> this.renderTodo(item, index)}
                 keyExtractor={(item) => item.title}
                 contentContainerStyle={{paddingHorizontal: 32,paddingVertical: 64,
                  }}
                showsVerticalScrollIndicator={false}
                 />
              </View>

              <View style={[styles.section, styles.footer]} >
                  <TextInput
                  style={[styles.input, { borderColor: list.color }]} 
                  onChangeText={text=> this.setState({newTodo: text})}
                  value={this.state.newTodo}
                  />
                  <TouchableOpacity 
                  style={[styles.addTodo, { backgroundColor: list.color }]}
                  onPress={()=> this.addTodo()}
                  >
                  <AntDesign name="plus" size={16} color="#FFFFF" />
                  </TouchableOpacity>
              </View>
              
            </SafeAreaView>
            </KeyboardAvoidingView>
        )
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
        flex: 1,
        alignSelf: "stretch",
      },
      header: {
        marginLeft: 35,
        borderBottomWidth: 4,
        justifyContent: "flex-end",
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
      },
      input: {
        flex: 1,
        height: 48,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        marginRight: 8,
        paddingHorizontal: 8,
      },

      addTodo: {
        borderRadius: 4,
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
      },
      todoContainer: {
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center",
      },
      todo: {
        color: "#242423",
        fontSize: 16,
        fontWeight: "700",
      },
})

