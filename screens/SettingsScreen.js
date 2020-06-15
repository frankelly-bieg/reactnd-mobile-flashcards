import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import Store from '../constants/Store';

export default function LinksScreen({ navigation }) {
  const onDelete = () => {
    Store.get('deckList').then((decks) => {
      const deckList = Object.values(decks);
      const cardsAmount = deckList.reduce((acc, current) => acc + current.questions.length, 0);

      if (deckList.length === 0) {
        Alert.alert(
          "You haven't created a deck yet",
          '',
          [
            {
              text: 'ok',
            },
          ],
          { cancelable: false }
        );
        return;
      }

      Alert.alert(
        'Are you sure you want to delete all your decks?',
        `${deckList.length} decks with a total of ${cardsAmount} cards will be deleted.`,
        [
          {
            text: 'Cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              Store.save('deckList', {}).then(() => {
                navigation.navigate('Home');
              });
            },
          },
        ],
        { cancelable: false }
      );
    });
  };
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <OptionButton icon="md-trash" label="Clean storage (delete all decks)" onPress={onDelete} />
    </ScrollView>
  );
}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
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
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
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
});
