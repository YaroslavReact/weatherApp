
import React from 'react';
import {View, StyleSheet} from 'react-native';
import { Provider } from 'react-redux';
import  AppNavigation  from './src/navigation/AppNavigation';
import { store }  from  './src/store';

export default function App() {
    return (
      <View style={styles.container}>
          <Provider store={store}>
          <AppNavigation />
         
        </Provider>
      </View>
    );
}
const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
})