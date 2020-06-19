import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import HomeTabNavigator from './navigation/HomeTabNavigator';

import DeckScreen from './screens/DeckScreen';
import CreateDeckScreen from './screens/CreateDeckScreen';
import CreateCardScreen from './screens/CreateCardScreen';
import QuizScreen from './screens/QuizScreen';

import { scheduleDailyNotification } from './constants/Notifications';

const Stack = createStackNavigator();

// From: https://reactnavigation.org/docs/stack-navigator/#animations
const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const transitionSpec = {
  open: config,
  close: config,
};

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  React.useEffect(() => {
    scheduleDailyNotification();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Root">
            <Stack.Screen name="Root" component={HomeTabNavigator} />
            <Stack.Screen
              name="Deck"
              options={{
                title: 'My deck',
                transitionSpec,
              }}
              component={DeckScreen}
            />
            <Stack.Screen
              name="CreateDeck"
              options={{
                title: 'Create a new deck',
                transitionSpec,
              }}
              component={CreateDeckScreen}
            />
            <Stack.Screen
              name="CreateCard"
              options={{
                title: 'Create a new card',
                transitionSpec,
              }}
              component={CreateCardScreen}
            />
            <Stack.Screen
              name="Quiz"
              options={{
                title: 'Quiz',
                transitionSpec,
              }}
              component={QuizScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
