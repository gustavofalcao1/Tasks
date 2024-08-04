import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import RNRestart from 'react-native-restart';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { firebaseAuth } from '../../config/firebase';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { AuthScreenNavigationProp } from '../../../types';  // Ajuste o caminho conforme necessário

interface AuthProps {
  navigation: AuthScreenNavigationProp;
}

const Auth: React.FC<AuthProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorAuth, setErrorAuth] = useState<boolean>(false);
  const [errorRecover, setErrorRecover] = useState<boolean>(false);

  const accountAuth = () => {
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          RNRestart.Restart();
          navigation.navigate('Home', { id: user.uid });
        }
      })
      .catch((error) => {
        setErrorAuth(true);
        console.error(error.code, error.message);
      });
  };

  const accountRegister = () => {
    navigation.navigate('Register')
  };

  const accountRecover = () => {
    sendPasswordResetEmail(firebaseAuth, email)
      .then(() => {
        navigation.navigate('Recover', { id: email?? null });
      })
      .catch((error) => {
        setErrorRecover(true);
        console.error(error.code, error.message);
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.title}>Task</Text>
      <TextInput
        numberOfLines={1}
        style={styles.input}
        placeholder='Enter your email'
        placeholderTextColor='#a0a0a0'
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        numberOfLines={1}
        style={styles.input}
        placeholder='Enter your password'
        placeholderTextColor='#a0a0a0'
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      {errorAuth &&
        <View style={styles.contentAlert}>
          <Ionicons
            name='alert-circle'
            size={24}
            color='#E31C25'
          />
          <Text style={styles.warningAlert}>Invalid Email or Password</Text>
        </View>
      }
      {errorRecover &&
        <View style={styles.contentAlert}>
          <Ionicons
            name='alert-circle'
            size={24}
            color='#E31C25'
          />
          <Text style={styles.warningAlert}>Invalid Email</Text>
        </View>
      }
      <TouchableOpacity
        disabled={email === '' || password === ''}
        style={styles.buttonAuth}
        onPress={accountAuth}
      >
        <Text style={styles.buttonAuthText}>Enter</Text>
      </TouchableOpacity>
      <Text style={styles.buttonGoRecover}>
        Forgot your password?
        <Text
          style={styles.linkRecover}
          onPress={accountRecover}
        >
          &nbsp;Recover
        </Text>
      </Text>
      <Text style={styles.buttonGoRegister}>
        Don't have a registration?
        <Text
          style={styles.linkRegister}
          onPress={accountRegister}
        >
          &nbsp;Register now
        </Text>
      </Text>
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default Auth;
