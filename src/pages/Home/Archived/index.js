import React, { useState, useEffect, useRef } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native'

import firebase from '../../../config/firebase'
import { Ionicons } from '@expo/vector-icons'
import styles from './style'

export default function Archived({ navigation, route }){
  const database = firebase.firestore()
  const userId = database.collection(route.params.idUser)
  const [taskArchived, setTaskArchived] = useState([])
  const _isMounted = useRef(true)
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      loadData()
      _isMounted.current = true
      setRefreshing(false);
    }, 1000);
  };

  const archivedTask = async (id) => {
    await userId.doc(id).update({
      archived: false,
      unarchivedDate: new Date()
    })
  }
  const deleteTask = async (id) => {
    Alert.alert(
      "Are your sure?",
      "Are you sure you want to delete this Task?",
      [
        {
          text: "Yes",
          onPress: () => {
            userId.doc(id).delete()
          },
        },
        {
          text: "No",
        },
      ]
    )
  }
  const loadData = () => {
    if (_isMounted.current) {
      try {
        userId.onSnapshot((query)=>{
          const list = []
          query.forEach((doc)=>{
            if (doc.data().archived === true ) {
              list.push({ ...doc.data(), id: doc.id })
            }
          })
          setTaskArchived(list)
        })
      } catch (error) {
        error
      }
    }
  }
  const dataSort = () => {
    let newList = [...taskArchived]

    newList.sort((a, b) => (a.creationDate < b.creationDate ? 1 : b.creationDate < a.creationDate ? -1 : 0))

    setTaskArchived(newList)
  }

  useEffect(()=>{
    loadData()
    return () => {
      _isMounted.current = false;
    };
  }, [])

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonDataSort}
        onPress={()=>{
          dataSort()
        }}
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
        renderItem={( { item } )=>{
          return (
            <View style={styles.contextAllTasks}>
              <View style={styles.taskContent}>
                <Text
                  numberOfLines={1}
                  style={styles.descriptionTaskArchived}
                  onPress={async ()=> await
                    navigation.navigate('Details',{
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
                  onPress={()=>{
                    archivedTask(item.id)
                  }}
                >
                  <Ionicons
                    name='attach'
                    size={22}
                    color='#4169e1'
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonDeleteTask}
                  onPress={()=>{
                    deleteTask(item.id)
                  }}
                >
                  <Ionicons
                    name='backspace-outline'
                    size={22}
                    color='#ff2800'
                  />
                </TouchableOpacity>
              </View>
            </View>
          )
        }}
      />
    </View>
  )
}