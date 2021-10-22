import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native'

import firebase from '../../config/firebase'
import { Ionicons } from '@expo/vector-icons'
import styles from './style'

export default function NewTask({ navigation, route }) {
  const [description, setDescription] = useState(null)
  const database = firebase.firestore()
  const userId = database.collection(route.params.idUser)
  
  const addTask = async () => {
    if (description == null) {
      Alert.alert("Please, typing any Task")
    } else {
      try {
        await userId.add({
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
        })
      } catch (error) {
        error
      }
      await navigation.navigate('Tasks', { idUser: route.params.idUser })
    }
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Description</Text>
      <TextInput
        multiline
        style={styles.input}
        placeholder="Ex: Buy milk today"
        placeholderTextColor='#a0a0a0'
        onChangeText={setDescription}
        value={description}
      />
      <TouchableOpacity
       style={styles.buttonNewTask}
       onPress={()=>{
         addTask()
       }}
      >
        <Ionicons
          name='save-outline'
          size={22}
          color='#00CC10'
        />
      </TouchableOpacity>
    </View>
  )
}