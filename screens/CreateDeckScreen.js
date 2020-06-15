import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { ErrorText } from '../components/StyledText';
import Store from '../constants/Store';

export default function Deck({ navigation, route }) {
  const [title, onChangeText] = React.useState('');
  const [errorMessage, setError] = React.useState('');

  const goToHome = () => navigation.navigate('Root');

  const onSubmit = () => {
    if (!title) {
      setError('This field is required');
      return;
    }

    setError('');

    Store.get('deckList').then((decks) => {
      const storedDesks = decks || {};
      const safeTitle = title.trim().toLowerCase().replace(' ', '-');

      if (storedDesks[safeTitle]) {
        setError('This desk already exist');
        return;
      }

      Store.update('deckList', {
        [safeTitle]: {
          title,
          questions: [],
        },
      }).then(() => {
        goToHome();
      });
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>What is the title of your new deck?</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 5 }}
          onChangeText={(text) => onChangeText(text)}
          maxLength={30}
          value={title}
        />
        {Boolean(errorMessage) && <ErrorText>{errorMessage}</ErrorText>}
      </View>
      <View style={styles.tabBarInfoContainer}>
        <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
          <TouchableOpacity style={styles.actionButton} onPress={onSubmit}>
            <Text style={[styles.buttonText, styles.buttonBiggerText]}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.buttonLight, styles.lastButton]}
            onPress={goToHome}
          >
            <Text style={[styles.buttonText, styles.buttonLightText]}>Go back</Text>
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
  sectionTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Times New Roman',
  },
  contentContainer: {
    paddingHorizontal: 40,
    paddingTop: 10,
  },
  buttonBiggerText: {
    fontSize: 18,
  },
  actionButton: {
    width: 150,
    paddingTop: 10,
    paddingBottom: 10,
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
