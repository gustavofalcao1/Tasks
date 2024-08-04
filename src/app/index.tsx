import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../config/firebase';
import { LoadingScreenNavigationProp } from '../../types';

const Loading: React.FC = () => {
  const _isMounted = useRef(true);
  const navigation = useNavigation<LoadingScreenNavigationProp>();

  const onAuth = async () => {
    if (_isMounted.current) {
      try {
        onAuthStateChanged(firebaseAuth, (user) => {
          if (user) {
            navigation.navigate('Tasks', { idUser: user.uid });
          } else {
            navigation.navigate('Auth');
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    onAuth();
    return () => {
      _isMounted.current = false;
    };
  }, []);

  return <View />;
};

export default Loading;
