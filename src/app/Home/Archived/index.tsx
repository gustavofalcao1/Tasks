import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert, ListRenderItem } from 'react-native';
import { collection, doc, updateDoc, deleteDoc, onSnapshot, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { firebaseFirestore } from '../../../config/firebase';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Task, ArchivedScreenNavigationProp, ArchivedScreenRouteProp } from '../../../../types';

const Archived: React.FC = () => {
  const navigation = useNavigation<ArchivedScreenNavigationProp>();
  const route = useRoute<ArchivedScreenRouteProp>();

  const userID = collection(firebaseFirestore, route.params.idUser);
  const [taskArchived, setTaskArchived] = useState<Task[]>([]);
  const _isMounted = useRef(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      loadData();
      _isMounted.current = true;
      setRefreshing(false);
    }, 1000);
  };

  const archivedTask = async (id: string) => {
    await updateDoc(doc(userID, id), {
      archived: false,
      unarchivedDate: new Date()
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
            const data = doc.data() as Task;
            if (data.archived === true) {
              list.push({ ...data, id: doc.id });
            }
          });
          setTaskArchived(list);
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const dataSort = () => {
    let newList = [...taskArchived];

    newList.sort((a, b) => (a.creationDate < b.creationDate ? 1 : b.creationDate < a.creationDate ? -1 : 0));

    setTaskArchived(newList);
  };

  useEffect(() => {
    loadData();
    return () => {
      _isMounted.current = false;
    };
  }, []);

  // Tipo para o item da lista
  const renderItem: ListRenderItem<Task> = ({ item }) => (
    <View style={styles.contextAllTasks}>
      <View style={styles.taskContent}>
        <Text
          numberOfLines={1}
          style={styles.descriptionTaskArchived}
          onPress={() => navigation.navigate('Details', {
            id: item.id,
            description: item.description,
            idUser: route.params.idUser
          })}
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
  );

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
      <FlatList
        showsVerticalScrollIndicator={false}
        data={taskArchived}
        refreshing={refreshing}
        onRefresh={onRefresh}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Archived;
