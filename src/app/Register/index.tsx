import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../../config/firebase';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { RegisterScreenNavigationProp } from '../../../types';

interface RegisterProps {
  navigation: RegisterScreenNavigationProp;
}

const Register: React.FC<RegisterProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorRegister, setErrorRegister] = useState<string>('');

  const firebaseRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      const user = userCredential.user;
      if (user) {
        console.log(user);
        navigation.navigate('Home', { id: user.uid });
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorRegister(error.message);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.title}>Create a Task account</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter your user email'
        placeholderTextColor='#a0a0a0'
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder='Enter your user password'
        placeholderTextColor='#a0a0a0'
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      {errorRegister && (
        <View style={styles.contentAlert}>
          <Ionicons
            name='alert-circle'
            size={24}
            color='#E31C25'
          />
          <Text style={styles.warningAlert}>{errorRegister}</Text>
        </View>
      )}
      <TouchableOpacity
        disabled={email === '' || password === ''}
        style={styles.buttonRegister}
        onPress={firebaseRegister}
      >
        <Text style={styles.buttonRegisterText}>Register</Text>
      </TouchableOpacity>
      <Text style={styles.buttonGoAuth}>
        Already registered?
        <Text
          style={styles.linkAuth}
          onPress={() => navigation.navigate('Auth')}
        >
          &nbsp;Enter
        </Text>
      </Text>
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default Register;
