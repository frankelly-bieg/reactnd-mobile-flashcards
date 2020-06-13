import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Switch, TextInput } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

export default function CreateCard({ navigation, route }) {
  const [question, onQuestionChangeText] = React.useState('Useless Placeholder');
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <View>
        <Text>Question:</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(text) => onQuestionChangeText(text)}
          maxLength={30}
          value={question}
        />
        <View style={{ flexDirection: 'row' }}>
          <Text>Answer: </Text>
          <Text style={{ fontWeight: 'bold' }}>{isEnabled ? 'Correct' : 'Incorrect'}</Text>
        </View>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View style={styles.tabBarInfoContainer}>
        <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
          <TouchableOpacity style={styles.actionButton}>
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
