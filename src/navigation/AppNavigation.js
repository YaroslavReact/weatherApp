

import {createStackNavigator} from '@react-navigation/stack'
import MainScreen from '../screens/MainScreen'
import MoreScreen from '../screens/MoreScreen'
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

const Stack = createStackNavigator();

function Navigation()  {
  return (
    <Stack.Navigator initialRouteName="Main" screenOptions={{
      headerShown: false}} >

      <Stack.Screen name="Main" component={MainScreen}   />
      <Stack.Screen name="MoreScreen" component={MoreScreen} />
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