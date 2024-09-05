import { expect, describe, it } from '@jest/globals'
import getNextStatus, { Status } from './getNextStatus'

describe( 'getNextStatus', () => {
  it( 'should return PARTIAL when the current status is INCOMPLETE', () => {
    expect( getNextStatus( Status.INCOMPLETE ) ).toBe( Status.PARTIAL )
  } )

  it( 'should return COMPLETE when the current status is PARTIAL', () => {
    expect( getNextStatus( Status.PARTIAL ) ).toBe( Status.COMPLETE )
  } )

  it( 'should return INCOMPLETE when the current status is COMPLETE', () => {
    expect( getNextStatus( Status.COMPLETE ) ).toBe( Status.INCOMPLETE )
  } )

  it( 'should return INCOMPLETE when the current status is invalid', () => {
    expect( getNextStatus( 'invalid' as Status ) ).toBe( Status.INCOMPLETE )
  } )
} )
