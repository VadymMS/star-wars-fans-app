import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';
import {MainScreen, ThemeScreen, CardInfoScreen} from '../screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigation = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Group>
        <Stack.Screen name="Theme" component={ThemeScreen} />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="CardInfo" component={CardInfoScreen} />
      </Stack.Group>
    </Stack.Navigator>
  </NavigationContainer>
);
