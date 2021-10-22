import React from "react"
import { StatusBar, TouchableOpacity, View, Appearance, LogBox } from 'react-native'
import { NavigationContainer, DarkTheme } from "@react-navigation/native"
import { createStackNavigator } from '@react-navigation/stack'
import { Ionicons } from '@expo/vector-icons'
import firebase from './src/config/firebase'

import Loading from './src/pages'
import Auth from './src/pages/Auth'
import Register from './src/pages/Register'
import Home from './src/pages/Home'
import Tasks from './src/pages/Home/Tasks'
import Archived from './src/pages/Home/Archived'
import NewTask from './src/pages/NewTask'
import Details from './src/pages/Details'

const Stack = createStackNavigator();

export default function App({navigation}) {
  LogBox.ignoreLogs(['Setting a timer']);
  const colorScheme = Appearance.getColorScheme();
  if (colorScheme === 'dark') {
    // Use dark color scheme
  }
  const MyTheme = {
    ...DarkTheme
  }
  function logout(){
    firebase.auth().signOut().then(() => {
      navigation.navigate('Auth')
    }).catch((error) => {
      //error
    })
  }

  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar barStyle='light-content' backgroundColor='#161617'/>
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
            headerLeft: null,
            headerRight: () => (
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={{right: 10}}
                  onPress={()=>{
                    logout()
                  }}
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
            headerLeft: null,
            headerRight: () => (
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={{right: 10}}
                  onPress={()=>{
                    logout()
                  }}
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
          name='New Task'
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
}