/* eslint-disable func-names */
import React from 'react'
import { render, cleanup } from '@testing-library/react-native'
import {
  afterAll, jest, it, expect,
} from '@jest/globals'
import App from '../App'
import useAuth from '../src/hooks/useAuth'

// Correctly mock useAuth to ensure it works as expected
jest.mock( '../src/hooks/useAuth', () => ( {
  __esModule: true,
  default: jest.fn(),
} ) )

// Mock AppStack and AuthStack components.
// Just need to verify that one renders over the other.
jest.mock( '../src/components/AppStack', () => function () {
  return 'Main'
} )

jest.mock( '../src/components/AuthStack', () => function () {
  return 'SignUp'
} )

jest.mock( 'react-native-safe-area-context', () => {
  const SafeAreaContext = jest.requireActual( 'react-native-safe-area-context' )
  return {
    ...SafeAreaContext as object,
    SafeAreaProvider: ( { children } ) => children,
  }
} )

afterAll( () => {
  cleanup()
  jest.clearAllTimers()
  jest.clearAllMocks()
} )

it( 'renders AppStack when user is authenticated', async () => {
  // Simulate an authed user.
  ( useAuth as jest.Mock ).mockReturnValue( { session: { user: {} } } )

  const element = render( <App /> ).toJSON()
  expect( element ).toBe( 'Main' )
} )

it( 'renders AuthStack when user is not authenticated', async () => {
  // Simulate a non-authed user.
  ( useAuth as jest.Mock ).mockReturnValue( { session: null } )

  const element = render( <App /> ).toJSON()

  expect( element ).toBe( 'SignUp' )
} )
