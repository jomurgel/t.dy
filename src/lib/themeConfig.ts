const darkBlue = 'rgba(19, 12, 84, 1)'
const white = '#fff'
const red = 'rgba(238,113,113,1)'

const inputShared = {
  alignSelf: 'stretch',
  borderRadius: 4,
  borderStyle: 'solid',
  borderWidth: 1,
  fontSize: 16,
  marginBottom: 10,
  marginLeft: 20,
  marginRight: 20,
  padding: 8,
}

export default {
  backgroundColor: {
    dark: [ 'rgba(19, 12, 183,0.5)', 'rgba(82, 229, 231,0.5)' ],
    light: [ 'rgba(238,113,113,0.5)', 'rgba(246,215,148,0.5)' ],
  },
  color: {
    white: {
      light: white,
      dark: darkBlue,
    },
  },
  input: {
    light: {
      ...inputShared,
      backgroundColor: white,
      textColor: red,
    },
    dark: {
      ...inputShared,
      backgroundColor: darkBlue,
      textColor: white,
    },
  },
  text: {
    light: red,
    dark: white,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    light: {
      color: white,
      fontSize: 48,
      marginBottom: 20,
    },
    dark: {
      color: darkBlue,
      fontSize: 48,
      marginBottom: 20,
    },
  },
}
