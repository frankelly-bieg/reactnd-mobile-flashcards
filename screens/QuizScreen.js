import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import Store from '../constants/Store';

const { height } = Dimensions.get('screen');

export default function Quiz({ navigation, route }) {
  const [points, setPoints] = React.useState(0);

  const [questionList, setQuestionList] = React.useState([]);
  const [currentQuestionIndex, setQuestionIndex] = React.useState(0);
  const [isAnswerVisible, setAnswerVisible] = React.useState(false);

  const deckID = route.params?.deckID;

  const nextQuestion = () => {
    setAnswerVisible(false);
    setQuestionIndex(currentQuestionIndex + 1);
  };

  const onCorrect = () => {
    setPoints(points + 1);
    nextQuestion();
  };

  const restartQuiz = () => {
    setAnswerVisible(false);
    setQuestionIndex(0);
    setPoints(0);
  };

  React.useEffect(() => {
    Store.get('deckList').then((decks) => {
      const storedDesks = decks || {};

      setQuestionList(storedDesks[deckID].questions);
    });
  }, []);

  if (questionList.length === 0) {
    return null;
  }

  if (currentQuestionIndex === questionList.length) {
    const percent = (100 * points) / questionList.length;
    const roundedPercentage = Math.round(percent * Math.pow(10, 2)) / Math.pow(10, 2);

    const circleColor = percent >= 70 ? styles.correctButton : styles.incorrectButton;
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.cardTitle}>{percent >= 70 ? 'Congratulations!' : 'Quiz result'}</Text>
          <View style={[styles.circleContainer, circleColor]}>
            <Text style={styles.cardsAmount}>{roundedPercentage}%</Text>
          </View>
        </View>
        <View style={styles.tabBarInfoContainer}>
          <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <TouchableOpacity
              style={[styles.actionButton, styles.buttonLight, styles.lastButton]}
              onPress={restartQuiz}
            >
              <Text style={[styles.buttonText, styles.buttonLightText]}>Restart quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.buttonLight, styles.lastButton]}
              onPress={() => navigation.navigate('Deck')}
            >
              <Text style={[styles.buttonText, styles.buttonLightText]}>Back to deck</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  const { question, answer } = questionList[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.breadcrumbs}>
        {currentQuestionIndex + 1} / {questionList.length}
      </Text>
      <View style={styles.contentContainer}>
        <Text style={styles.cardTitle}>{question}</Text>
        {isAnswerVisible ? (
          <Text style={styles.answerClass}>{answer}</Text>
        ) : (
          <TouchableOpacity
            style={[styles.actionButton, styles.buttonLight]}
            onPress={() => setAnswerVisible(true)}
          >
            <Text style={[styles.buttonText, styles.buttonLightText]}>Show answer</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.tabBarInfoContainer}>
        <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
          {isAnswerVisible && (
            <React.Fragment>
              <TouchableOpacity
                style={[styles.actionButton, styles.correctButton]}
                onPress={onCorrect}
              >
                <Text style={[styles.buttonText, styles.correctButtonText]}>Correct</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.incorrectButton, styles.lastButton]}
                onPress={nextQuestion}
              >
                <Text style={[styles.buttonText, styles.incorrectButtonText]}>Incorrect</Text>
              </TouchableOpacity>
            </React.Fragment>
          )}
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
  breadcrumbs: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  answerClass: {
    fontSize: 18,
    backgroundColor: 'rgba(96,100,109, 0.2)',
    marginVertical: 25,
    width: '100%',
    textAlign: 'center',
    paddingVertical: 7,
  },
  circleContainer: {
    marginTop: 30,
    borderRadius: 80,
    borderWidth: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderColor: '#fff',
  },
  cardsAmount: {
    color: 'white',
    paddingHorizontal: 5,
    textAlign: 'center',
    width: 150,
    height: 150,
    lineHeight: 150,
    fontSize: 40,
  },
  contentContainer: {
    paddingHorizontal: 15,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: height * 0.5,
  },
  cardTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  actionButton: {
    width: 150,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'rgba(96,100,109, 0.8)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  incorrectButtonText: {
    color: 'white',
  },
  incorrectButton: {
    backgroundColor: '#d5271c',
  },
  correctButton: {
    backgroundColor: '#15bf15',
  },
  correctButtonText: {
    color: 'white',
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
