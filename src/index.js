import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { BackHandler } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigation from './BottomTabNavigation';
import Login from './screens/Login';
import NovoUser from './screens/NovoUser';
import Loading from './screens/Loading/Loading';

const Stack = createStackNavigator();

const App = () => {

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true
    );
    return () => backHandler.remove();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style='dark' backgroundColor={'#fff'} translucent={false} />
      <Stack.Navigator
        initialRouteName='Loading'
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='Loading' component={Loading} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='NovoUser' component={NovoUser} />
        <Stack.Screen name='Main' component={BottomTabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
