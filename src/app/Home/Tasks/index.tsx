import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { collection, doc, updateDoc, deleteDoc, onSnapshot, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { firebaseFirestore } from '../../../config/firebase';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Task, TasksScreenNavigationProp, TasksScreenRouteProp } from '../../../../types';


const Tasks: React.FC = () => {
  const navigation = useNavigation<TasksScreenNavigationProp>();
  const route = useRoute<TasksScreenRouteProp>();

  const userID = collection(firebaseFirestore, route.params.idUser);
  const [task, setTask] = useState<Task[]>([]);
  const [taskDone, setTaskDone] = useState<Task[]>([]);
  const [flatDoDone, setFlatDoDone] = useState<boolean>(true);
  const _isMounted = useRef<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      loadData();
      _isMounted.current = true;
      setRefreshing(false);
    }, 1000);
  };

  const doDone = async () => {
    setFlatDoDone(!flatDoDone);
  };

  const doneTask = async (id: string) => {
    await updateDoc(doc(userID, id), {
      done: true,
      doneDate: new Date()
    });
  };

  const redoTask = async (id: string) => {
    await updateDoc(doc(userID, id), {
      done: false,
      redoDate: new Date()
    });
  };

  const archivedTask = async (id: string) => {
    await updateDoc(doc(userID, id), {
      archived: true,
      archivedDate: new Date()
    });
  };

  const deleteTask = async (id: string) => {
    Alert.alert(
      "Are you sure?",
      "Are you sure you want to delete this Task?",
      [
        {
          text: "Yes",
          onPress: () => {
            deleteDoc(doc(userID, id));
          },
        },
        {
          text: "No",
        },
      ]
    );
  };

  const loadData = () => {
    if (_isMounted.current) {
      try {
        onSnapshot(userID, (querySnapshot: QuerySnapshot<DocumentData>) => {
          const list: Task[] = [];
          querySnapshot.forEach((doc) => {
            if (doc.data().done === false) {
              list.push({ ...doc.data(), id: doc.id } as Task);
            }
          });
          setTask(list);
        });

        onSnapshot(userID, (querySnapshot: QuerySnapshot<DocumentData>) => {
          const list: Task[] = [];
          querySnapshot.forEach((doc) => {
            if (doc.data().done === true && doc.data().archived === false) {
              list.push({ ...doc.data(), id: doc.id } as Task);
            }
          });
          setTaskDone(list);
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const dataSort = () => {
    const newTask = [...task];
    const newTaskDone = [...taskDone];

    newTask.sort((a, b) => (a.creationDate < b.creationDate ? 1 : b.creationDate < a.creationDate ? -1 : 0));
    newTaskDone.sort((a, b) => (a.creationDate < b.creationDate ? 1 : b.creationDate < a.creationDate ? -1 : 0));

    setTask(newTask);
    setTaskDone(newTaskDone);
  };

  useEffect(() => {
    loadData();
    return () => {
      _isMounted.current = false;
    };
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonDataSort}
        onPress={dataSort}
      >
        <Ionicons
          name='filter'
          size={22}
          color='#00CC10'
        />
      </TouchableOpacity>
      {flatDoDone ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 100 }}
          data={task}
          refreshing={refreshing}
          onRefresh={onRefresh}
          renderItem={({ item }) => (
            <View style={styles.contextAllTasks}>
              <View style={styles.taskContent}>
                <TouchableOpacity
                  style={styles.buttonDoneTask}
                  onPress={() => doneTask(item.id)}
                >
                  <Ionicons
                    name='checkmark'
                    size={32}
                    color='#00CC10'
                  />
                </TouchableOpacity>
                <Text
                  numberOfLines={1}
                  style={styles.descriptionTask}
                  onPress={async () =>
                    await navigation.navigate('Details', {
                      id: item.id,
                      description: item.description,
                      idUser: route.params.idUser
                    })
                  }
                >
                  {item.description}
                </Text>
              </View>
            </View>
          )}
        />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 100 }}
          data={taskDone}
          refreshing={refreshing}
          onRefresh={onRefresh}
          renderItem={({ item }) => (
            <View style={styles.contextAllTasks}>
              <View style={styles.taskContent}>
                <TouchableOpacity
                  style={styles.buttonDoneTask}
                  onPress={() => redoTask(item.id)}
                >
                  <Ionicons
                    name='checkmark'
                    size={32}
                    color='#a0a0a0'
                  />
                </TouchableOpacity>
                <Text
                  numberOfLines={1}
                  style={styles.descriptionTaskDone}
                  onPress={async () =>
                    await navigation.navigate('Details', {
                      id: item.id,
                      description: item.description,
                      idUser: route.params.idUser
                    })
                  }
                >
                  {item.description}
                </Text>
                <TouchableOpacity
                  style={styles.buttonArchivedTask}
                  onPress={() => archivedTask(item.id)}
                >
                  <Ionicons
                    name='attach'
                    size={22}
                    color='#4169e1'
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonDeleteTask}
                  onPress={() => deleteTask(item.id)}
                >
                  <Ionicons
                    name='backspace-outline'
                    size={22}
                    color='#ff2800'
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
      <TouchableOpacity
        style={styles.buttonDoDone}
        onPress={doDone}
      >
        <Ionicons
          name='checkmark-done'
          size={32}
          color={flatDoDone ? "#00CC10" : "#a0a0a0"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonArchived}
        onPress={() => navigation.navigate('Archived', { idUser: route.params.idUser })}
      >
        <Ionicons
          name='attach'
          size={32}
          color='#4169e1'
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonNewTask}
        onPress={() => navigation.navigate('NewTask', { idUser: route.params.idUser })}
      >
        <Ionicons
          name='add'
          size={32}
          color='#00CC10'
        />
      </TouchableOpacity>
    </View>
  );
}

export default Tasks;