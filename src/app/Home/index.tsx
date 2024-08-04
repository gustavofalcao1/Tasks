import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList, HomeScreenNavigationProp, HomeScreenRouteProp } from './../../../types';

import Tasks from './Tasks';
import Archived from './Archived';

const Tab = createBottomTabNavigator();

interface HomeProps {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

const Home: React.FC<HomeProps> = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Tasks'>>();
  const { idUser } = route.params;
  
  return (
    <Tab.Navigator initialRouteName='Tasks'>
      <Tab.Screen
        name='Tasks'
        component={Tasks}
        initialParams={{ idUser }}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='list' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Archived'
        component={Archived}
        initialParams={{ idUser }}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='archive' color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
