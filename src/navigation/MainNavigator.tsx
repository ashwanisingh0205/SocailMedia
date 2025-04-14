import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { mergedStacks } from './ScreenCollection';

const Stack = createNativeStackNavigator();
const MainNavigator:FC = () => {
  return (
   <Stack.Navigator initialRouteName='RegisterScreen'
   screenOptions={()=>({
    headerShown:false,
   })} >
    {mergedStacks.map((item, index) => {
      return (
        <Stack.Screen
          key={index}
          name={item.name}
          component={item.component}

        />
      );
    }
    )}

   </Stack.Navigator>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({});
