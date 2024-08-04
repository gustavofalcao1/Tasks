import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { collection, doc, setDoc } from 'firebase/firestore';
import { firebaseFirestore } from '../../config/firebase';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { NewTaskNavigationProp, NewTaskRouteProp } from '../../../types';  // Ajuste o caminho conforme necessário

interface NewTaskProps {
  navigation: NewTaskNavigationProp;
  route: NewTaskRouteProp;
}

const NewTask: React.FC<NewTaskProps> = ({ navigation, route }) => {
  const [description, setDescription] = useState<string | null>(null);

  const userID = collection(firebaseFirestore, route.params.idUser);

  const addTask = async () => {
    if (description === null || description.trim() === '') {
      Alert.alert("Please, type in a Task");
      return;
    }

    try {
      await setDoc(doc(userID), {
        authorId: route.params.idUser,
        description: description,
        creationDate: new Date(),
        prevDescription: description,
        lastUpdate: new Date(),
        done: false,
        doneDate: null,
        redoDate: null,
        archived: false,
        archivedDate: null,
        unarchivedDate: null
      });
    } catch (error) {
      console.error(error);
    }

    navigation.navigate('Tasks', { idUser: route.params.idUser });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Description</Text>
      <TextInput
        multiline
        style={styles.input}
        placeholder="Ex: Buy milk today"
        placeholderTextColor='#a0a0a0'
        onChangeText={setDescription}
        value={description ?? ''}
      />
      <TouchableOpacity
        style={styles.buttonNewTask}
        onPress={addTask}
      >
        <Ionicons
          name='save-outline'
          size={22}
          color='#00CC10'
        />
      </TouchableOpacity>
    </View>
  );
};

export default NewTask;
