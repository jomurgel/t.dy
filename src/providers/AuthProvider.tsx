import React, {
  createContext, useState, useMemo, useCallback, ReactNode,
} from 'react'
import { Session, User } from '@supabase/supabase-js'
import supabase from '../lib/supabaseClient'
import { AuthContextType } from '../types/auth'

export const AuthContext = createContext<AuthContextType | undefined>( undefined )

function AuthProvider( { children }: { children: ReactNode } ) {
  const [ user, setUser ] = useState<User | null>( null )
  const [ session, setSession ] = useState<Session | null>( null )
  const [ error, setError ] = useState<Error | null>( null )
  const [ loading, setLoading ] = useState<boolean>( false )

  /**
   * Callback to sign up a new user in supabase.
   */
  const signUpNewUser = useCallback( async ( email: string, name: string, password: string ) => {
    setLoading( true )
    const { data, error: err } = await supabase.auth.signUp( {
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    } )

    setUser( data.user )
    setSession( data.session )
    setError( err )
    setLoading( false )
  }, [] )

  /**
   * Callback for signing in a new user in supabse.
   */
  const signInWithEmail = useCallback( async ( email: string, password: string ) => {
    setLoading( true )
    const { data, error: err } = await supabase.auth.signInWithPassword( {
      email,
      password,
    } )

    setUser( data.user )
    setSession( data.session )
    setError( err )
    setLoading( false )
  }, [] )

  /**
   * Callback to trigger a user session signout on supabase.
   */
  const signOut = useCallback( async () => {
    const { error: err } = await supabase.auth.signOut()

    setUser( null )
    setSession( null )
    setError( err )
  }, [] )

  /**
   * Context value. Memoized to avoid uneceesary rerenders.
   */
  const contextValue = useMemo( () => ( {
    loading,
    user,
    session,
    error,
    signUpNewUser,
    signInWithEmail,
    signOut,
  } ), [ loading, user, session, error, signUpNewUser, signInWithEmail, signOut ] )

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
