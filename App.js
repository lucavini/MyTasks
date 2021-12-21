import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TaskList from './src/components/TaskList/';
import * as Animatable from 'react-native-animatable';

const AnimatableBtn = Animatable.createAnimatableComponent(TouchableOpacity);

export default function App() {
  const [task, setTask] = React.useState([
    { key: 1, task: 'Comprar Pão' },
    { key: 2, task: 'Estudar React-Native' },
    { key: 3, task: 'Praticar Inglês' },
    { key: 4, task: 'Trabalhar' },
  ]);
  const [open, setOpen] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='#171d31' barStyle='light-content' />

      <View style={styles.content}>
        <Text style={styles.title}>Minhas Tarefas</Text>
      </View>

      <FlatList
        showsHorizontalScrollIndicator={false}
        data={task}
        keyExtractor={(item) => String(item.key)}
        renderItem={({ item }) => <TaskList data={item} />}
      />

      <Modal animationType='slide' transparent={false} visible={open}>
        <SafeAreaView>
          <Text>Modal</Text>
        </SafeAreaView>
      </Modal>

      <AnimatableBtn
        useNativeDriver
        animation='bounceInUp'
        duration={1100}
        style={styles.fab}
        onPress={() => setOpen(true)}
      >
        <Ionicons name='ios-add' size={35} color='#fff' />
      </AnimatableBtn>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171d31',
  },
  title: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff',
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#0094ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    right: 25,
    bottom: 25,
    elevation: 2,
    zIndex: 9,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 3,
    },
  },
});
