import React, {
  createContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

type ThemeContextType = {
  theme: Theme
  toggleTheme: ( next: Theme ) => void
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
}

export const ThemeContext = createContext<ThemeContextType | undefined>( undefined )

/**
 * Provides basic theme handling.
 * @todo: add support for multiple themes.
 */
function ThemeProvider( { children }: { children: ReactNode } ) {
  const [ theme, setTheme ] = useState<Theme>( Theme.LIGHT )

  useEffect( () => {
    const getTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem( 'theme' )
        if ( savedTheme ) {
          setTheme( savedTheme as Theme )
        }
      } catch ( error ) {
        // eslint-disable-next-line no-console
        console.log( 'Error loading theme:', error )
      }
    }
    getTheme()
  }, [] )

  const toggleTheme = ( next: Theme ) => {
    setTheme( next )
    AsyncStorage.setItem( 'theme', next )
  }

  const contextValue = useMemo( () => ( { theme, toggleTheme, setTheme } ), [ theme, setTheme ] )

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
