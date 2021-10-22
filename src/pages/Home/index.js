import React from "react"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

import Tasks from './Tasks'
import Archived from './Archived'

const Tab = createBottomTabNavigator();

export default function App({ route }) {
  return (
    <Tab.Navigator initialRouteName='Tasks'>
      <Tab.Screen
        name='Tasks'
        component={Tasks, {idUser: route.params.idUser}}
        options={{
          headerShown: false
        }}
      />
      <Tab.Screen
        name='Archived'
        component={Archived, {idUser: route.params.idUser}}
        options={{
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
}