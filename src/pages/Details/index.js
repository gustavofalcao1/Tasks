import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native'

import firebase from '../../config/firebase'
import { Ionicons } from '@expo/vector-icons'
import styles from './style'

export default function Details({ navigation, route }) {
  const [descriptionEdit, setDescriptionEdit] = useState(route.params.description)
  const idTask = route.params.id
  const database = firebase.firestore()
  const userID = database.collection(route.params.idUser)

  const  editTask = async ( description, id ) => {
    await userID.doc(id).update({
      prevDescription: descriptionEdit
    })
    await userID.doc(id).update({
      description: description,
      lastUpdate: new Date()
    })
    await navigation.navigate('Tasks', { idUser: route.params.idUser })
  }

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
       onPress={()=>{
         editTask(descriptionEdit, idTask)
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