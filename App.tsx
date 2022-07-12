import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import EventDetails from './Pages/EventDetails';
import Home from './Pages/Home';
import MealDetails from './Pages/MealDetails';
import MealsList from './Pages/MealsList';
import {navTheme} from './Theme';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Event Details" component={EventDetails} />
        <Stack.Screen name="Meal List" component={MealsList} />
        <Stack.Screen name="Meal Details" component={MealDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
