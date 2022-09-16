import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native'

import firebase from '../../config/firebase'
import { Ionicons } from '@expo/vector-icons'
import styles from './style'

export default function Auth({ navigation }){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorAuth, setErrorAuth] = useState('')
  const [errorRecover, setErrorRecover] = useState('')
  const firebaseAuth=()=>{
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      let user = userCredential.user;
      navigation.navigate('Home', { id: user.uid })
    })
    .catch((error) => {
      setErrorAuth(true)
      let errorCode = error.code;
      let errorMessage = error.message;
    })
  }
  const firebaseRecover=()=>{
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      navigation.navigate('Recover', { id: user.uid })
    })
    .catch((error) => {
      setErrorRecover(true)
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.title}>Task</Text>
      <TextInput
        numberOfLines={1}
        style={styles.input}
        placeholder='Enter you user email'
        placeholderTextColor='#a0a0a0'
        type='text'
        value={email}
        onChangeText={(text)=>setEmail(text)}
      />
      <TextInput
        numberOfLines={1}
        style={styles.input}
        placeholder='Enter you user password'
        placeholderTextColor='#a0a0a0'
        secureTextEntry={true}
        type='password'
        value={password}
        onChangeText={(text)=>setPassword(text)}
      />
      {errorAuth === true
      ?
      <View style={styles.contentAlert}>
        <Ionicons
          name='alert-circle'
          size={24}
          color='#E31C25'
        />
        <Text style={styles.warningAlert}>Invalid Email or Password</Text>
      </View>
      :
      <View>

      </View>
      }
      {errorRecover === true
      ?
      <View style={styles.contentAlert}>
        <Ionicons
          name='alert-circle'
          size={24}
          color='#E31C25'
        />
        <Text style={styles.warningAlert}>Invalid Email</Text>
      </View>
      :
      <View>

      </View>
      }
      {email === '' || password === ''
      ?
      <TouchableOpacity
        disabled={true}
        style={styles.buttonAuth}
      >
        <Text style={styles.buttonAuthText}>Enter</Text>
      </TouchableOpacity>
      :
      <TouchableOpacity
        style={styles.buttonAuth}
        onPress={firebaseAuth}
      >
        <Text style={styles.buttonAuthText}>Enter</Text>
      </TouchableOpacity>
      }
      <Text style={styles.buttonGoRecover}>
      Forgot your password?
        <Text
          style={styles.linkRecover}
          onPress={firebaseRecover}
        >
          &nbsp;
          Recover
        </Text>
      </Text>
      <Text style={styles.buttonGoRegister}>
        don't have a registration?
        <Text
          style={styles.linkRegister}
          onPress={()=>navigation.navigate('Register')}
        >
          &nbsp;
          Register now
        </Text>
      </Text>
      <View style={{height: 100}}/>
    </KeyboardAvoidingView>
  )
}