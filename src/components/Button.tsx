import React, { useContext } from 'react'
import { Text, StyleSheet, Pressable } from 'react-native'
import { ThemeContext } from '../providers/ThemeProvider'
import themeStyles from '../lib/themeConfig'

export default function Button( props ) {
  const { onPress, title = 'Press Me!', type = 'button' } = props
  const { theme } = useContext( ThemeContext )
  return (
    <Pressable style={theme === 'light' ? styles[type] : styles[`${type}Dark`]} onPress={onPress}>
      <Text style={theme === 'light' ? styles.text : styles.textDark}>{title}</Text>
    </Pressable>
  )
}

// @todo: consolidate these into themeConfig.
const styles = StyleSheet.create( {
  back: {
    alignItems: 'center',
    borderRadius: 4,
    elevation: 3,
    justifyContent: 'center',
    marginBottom: 8,
  },
  backDark: {
    alignItems: 'center',
    borderRadius: 4,
    elevation: 3,
    justifyContent: 'center',
    marginBottom: 8,
  },
  remove: {
    fontSize: 12,
    backgroundColor: '#fff',
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 4,
    marginLeft: 'auto',
  },
  removeDark: {
    fontSize: 12,
    backgroundColor: 'rgba(19, 12, 84, 1)',
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 4,
    marginLeft: 'auto',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    elevation: 3,
    justifyContent: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonDark: {
    alignItems: 'center',
    backgroundColor: 'rgba(19, 12, 84, 1)',
    borderRadius: 4,
    elevation: 3,
    justifyContent: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  secondary: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    elevation: 3,
    padding: 0,
    marginBottom: 10,
  },
  secondaryDark: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    elevation: 3,
    padding: 0,
    marginBottom: 10,
  },
  tertiary: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    elevation: 3,
    marginBottom: 10,
    marginTop: 10,
    padding: 0,
  },
  tertiaryDark: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    elevation: 3,
    marginBottom: 10,
    marginTop: 10,
    padding: 0,
  },
  text: {
    color: themeStyles.text.light,
    fontSize: 14,
    letterSpacing: 0.25,
    lineHeight: 21,
    textTransform: 'uppercase',
  },
  textDark: {
    color: themeStyles.text.dark,
    fontSize: 14,
    letterSpacing: 0.25,
    lineHeight: 21,
    textTransform: 'uppercase',
  },
} )
