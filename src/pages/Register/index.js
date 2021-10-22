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

export default function Register({ navigation }){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorRegister, setErrorRegister] = useState('')
  const firebaseRegister=()=>{
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      let user = userCredential.user;
      console.log(user)
      navigation.navigate('Home', { id: user.uid })
    })
    .catch((error) => {
      setErrorRegister(true)
      let errorCode = error.code;
      let errorMessage = error.message;
    })
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.title}>Create a Task account</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter you user email'
        placeholderTextColor='#a0a0a0'
        type='text'
        value={email}
        onChangeText={(text)=>setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder='Enter you user password'
        placeholderTextColor='#a0a0a0'
        secureTextEntry={true}
        type='password'
        value={password}
        onChangeText={(text)=>setPassword(text)}
      />
      {errorRegister === true
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
      {email === '' || password === ''
      ?
      <TouchableOpacity
        disabled={true}
        style={styles.buttonRegister}
      >
        <Text style={styles.buttonRegisterText}>Register</Text>
      </TouchableOpacity>
      :
      <TouchableOpacity
        style={styles.buttonRegister}
        onPress={firebaseRegister}
      >
        <Text style={styles.buttonRegisterText}>Register</Text>
      </TouchableOpacity>
      }
      <Text style={styles.buttonGoAuth}>
        already registered?
        <Text
          style={styles.linkAuth}
          onPress={async ()=> await navigation.navigate('Auth')}
        >
          &nbsp;
          Enter.
        </Text>
      </Text>
      <View style={{height: 100}}/>
    </KeyboardAvoidingView>
  )
}