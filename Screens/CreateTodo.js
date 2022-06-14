import React from 'react';
import { View, StyleSheet, Text ,TouchableOpacity, FlatList, Modal , alert} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import TodoList from '../components/TodoList';
import AddListModal from "../components/AddListModal";
import tempData from '../tempData';
import Fire from '../Fire';
export default class CreateTodo extends React.Component {
  state ={
    addTodoVisible : false ,
    lists:tempData,
    user:{}

  }

  componentDidMount(){
    firebase = new Fire((error,user)=>{
      if(error){
        return alert("something went wrong")
      }
      this.setState({user})
    });
    
  }
  toggleAddTodoModal(){ 
    this.setState({addTodoVisible: !this.state.addTodoVisible});
  }
  renderList=list=>{
    return <TodoList list={list} updateList={this.updateList}/>
  }
  addList = list=>{
    this.setState({lists: [...this.state.lists,{...list, id :this.state.lists.length + 1,todos:[] }]})
  };
  updateList = list=>{
         this.setState({
           lists:this.state.lists.map(item=>{
             return item.id === list.id ? list:item
           })
         }) 
  }

   render (){
    return (
       
        <View style={styles.container}>
          <Modal  animationType="slide"
          visible={this.state.addTodoVisible}
          onRequestClose={()=>this.toggleAddTodoModal()} 
         
          >
           <AddListModal closeModal={() => this.toggleAddTodoModal()} addList={this.addList}/>
          </Modal>

          <View>
            <Text>
             user: {this.state.user.uid}
            </Text>
          </View>
          <View style={{flexDirection:"row"}}> 
           <View style={styles.divider}/> 
           <Text style={styles.title}>
          What's in your <Text style={{fontWeight:"300",color:'#284B63'}}> Mind</Text>
          </Text>
          
          <View style={styles.divider}/>
          </View>          
          <View style={{height:245,paddingLeft:22,paddingTop:30}}>
            <FlatList
               data={this.state.lists}
               keyExtractor={item=>item.name}
               horizontal={true}
               showHorizontalScrollIndicator={false}
               renderItem={({item})=> this.renderList(item)}
               keyboardShouldPersistTaps="always"
               
               />
            </View>
            <View style={{marginVertical:28}}> 
          <TouchableOpacity style={styles.addList} onPress={()=>this.toggleAddTodoModal()}>
              <AntDesign name="plus" size={16} color="#242423" />
          </TouchableOpacity>

          <Text style={styles.add} >   New </Text>
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
        backgroundColor: "#284B63",
        height:1,
        flex:1,
        alignSelf:"center"
      },
      title: {
        fontSize:37,
        fontWeight:"800",
        color:"#284B63",
        paddingHorizontal:64
    
      },
      addList:{
        borderWidth:2,
        borderColor:"#284B63",
        borderRadius:4,
        padding:16,
        alignItems:"center",
        justifyContent:"center"
    
      },
      add:{
        color:"#242423",
        fontWeight:'600',
        fontSize:14,
        marginTop:6
      }
})
