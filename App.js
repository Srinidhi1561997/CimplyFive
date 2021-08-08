import React from 'react';
import type {Node} from 'react';
import {store, persistor} from './Src/ConfigureStore';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './Src/Screens/Login';
import CourseDb from './Src/Screens/CourseDb';
import StudentDb from './Src/Screens/StudentDb';
import config from './aws-exports';
import Amplify from 'aws-amplify';
import SplashScreen from './Src/Screens/SplashScreen';
import ButtunScreen from './Src/Screens/ButtonScreen';
import StudentForm from './Src/Screens/StudentForm';
import CourseForm from './Src/Screens/CourseForm';
import StudentDetails from './Src/Screens/StudentDetails';
import CourseDetails from './Src/Screens/CourseDetails';

console.disableYellowBox = true;
Amplify.configure(config);
const Stack = createStackNavigator();

const Appcontainer=()=>{
  return(
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Splash'>
      <Stack.Screen name='Splash' component={SplashScreen} options={{headerShown:false}} />
      <Stack.Screen name='StudentForm' component={StudentForm} options={{headerShown:false}} />
      <Stack.Screen name='CourseForm' component={CourseForm} options={{headerShown:false}} />
      <Stack.Screen name='ButtonScreen' component={ButtunScreen} options={{headerShown:false}} />
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
      <Stack.Screen name="CourseDb" component={CourseDb} options={{headerShown: false}}/>
      <Stack.Screen name="StudentDb" component={StudentDb} options={{headerShown: false}}/>
      <Stack.Screen name="StudentDetails" component={StudentDetails} options={{headerShown: false}}/>
      <Stack.Screen name="CourseDetails" component={CourseDetails} options={{headerShown: false}}/>
    </Stack.Navigator>
    </NavigationContainer>
  )
}

const App: () => Node = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={false} persistor={persistor}>
        <Appcontainer/>
      </PersistGate>
    </Provider>
  );
};

export default App;
