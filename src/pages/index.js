import React, { useEffect, useRef } from 'react'
import {
  View
} from 'react-native'

import firebase from '../config/firebase'

export default function Loading({ navigation }){
  const _isMounted = useRef(true)
  const auth = async () => {
    if (_isMounted.current) {
      try {
        firebase.auth().onAuthStateChanged(async (user) => {
          if (user) {
            await navigation.navigate('Tasks', {idUser: user.uid })
          } else {
            await navigation.navigate('Auth')
          }
        })
      } catch (error) {
        error
      }
    }
  }

  useEffect(()=>{
    auth()
    return () => {
      _isMounted.current = false
    }
  }, [])

  return (
    <View></View>
  )
}