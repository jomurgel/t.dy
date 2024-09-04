import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

export default function Button(props) {
  const { onPress, title = 'Press Me!', type = 'button' } = props;
  return (
    <Pressable style={styles[type]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const red = 'rgba(238,113,113,1)';
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  back: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    position: 'absolute',
    bottom: 30,
    left: 30,
    elevation: 3,
    marginBottom: 8,
  },
  secondary: {
    backgroundColor: 'transparent',
    padding: 0,
    elevation: 3,
    alignItems: 'center',
  },
  tertiary: {
    backgroundColor: 'transparent',
    padding: 0,
    elevation: 3,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: red,
    textTransform: 'uppercase',
  },
});
