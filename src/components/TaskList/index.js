import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const TaskList = ({ data, handleDelete }) => {
  return (
    <Animatable.View
      style={styles.container}
      animation='bounceInRight'
      useNativeDriver
    >
      <TouchableOpacity onPress={() => handleDelete(data)} >
        <Ionicons name='md-checkmark-circle' size={30} color='#121212' />
      </TouchableOpacity>

      <View>
        <Text style={styles.task}>{data.task}</Text>
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    padding: 7,
    elevation: 1.5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 3,
    },
  },
  task: {
    color: '#121212',
    fontSize: 20,
    paddingLeft: 8,
    paddingRight: 20,
  },
});

export default TaskList;
