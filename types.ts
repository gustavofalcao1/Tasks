import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';

export interface Task {
  id: string;
  description: string;
  done: boolean;
  archived: boolean;
  creationDate: Date;
  doneDate?: Date;
  unarchivedDate?: Date;
  archivedDate?: Date;
  redoDate?: Date;
}

export type RootStackParamList = {
  App: any;
  Loading: any;
  Auth: any;
  Details: { id: string; description: string; idUser: string };
  Home: { id: string};
  Tasks: { idUser: string };
  Archived: { idUser: string };
  NewTask: { idUser: string };
  Recover: { id: string }; 
  Register: any;
};

export type AppScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Loading'>;

export type LoadingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Loading'>;

export type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Auth'>;

export type DetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;
export type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

export type TasksScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Tasks'>;
export type TasksScreenRouteProp = RouteProp<RootStackParamList, 'Tasks'>;

export type ArchivedScreenNavigationProp = BottomTabNavigationProp<RootStackParamList, 'Archived'>;
export type ArchivedScreenRouteProp = RouteProp<RootStackParamList, 'Archived'>;

export type NewTaskNavigationProp = StackNavigationProp<RootStackParamList, 'NewTask'>;
export type NewTaskRouteProp = RouteProp<RootStackParamList, 'NewTask'>;

export type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home' | 'Auth'>;
