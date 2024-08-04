import React from "react";
import { StatusBar, TouchableOpacity, View, Appearance, LogBox } from 'react-native';
import { NavigationContainer, DarkTheme, Theme } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from './src/config/firebase';
import { RootStackParamList, AppScreenNavigationProp } from './types';

import Loading from './src/app';
import Auth from './src/app/Auth';
import Register from './src/app/Register';
import Home from './src/app/Home';
import Tasks from './src/app/Home/Tasks';
import Archived from './src/app/Home/Archived';
import NewTask from './src/app/NewTask';
import Details from './src/app/Details';


const Stack = createStackNavigator<RootStackParamList>();

interface AppProps {
  navigation: AppScreenNavigationProp;
}

const App: React.FC<AppProps> = ({ navigation }) => {
  LogBox.ignoreLogs(['Setting a timer']);
  const colorScheme = Appearance.getColorScheme();

  const MyTheme: Theme = {
    ...DarkTheme,
  };

  const logout = () => {
    signOut(firebaseAuth)
      .then(() => {
        navigation.navigate('Auth');
      })
      .catch((error: Error) => {
        console.error(error);
      });
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar barStyle='light-content' backgroundColor='#161617' />
      <Stack.Navigator initialRouteName='Loading'>
        <Stack.Screen
          name='Loading'
          component={Loading}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='Auth'
          component={Auth}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='Register'
          component={Register}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='Home'
          component={Home}
          options={{
            headerTintColor: '#00CC10',
            headerStyle: {
              backgroundColor: '#161617',
            },
            headerLeft: () => null,
            headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  style={{ right: 10 }}
                  onPress={logout}
                >
                  <Ionicons
                    name='exit-outline'
                    size={28}
                    color='#00CC10'
                  />
                </TouchableOpacity>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name='Tasks'
          component={Tasks}
          options={{
            headerTintColor: '#00CC10',
            headerStyle: {
              backgroundColor: '#161617',
            },
            headerLeft: () => null,
            headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  style={{ right: 10 }}
                  onPress={logout}
                >
                  <Ionicons
                    name='exit-outline'
                    size={28}
                    color='#00CC10'
                  />
                </TouchableOpacity>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name='Archived'
          component={Archived}
          options={{
            headerTintColor: '#00CC10',
            headerStyle: {
              backgroundColor: '#161617',
            }
          }}
        />
        <Stack.Screen
          name='NewTask'
          component={NewTask}
          options={{
            headerTintColor: '#00CC10',
            headerStyle: {
              backgroundColor: '#161617',
            }
          }}
        />
        <Stack.Screen
          name='Details'
          component={Details}
          options={{
            headerTintColor: '#00CC10',
            headerStyle: {
              backgroundColor: '#161617',
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
