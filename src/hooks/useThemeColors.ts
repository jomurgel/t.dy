import { useContext } from 'react'
import { ThemeContext } from '../providers/ThemeProvider'
import themeConfig from '../lib/themeConfig'

/**
 * Passes theme background colors based on ThemeProvider.
 *
 * @todo: handle styles more dynamicly here later vs just the bg.
 */
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
