import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Alert } from 'react-native';
import Store from '../constants/Store';

const { height } = Dimensions.get('screen');

export default function Deck({ navigation, route }) {
  const [data, setData] = React.useState(route.params);

  const title = data?.title;
  const deckID = data?.id;
  const cardsAmount = data?.questions?.length || 0;

  React.useEffect(() => {
    const unSubscribe = navigation.addListener('focus', () => {
      Store.get('deckList').then((decks) => {
        const storedDesks = decks || {};

        setData({ id: deckID, ...storedDesks[deckID] });
      });
    });

    return unSubscribe;
  }, [navigation]);

  const onDelete = () => {
    Alert.alert(
      'Are you sure you want to delete this deck?',
      `${cardsAmount} ${cardsAmount === 1 ? 'card' : 'cards'} will be removed`,
      [
        {
          text: 'Cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            Store.get('deckList').then((decks) => {
              const safeTitle = title.trim().toLowerCase().replace(' ', '-');
              const deckList = { ...decks };

              delete deckList[safeTitle];

              Store.save('deckList', deckList).then(() => {
                navigation.navigate('Root');
              });
            });
          },
        },
      ],
      { cancelable: false }
    );
  };

  const onStartQuiz = () => {
    if (cardsAmount === 0) {
      Alert.alert(
        "Can't start the quiz",
        'This deck has no cards',
        [
          {
            text: 'OK',
          },
        ],
        { cancelable: false }
      );
      return;
    }
    navigation.navigate('Quiz', { deckID });
  };
  return (
    <View style={styles.container}>
      <View style={styles.deckContainer}>
        <Text style={styles.deckTitle}>{title}</Text>
        <Text style={styles.deckCards}>
          {cardsAmount} {cardsAmount === 1 ? 'card' : 'cards'}
        </Text>
        <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={onDelete}>
          <Text style={[styles.buttonText, styles.deleteButtonText]}>Delete deck</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tabBarInfoContainer}>
        <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
          <TouchableOpacity
            style={[styles.actionButton, styles.buttonLight]}
            onPress={() => navigation.navigate('CreateCard', { deckID })}
          >
            <Text style={[styles.buttonText, styles.buttonLightText]}>Add card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.lastButton]} onPress={onStartQuiz}>
            <Text style={styles.buttonText}>Start quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  deckContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: height * 0.6,
  },
  deckTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  deckCards: {
    fontSize: 22,
  },
  actionButton: {
    width: 150,
    paddingVertical: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
  },
  buttonLight: {
    borderColor: 'rgba(0,0,0,0.7)',
    backgroundColor: 'white',
  },
  deleteButtonText: {
    color: 'white',
  },
  deleteButton: {
    marginTop: 70,
    backgroundColor: '#f52d2d',
    paddingVertical: 5,
  },
  buttonLightText: {
    color: 'black',
  },
  lastButton: {
    marginBottom: 45,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
});
