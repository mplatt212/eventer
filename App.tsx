import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {IconButton} from 'react-native-paper';
import EventDetails from './Pages/EventDetails';
import Home, {IProps} from './Pages/Home';
import MealDetails from './Pages/MealDetails';
import MealsList from './Pages/MealsList';
import {navTheme} from './Theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTab = ({navigation}: IProps) => {
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home',
            tabBarIcon: () => (
              <IconButton
                icon="home"
                onPress={() => navigation.navigate('Home')}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

const EventDetailsTab = ({navigation}: IProps) => {
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen
          name="Event Details Tab"
          component={EventDetails}
          options={{
            title: 'Home',
            tabBarIcon: () => (
              <IconButton
                icon="home"
                onPress={() => navigation.navigate('Home')}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

const App = () => {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator>
        {/* <Stack.Screen name="Root" component={HomeTab} /> */}
        <Stack.Screen
          name="Home"
          component={HomeTab}
          options={{
            headerShown: false,
            headerRight: () => <IconButton icon="cog" />,
          }}
        />
        <Stack.Screen name="Event Details" component={EventDetailsTab} />
        <Stack.Screen name="Meal List" component={MealsList} />
        <Stack.Screen name="Meal Details" component={MealDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
