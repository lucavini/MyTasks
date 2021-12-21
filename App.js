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
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import TaskList from './src/components/TaskList/';
import * as Animatable from 'react-native-animatable';

const AnimatableBtn = Animatable.createAnimatableComponent(TouchableOpacity);

export default function App() {
  const [task, setTask] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState('');


  React.useEffect(() => {
    async function loadTasks() {
      const taskStorage = await AsyncStorage.getItem('@task');
      if (taskStorage) setTask(JSON.parse(taskStorage));
    }
    loadTasks();
  }, []);


  React.useEffect(() => {
    async function saveTasks() {
      await AsyncStorage.setItem('@task', JSON.stringify(task));
    }
    saveTasks();
  }, [task]);

  function handleAdd() {
    if (input === '') return;
    const data = {
      key: task.length + 1,
      task: input,
    };

    setTask([...task, data]);
    setOpen(false);
    setInput('');
  }

  const handleDelete = React.useCallback((data) => {
    const newList = task.filter((item) => item.key !== data.key);
    setTask(newList);
  });

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
        renderItem={({ item }) => (
          <TaskList data={item} handleDelete={handleDelete} />
        )}
      />

      <Modal animationType='slide' transparent={false} visible={open}>
        <SafeAreaView style={styles.modal}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setOpen(false)}>
              <Ionicons
                style={{ marginLeft: 5, marginRight: 5 }}
                name='md-arrow-back'
                size={40}
                color='#fff'
              />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Nova tarefa</Text>
          </View>

          <Animatable.View
            animation='fadeInUp'
            useNativeDriver
            style={styles.modalBody}
          >
            <TextInput
              multiline={true}
              placeholderTextColor='#747474'
              autoCorrect={false}
              placeholder='O que precisa fazer hoje?'
              style={styles.input}
              value={input}
              onChangeText={(value) => setInput(value)}
            />

            <TouchableOpacity style={styles.handleAdd} onPress={handleAdd}>
              <Text style={styles.handleAddText}>Cadastrar</Text>
            </TouchableOpacity>
          </Animatable.View>
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
  modal: {
    flex: 1,
    backgroundColor: '#171d31',
  },
  modalHeader: {
    marginLeft: 10,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalTitle: {
    marginLeft: 15,
    fontSize: 23,
    color: '#fff',
  },

  modalBody: {
    marginTop: 15,
  },
  input: {
    fontSize: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
    backgroundColor: '#fff',
    padding: 9,
    height: 85,
    textAlignVertical: 'top',
    color: '#000',
    borderRadius: 5,
  },
  handleAdd: {
    backgroundColor: '#fff',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    borderRadius: 5,
  },
  handleAddText: {
    fontSize: 20,
  },
});
