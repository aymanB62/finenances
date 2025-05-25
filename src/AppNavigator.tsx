import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LogInScreen';
import SignUpScreen from './screens/SignUpScreen';
import CreateHuchaScreen from './screens/CreateHuchaScreen';
import LaunchScreen from './screens/LaunchScreen';
import AnalyticsScreen from './screens/AnalyticsScreen';
import ConfigurationScreen from './screens/ConfigurationScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Launch"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Launch" component={LaunchScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="CreateHucha" component={CreateHuchaScreen} />
        <Stack.Screen name="Analytics" component={AnalyticsScreen} />
        <Stack.Screen name="Configuration" component={ConfigurationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}