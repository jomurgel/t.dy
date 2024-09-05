import { useContext } from 'react'
import { ThemeContext } from '../providers/ThemeProvider'
import themeConfig from '../lib/themeConfig'

const useThemeColors = () => {
  const { theme } = useContext( ThemeContext )

  if ( theme === undefined ) {
    throw new Error( 'useThemeColors must be used within an ThemeProvider' )
  }

  switch ( theme ) {
    case 'dark':
      return themeConfig.backgroundColor.dark

    default:
      return themeConfig.backgroundColor.light
  }
}

export default useThemeColors
