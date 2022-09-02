import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {IconButton} from 'react-native-paper';
import Home from './Pages/Home';
import MealDetails from './Pages/MealDetails';
import MealsList from './Pages/MealsList';
import {navTheme} from './Theme';
import Account from './Pages/Account';
import Login from './Pages/Login';
import EventDetails from './Pages/EventDetails';
import store from './Store/Store';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const LoginStack = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </>
  );
};

const HomeStack = () => {
  return (
    <>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerRight: () => <IconButton icon="cog" />,
          }}
        />
        <Stack.Screen
          name="Event Details"
          component={EventDetails}
          options={{
            headerRight: () => <IconButton icon="cog" />,
          }}
        />
        <Stack.Screen
          name="Meal List"
          component={MealsList}
          options={{
            headerRight: () => <IconButton icon="cog" />,
          }}
        />
        <Stack.Screen
          name="Meal Details"
          component={MealDetails}
          options={{
            headerRight: () => <IconButton icon="cog" />,
          }}
        />
        <Stack.Screen
          name="Account"
          component={Account}
          options={{
            headerRight: () => <IconButton icon="cog" />,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

const AccountStack = () => {
  return (
    <>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Account"
          component={Account}
          options={{
            headerRight: () => <IconButton icon="cog" />,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

const App = () => {
  return (
    <NavigationContainer theme={navTheme}>
      {store.authStore.loggedIn ? (
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{
              title: 'Home',
              headerShown: false,
              tabBarIcon: () => <IconButton icon="home" />,
            }}
          />
          <Tab.Screen
            name="Account"
            component={AccountStack}
            options={{
              title: 'Account',
              headerShown: false,
              tabBarIcon: () => <IconButton icon="account" />,
            }}
          />
        </Tab.Navigator>
      ) : (
        <LoginStack />
      )}
    </NavigationContainer>
  );
};

export default App;
