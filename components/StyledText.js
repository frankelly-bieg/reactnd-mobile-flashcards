import * as React from 'react';
import { Text, StyleSheet } from 'react-native';

export function MonoText(props) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
}

export function ErrorText(props) {
  return <Text {...props} style={styles.message} />;
}

const styles = StyleSheet.create({
  message: {
    color: 'red',
  },
});