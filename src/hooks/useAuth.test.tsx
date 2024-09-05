// @todo: need to adjust testing configs to support imports an file types.
// import { renderHook } from '@testing-library/react'
// import React, { ReactNode } from 'react'
// import {
//   expect, describe, it, jest,
// } from '@jest/globals'
// import { User } from '@supabase/supabase-js'
// import useAuth from './useAuth'
// import { AuthContext } from '../providers/AuthProvider'
// import { AuthContextType } from '../types/auth'

// describe( 'useAuth', () => {
//   it( 'should throw an error if used outside of AuthProvider', () => {
//     const { result } = renderHook( () => useAuth() )

//     // Expect the hook to throw an error when used outside the AuthProvider
//     expect( result.current.error ).toEqual(
//       new Error( 'useAuth must be used within an AuthProvider' ),
//     )
//   } )

//   it( 'should return the context value when used within AuthProvider', () => {
//     // @todo: need to setup a different parser for this.
//     // Mock the context value conforming to AuthContextType
//     const mockAuthContextValue: AuthContextType = {
//       error: null,
//       loading: false,
//       session: null,
//       // @ts-expect-error ignore for testing, not important.
//       signUpNewUser: ( jest.fn().mockResolvedValue( undefined ) as jest.Mock ),
//       // @ts-expect-error ignore for testing, not important.
//       signInWithEmail: ( jest.fn().mockResolvedValue( undefined ) as jest.Mock ),
//       // @ts-expect-error ignore for testing, not important.
//       signOut: ( jest.fn().mockResolvedValue( undefined ) as jest.Mock ),
//       user: { id: '1', email: 'test@example.com' } as User, // Mocking user object
//     }

//     // Define the wrapper component with the correct context value
//     const wrapper = ( { children }: { children: ReactNode } ) => (
//       <AuthContext.Provider value={mockAuthContextValue}>
//         {children}
//       </AuthContext.Provider>
//     )

//     const { result } = renderHook( () => useAuth(), { wrapper } )

//     // Expect the hook to return the correct context value
//     expect( result.current ).toEqual( mockAuthContextValue )
//   } )
// } )
