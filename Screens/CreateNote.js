import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class CreateNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
        newNote:""
    };
  }

  render() {
    return (
      <View>
        <Text> CreateNote </Text>
      </View>
    );
  }
}
