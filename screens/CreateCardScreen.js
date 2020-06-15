import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { ErrorText } from '../components/StyledText';
import Store from '../constants/Store';

export default function CreateCard({ navigation, route }) {
  const deckID = route.params?.deckID;

  const [question, onQuestionChangeText] = React.useState('');
  const [answer, onAnswerChangeText] = React.useState('');

  const [questionError, setQuestionError] = React.useState('');
  const [answerError, setAnswerError] = React.useState('');

  const onSubmit = () => {
    if (!question) {
      setQuestionError('This field is required');
      return;
    }
    setQuestionError('');

    if (!answer) {
      setAnswerError('This field is required');
      return;
    }
    setAnswerError('');

    Store.get('deckList').then((decks) => {
      const storedDesks = decks || {};

      Store.update('deckList', {
        [deckID]: {
          questions: [...storedDesks[deckID].questions, { question, answer }],
        },
      }).then(() => {
        navigation.navigate('Root');
      });
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.inputTitle}>Question:</Text>
        <TextInput
          style={styles.inputClass}
          onChangeText={(text) => onQuestionChangeText(text)}
          value={question}
        />
        {Boolean(questionError) && <ErrorText>{questionError}</ErrorText>}
        <Text style={styles.inputTitle}>Answer:</Text>
        <TextInput
          style={styles.inputClass}
          onChangeText={(text) => onAnswerChangeText(text)}
          value={answer}
        />
        {Boolean(answerError) && <ErrorText>{answerError}</ErrorText>}
      </View>
      <View style={styles.tabBarInfoContainer}>
        <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
          <TouchableOpacity style={styles.actionButton} onPress={onSubmit}>
            <Text style={[styles.buttonText, styles.buttonBiggerText]}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.buttonLight, styles.lastButton]}
            onPress={() => navigation.navigate('Root')}
          >
            <Text style={[styles.buttonText, styles.buttonLightText]}>Go to home</Text>
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
  inputTitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  inputClass: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  contentContainer: {
    paddingHorizontal: 15,
    paddingTop: 20,
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
