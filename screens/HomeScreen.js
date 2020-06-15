import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import Store from '../constants/Store';

const { height } = Dimensions.get('screen');

export default function Home({ navigation }) {
  const [deckList, setDeckList] = React.useState([]);

  React.useEffect(() => {
    const unSubscribe = navigation.addListener('focus', () => {
      Store.get('deckList').then((decks) => {
        const storedDesks = decks || {};
        setDeckList(Object.entries(storedDesks));
      });
    });

    return unSubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView
        style={[styles.container, styles.listContainer]}
        contentContainerStyle={styles.contentContainer}
      >
        {deckList.map(([id, { title, questions }]) => (
          <OptionButton
            key={title}
            label={title}
            cards={questions.length}
            onPress={() => navigation.navigate('Deck', { id, title, questions })}
            isLastOption
          />
        ))}
      </ScrollView>
      <View style={styles.tabBarInfoContainer}>
        <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.buttonText} onPress={() => navigation.navigate('CreateDeck')}>
              Create desk
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function OptionButton({ cards, label, onPress, isLastOption }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={styles.optionIconContainer}>
          <Text style={styles.cardsAmount}>{cards}</Text>
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  listContainer: {
    maxHeight: height - 300,
  },
  actionButton: {
    width: 150,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderColor: '#fff',
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
  cardsAmount: {
    color: 'white',
    paddingHorizontal: 5,
    textAlign: 'center',
    width: 30,
    height: 30,
    lineHeight: 30,
    fontSize: 15,
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
