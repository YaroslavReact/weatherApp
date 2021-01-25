

import {createStackNavigator} from '@react-navigation/stack'
import MainScreen from '../screens/MainScreen'
import MoreWeatherScreen from '../screens/MoreWeatherScreen'
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

const Stack = createStackNavigator();

function Navigation()  {
  return (
    <Stack.Navigator 
      initialRouteName="Main" 
      screenOptions={{headerShown: false}} 
    >
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="MoreWeatherScreen" component={MoreWeatherScreen} />
    </Stack.Navigator>
  );
} 
export default function AppNavigation() {
    return (
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    );
  }