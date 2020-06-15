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

import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

const Stack = createStackNavigator();

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
            <Stack.Screen name="Deck" options={{ title: 'My deck' }} component={DeckScreen} />
            <Stack.Screen
              name="CreateDeck"
              options={{ title: 'Create a new deck' }}
              component={CreateDeckScreen}
            />
            <Stack.Screen
              name="CreateCard"
              options={{ title: 'Create a new card' }}
              component={CreateCardScreen}
            />
            <Stack.Screen name="Quiz" options={{ title: 'Quiz' }} component={QuizScreen} />
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

async function getiOSNotificationPermission() {
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') {
    await Permissions.askAsync(Permissions.NOTIFICATIONS);
  }
}

function scheduleDailyNotification() {
  getiOSNotificationPermission();

  const nextDay = Date.now() + 3600000 * 24;

  Notifications.scheduleLocalNotificationAsync(
    {
      title: 'Hi from Mobile Flashcards!',
      body: "Don't forget to study today :)",
      android: {
        sound: true,
      },
      ios: {
        sound: true,
      },
    },
    { time: nextDay }
  );
}
