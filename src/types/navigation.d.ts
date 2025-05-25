// types/navigation.d.ts
import { NavigationProp } from '@react-navigation/native';

export type RootStackParamList = {
  Launch: undefined;
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
  Analytics: undefined;
  CreateHucha: undefined;
  Savings: undefined;
  Configuration: undefined;
  // Add other screens here when you create them
};

export type RootNavigationProp = NavigationProp<RootStackParamList>;