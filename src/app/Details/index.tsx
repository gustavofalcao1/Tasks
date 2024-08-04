import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { collection, doc, setDoc } from 'firebase/firestore';
import { firebaseFirestore } from '../../config/firebase';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { DetailsScreenNavigationProp, DetailsScreenRouteProp } from '../../../types';


interface DetailsProps {
  navigation: DetailsScreenNavigationProp;
  route: DetailsScreenRouteProp;
}

const editTask = async (
  description: string,
  id: string,
  idUser: string,
  navigation: any
) => {
  const userID = collection(firebaseFirestore, idUser);

  await setDoc(doc(userID, id), {
    prevDescription: description
  });
  await setDoc(doc(userID, id), {
    description: description,
    lastUpdate: new Date()
  });
  await navigation.navigate('Tasks', { idUser });
};

const Details: React.FC<DetailsProps> = ({ navigation, route }) => {
  const [descriptionEdit, setDescriptionEdit] = useState<string>(route.params.description);
  const idTask = route.params.id;
  const idUser = route.params.idUser;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Edit Description</Text>
      <TextInput
        multiline
        style={styles.input}
        onChangeText={setDescriptionEdit}
        value={descriptionEdit}
      />
      <TouchableOpacity
        style={styles.buttonNewTask}
        onPress={() => {
          editTask(descriptionEdit, idTask, idUser, navigation);
        }}
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

export default Details;
